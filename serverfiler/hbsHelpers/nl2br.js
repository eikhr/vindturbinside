module.exports = (hbs) => {
	hbs.registerHelper('nl2br', function(text) {
		text = escapeHtml(text);
		var nl2br = (text + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + '<br>' + '$2');
		return new hbs.handlebars.SafeString(nl2br);
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
