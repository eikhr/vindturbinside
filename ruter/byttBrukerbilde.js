const express = require('express');
const lagSide = require('../serverfiler/lagSide');
const asyncMiddleware = require('../serverfiler/asyncMiddleware.js');
const leggTilSessionFeil = require('../serverfiler/leggTilSessionFeil.js');

const AWS = require('aws-sdk');
const sharp = require('sharp');
const formidable = require('formidable');
const fs = require('fs');

const BUCKET_NAME = 'vindturbin';
const IAM_USER_KEY = 'AKIAJVNGQIQIEAKWHLDQ';
const IAM_USER_SECRET = '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';


module.exports = (db) => {
	const ruter = express.Router();

	ruter.get('/', asyncMiddleware(async (req, res, next) => {
		req.hbsdata.tittel = 'Bytt brukerbilde - Vindturbinismen';
		
		lagSide(res, 'byttBrukerbilde', req.hbsdata, next);
	}));

	ruter.post('/', asyncMiddleware(async (req, res, next) => {
		if (!req.session.bruker) {
			return next();
		}

		db = await db;

		let form = new formidable.IncomingForm();
		form.maxFileSize = 5 * 1024 * 1024;

		form.parse(req, err => {
			if (err) {
				console.log(err.message.substring(0, 20));
				if (err.message.substring(0, 20) === 'maxFileSize exceeded') {
					leggTilSessionFeil(req, 'Bildet er for stort, vennligst bruk et bilde som er mindre enn 5 MB.');
				}
				res.redirect('back');
			}
		})

		form.on('fileBegin', function (name, file){
			file.path = './uploadTmp/' + file.name;
		});

		form.on('file', function (name, file){
			let tid = Math.round(Date.now()/1000);
			let filnavn = req.session.bruker.navn + '_' + tid + '_pb.png';

			sharp('./uploadTmp/' + file.name)
				.resize(200, 200)
				.background('white')
				.png()
				.toBuffer()
				.then(async (data) => {
					let s3upload = uploadToS3({
						name: 'pb/' + filnavn,
						data: data
					});


					let bildeID = await db.bilde.leggTilBilde(filnavn, req.session.bruker.id);

					let gammeltBildeNavn = await db.bruker.byttBilde(req.session.bruker.id, bildeID);

					await s3upload;
					let s3del = deleteFromS3('pb/' + gammeltBildeNavn);


					req.session.bruker = await db.bruker.hentBruker(Number(req.session.bruker.id));

					await s3del;

					res.redirect(303, '/');

					//fs.unlink('./uploadTmp/' + file.name, (err) => { console.log(err); });
				})
				.catch(err => {
					console.log(err.message);
					if (err.message === 'Input file is missing or of an unsupported image format') {
						leggTilSessionFeil(req, 'Filtypen du lastet opp er ikke støttet.');
					} else {
						console.log(err);
					}
					res.redirect('back');
				});
		});
	}));

	return ruter;
};

async function uploadToS3(file) {
	await new Promise((resolve, reject) => {
		let s3bucket = new AWS.S3({
			accessKeyId: IAM_USER_KEY,
			secretAccessKey: IAM_USER_SECRET,
			Bucket: BUCKET_NAME,
		});
		s3bucket.createBucket(function () {
			var params = {
				Bucket: BUCKET_NAME,
				Key: file.name,
				Body: file.data,
			};
			s3bucket.upload(params, function (err, data) {
				if (err) {
					console.log('error in callback');
					console.log(err);
					resolve();
				}
				//console.log('success');
				//console.log(data);
				resolve();
			});
		});
	});
}

async function deleteFromS3(filename) {
	await new Promise((resolve, reject) => {
		let s3bucket = new AWS.S3({
			accessKeyId: IAM_USER_KEY,
			secretAccessKey: IAM_USER_SECRET,
			Bucket: BUCKET_NAME,
		});
		s3bucket.createBucket(function () {
			var params = {
				Bucket: BUCKET_NAME,
			  	Delete: {
					Objects: [
					  	{
							Key: filename
					  	},
					],
				},
			};

			s3bucket.deleteObjects(params, function(err, data) {
		  		if (err) console.log(err, err.stack); // an error occurred
		  		//else     console.log(data);           // successful response
		  		resolve();
			});
		});
	});
}