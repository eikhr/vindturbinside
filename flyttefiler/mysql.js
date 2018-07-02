var tilkobling = require('../serverfiler/database/dbTilkobling.js');

const mysqlssh = require('mysql-ssh');

async function kobleTil1() {
	console.log('Starter tilkobling til databasen');
	try {
		let con = await mysqlssh.connect(
			{
				host: 'ssh.phx.nearlyfreespeech.net',
				user: 'vindturbin_turbin',
				port: 22,
				password: 'miwoofrioxoe'
			},
			{
				host: 'vindturbin.db',
				user: 'script',
				password: '##ReM%lp4B5V',
				database: 'vindturbin'
			}
		);
		console.log('Koblet til databasen!');
		return con;
	} catch (err) {
		console.log('Kunne ikke koble til databasen: ' + err);
	}
};

async function flyttBrukere() {
	const con1 = await kobleTil1();
	const con2 = await tilkobling();
	const dbquery1 = require('../serverfiler/database/query.js')(con1);
	const dbquery2 = require('../serverfiler/database/query.js')(con2);

	let brukere = await dbquery1('SELECT * FROM brukere');

	for (let bruker of brukere) {
		const bildeID = Math.ceil(Math.random()*5);
		const passord = bruker.bruker_passord.replace('$2y$', '$2a$');
		console.log(bruker.bruker_navn);
		await dbquery2('INSERT INTO bruker (BrukerID, Navn, Epost, Passord, OpprettetDato, Poeng, Admin, BildeID) VALUES (?, ?, ?, ?, ?, ?, ?, ?);', [bruker.bruker_id, bruker.bruker_navn, bruker.bruker_email, passord, bruker.bruker_dato, 0, bruker.bruker_admin, bildeID]);
	}

}

async function forumKat() {
	const con1 = await kobleTil1();
	const con2 = await tilkobling();
	const dbquery1 = require('../serverfiler/database/query.js')(con1);
	const dbquery2 = require('../serverfiler/database/query.js')(con2);

	let kategorier = await dbquery1('SELECT * FROM forum_kategorier');

	for (let kat of kategorier) {
		await dbquery2('INSERT INTO forumkategori (ForumKategoriID, Navn, Beskrivelse) VALUES (?, ?, ?);', [kat.kat_id, kat.kat_navn, kat.kat_beskrivelse]);
	}
}

async function forumEmner() {
	const con1 = await kobleTil1();
	const con2 = await tilkobling();
	const dbquery1 = require('../serverfiler/database/query.js')(con1);
	const dbquery2 = require('../serverfiler/database/query.js')(con2);

	let emner = await dbquery1('SELECT * FROM forum_emner');

	for (let emne of emner) {
		console.log(emne.emne_id);
		await dbquery2('INSERT INTO forumemne (ForumEmneID, Navn, OpprettetDato, ForumKategoriID, BrukerID) VALUES (?, ?, ?, ?, ?)', [emne.emne_id, emne.emne_emne, emne.emne_dato, emne.emne_kat, emne.emne_av])
	}
}

async function forumInnlegg() {
	const con1 = await kobleTil1();
	const con2 = await tilkobling();
	const dbquery1 = require('../serverfiler/database/query.js')(con1);
	const dbquery2 = require('../serverfiler/database/query.js')(con2);

	let innlegger = await dbquery1('SELECT * FROM forum_innlegg');

	for (let innlegg of innlegger) {
		console.log(innlegg.innlegg_id);
		await dbquery2('INSERT INTO foruminnlegg (ForumInnleggID, Innhold, OpprettetDato, EndretDato, ForumEmneID, BrukerID) VALUES (?, ?, ?, ?, ?, ?)', [innlegg.innlegg_id, innlegg.innlegg_innhold, innlegg.innlegg_dato, innlegg.innlegg_dato, innlegg.innlegg_emne, innlegg.innlegg_av])
	}
}

async function tekster() {
	const con1 = await kobleTil1();
	const con2 = await tilkobling();
	const dbquery1 = require('../serverfiler/database/query.js')(con1);
	const dbquery2 = require('../serverfiler/database/query.js')(con2);

	let tekster = await dbquery1('SELECT * FROM tekster');

	for (let tekst of tekster) {
		console.log(tekst.tekst_id);
		await dbquery2('INSERT INTO tekst (TekstID, Navn, Innhold, TekstKategoriID, BrukerID) VALUES (?, ?, ?, ?, ?)', [tekst.tekst__id, tekst.tekst_navn, tekst.tekst_innhold, tekst.tekst_kat, tekst.tekst_av])
	}
}

async function logins() {
	const con1 = await kobleTil1();
	const con2 = await tilkobling();
	const dbquery1 = require('../serverfiler/database/query.js')(con1);
	const dbquery2 = require('../serverfiler/database/query.js')(con2);

	let logins = await dbquery1('SELECT * FROM bruker_innlogginger');

	for (let login of logins) {
		console.log(login.login_id);
		await dbquery2('INSERT INTO innlogging (BrukerID, IP, Dato) VALUES (?, ?, ?)', [login.login_bruker, login.login_ip, login.login_dato]);
	}
}

logins();