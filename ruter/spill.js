const express = require('express');
const lagSide = require('../serverfiler/lagSide');

const asyncMiddleware = require('../serverfiler/asyncMiddleware.js');

const ruter = express.Router();


ruter.get('/', asyncMiddleware(async (req, res, next) => {
	req.aktivSide = 'spill';

	req.hbsdata.headLenker += `	<style>
									.innediv {
										text-align: left;
										max-width: 800px;
									}

									innediv img {
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
								</style>`;
	req.hbsdata.tittel = 'Spill og quiz - Vindturbinismen';
	req.hbsdata.js += '<script src="/JS/spill/turbinquiz.js"></script>';

	lagSide(req, res, 'spill', req.hbsdata, next);
}));

module.exports = ruter;