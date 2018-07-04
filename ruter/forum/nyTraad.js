const express = require('express');
const lagSide = require('../../serverfiler/lagSide');

const asyncMiddleware = require('../../serverfiler/asyncMiddleware.js');


const leggTilSessionFeil = require('../../serverfiler/leggTilSessionFeil.js');


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

		
		req.hbsdata.tittel = 'Ny tråd - Forum - Vindturbinismen';
		req.hbsdata.kategori = kategori;

		lagSide(req, res, 'nyTraad', req.hbsdata, next);
	}));


	ruter.post('*', asyncMiddleware(async (req, res) => {
		db = await db;

		let kategori = req.url.split('/')[1];

		if (req.url.split('/')[2]) {
			let err = new Error('Ikke funnet');
			err.status = 404;
			throw err;
		}

		kategori = kategori.replace(/_/g, ' ');
		kategori = decodeURI(kategori);

		try {
			if (!kategori) throw 'Her er det noe feil, nettadressen inneholder ikke kategorien...';
			if (!req.session.bruker) throw 'Du må være logget inn for å kommentere';
			if (!req.body.tittel) throw 'Tråden må ha en tittel';
			if (!req.body.innhold) throw 'Innlegget kan ikke være tomt';

			let traadID = await db.forum.leggTilTraad(kategori, req.session.bruker.id, req.body.tittel, req.body.innhold);

			res.redirect(303, '/forum/tråd/'+traadID+'/');
		} catch (err) {
			if (typeof(err) === 'string') {
				leggTilSessionFeil(req, err);
				res.redirect(303, req.originalUrl);
			} else {
				throw err;
			}
		}
	}));

	return ruter;
};