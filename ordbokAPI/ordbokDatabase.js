const assert = require('assert');
const mysql = require('mysql');

let _db;

module.exports = {
	getDb,
	initDb
};

async function initDb() {
	if (_db) {
		console.warn('Trying to init "ordbok" database again!');
		return _db;
	}

	console.log('Initializing connection to "ordbok" database');
	try {
		let db = await mysql.createConnection({
			host: "mysql",
			user: process.env.MYSQL_USER,
			password: process.env.MYSQL_PASSWORD,
			database: 'ordbok'
		});
		console.log('Successfully connected to "ordbok"');

		_db = db;
		return dbQuerifier(_db);

	} catch (err) {
		console.warn('Could not connect to "ordbok" database: ' + err);
		throw err;
	}
};

function getDb() {
	assert.ok(_db, 'Db "ordbok" has not been initialized. Please call init first.');
	return dbQuerifier(_db);
}


function dbQuerifier(db) {
	let newDb = db;
	newDb.asyncQuery = (query, data) => {
		//console.log(query + data);
		return new Promise((resolve, reject) => {
			if (data === undefined) {
				db.query(query, (err, resultat) => {
					if (err) {
						reject(err);
					} else {
						resolve(resultat);
					}
				});
			} else {
				db.query(query, data, (err, resultat) => {
					if (err) {
						reject(err);
					} else {
						resolve(resultat);
					}
				});
			}
		});
	};

	return newDb;
};
