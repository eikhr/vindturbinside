const express = require('express');
const lagSide = require('../../serverfiler/lagSide');

const asyncMiddleware = require('../../serverfiler/asyncMiddleware.js');



module.exports = (db) => {
	const ruter = express.Router();

	ruter.get('/', asyncMiddleware(async (req, res, next) => {
		db = await db;
		try {
			if (!req.query.innlegg) {
				throw new Error('mangler innleggIDen');
			}

			let innleggID = Number(req.query.innlegg);

			let navn = await db.forum.hentLikerNavn(innleggID);
			sendSvar(res, undefined, navn);
		}
		catch (err) {
			sendSvar(res, err.message);
		}
	}));

	return ruter;
};

function sendSvar(res, err, navn) {
	res.set('Content-Type', 'application/json');

	res.send({
		err: err,
		navn: navn
	});

	res.end();
}