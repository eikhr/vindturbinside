//JavaScript - For dynamisk innhold:
var images = [];
  
function preload(imgSrces) {
	for (var i = 0; i < imgSrces.length; i++) {
		images[i] = new Image();
		images[i].src = imgSrces[i];
	}
}


document.getElementById("idAlt1").onclick = alt1;
document.getElementById("idAlt2").onclick = alt2;
  
var spm = 1;
var bildeHoyde = 350;
var bildeBredde = 262;
var bilde = document.getElementById("idBilde");
var forsteForsok = true;
var antallRiktige = 0;
var antallSpm = 1;
  
function alt1() {
	console.log("1");
	if (spm === 1) {
		bildeHoyde += bildeHoyde * 0.05;
		bildeBredde += bildeBredde * 0.05;
		document.getElementById("idSvar").innerHTML = "Feil!";
		forsteForsok = false;
	}
	else if (spm === 2) {
		bildeHoyde = 393;
		bildeBredde = 262;
		document.getElementById("idSvar").innerHTML = "Riktig!";
		bilde.src = "/media/innhold/quiz/vindpumpe.jpg";
		document.getElementById("idAlt2").innerHTML = "Vindpumpe";
		spm = 3;
		if (forsteForsok) {
			antallRiktige++;
		}
		forsteForsok = true;
		antallSpm = 2;
	}
	else if (spm === 3) {
		bildeHoyde += bildeHoyde * 0.05;
		bildeBredde += bildeBredde * 0.05;
		document.getElementById("idSvar").innerHTML = "Feil!";
		forsteForsok = false;
		antallSpm = 3;
	}
	else if (spm === 4) {
		bildeHoyde += bildeHoyde * 0.05;
		bildeBredde += bildeBredde * 0.05;
		document.getElementById("idSvar").innerHTML = "Feil!";
		forsteForsok = false;
		antallSpm = 4;
	}
	bilde.height = bildeHoyde;
	bilde.width = bildeBredde;
	document.getElementById("idSvar").innerHTML = document.getElementById("idSvar").innerHTML + " Antall riktige: " + antallRiktige + "/" + antallSpm + "<br>Prosent: " + Math.round(antallRiktige/antallSpm*100) + "%";
}
  
function alt2() {
	if (spm === 1) {
		bildeHoyde = 319;
		bildeBredde = 262;
		document.getElementById("idSvar").innerHTML = "Riktig!";
		bilde.src = "/media/innhold/quiz/vindmølle.jpg";
		spm = 2;
		if (forsteForsok) {
			antallRiktige++;
		}
		forsteForsok = true;
	}
	else if (spm === 2) {
		bildeHoyde += bildeHoyde * 0.05;
		bildeBredde += bildeBredde * 0.05;
		document.getElementById("idSvar").innerHTML = "Feil!";
		forsteForsok = false;
		antallSpm = 2;
	}
	else if (spm === 3) {
		bildeHoyde = 286;
		bildeBredde = 262;
		document.getElementById("idSvar").innerHTML = "Riktig!";
		bilde.src = "/media/innhold/quiz/vindmaskin.jpg";
		document.getElementById("idAlt2").innerHTML = "Vindmaskin";
		spm = 4;
		if (forsteForsok) {
			antallRiktige++
		}
		forsteForsok = true;
		antallSpm = 3;
	}
	else if (spm === 4) {
		bildeHoyde = 286;
		bildeBredde = 262;
		document.getElementById("idSvar").innerHTML = "Riktig!";
		bilde.src = "/media/innhold/quiz/vindmaskin.jpg";
		spm = 4;
		document.getElementById("idAlt2").disabled = true;
		document.getElementById("idAlt1").disabled = true;
		if (forsteForsok) {
			antallRiktige++;
		}
		forsteForsok = true;
		antallSpm = 4;
	}
	bilde.height = bildeHoyde;
	bilde.width = bildeBredde;
	document.getElementById("idSvar").innerHTML = document.getElementById("idSvar").innerHTML + " Antall riktige: " + antallRiktige + "/" + antallSpm + "<br>Prosent: " + Math.round(antallRiktige/antallSpm*100) + "%";
	if(document.getElementById("idSvar").innerHTML == "Riktig! Antall riktige: " + 4 +"/" + 4 + "<br>Prosent: " + 100 + "%"){
		setTimeout(function(){alert("Gratulerer, du klarte det! \nDu vil nå bli sendt til registreringssiden \nVelkommen til vindturbinismen! Heil Windturbines!");},1);
		
		window.location.href = "?quiz=fullført";
	}
}  
  
preload(["/media/innhold/quiz/vindpumpe.jpg",
	"/media/innhold/quiz/vindmølle.jpg",
	"/media/innhold/quiz/vindmaskin.jpg"]);

/*function post(path, params, method) {
	method = method || "post"; // Set method to post by default if not specified.

	// The rest of this code assumes you are not using a library.
	// It can be made less wordy if you use one.
	var form = document.createElement("form");
	form.setAttribute("method", method);
	form.setAttribute("action", path);

	for(var key in params) {
		if(params.hasOwnProperty(key)) {
			var hiddenField = document.createElement("input");
			hiddenField.setAttribute("type", "hidden");
			hiddenField.setAttribute("name", key);
			hiddenField.setAttribute("value", params[key]);

			form.appendChild(hiddenField);
		}
	}

	document.body.appendChild(form);
	form.submit();
}*/