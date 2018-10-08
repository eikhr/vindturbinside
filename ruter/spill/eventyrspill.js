const express = require('express');
const lagSide = require('../../serverfiler/lagSide');

const asyncMiddleware = require('../../serverfiler/asyncMiddleware.js');

const ruter = express.Router();


ruter.get('/', asyncMiddleware(async (req, res, next) => {
	req.aktivSide = 'spill';

	req.hbsdata.headLenker += `<style>.innediv {background-color: rgba(50,50,60,0.9);}</style>`;
	req.hbsdata.tittel = 'Eventyrspill - Vindturbinismen';
	req.hbsdata.js += '<script src="/JS/spill/eventyrspill.js"></script>';

	lagSide(req, res, 'spill/eventyrspill', req.hbsdata, next);
}));

module.exports = ruter;