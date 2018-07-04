const formaterDato = require('../formaterDato.js');

module.exports = con => { 
	const dbquery = require('./query.js')(con);

	return {
		hentKategorier: async () => {
			let resultat = await dbquery('SELECT fk.ForumKategoriID AS id, fk.Navn AS navn, fk.Beskrivelse AS beskrivelse, bi.Filnavn AS filnavn, COUNT(fe.ForumEmneID) AS antallEmner FROM forumkategori AS fk LEFT JOIN forumemne AS fe ON fk.ForumKategoriID = fe.ForumKategoriID INNER JOIN bilde AS bi ON fk.BildeID = bi.BildeID GROUP BY fk.ForumKategoriID');

			let kategorier = [];
			for (const rad of resultat) {
				kategorier.push({
					id: rad.id,
					navn: rad.navn,
					url: encodeURI(rad.navn.replace(/ /g, '_')),
					beskrivelse: rad.beskrivelse,
					antallTraader: rad.antallEmner,
					bilde: 'https://vindturbin.s3.amazonaws.com/pb/' + rad.filnavn
				});
			}

			return kategorier;
		},

		hentTraader: async (kategori, bruker) => {
			let resultat;
			if (kategori) {
				resultat = await dbquery('SELECT fe.ForumEmneID AS id, fe.Navn AS navn, fit.innhold AS innhold, fit.OpprettetDato AS dato, br.Navn AS brukernavn, br.Admin as brukeradmin, bi.Filnavn AS brukerbilde, COUNT(fi.ForumInnleggID) AS antallInnlegg FROM forumemne AS fe LEFT JOIN foruminnlegg AS fi ON fi.ForumEmneID = fe.ForumEmneID INNER JOIN bruker AS br ON fe.BrukerID = br.BrukerID INNER JOIN bilde AS bi ON br.BildeID = bi.BildeID INNER JOIN forumkategori AS fk ON fe.ForumKategoriID = fk.ForumKategoriID JOIN foruminnlegg AS fit ON fe.ForumEmneID = fit.ForumEmneID AND fit.OpprettetDato =( SELECT f.OpprettetDato FROM foruminnlegg AS f WHERE fe.ForumEmneID = f.ForumEmneID ORDER BY OpprettetDato ASC LIMIT 1 ) WHERE fk.Navn = ? GROUP BY fe.ForumEmneID ORDER BY fit.OpprettetDato DESC', [kategori]);
			} else if (bruker) {
				resultat = await dbquery('SELECT fe.ForumEmneID AS id, fe.Navn AS navn, fit.innhold AS innhold, fit.OpprettetDato AS dato, br.Navn AS brukernavn, br.Admin as brukeradmin, bi.Filnavn AS brukerbilde, COUNT(fi.ForumInnleggID) AS antallInnlegg FROM forumemne AS fe LEFT JOIN foruminnlegg AS fi ON fi.ForumEmneID = fe.ForumEmneID INNER JOIN bruker AS br ON fe.BrukerID = br.BrukerID INNER JOIN bilde AS bi ON br.BildeID = bi.BildeID INNER JOIN forumkategori AS fk ON fe.ForumKategoriID = fk.ForumKategoriID JOIN foruminnlegg AS fit ON fe.ForumEmneID = fit.ForumEmneID AND fit.OpprettetDato =( SELECT f.OpprettetDato FROM foruminnlegg AS f WHERE fe.ForumEmneID = f.ForumEmneID ORDER BY OpprettetDato ASC LIMIT 1 ) WHERE br.Navn = ? GROUP BY fe.ForumEmneID ORDER BY fit.OpprettetDato DESC', [bruker]);
			}
			let traader = [];
			for (const rad of resultat) {
				traader.push({
					id: rad.id,
					navn: rad.navn,
					innhold: rad.innhold,
					dato: formaterDato(rad.dato, 'vanlig'),
					antallKommentarer: rad.antallInnlegg - 1,
					bruker: {
						navn: rad.brukernavn,
						bilde: 'https://vindturbin.s3.amazonaws.com/pb/' + rad.brukerbilde,
						admin: rad.brukeradmin
					}
				});
			}

			return traader;
		},

		// henter brukeren med den gitte iden.
		hentSisteKommentarer: async (antall, kategori, bruker) => {
			let resultat;

			if (kategori) {
				resultat = await dbquery('SELECT fi.ForumInnleggID AS innleggID, fi.Innhold AS tekst, fi.OpprettetDato AS dato, fe.Navn AS emne, fe.ForumEmneID AS emneID, br.Navn AS brukernavn, bi.Filnavn AS bilde FROM foruminnlegg AS fi INNER JOIN forumemne AS fe ON fi.ForumEmneID=fe.ForumEmneID INNER JOIN bruker AS br ON fi.BrukerID=br.BrukerID INNER JOIN bilde AS bi ON br.BildeID=bi.BildeID INNER JOIN forumkategori AS fk ON fk.ForumKategoriID=fe.ForumKategoriID WHERE fk.Navn = ? ORDER BY fi.OpprettetDato DESC LIMIT ?', [kategori, antall]);
			} else if (bruker) {
				resultat = await dbquery('SELECT fi.ForumInnleggID AS innleggID, fi.Innhold AS tekst, fi.OpprettetDato AS dato, fe.Navn AS emne, fe.ForumEmneID AS emneID, br.Navn AS brukernavn, bi.Filnavn AS bilde FROM foruminnlegg AS fi INNER JOIN forumemne AS fe ON fi.ForumEmneID=fe.ForumEmneID INNER JOIN bruker AS br ON fi.BrukerID=br.BrukerID INNER JOIN bilde AS bi ON br.BildeID=bi.BildeID WHERE br.Navn = ? ORDER BY fi.OpprettetDato DESC LIMIT ?', [bruker, antall]);
			} else {
				resultat = await dbquery('SELECT fi.ForumInnleggID AS innleggID, fi.Innhold AS tekst, fi.OpprettetDato AS dato, fe.Navn AS emne, fe.ForumEmneID AS emneID, br.Navn AS brukernavn, bi.Filnavn AS bilde FROM foruminnlegg AS fi INNER JOIN forumemne AS fe ON fi.ForumEmneID=fe.ForumEmneID INNER JOIN bruker AS br ON fi.BrukerID=br.BrukerID INNER JOIN bilde AS bi ON br.BildeID=bi.BildeID ORDER BY fi.OpprettetDato DESC LIMIT ?', [antall]);
			}

			let sisteKommentarer = [];
			for (const rad of resultat) {
				sisteKommentarer.push({
					tekst: rad.tekst,
					emne: rad.emne,
					emneID: rad.emneID,
					kommentarID: rad.innleggID,
					dato: formaterDato(rad.dato, 'vanlig'),
					bruker: {
						navn: rad.brukernavn,
						bilde: 'https://vindturbin.s3.amazonaws.com/pb/' + rad.bilde
					}
				});
			}

			return sisteKommentarer;
		},

		hentEmneData: async (emneID) => {
			let resultat = await dbquery('SELECT fk.Navn AS katnavn, fe.Navn AS emne, fe.ForumEmneID AS id FROM forumemne AS fe INNER JOIN forumkategori AS fk ON fe.ForumKategoriID=fk.ForumKategoriID WHERE fe.ForumEmneID = ?', [emneID]);

			let rad = resultat[0];

			if (!rad) {
				let err = new Error('Ikke funnet');
				err.status = 404;
				throw err;
			}

			return {
				kategori: rad.katnavn,
				emne: rad.emne,
				id: rad.id
			};
		},

		finnesInnlegg: async (innleggID) => {
			let resultat = await dbquery('SELECT COUNT(*) FROM foruminnlegg WHERE ForumInnleggID = ?', [innleggID]);

			return Boolean(resultat[0]['COUNT(*)']);
		},

		harLikt: async (brukerID, innleggID) => {
			let resultat = await dbquery('SELECT COUNT(*) FROM liktinnlegg WHERE ForumInnleggID = ? AND BrukerID = ?', [innleggID, brukerID]);

			return Boolean(resultat[0]['COUNT(*)']);
		},

		likInnlegg: async (brukerID, innleggID) => {
			let resultat = await dbquery('INSERT INTO liktinnlegg(ForumInnleggID, BrukerID) VALUES (?, ?)', [innleggID, brukerID]);

			return resultat.insertId;
		},

		sluttLikInnlegg: async (brukerID, innleggID) => {
			let resultat = await dbquery('DELETE FROM liktinnlegg WHERE ForumInnleggID = ? AND BrukerID = ?', [innleggID, brukerID]);

			return;
		},

		hentLikerNavn: async (innleggID) => {
			let resultat = await dbquery('SELECT br.Navn AS brukernavn FROM liktinnlegg AS li INNER JOIN bruker AS br ON li.BrukerID = br.BrukerID WHERE li.ForumInnleggID = ?', [innleggID]);

			let likerklikk = [];

			for (const rad of resultat) {
				likerklikk.push(rad.brukernavn);
			}

			return likerklikk;
		},

		hentInnlegg: async (emneID, innloggetBrukerID) => {
			if (innloggetBrukerID) {
				let resultat = await dbquery('SELECT fi.ForumInnleggID AS id, fi.Innhold AS innhold, fi.OpprettetDato AS opprettetDato, fi.EndretDato AS endretDato, br.Navn as brukernavn, bi.Filnavn as brukerbilde, (SELECT COUNT(*) FROM liktinnlegg WHERE liktinnlegg.ForumInnleggID = fi.ForumInnleggID) AS likerklikk, (SELECT COUNT(*) FROM liktinnlegg WHERE liktinnlegg.ForumInnleggID = fi.ForumInnleggID AND liktinnlegg.BrukerID = ?) as likt FROM foruminnlegg AS fi INNER JOIN bruker AS br ON br.BrukerID=fi.BrukerID INNER JOIN bilde AS bi ON bi.BildeID=br.BildeID WHERE fi.ForumEmneID = ?', [innloggetBrukerID, emneID]);
				
				var innlegg = [];
				for (const rad of resultat) {
					innlegg.push({
						id: rad.id,
						innhold: rad.innhold,
						opprettetDato: formaterDato(rad.opprettetDato, 'vanlig'),
						endretDato: (rad.opprettetDato === rad.endretDato)? formaterDato(rad.endretDato, 'vanlig'): false,
						bruker: {
							navn: rad.brukernavn,
							bilde: 'https://vindturbin.s3.amazonaws.com/pb/' + rad.brukerbilde
						},
						likerklikk: rad.likerklikk,
						likt: rad.likt
					});
				}
			} else {
				let resultat = await dbquery('SELECT fi.ForumInnleggID AS id, fi.Innhold AS innhold, fi.OpprettetDato AS opprettetDato, fi.EndretDato AS endretDato, br.Navn as brukernavn, bi.Filnavn as brukerbilde, (SELECT COUNT(*) FROM liktinnlegg WHERE liktinnlegg.ForumInnleggID = fi.ForumInnleggID) AS likerklikk FROM foruminnlegg AS fi INNER JOIN bruker AS br ON br.BrukerID=fi.BrukerID INNER JOIN bilde AS bi ON bi.BildeID=br.BildeID WHERE fi.ForumEmneID = ?', [emneID]);

				var innlegg = [];
				for (const rad of resultat) {
					innlegg.push({
						id: rad.id,
						innhold: rad.innhold,
						opprettetDato: formaterDato(rad.opprettetDato, 'vanlig'),
						endretDato: (rad.opprettetDato === rad.endretDato)? formaterDato(rad.endretDato, 'vanlig'): false,
						bruker: {
							navn: rad.brukernavn,
							bilde: 'https://vindturbin.s3.amazonaws.com/pb/' + rad.brukerbilde
						},
						likerklikk: rad.likerklikk
					});
				}
			}

			return innlegg;
		},

		leggTilKategori: async(navn, beskrivelse) => {
			let resultat = await dbquery('INSERT INTO forumkategori (Navn, Beskrivelse, BildeID) VALUES (?, ?, 6)', [navn, beskrivelse]);

			return resultat.insertId;
		},

		leggTilKommentar: async(innhold, emne, bruker) => {
			let resultat = await dbquery('INSERT INTO foruminnlegg (Innhold, OpprettetDato, EndretDato, ForumEmneID, BrukerID) VALUES (?, NOW(), NOW(), ?, ?)', [innhold, emne, bruker]);

			return resultat.insertId;
		},

		leggTilTraad: (kategori, brukerID, tittel, innhold) => {
			return new Promise((resolve) => {
				// transaction greier
				con.beginTransaction(function(err) {
					if (err) { throw err; }

					con.query('INSERT INTO forumemne (Navn, ForumKategoriID, BrukerID) VALUES (?, (SELECT ForumKategoriID FROM forumkategori WHERE Navn = ?), ?)', [tittel, kategori, brukerID], function (error, resultat) {
						if (error) {
							return con.rollback(function() {
								throw error;
							});
						}

						var emneID = resultat.insertId;

						con.query('INSERT INTO foruminnlegg (Innhold, OpprettetDato, EndretDato, ForumEmneID, BrukerID) VALUES (?, NOW(), NOW(), ?, ?)', [innhold, emneID, brukerID], function (error) {
							if (error) {
								return con.rollback(function() {
									throw error;
								});
							}
							con.commit(function(err) {
								if (err) {
									return con.rollback(function() {
										throw err;
									});
								}
								resolve (emneID);
							});
						});
					});
				});
			});
		}
	};
};