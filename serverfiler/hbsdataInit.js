module.exports = function(req, res, next) {
	req.hbsdata = {
		headLenker: '',
		tittel: 'Vindturbinismen',
		hoveddel: 'Oops, det skjedde noe feil. Vennligst rapporter problemet til en administrator.',
		js: ''
	};

	if (req.session.feil) {
		req.hbsdata.feil = req.session.feil;
		req.session.feil = undefined;
	}

	if (req.session.bruker) {
		req.hbsdata.bruker = req.session.bruker;
	}

	next();
};