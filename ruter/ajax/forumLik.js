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

			let finnesInnlegg = db.forum.finnesInnlegg(innleggID);

			if (!req.session.bruker) {
				throw new Error('Du er ikke logget inn');
			}
			let harLikt = db.forum.harLikt(req.session.bruker.id, innleggID);

			if (! await finnesInnlegg) {
				throw new Error('Innlegget finnes ikke');
			}

			if (await harLikt) {
				db.forum.sluttLikInnlegg(req.session.bruker.id, innleggID);
				sendSvar(res, undefined, false);
			} else {
				db.forum.likInnlegg(req.session.bruker.id, innleggID);
				sendSvar(res, undefined, true);
			}
		}
		catch (err) {
			sendSvar(res, err.message, true);
		}
	}));

	return ruter;
};

function sendSvar(res, err, likt) {
	res.set('Content-Type', 'application/json');

	res.send({
		err: err,
		likt: likt
	});

	res.end();
}