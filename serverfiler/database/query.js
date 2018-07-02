module.exports = (con) => {
	return (query, data) => {
		//console.log(query + data);
		return new Promise((resolve, reject) => {
			if (data === undefined) {
				con.query(query, (err, resultat) => {
					if (err) {
						throw err;
					} else {
						resolve(resultat);
					}
				});
			} else {
				con.query(query, data, (err, resultat) => {
					if (err) {
						throw err;
					} else {
						resolve(resultat);
					}
				});
			}
		});
	};
};