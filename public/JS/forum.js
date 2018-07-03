var nyKommentarEl = document.querySelector('.nyKommentar');

if (nyKommentarEl) {
	nyKommentarEl.addEventListener('click', function() {
		var hoveddel = nyKommentarEl.querySelector('.hoveddel');
		hoveddel.innerHTML = '<textarea name="kommentarInnhold"></textarea><input type="submit" value="Legg til" name="nyKommentar">';
		hoveddel.querySelector('textarea').focus();
	}, { once: true });
}


var nyKategoriEl = document.querySelector('.nyKategori');

if (nyKategoriEl) {
	nyKategoriEl.addEventListener('click', function() {
		var hoveddel = nyKategoriEl.querySelector('.hoveddel');
		hoveddel.innerHTML = '<div><input type="text" name="tittel" placeholder="Kategorinavn"><textarea name="beskrivelse" placeholder="Beskrivelse"></textarea></div><input type="submit" value="Legg til" name="nyKategori">';
		hoveddel.querySelector('input').focus();
	}, { once: true });
}

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