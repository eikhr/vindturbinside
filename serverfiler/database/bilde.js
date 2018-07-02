module.exports = con => { 
	const dbquery = require('./query.js')(con);

	return {
		leggTilBilde: async (filnavn, brukerID) => {
			let resultat = await dbquery('INSERT INTO bilde (Filnavn, Dato, BrukerID) VALUES (?, NOW(), ?)', [filnavn, brukerID]);

			return resultat.insertId; 
		}
	};
};