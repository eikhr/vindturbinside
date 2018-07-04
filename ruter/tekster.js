const express = require('express');
const lagSide = require('../serverfiler/lagSide');
const asyncMiddleware = require('../serverfiler/asyncMiddleware.js');


module.exports = (db) => {
	const ruter = express.Router();

	ruter.get('*', asyncMiddleware(async (req, res, next) => {
		req.aktivSide = 'tekster';

		db = await db;
		let visesKategori, kategoriNavn, kategoriID;


		visesKategori = req.url.split('/')[1];

		if (req.url.split('/')[2]) {
			let err = new Error('Ikke funnet');
			err.status = 404;
			throw err;
		}

		if(visesKategori === '') {
			visesKategori = '1';
		}

		visesKategori = visesKategori.replace(/_/g, ' ');
		visesKategori = decodeURI(visesKategori);

		let kategorier = await db.tekster.hentKategorier(true);

		for (let kategori of kategorier) {
			if (kategori.id == visesKategori || kategori.navn == visesKategori) {
				kategori.vises = true;
				kategoriNavn = kategori.navn;
				kategoriID = kategori.id;
			}

			kategori.URINavn = kategori.navn.replace(/ /g, '_');
			kategori.URINavn = encodeURI(kategori.URINavn);
		}

		if (!kategoriNavn) {
			let err = new Error ('Ikke funnet');
			err.status = 404;
			throw err;
		}

		// henter tekstene i kategorien
		var tekster = await hentTekster(res, db, kategoriNavn, kategoriID);

		req.hbsdata.headLenker += '<link rel="stylesheet" href="/CSS/sidenav.css"><link rel="stylesheet" href="/CSS/tekster.css">';
		req.hbsdata.tittel = 'Tekster - Vindturbinismen';
		req.hbsdata.hoveddel = {
			kategorier: kategorier,
			tekster: tekster
		};
		
		lagSide(req, res, 'tekster', req.hbsdata, next);
	}));

	return ruter;
};





async function hentTekster(res, db, kategoriNavn, kategoriID) {
	let tekster = db.tekster.hentTekster(kategoriID);

	let data = {
		tekster: await tekster,
		kategoriNavn: kategoriNavn
	};

	let kompilert = await new Promise((resolve) => {
		res.render('tekster_tekst', data, (err, html) => {
			if (err) {
				throw err;
			} else {
				resolve(html);
			}
		});
	});

	return kompilert;
}