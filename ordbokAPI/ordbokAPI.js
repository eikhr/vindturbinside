const express = require('express');
const asyncMiddleware = require('../serverfiler/asyncMiddleware.js');


//const initDb = require("./db").initDb;  GJØRES I INDEX.JS
const getDb = require("./ordbokDatabase").getDb;
const leggTilOrd = require('./leggTilOrd/leggTilOrd.js');


const ruter = express.Router();

ruter.post('*', express.json());

ruter.post('/leggTilOrd', asyncMiddleware(leggTilOrd));


// ikke funnet feil
ruter.use(function(req, res, next) {
	let err = new Error('Ikke funnet');
	err.status = 404;
	err.userMsg = 'URL stien er ikke gyldig';
	next(err);
});

// egen feilbehandler
ruter.use(function(err, req, res, next) {
	// set locals, only providing error in development
	console.warn(err);
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// send feilmelding
	errMessage = (err.userMsg? err.userMsg : 'Intern serverfeil');
	res.status(err.status || 500).json({ error: errMessage });
});

module.exports = ruter;