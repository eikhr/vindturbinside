//JavaScript - For dynamisk innhold:
	
var innpakningEl = document.querySelector('.innpakning');
var quiz = [
	{
		sporsmaal: 'Hva er det helligste i verden?',
		alternativer: ['Bibelen','Kunnskap','Vindturbiner', 'Gud'],
		fasit: ['Galt','Galt','Riktig','Galt']
	},
	{
		sporsmaal: 'Hvor mange blader skal en vindturbin HELST ha?',
		alternativer: ['2','3','4','5'],
		fasit: ['Galt','Riktig','Galt','Galt']
	},
	{
		sporsmaal: 'Hva heter de tre vindene?',
		alternativer: ['Nordavind, Vestavind og Østavind','Innkommende vind, motstandsvinden og resultatvinden','Resultantvinden, resistansvinden og innslagsvinden','Nordavind, Sønnavind og Vestavind'],
		fasit: ['Galt','Riktig','Galt','Galt']
	},
	{
		sporsmaal: 'Hva er "Heil Windturbines" på latin?',
		alternativer: ['Ave Turbinus','Hailem Turbinus','Heilus Windturbinæ','Turbinus Vult'],
		fasit: ['Riktig','Galt','Galt','Galt']
	},
	{
		sporsmaal: 'Hva er den ondeste religionen?',
		alternativer: ['Kristendom','Vindturbinismen','Islam','Koianismen'],
		fasit: ['Galt','Galt','Galt','Riktig']
	},
	{
		sporsmaal: 'Hva er forskjellen mellom en vindturbin og en vindmølle?',
		alternativer: ['Vindturbinen er hellig, og vindmøllen er ikke hellig','Vindmøllen kverner korn, og vindturbinen genererer elektrisitet','Vindturbinen har flere blader enn vindmøllen','Vindmøllen er hedensk, og vindturbinen er hellig'],
		fasit: ['Riktig','Riktig','Galt','Galt']
	},
	{
		sporsmaal: 'Når er vindturbinismens grunnleggelsesdag?',
		alternativer: ['27. oktober','23. september','31. august', '29. november'],
		fasit: ['Galt','Galt','Galt','Riktig']
	},
	{
		sporsmaal: 'Hva slags emoji brukes av vindturbinismen?',
		alternativer: ['Flamme','Vindturbin','Vind','Radioaktivitetssymbol'],
		fasit: ['Riktig','Galt','Galt','Riktig']
	},{
		sporsmaal: 'Hvilken profet underviste i ToF1 på Elvebakken VGS i 2016/2017',
		alternativer: ['Torfinn','Muhammed','Per Ingar','Jesus'],
		fasit: ['Galt','Galt','Riktig','Galt']
	},{
		sporsmaal: 'Hva heter de Fire Store i den blasfemiske religionen koianismen?',
		alternativer: ['Akasa, Amare, Lavi og Draumarus','Alfa, Beta, Gamma og Delta','Jesus, Muhammed, Buddha og Vishnu','Bjørnstjerne Bjørnson, Alexander Kielland, Jonas Lie og Henrik Ibsen'],
		fasit: ['Riktig','Galt','Galt','Galt']
	}
];

kjorQuiz();


function kjorQuiz(){
	for (var i=0; i<quiz.length; i++){
		var sporsmaalEl = document.createElement('p');
		sporsmaalEl.innerHTML += '<h3>' + quiz[i].sporsmaal + '</h3>';
		for (var j=0; j<quiz[i].alternativer.length; j++){
			var nyCheckbox = document.createElement('input');
			nyCheckbox.type = 'checkbox';
			nyCheckbox.value = quiz[i].fasit[j];
			var nyDiv = document.createElement('label');
			nyDiv.style = 'display: block;';
			nyDiv.className = 'alt';
			var altTekst = document.createTextNode(quiz[i].alternativer[j]);
			nyDiv.appendChild(nyCheckbox);
			nyDiv.appendChild(altTekst);
			//sporsmaalEl.appendChild(nyCheckbox);
			sporsmaalEl.appendChild(nyDiv);
		}
		innpakningEl.appendChild(sporsmaalEl);
	}
	var knapp = document.createElement('button');
	knapp.innerHTML = 'Sjekk svar';
	knapp.addEventListener('click', finnPoeng);
	innpakningEl.appendChild(knapp);
}
  
function finnPoeng(evt){
	var alleCheckboxEl = document.querySelectorAll('input[type="checkbox"]');
	var antallPoeng = 0;
	for (var k=0; k<alleCheckboxEl.length; k++){
		if(alleCheckboxEl[k].checked) {
			if(alleCheckboxEl[k].value == 'Riktig'){
				antallPoeng++;
			}
			else {
				antallPoeng--;
			}
		}
		alleCheckboxEl[k].disabled = true;
	}
	evt.target.disabled = true;
	var maksPoeng = 0;
	for (var l=0; l<quiz.length; l++){
		for (var m=0; m<quiz[l]['fasit'].length; m++){
			if(quiz[l].fasit[m] == 'Riktig'){
				maksPoeng++;
			}
		}
	}
	var resultatEl = document.createElement('p');
	resultatEl.innerHTML = 'Du fikk ' + antallPoeng + ' av maksimalt ' + maksPoeng + ' poeng!';
	document.querySelector('.innediv').appendChild(resultatEl);
	window.scroll(0,document.body.scrollHeight);

	for(var n = 0; n < alleCheckboxEl.length; n++){
		if(alleCheckboxEl[n].value == 'Riktig'){
			document.querySelectorAll('.alt')[n-1].style.color = 'limegreen';
			document.querySelectorAll('.alt')[n-1].style.fontWeight = 'bold';
		}
	}
}