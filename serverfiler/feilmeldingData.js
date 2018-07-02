/*
Feilkoder: 
'404' - siden finnes ikke
'ingenDB' - databasen er udefinert
'DBFeil' - generisk feil hvis f.eks. spørringer ikke funker
*/


module.exports = (type) => {
	var data = {};
	switch(type) {
		case 'Ikke funnet':
			data.tittel = '404 - Vindturbinismen';
			data.overskrift = '404 - Siden ble ikke funnet';
			data.forklaring = 'Siden du prøvde å gå til ble ikke funnet på serveren. Vennligst sjekk at nettadressen er riktig eller kontakt en administrator hvis du mener at det er noe galt med nettsiden.';
			break;
		case 'ingenDB':
			data.tittel = 'Databasefeil - Vindturbinismen';
			data.overskrift = 'Databasefeil';
			data.forklaring = 'Det er noe feil med databasen, og siden kan derfor ikke vises. Kontakt en administrator som kan fikse problemet. Mens du venter kan du sjekke ut noen av de andre delene av siden ettersom ikke alt er avhengig av databasen.';
			break;
		case 'DBFeil':
			data.tittel = 'Databasefeil - Vindturbinismen';
			data.overskrift = 'Databasefeil';
			data.forklaring = 'Det er noe feil med databasen, og siden kan derfor ikke vises. Kontakt en administrator som kan fikse problemet.';
			break;
		default:
			data.tittel = 'Serverfeil - Vindturbinismen';
			data.overskrift = 'Serverfeil';
			data.forklaring = 'Det skjedde noe feil, og siden kunne ikke vises';
			break;
	}
	data.hoveddel += '<p><a href='/'>Tilbake til hovedsiden</a></p></div>';
	return data;
};