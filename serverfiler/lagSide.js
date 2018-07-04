const lagLenker = require('./lagTopBarLenker.js');

module.exports = (req, res, side, data, next) => {
	res.render(side, data, (err, html) => {
		if(err) {
			if (next) {
				next(err);
			} else {
				res.send('Serverfeil');
			}
		} else {
			data.hoveddel = html;
			data.topBarLenker = lagLenker(req.aktivSide);
			res.render('base', data);
		}
	});
};