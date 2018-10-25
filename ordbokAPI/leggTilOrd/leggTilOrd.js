const getDb = require("../ordbokDatabase").getDb;

module.exports = async (req, res, next) => {
	let con = getDb();

	try {
		if (!('vindturbinskOrd' in req.body)) throw 'vindturbinskOrd kreves';
		if (!('ordTypeID' in req.body)) throw 'ordType kreves';
		if (!('beskrivelse' in req.body)) throw 'beskrivelse kreves (kan være en tom string)';
	} catch (userMsg) {
		let err = new Error();
		err.status = 400;
		err.userMsg = userMsg;
		return next(err);
	}


	let oversettelser = (req.body.oversettelser || []);

	let norskOrdQuerier = [];
	for (let norskOrd of oversettelser) {
		norskOrdQuerier.push (con.asyncQuery('INSERT INTO norskOrd (ord) VALUES (?)', [norskOrd]));
	}

	let resultater = await Promise.all(norskOrdQuerier);
	let norskOrdIDer = resultater.map(resultat => resultat.insertId);


	let vindturbinskQueryValues = [req.body.vindturbinskOrd, req.body.beskrivelse, req.body.ordTypeID];


	if ('sterkBoying' in req.body) {
		resultat = await con.asyncQuery('INSERT INTO sterkBoying (boying) VALUES (?)', [req.body.sterkBoying]);
		let sterkBoyingID = resultat.insertId;

		vindturbinskQueryValues.push(sterkBoyingID);
	} 


	let vindturbinskQueryString = 'INSERT INTO vindturbinskOrd (ord, beskrivelse, ordTypeID, sterkBoyingID) VALUES (?, ?, ?, ' + (typeof(sterkBoyingID) !== "undefined" ? '?' : 'NULL') +')';
	let resultat = await con.asyncQuery(vindturbinskQueryString, vindturbinskQueryValues);
	let vindturbinskOrdID = resultat.insertId;


	let oversettelseQuerier = [];
	for (let norskOrdID of norskOrdIDer) {
		oversettelseQuerier.push(con.asyncQuery('INSERT INTO oversettelse (norskOrdID, vindturbinskOrdID) VALUES (?, ?)', [norskOrdID, vindturbinskOrdID]));
	}

	await Promise.all(oversettelseQuerier);

	res.json({ result: "success" });
}