const express = require('express');
const asyncMiddleware = require('../serverfiler/asyncMiddleware.js');


module.exports = (db) => {
	const forumLik = require('./ajax/forumLik.js')(db);
	const hentLikerKlikk = require('./ajax/hentLikerKlikk.js')(db);
	const ruter = express.Router();

	ruter.use('/forumLik', forumLik);
	ruter.use('/hentLikerKlikk', hentLikerKlikk);
	

	return ruter;
};