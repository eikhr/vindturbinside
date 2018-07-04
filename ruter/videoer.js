const express = require('express');
const lagSide = require('../serverfiler/lagSide');

const asyncMiddleware = require('../serverfiler/asyncMiddleware.js');

const ruter = express.Router();


ruter.get('/', asyncMiddleware(async (req, res, next) => {
	req.aktivSide = 'videoer';

	req.hbsdata.headLenker += `	<style>
									iframe {
										background-color: black;
										border-radius: 20px;
										opacity: 0.9;
										max-width: 90vw;
									}
									div.disclaimer {
										font-size: 10px;
									}
								</style>`;
	req.hbsdata.tittel = 'Videoer - Vindturbinismen';
	
	lagSide(req, res, 'videoer', req.hbsdata, next);
}));

module.exports = ruter;