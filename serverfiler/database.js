var tilkobling = require('./database/dbTilkobling.js');

module.exports = async () => {
	var con = await tilkobling();
	
	if (con) {
		return {
			con: con,
			tekster: require('./database/tekster.js')(con),
			bruker: require('./database/bruker.js')(con),
			forum: require('./database/forum.js')(con),
			bilde: require('./database/bilde.js')(con)
		};
	}
	return undefined;
};
