const fs = require("fs");

// lager en link til filen med filtiden som en get-parameter slik at den blir cachet riktig

module.exports = (hbs) => {
    hbs.registerHelper('lagLink', function(fil) {
  		return (fil);
	});
}