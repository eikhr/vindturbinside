const getDb = require("../ordbokDatabase").getDb;

module.exports = (req, res, next) => {
	con = getDb();

	try {
		if (!('vindturbinskOrd' in req.body)) throw 'vindturbinskOrd kreves';
		if (!('norskOrd' in req.body)) throw 'norskOrd kreves';
		if (!('ordType' in req.body)) throw 'ordType kreves';
		if (!('beskrivelse' in req.body)) throw 'beskrivelse kreves (kan være en tom string)';
	} catch (userMsg) {
		err = new Error();
		err.status = 400;
		err.userMsg = userMsg;
		return next(err);
	}



	con.beginTransaction(function(err) {
		if (err) { throw err; }

		con.query('INSERT INTO norskOrd (ord) VALUES (?)', [req.body.norskOrd], (error, resultat) => {
			if (error) {
				return con.rollback(function() {
					throw error;
				});
			}

			let norskOrdID = resultat.insertId;

			if (req.body.sterkBoying) {
				con.query('INSERT INTO sterkBoying (boying) VALUES (?)', [req.body.sterkBoying]), (error, resultat) => {
					if (error) {
						return con.rollback(function() {
							throw error;
						});
					}

					let sterkBoyingID = resultat.insertId;

					fortsettTransaction(req, res, next, norskOrdID, sterkBoyingID);
				}
			} else {
				fortsettTransaction(req, res, next, norskOrdID);
			}
		});
	});
}

function fortsettTransaction(req, res, next, norskOrdID, sterkBoyingID) {
	queryValues = [req.body.vindturbinskOrd, req.body.beskrivelse, req.body.ordTypeID]
	if (sterkBoyingID) queryValues.push(sterkBoyingID);

	queryString = 'INSERT INTO vindturbinskOrd (ord, beskrivelse, ordTypeID, sterkBoyingID) VALUES (?, ?, ?'+(sterkBoyingID ? ',?' : 'NULL')+')';

	con.query(queryString, queryValues, function (error, resultat) {
		if (error) {
			return con.rollback(function() {
				throw error;
			});
		}

		con.query('INSERT INTO oversettelse (norskOrdID, vindturbinskOrdID) VALUES (?, ?)', [norskOrdID, vindturbinskOrdID], (error) => {
			if (error) {
				return con.rollback(function() {
					throw error;
				});
			}

			con.commit(function(err) {
				if (err) {
					return con.rollback(function() {
						throw err;
					});
				}
				next();
			});
		});
	});
}