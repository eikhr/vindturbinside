const mysql = require('mysql');
const mysqlssh = require('mysql-ssh');

const config = require('../config.js');


/*
module.exports = async () => {
	let con = mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: '',
		database: 'turbin'
	});

	await new Promise((resolve, reject) => {
		con.connect((err) => {
			if (err) {
				console.log('Kunne ikke koble til databasen: ' + err);
				resolve();
			} else {
				console.log('Koblet til databasen!');
				resolve();
			}
		});
	});

	return con;
};
/*/
if(config.dev) {
	module.exports = async function() {
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
					database: 'turbin'
				}
			);
			console.log('Koblet til databasen!');
			return con;
		} catch (err) {
			console.log('Kunne ikke koble til databasen: ' + err);
		}
	};
} else {
	module.exports = async function() {
		let con = mysql.createConnection({
			host: 'vindturbin.db',
			user: 'script',
			password: '##ReM%lp4B5V',
			database: 'turbin'
		});

		con.connect(function(err) {
			if (err) {
				console.log('Kunne ikke koble til databasen: ' + err);
			} else {
				console.log('Koblet til databasen!');
				return con;
			}
		});
	};
}
//*/