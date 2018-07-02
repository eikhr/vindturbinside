const express = require('express');
const lagSide = require('../serverfiler/lagSide');

const asyncMiddleware = require('../serverfiler/asyncMiddleware.js');


const leggTilSessionFeil = require('../serverfiler/leggTilSessionFeil.js');
const emailValidator = require('email-validator');
const bcrypt = require('bcrypt');


module.exports = (db) => {
	const ruter = express.Router();

	
	ruter.get('/', asyncMiddleware(async (req, res, next) => {
		if (req.query.quiz === 'fullført') {
			req.hbsdata.tittel = 'Lag Bruker - Vindturbinismen';
			lagSide(res, 'registrerBruker', req.hbsdata, next);
		} else {
			req.hbsdata.headLenker += `	<style>
											#idBilde {
									            border: 3px solid #000000;
									            border-radius: 5px;
									        }
									        button {
									            width: 125px;
									            margin-left: 3px;
									            line-height: 40px;
									            border: 1px solid #000000;
									            border-radius: 5px;
									        }

									        button:hover {
									            background-color: #6495ED;
									            cursor: pointer;
									        }
									        p {
									            margin-bottom: 0;
									        }
										</style>`;
			req.hbsdata.tittel = 'Opptaksquiz - Vindturbinismen';
			req.hbsdata.js += '<script src="/JS/opptaksquiz.js"></script>';

			lagSide(res, 'opptaksquiz', req.hbsdata, next);
		}
	}));

	ruter.post('/', asyncMiddleware(async (req, res, next) => {
		if (req.body.reg_bruker) {
			db = await db;
			try {
				if (!req.body.brukernavn) throw 'Du må skrive inn et brukernavn';
				if (!req.body.epost) throw 'Du må skrive inn en e-post';
				if (!req.body.passord) throw 'Du må skrive inn et passord';

				if (!req.body.brukernavn.match(/^[\wæøå]{3,20}$/i)) throw 'Brukernavnet må være mellom 3 og 20 tegn og kan bare inneholde bokstaver, tall, og "_"';

				if (!emailValidator.validate(req.body.epost)) throw 'E-postadressen er ikke gyldig';

				if (req.body.passord !== req.body.bekreft_passord) throw 'Passordene er ikke like';
				if (req.body.passord.length < 4) throw 'Seriøst? Under 4 tegn i passordet? Lag et bedre passord';

				let epostTatt = db.bruker.sjekkBruker('Epost', req.body.epost);
				let navnTatt = db.bruker.sjekkBruker('Navn', req.body.brukernavn);

				if (await epostTatt) throw 'E-postadressen er allerede i bruk';
				if (await navnTatt) throw 'Brukernavnet er allerede i bruk';
				
				// hvis ingen feil har blitt kastet lager vi brukeren
				let passordHash = await bcrypt.hash(req.body.passord, 17);

				let brukerID = await db.bruker.leggTilBruker(req.body.brukernavn, req.body.epost, passordHash);

				let bruker = await db.bruker.hentBruker(brukerID);
				req.session.bruker = bruker;

				res.redirect(303, '/');
			} catch (err) {
				if (typeof(err) === 'string') {
					if (err === 'Brukeren finnes ikke') {
						leggTilSessionFeil(req, 'En feil oppstod og brukeren din kunne ikke lages akkuratt nå. Prøv igjen senere.');
					} else {
						leggTilSessionFeil(req, err);
					}
					res.redirect(303, '/registrer/?quiz=fullført');
				} else {
					throw err;
				}
			} 
		} else {
			next();
		}
	}));
	
	return ruter;
};