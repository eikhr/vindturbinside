const express = require('express');
const lagSide = require('../../serverfiler/lagSide');

const asyncMiddleware = require('../../serverfiler/asyncMiddleware.js');


const leggTilSessionFeil = require('../../serverfiler/leggTilSessionFeil.js');


module.exports = (db) => {
	const ruter = express.Router();

	ruter.get('*', asyncMiddleware(async (req, res, next) => {
		db = await db;

		let emneID = Number(req.url.split('/')[1]);

		if (req.url.split('/')[2] || isNaN(emneID)) {
			let err = new Error('Ikke funnet');
			err.status = 404;
			throw err;
		}

		req.hbsdata.js += '<script src="/JS/forum.js"></script>';
		req.hbsdata.tittel = 'Forum - Vindturbinismen';

		let emneData = await db.forum.hentEmneData(emneID);

		req.hbsdata.kategori = emneData.kategori;
		req.hbsdata.emne = emneData.emne;
		req.hbsdata.id = emneData.id;
		if (req.session.bruker) {
			req.hbsdata.innlegg = await db.forum.hentInnlegg(emneID, req.session.bruker.id);
		} else {
			req.hbsdata.innlegg = await db.forum.hentInnlegg(emneID);
		}

		if (req.session.bruker) {
			for (let innlegg of req.hbsdata.innlegg) {
				if (innlegg.bruker.navn === req.session.bruker.navn) {
					innlegg.innloggetBruker = true;
					console.log(innlegg.endretDato);
				}
			}
		}

		lagSide(req, res, 'forumTraad', req.hbsdata, next);
	}));




	ruter.post('*', asyncMiddleware(async (req, res, next) => {
		if (req.body.nyKommentar) {
			db = await db;

			let emneID = Number(req.url.split('/')[1]);

			if (req.url.split('/')[2] || isNaN(emneID)) {
				let err = new Error('Ikke funnet');
				err.status = 404;
				throw err;
			}

			try {
				if (!req.session.bruker) throw 'Du må være logget inn for å kommentere';
				if (!req.body.kommentarInnhold) throw 'Kommentaren kan ikke være tom';

				let kommentarID = await db.forum.leggTilKommentar(req.body.kommentarInnhold, emneID, req.session.bruker.id);

				res.redirect(303, '/forum/tråd/'+emneID+'/#'+kommentarID);
				
			} catch (err) {
				if (typeof(err) === 'string') {
					leggTilSessionFeil(req, err);
					res.redirect(303, req.originalUrl);
				} else {
					throw err;
				}
			} 
		} else if (req.body.redigerKommentar) {
			db = await db;

			let emneID = Number(req.url.split('/')[1]);

			let innleggBrukerID = Number(await db.forum.hentInnleggBruker(req.body.kommentarID));

			try {
				if (!req.session.bruker) throw 'Du må være logget inn for å redigere kommentarene dine';
				if (!req.body.kommentarInnhold) throw 'Kommentaren kan ikke være tom';
				if (!(req.session.bruker.id === innleggBrukerID)) throw 'Du kan ikke redigere andres kommentarer';

				await db.forum.redigerKommentar(req.body.kommentarID, req.body.kommentarInnhold);

				res.redirect(303, '/forum/tråd/'+emneID+'/#'+req.body.kommentarID);

			} catch (err) {
				if (typeof(err) === 'string') {
					leggTilSessionFeil(req, err);
					res.redirect(303, req.originalUrl);
				} else {
					throw err;
				}
			} 
		} else {
			return next();
		}
	}));

	return ruter;
};