const express = require('express');
const lagSide = require('../serverfiler/lagSide');
const asyncMiddleware = require('../serverfiler/asyncMiddleware.js');

const sharp = require('sharp');
const formidable = require('formidable');
const fs = require('fs');

module.exports = (db) => {
	const ruter = express.Router();

	ruter.get('/', asyncMiddleware(async (req, res, next) => {
		req.hbsdata.tittel = 'Bytt brukerbilde - Vindturbinismen';
		
		lagSide(res, 'byttBrukerbilde', req.hbsdata, next);
	}));

	ruter.post('/', asyncMiddleware(async (req, res, next) => {
		if (!req.session.bruker) {
			return next();
		}

		db = await db;

		let form = new formidable.IncomingForm();
		form.maxFileSize = 1 * 1024 * 1024;

		form.parse(req);

		form.on('fileBegin', function (name, file){
			file.path = './uploadTmp/' + file.name;
		});

		form.on('file', function (name, file){
			let tid = Math.round(Date.now()/1000);
			let filnavn = req.session.bruker.navn + '_' + tid + '_pb.png';

			sharp('./uploadTmp/' + file.name)
				.resize(200, 200)
				.background('white')
				.png()
				.toFile('./public/media/bilde/' + filnavn, async (err, info) => {
					if (err) {
						fs.unlink('./uploadTmp/' + file.name, (err) => { console.log(err); });
						return next(err);
					}


					let bildeID = await db.bilde.leggTilBilde(filnavn, req.session.bruker.id);

					await db.bruker.byttBilde(req.session.bruker.id, bildeID);

					req.session.bruker = await db.bruker.hentBruker(Number(req.session.bruker.id));

					res.redirect(303, '/');

					fs.unlink('./uploadTmp/' + file.name, (err) => { console.log(err); });
				});
		});
	}));

	return ruter;
};