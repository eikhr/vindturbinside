module.exports = function(req, feilmld) {
	if (req.session.feil) {
		req.session.feil.push(feilmld);
	} else {
		req.session.feil = [feilmld];
	}
};