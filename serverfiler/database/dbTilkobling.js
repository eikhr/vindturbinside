const mysql = require('mysql');


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
		let con = await mysql.createConnection({
			host: "mysql",
			user: process.env.MYSQL_USER,
			password: process.env.MYSQL_PASSWORD,
			database: 'turbin'
		});
		console.log('Koblet til databasen!');
		return con;
	} catch (err) {
		console.log('Kunne ikke koble til databasen: ' + err);
	}
};
