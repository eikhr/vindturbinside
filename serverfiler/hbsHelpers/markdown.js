var md = require('markdown-it')({
	html: false,
	linkify: true,
	typographer: true,
	breaks: true
});


module.exports = (hbs) => {
    hbs.registerHelper('markdown', function(tekst) {
  		return new hbs.handlebars.SafeString(md.render(tekst));
	});
}