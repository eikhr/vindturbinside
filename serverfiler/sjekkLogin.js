const leggTilSessionFeil = require('../serverfiler/leggTilSessionFeil.js');
const bcrypt = require('bcrypt');

const getIP = require('ipware')().get_ip;


module.exports = (db) => {
	return async function(req, res, next) {
		db = await db;

		if (!req.session.bruker) {
			if (req.body.logg_inn) {
				try {
					if(!req.body.brukernavn) throw 'Brukernavn må fylles inn.';
					if(!req.body.passord) throw 'Passord må fylles inn.';

					let bruker = await db.bruker.hentBruker(req.body.brukernavn);

					let riktigPassord = await bcrypt.compare(req.body.passord, bruker.passord);

					if (riktigPassord) {
						req.session.bruker = bruker;

						loggInnlogging(db, req, bruker.id, false);

						if (req.body.huskmeg) {
							let pass = Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2);
							let passHash = await bcrypt.hash(pass, 10);
							let hlid = await db.bruker.leggTilHusketLogin(bruker.id, passHash);

							res.cookie('hlid', hlid, { maxAge: 3.153e10, httpOnly: true });
							res.cookie('hlpass', pass, { maxAge: 3.153e10, httpOnly: true });
						}
					} else {
						throw 'Feil passord';
					}
				} catch (err) {
					if (typeof(err) === 'string') {
						if (err === 'Brukeren finnes ikke' || err === 'Feil passord') {
							leggTilSessionFeil(req, 'Feil brukernavn/passord');
						} else {
							leggTilSessionFeil(req, err);
						}
					} else {
						throw err;
					}
				} finally {
					res.redirect(303, req.originalUrl);
				}

			} else if (req.cookies.hlid) {
				let hlogin;
				try {
					hlogin = await db.bruker.hentHusketLogin(req.cookies.hlid);
				} catch (err) {
					res.clearCookie('hlid');
					res.clearCookie('hlpass');
					res.redirect(303, req.originalUrl);
					throw err;
				}

				let riktigPass = await bcrypt.compare(req.cookies.hlpass, hlogin.hash);

				if (riktigPass) {
					let bruker = await db.bruker.hentBruker(Number(hlogin.brukerID));

					req.session.bruker = bruker;

					loggInnlogging(db, req, bruker.id, true);
				} else {
					res.clearCookie('hlid');
					res.clearCookie('hlpass');
				}
				res.redirect(303, req.originalUrl);
			} else {
				next();
			}
		} else if(req.body.logg_ut) {
			req.session.bruker = undefined;

			res.clearCookie('hlid');
			res.clearCookie('hlpass');

			res.redirect(303, req.originalUrl);
		} else {
			next();
		}
	};
};

function loggInnlogging(db, req, brukerID, husket) {
	var ip = getIP(req).clientIp;

	db.bruker.loggLogin(brukerID, ip, husket);
}