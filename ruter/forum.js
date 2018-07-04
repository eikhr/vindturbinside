const express = require('express');
const lagSide = require('../serverfiler/lagSide');
const asyncMiddleware = require('../serverfiler/asyncMiddleware.js');

const leggTilSessionFeil = require('../serverfiler/leggTilSessionFeil.js');


module.exports = (db) => {
	const kategori = require('./forum/kategori.js')(db);
	const traad = require('./forum/traad.js')(db);
	const nyTraad = require('./forum/nyTraad.js')(db);
	const ruter = express.Router();
	
	ruter.use('/', (req, res, next) => {
		req.aktivSide = 'forum';
		req.hbsdata.headLenker += '<link rel="stylesheet" href="/CSS/forum.css">';
		next();
	});


	ruter.use('/kategori', kategori);
	ruter.use('/tr%C3%A5d', traad); // det står egentlig /tråd
	ruter.use('/ny_tr%C3%A5d', nyTraad); // /ny_tråd

	ruter.get('/', asyncMiddleware(async (req, res, next) => {
		db = await db;

		req.hbsdata.tittel = 'Forum - Vindturbinismen';
		req.hbsdata.js += '<script src="/JS/forum.js"></script>';

		req.hbsdata.kategorier = await db.forum.hentKategorier();
		req.hbsdata.sisteKommentarer = await db.forum.hentSisteKommentarer(5);

		lagSide(req, res, 'forumHjem', req.hbsdata, next);
	}));

	ruter.post('/', asyncMiddleware(async (req, res, next) => {
		if (!req.body.nyKategori) {
			return next();
		}

		db = await db;

		try {
			if (!req.session.bruker) throw 'Du må være logget inn for å legge til kategorier';
			if (!req.session.bruker.admin) throw 'Du må være administrator for å legge til kategorier';
			if (!req.body.tittel) throw 'Kategorien må ha en tittel';
			if (!req.body.beskrivelse) throw 'Kategorien må ha en beskrivelse';

			await db.forum.leggTilKategori(req.body.tittel, req.body.beskrivelse);

			res.redirect(303, '/forum/kategori/' + req.body.tittel);
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