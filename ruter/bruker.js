const express = require('express');
const lagSide = require('../serverfiler/lagSide');
const asyncMiddleware = require('../serverfiler/asyncMiddleware.js');


module.exports = (db) => {
	const ruter = express.Router();

	ruter.get('*', asyncMiddleware(async (req, res, next) => {
		db = await db;

		let brukernavn = req.url.split('/')[1];

		if (req.url.split('/')[2]) {
			let err = new Error('Ikke funnet');
			err.status = 404;
			throw err;
		}

		brukernavn = decodeURI(brukernavn);
		
		req.hbsdata.headLenker += '<link rel="stylesheet" href="/CSS/forum.css">';
		req.hbsdata.headLenker += '<link rel="stylesheet" href="/CSS/bruker.css">';


		[	req.hbsdata.omBruker,
			req.hbsdata.traader,
			req.hbsdata.sisteKommentarer] = await Promise.all(
			[	db.bruker.hentBruker(brukernavn),
				db.forum.hentTraader(undefined, brukernavn),
				db.forum.hentSisteKommentarer(10, undefined, brukernavn)]);

		req.hbsdata.tittel = req.hbsdata.omBruker.navn + ' - Vindturbinismen';
		
		lagSide(res, 'bruker', req.hbsdata, next);
	}));
	return ruter;
};