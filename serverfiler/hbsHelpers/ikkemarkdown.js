const removeMd = require('remove-markdown');

module.exports = (hbs) => {
    hbs.registerHelper('ikkemarkdown', function(tekst) {
    	tekst = escapeHtml(tekst);
    	tekst = tekst.replace(/ +(?= )/g,''); // fjerner flere mellomrom på rad (gjør remove-markdown veldig tregt (4 sekunder!))
    	tekst = removeMd(tekst); // Fjerner markdown fra teksten
		tekst = tekst.replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + '<br>' + '$2'); // newline til <br>
  		return new hbs.handlebars.SafeString(tekst);
	});
}

function escapeHtml(text) {
	var map = {
		'&': '&amp;',
		'<': '&lt;',
		'>': '&gt;',
		'"': '&quot;',
		"'": '&#039;'
	};

	return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}
