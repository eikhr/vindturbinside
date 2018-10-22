const mysql = require('mysql');
const mysqlssh = require('mysql-ssh');


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