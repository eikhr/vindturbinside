const fs = require('fs');

module.exports = (hbs) => {
	require('./hbsHelpers/lagLink.js')(hbs);
	require('./hbsHelpers/nl2br.js')(hbs);
	require('./hbsHelpers/markdown.js')(hbs);
	require('./hbsHelpers/ikkemarkdown.js')(hbs);

	hbs.registerPartial('partialForumSisteKommentarer', String(fs.readFileSync('./views/hbsPartials/forumSisteKommentarer.hbs')));
};