module.exports = function(req, res, next) {
	req.hbsdata.cookieVarsel = !req.cookies.informasjonskapsler;
	next();
};