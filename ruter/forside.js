const express = require('express');
const lagSide = require('../serverfiler/lagSide');

const asyncMiddleware = require('../serverfiler/asyncMiddleware.js');

const ruter = express.Router();


ruter.get('/', asyncMiddleware(async (req, res, next) => {
	req.hbsdata.headLenker += '<link rel="stylesheet" href="/CSS/hovedside.css">';
	req.hbsdata.tittel = 'Vindturbinismen';

	lagSide(res, 'forside', req.hbsdata, next);
}));

module.exports = ruter;