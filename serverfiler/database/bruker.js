const formaterDato = require('../formaterDato.js');

module.exports = con => { 
	const dbquery = require('./query.js')(con);

	return {
		// henter brukeren med den gitte iden.
		hentBruker: async (bruker) => {
			let resultat;
			if (typeof(bruker) === 'number') {
				resultat = await dbquery('SELECT bruker.BrukerID, Navn, Epost, Passord, OpprettetDato, Poeng, Admin, Filnavn FROM bruker INNER JOIN bilde ON bruker.BildeID=bilde.BildeID WHERE bruker.BrukerID = ?', [bruker]);
			} else {
				resultat = await dbquery('SELECT bruker.BrukerID, Navn, Epost, Passord, OpprettetDato, Poeng, Admin, Filnavn FROM bruker INNER JOIN bilde ON bruker.BildeID=bilde.BildeID WHERE bruker.Epost = ? OR bruker.Navn = ?', [bruker, bruker]);
			}

			if (resultat[0]) {
				return {
					id: resultat[0]['BrukerID'],
					navn: resultat[0]['Navn'],
					epost: resultat[0]['Epost'],
					passord: resultat[0]['Passord'],
					opprettetDato: resultat[0]['OpprettetDato'],
					alder: formaterDato(resultat[0]['OpprettetDato'], 'alder'),
					poeng: resultat[0]['Poeng'],
					admin: resultat[0]['Admin'],
					bilde: 'https://vindturbin.s3.amazonaws.com/pb/' + resultat[0]['Filnavn']
				};
			} else {
				throw 'Brukeren finnes ikke';
			}
		},

		sjekkBrukerTatt: async (navn) => {
			let resultat = await dbquery('SELECT BrukerID FROM bruker WHERE Navn = ?', [navn]);

			return Boolean(resultat[0]);
		},

		sjekkEpostTatt: async (epost) => {
			let resultat = await dbquery('SELECT BrukerID FROM bruker WHERE Epost = ?', [epost]);

			return Boolean(resultat[0]);
		},

		leggTilBruker: async (navn, epost, passord) => {
			let bildeID = Math.ceil(Math.random()*3);
			let resultat = await dbquery('INSERT INTO bruker(Navn, Epost, Passord, OpprettetDato, Poeng, Admin, BildeID) VALUES(?, ?, ?, NOW(), 0, 0, ?)', [navn, epost, passord, bildeID]);
			return resultat.insertId;
		},

		byttBilde: async (brukerID, bildeID) => {
			let gammeltBilde = await dbquery('SELECT bilde.Filnavn AS filnavn FROM bruker INNER JOIN bilde ON bruker.BildeID = bilde.BildeID WHERE bruker.BrukerID = ?', [brukerID]);

			await dbquery('UPDATE bruker SET BildeID = ? WHERE BrukerID = ?', [bildeID, brukerID]);

			return gammeltBilde[0]['filnavn'];
		},

		hentHusketLogin: async (id) => {
			let resultat = await dbquery('SELECT BrukerID, Hash FROM husketinnlogging WHERE HusketInnloggingID = ?', [id]);

			if(resultat[0]) {
				return {
					brukerID: resultat[0].BrukerID,
					hash: resultat[0].Hash
				};
			} else {
				throw new Error('Feil i husketinnloggingsjekk');
			}
		},

		leggTilHusketLogin: async (brukerID, hash) => {
			let resultat = await dbquery('INSERT INTO husketinnlogging (BrukerID, Hash, Dato) VALUES (?, ?, NOW())', [brukerID, hash]);

			return resultat.insertId; 
		},

		loggLogin: async (brukerID, ip, husket) => {
			await dbquery('INSERT INTO innlogging (BrukerID, IP, Dato, Husket) VALUES (?, ?, NOW(), ?)', [brukerID, ip, husket]);

			return;
		}
	};
};