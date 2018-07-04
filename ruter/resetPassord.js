const express = require('express');
const lagSide = require('../serverfiler/lagSide');
const asyncMiddleware = require('../serverfiler/asyncMiddleware.js');


module.exports = (db) => {
	const ruter = express.Router();

	ruter.get('/', asyncMiddleware(async (req, res, next) => {
		req.hbsdata.tittel = 'Tilbakestill passord - Vindturbinismen';

		lagSide(req, res, 'resetPassord', req.hbsdata, next);
	}));

	ruter.post('/', asyncMiddleware(async (req, res, next) => {
		if (req.post.tilbakestill_passord_epost) {
			// TODO: gjør sånn at dette funker
		} 
		// TODO: legg til noe greier her
		next();
	}));

	return ruter;
};