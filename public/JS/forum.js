// Legg til kommentar knappen
var nyKommentarEl = document.querySelector('.nyKommentar');

if (nyKommentarEl) {
	nyKommentarEl.addEventListener('click', function() {
		var hoveddel = nyKommentarEl.querySelector('.hoveddel');
		hoveddel.innerHTML = '<textarea name="kommentarInnhold"></textarea><input type="submit" value="Legg til" name="nyKommentar">';
		hoveddel.querySelector('textarea').focus();
	}, { once: true });
}

// Legg til kategori knappen
var nyKategoriEl = document.querySelector('.nyKategori');

if (nyKategoriEl) {
	nyKategoriEl.addEventListener('click', function() {
		var hoveddel = nyKategoriEl.querySelector('.hoveddel');
		hoveddel.innerHTML = '<div><input type="text" name="tittel" placeholder="Kategorinavn"><textarea name="beskrivelse" placeholder="Beskrivelse"></textarea></div><input type="submit" value="Legg til" name="nyKategori">';
		hoveddel.querySelector('input').focus();
	}, { once: true });
}


// 'Vis kildetekst' knappene
var renTekstKnapper = document.querySelectorAll('button.rentekst');

for (var i = 0; i < renTekstKnapper.length; i++) {
	renTekstKnapper[i].addEventListener("click", function() {
		renTekstKlikk(this);
	});
}

function renTekstKlikk(knapp) {
	if (knapp.parentNode.parentNode.querySelector('.tekst.rentekst').getAttribute('hidden')) {
		knapp.parentNode.parentNode.querySelector('.tekst.rentekst').removeAttribute('hidden');
		knapp.parentNode.parentNode.querySelector('.tekst.markdown').setAttribute('hidden', 'hidden');
		knapp.innerHTML = 'Vis markdown';
	} else {
		knapp.parentNode.parentNode.querySelector('.tekst.rentekst').setAttribute('hidden', 'hidden');
		knapp.parentNode.parentNode.querySelector('.tekst.markdown').removeAttribute('hidden');
		knapp.innerHTML = 'Vis ren tekst';
	}
}


// Lik knapper
var likKnapper = document.querySelectorAll('button.likInnlegg');

for (var i = 0; i < likKnapper.length; i++) {
	likKnapper[i].addEventListener("click", function() {
		likerKlikk(this);
	});
}

function likerKlikk(knapp) {
	knapp.innerHTML = '<img src="/media/layout/loading.gif" height="15" width="15">';
	var data = 'innlegg=' + knapp.value;
	xhttpGET('/AJAX/forumLik?'+data, function(http) {
		var res = JSON.parse(http.responseText);
		console.log(res);
		if (res.err) {
			knapp.innerHTML = 'Feil';
		} else {
			knapp.innerHTML = (res.likt === true)? 'Slutt å like' : 'Lik';

			let likerKlikkTallEl = knapp.parentNode.parentNode.querySelector('.likerklikk').querySelector('.likerklikktekst').querySelector('.num');

			likerKlikkTallEl.innerHTML = Number(likerKlikkTallEl.innerHTML.substring(0, 1)) + ((res.likt === true)? 1 : -1);
		}
	});
}

// Rediger innlegg knapper
var redigerKnapper = document.querySelectorAll('button.redigerInnlegg');

for (var i = 0; i < redigerKnapper.length; i++) {
	redigerKnapper[i].addEventListener("click", function() {
		redigerKlikk(this);
	});
}

function redigerKlikk(knapp) {
	var hoveddel = knapp.parentNode.parentNode;

	var gammelTekst = br2nl(hoveddel.querySelector('.tekst.rentekst').innerHTML);

	var nyHoveddel = document.createElement('form');
	nyHoveddel.setAttribute('action', '');
	nyHoveddel.setAttribute('class', 'hoveddel');
	nyHoveddel.setAttribute('method', 'POST');
	nyHoveddel.innerHTML = '<textarea name="kommentarInnhold">'+gammelTekst+'</textarea><input type="hidden" name="kommentarID" value="'+knapp.value+'"><button class="avbrytredigerknapp">Avbryt</button><input type="submit" value="Endre" name="redigerKommentar">';

	var hovedParent = hoveddel.parentNode;
	hovedParent.replaceChild(nyHoveddel, hoveddel);

	nyHoveddel.querySelector('textarea').focus();

	nyHoveddel.querySelector('.avbrytredigerknapp').addEventListener('click', (evt)=>{
		evt.preventDefault();
		hovedParent.replaceChild(hoveddel, nyHoveddel);
	});
}


// hente navn på de som liker noe når man hoverer
var likerKlikkTekstEls = document.querySelectorAll('.likerklikktekst');

for (var i = 0; i < likerKlikkTekstEls.length; i++) {
	likerKlikkTekstEls[i].addEventListener("mouseover", function() {
		likerKlikkTekstHover(this);
	});
}

function likerKlikkTekstHover(tekstEl) {
	tekstEl.querySelector('.likernavn').innerHTML = 'Laster inn';

	var innleggID = tekstEl.getAttribute('data-id');

	data = 'innlegg=' + innleggID;
	xhttpGET('/AJAX/hentLikerKlikk?'+data, function(http){
		var res = JSON.parse(http.responseText);
		
		var html = (res.navn[0])? res.navn[0] : 'Ingen har likt dette';
		for (var i = 1; i < res.navn.length; i++) {
			html += '<br>' + res.navn[i];
		}

		tekstEl.querySelector('.likernavn').innerHTML = html; 
	});
}


// hjelpefunksjoner for å sende en xhttp-forespørsler
function xhttpGET(url, callback) {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
	    if (this.readyState == 4 && this.status == 200) {
	       callback(xhttp);
	    }
	};
	xhttp.open("GET", url, true);
	xhttp.send();
}

function xhttpPOST(url, data, callback) {
	var http = new XMLHttpRequest();
	http.open('POST', url, true);

	//Send the proper header information along with the request
	http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

	http.onreadystatechange = function() {//Call a function when the state changes.
	    if(http.readyState == 4 && http.status == 200) {
	        callback(http);
	    }
	}
	http.send(data);
}


function br2nl(str) {
	return str.replace(/<br\s*[\/]?>/gi, "\n");
}

function nl2br(str) {
	return str.replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '<br>')
}