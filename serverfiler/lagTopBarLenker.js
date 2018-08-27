module.exports = function (aktiv) {
	let lenker = [
		{
			url: '/tekster/',
			navn: 'Tekster'
		},{
			url: '/spill/',
			navn: 'Spill'
		},{
			url: '/forum/',
			navn: 'Forum'
		},{
			url: '/videoer/',
			navn: 'Videoer'
		}/*,{
			url: '/lær/',
			navn: 'Lær'
		}*/
	];
	switch (aktiv) {
		case 'tekster':
			lenker[0].aktiv = true;
			break;
		case 'spill':
			lenker[1].aktiv = true;
			break;
		case 'forum':
			lenker[2].aktiv = true;
			break;
		case 'videoer':
			lenker[3].aktiv = true;
			break;/*
		case 'lær':
			lenker[4].aktiv = true;
			break;*/
	}

	return lenker;
};