const express = require('express');
const lagSide = require('../serverfiler/lagSide');

const asyncMiddleware = require('../serverfiler/asyncMiddleware.js');

const ruter = express.Router();


ruter.get('/', asyncMiddleware(async (req, res, next) => {
	req.aktivSide = 'spill';

	
	req.hbsdata.headLenker += `	<link href="https://fonts.googleapis.com/css?family=Amatic+SC" rel="stylesheet">
							    <link rel="stylesheet" href="/CSS/spill/TPR/App.css">
							    <link rel="stylesheet" href="/CSS/spill/TPR/index.css">
							    <link rel="stylesheet" href="/CSS/spill/TPR/Game.css">`;
	req.hbsdata.tittel = 'Turbin På Rad!';

	lagSide(req, res, 'spill/turbinPaaRad', req.hbsdata, next);
}));

module.exports = ruter;