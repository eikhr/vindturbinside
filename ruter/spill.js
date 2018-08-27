const express = require('express');
const lagSide = require('../serverfiler/lagSide');
const asyncMiddleware = require('../serverfiler/asyncMiddleware.js');

const leggTilSessionFeil = require('../serverfiler/leggTilSessionFeil.js');


module.exports = (db) => {
	const TPR = require('./spill/turbinPaaRad.js');
	const turbinquiz = require('./spill/turbinquiz.js');
	
	const ruter = express.Router();
	
	ruter.use('/', (req, res, next) => {
		req.aktivSide = 'spill';
		next();
	});


	ruter.use('/turbinP%C3%A5Rad', TPR); // /turbinPåRad
	ruter.use('/turbinquiz', turbinquiz);

	ruter.get('/', asyncMiddleware(async (req, res, next) => {
		req.hbsdata.tittel = 'Spill og quiz - Vindturbinismen';

		lagSide(req, res, 'spill', req.hbsdata, next);
	}));


	return ruter;
};