const express = require('express');
const lagSide = require('../serverfiler/lagSide');

const asyncMiddleware = require('../serverfiler/asyncMiddleware.js');

const ruter = express.Router();


ruter.get('/', (req, res, next) => {
	req.hbsdata.headLenker += '';
	req.hbsdata.tittel = 'Ordbok';

	lagSide(req, res, 'forside', req.hbsdata, next);
});

module.exports = ruter;