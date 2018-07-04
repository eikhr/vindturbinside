const express = require('express');
const lagSide = require('../../serverfiler/lagSide');

const asyncMiddleware = require('../../serverfiler/asyncMiddleware.js');



module.exports = (db) => {
	const ruter = express.Router();

	ruter.get('*', asyncMiddleware(async (req, res, next) => {
		db = await db;

		let kategori = req.url.split('/')[1];

		if (req.url.split('/')[2]) {
			let err = new Error('Ikke funnet');
			err.status = 404;
			throw err;
		}

		kategori = kategori.replace(/_/g, ' ');
		kategori = decodeURI(kategori);

		
		req.hbsdata.tittel = 'Forum - Vindturbinismen';

		req.hbsdata.kategori = kategori;
		req.hbsdata.traader = await db.forum.hentTraader(kategori);
		req.hbsdata.sisteKommentarer = await db.forum.hentSisteKommentarer(5, kategori);

		lagSide(req, res, 'forumKategori', req.hbsdata, next);
	}));

	return ruter;
};