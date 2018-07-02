const nl2br = require('locutus/php/strings/nl2br');

module.exports = con => { 
	const dbquery = require('./query.js')(con);
	return {
		// henter alle tekstkategoriene og returnerer dem som en array av objekter {id, navn, antallTekster}
		hentKategorier: async (haMedAntall) => {

			let resultat = await dbquery('SELECT k.TekstKategoriID AS id, k.Navn AS navn, COUNT(t.TekstID) AS antallTekster FROM tekstkategori AS k LEFT JOIN tekst AS t ON t.TekstKategoriID=k.TekstKategoriID GROUP BY k.TekstKategoriID');
 
			let kategorier = [];
			for (rad of resultat) {
				kategorier.push ({
					id: rad.id,
					navn: rad.navn,
					antallTekster: rad.antallTekster
				});
			}

			return kategorier;
		},

		hentTekster: async (kategori) => {
			let resultat = await dbquery('SELECT TekstID, Navn, Innhold FROM tekst WHERE TekstKategoriID = ?', [kategori]);

			let tekster = [];
			for (let tekst of resultat) {
				tekster.push({
					id: tekst['TekstID'],
					navn: tekst['Navn'],
					innhold: nl2br(tekst['Innhold'])
				});
			}

			return tekster;
		}
	};
};