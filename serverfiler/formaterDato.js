var dateFormat = require('dateformat');

dateFormat.i18n = {
	dayNames: [
		'Søn', 'Man', 'Tir', 'Ons', 'Tor', 'Fre', 'Lør',
		'Søndag', 'Mandag', 'Tirsdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lørdag'
	],
	monthNames: [
		'Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Des',
		'Januar', 'Februar', 'Mars', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Desember'
	],
	timeNames: [
		'a', 'p', 'am', 'pm', 'A', 'P', 'AM', 'PM'
	]
};

dateFormat.masks.vanlig = 'dd.mm.yyyy HH:MM';
dateFormat.masks.ukedag = '"På" dddd "kl." HH:MM';
dateFormat.masks.bareKlokke = 'HH:MM';
dateFormat.masks.full = 'dddd, d. mmmm yyyy "kl." HH:MM:ss';

module.exports = (dato, format) => {
	dato = new Date(Date.parse(dato) + 7200000);
	let naa = new Date();

	let alder = Date.now() - dato.getTime(); // i millisekunder -_-

	let string;
	switch(format) {
		case 'vanlig': {
			if (alder < 60000) { // mindre enn et minutt
				string = 'For under et minutt siden';
			} else if (alder < 120000) { // mindre enn to minutter
				string = 'For ett minutt siden';
			} else if (alder < 3.6e6) { // mindre enn en time
				string = 'For '+Math.floor(alder/60000)+' minutter siden';
			} else if (Math.floor(dato.getTime()/8.64e7) === Math.floor(naa.getTime()/8.64e7)) { // samme dag som nå
				string = 'I dag kl. ' + dateFormat(dato, 'bareKlokke');
			} else if (Math.floor(dato.getTime()/8.64e7) === (Math.floor(naa.getTime()/8.64e7)-1)) { // dagen før nå
				string = 'I går kl. ' + dateFormat(dato, 'bareKlokke');
			} else if (alder < 6.048e8) {
				string = dateFormat(dato, 'ukedag');
			} else {
				string = dateFormat(dato, 'vanlig');
			}
			break;
		}
		case 'alder': {
			if (alder < 60000) { // mindre enn et minutt
				string = 'Under et minutt';
			} else if (alder < 120000) { // mindre enn to minutter
				string = 'Ett minutt';
			} else {
				string = '';
				if (alder > 3.1556952e10) { // over et år
					string += '<span class="tall">' + Math.floor(alder / 3.1556952e10) + '</span> år <br>';
				}
				if (alder > 8.64e7) { // over en dag '
					string += '<span class="tall">' + Math.floor((alder % 3.1556952e10)/8.64e7) + '</span> dager <br>';
				}
				if (alder > 3.6e6) {
					string += '<span class="tall">' + Math.floor((alder % 8.64e7)/3.6e+6) + '</span> timer <br>';
				}
				string += '<span class="tall">' + Math.floor((alder % 3.6e6)/60000) +'</span> minutter';
			}
			break;
		}
		case 'tall': {
			string = dateFormat(dato, 'vanlig');
			break;
		}
		default: {
			string = 'Feil i datoformateringen';
			break;
		}
	}

	return [string, dateFormat(dato, 'full')];
};