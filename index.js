/*eslint linebreak-style: ["error", "unix"]*/

// inkluder moduler fra node/npm
const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');
const session = require('express-session');
require('dotenv').config()


// konfigurer handlebars
const hbs = require('hbs');
require('./serverfiler/hbsInit.js')(hbs);

// starter databasetilkoblingen
var db = require('./serverfiler/database.js')();
// og ordbokdatabasen
var initOrdbokDb = require("./ordbokAPI/ordbokDatabase").initDb;

// inkluder egne moduler
const sjekkLogin = require('./serverfiler/sjekkLogin')(db);
const hbsdataInit = require('./serverfiler/hbsdataInit.js');
const sjekkCookieVarsel = require('./serverfiler/sjekkCookieVarsel.js');
const feilmeldingData = require('./serverfiler/feilmeldingData.js');
const lagSide = require('./serverfiler/lagSide');


// inkluderer sider/ruter
const ajax  = require('./ruter/ajax.js')(db);
const forside = require('./ruter/forside.js');
const tekster = require('./ruter/tekster.js')(db);
const spill = require('./ruter/spill.js');
const videoer = require('./ruter/videoer.js');
const bruker = require('./ruter/bruker.js')(db);
const registrerBruker = require('./ruter/registrerBruker.js')(db);
const resetPassord = require('./ruter/resetPassord.js')(db);
const byttBrukerbilde = require('./ruter/byttBrukerbilde')(db);
const forum = require('./ruter/forum.js')(db);
const ordbokAPI = require('./ordbokAPI/ordbokAPI.js');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// definerer funksjoner som blir brukt når noen spør etter en side
app.use(favicon(path.join(__dirname, 'public', 'media', 'favicon.ico')));
//app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(session({
	secret: 'ned med koianismen',
	resave: false,
	saveUninitialized: false,
	cookie: { secure: false }
}));


// sender filer fra public som statiske filer
app.use(express.static(path.join(__dirname, 'public'), { maxAge: 86400000 }));


// sjekker om brukeren logger inn eller ut
app.use('*', sjekkLogin);

// lager standard hbs data til basen av siden (navbar, bruker, osv.)
app.use(hbsdataInit);
app.use(sjekkCookieVarsel);


// definerer rutene til de ulike sidene
app.use('/AJAX', ajax);
app.use('/ordbokAPI', ordbokAPI);

app.use('/', forside);
app.use('/tekster', tekster);
app.use('/spill', spill);
app.use('/videoer', videoer);
app.use('/forum', forum);
app.use('/bruker', bruker);

app.use('/registrer', registrerBruker);
app.use('/tilbakestill_passord', resetPassord);
app.use('/bytt_brukerbilde', byttBrukerbilde);

// lager 404 feil og sender til feilbehandleren
app.use(function(req, res, next) {
	let err = new Error('Ikke funnet');
	err.status = 404;
	next(err);
});

// feilbehandler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	console.error(err);
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// lag feilmeldingsiden
	res.status(err.status || 500);
	req.hbsdata.hoveddel = feilmeldingData(err.message);
	lagSide(req, res, 'feil', req.hbsdata);
});

waitForDatabasesAndStart();

async function waitForDatabasesAndStart() {
	await Promise.all([db, initOrdbokDb()]);

	app.listen(process.env.PORT || 8080);
}
	
/*
	// lager serveren. Funksjonen blir kjørt hver gang noen laster inn en side.
	const server = http.createServer(async (req, res) => {

		//console.log('Requested: ' + req.url);

		var cookies = cookie.parse(req.headers.cookie || '');

		var postData;

		if (req.method === 'POST') {
			let body = '';
			req.on('data', chunk => {
				body += chunk.toString(); // convert Buffer to string
			});
			postData = new Promise((resolve, reject) => {
				req.on('end', () => {
					body = POSTParse(body);
					resolve(body);
				});
				setTimeout(()=>{
					resolve(undefined);
				}, 1000);
			});
		}

		// finner URLen som blir spurt om
		var reqURL = url.parse(req.url.toLowerCase());

		var urlArray = decodeURI(reqURL.pathname).split('/');

		switch(urlArray[1]) {
			// hvis det blir spurt om en fil fra css, js eller mediamappen sender vi den
			case 'css':
			case 'js':
			case 'media': {
				let reqPath = path.parse(reqURL.pathname);

				sendFil(reqPath, res);
				break;
			}
			// ellers sjekker vi om vi skal hente bare hoveddelen
			case 'ajax': {
				res.writeHead(200, {
					'Content-Type': 'application/json'
				});

				// fjerner '/ajax' fra starten av url
				reqURL = url.parse(req.url.substring(5).toLowerCase());

				// sender bare hoveddelen
				try {
					let data = await hentSidedata(reqURL, db);

					res.end(JSON.stringify(data));
				} catch (err) {
					res.writeHead(500, {});
					res.end();

					console.error(err);
				}
				break;
			}
			// ellers tolker vi det som en vanlig side og prøver å lage den
			default: {
				// venter på POSTdata
				postData = await postData;
				try {
					await prosesserPOST(postData, db);
				} catch (err) {
					console.log(err);
				}

				// henter data om siden (hoveddelen, tittel osv.)
				let sidedata = await hentSidedata(reqURL, db);

				res.writeHead(sidedata.httpstatus, {
					'Content-Type': 'text/html'
				});

				// legger til data som ikke kommer fra siden
				sidedata.cookieVarsel = !cookies.informasjonskapsler;
				sidedata.topBarLenker = lagTopBarLenker(urlArray[1]);

				// sjekker at vi har med alt vi trenger
				try {
					if (sidedata.cookieVarsel === undefined) throw 'Mangler sidedata.cookieVarsel';
					if (sidedata.tittel === undefined) throw 'Mangler sidedata.tittel';
					if (sidedata.hoveddel === undefined) throw 'Mangler sidedata.hoveddel';
				}
				catch (err) {
					console.error('VIKTIG FEIL: ' + err);
				}

				// kompilerer filen og sender den
				try {
					let kompilert = await hbsKompiler(path.join(__dirname, 'serverfiler/base.hbs'), sidedata);
					res.end(kompilert);

				} // hvis ikke kompilering av basen virker sender vi en veldig enkel feilmelding
				catch(err) {
					res.end('<!DOCTYPE html><html lang="no"><head><meta charset="utf-8"></head><body>En feil oppstod på serveren, vennligst prøv på nytt senere.</body></html>');
					console.error(err.message);
				}

				break;
			}
		}
	});
	server.listen(port, hostname, () => {
		console.log(`Server running at http://${hostname}:${port}/`);
	});

	server.on('uncaughtException', function (err) {
		console.error(err.stack);
		console.log('Node NOT Exiting...');
	});
}
//*/
