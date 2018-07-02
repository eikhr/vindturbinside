// funksjon som henter url parametere ($_GET)
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}


var tekstnav = document.querySelector(".sidenav");
var tekstLenker = tekstnav.querySelectorAll("a");
var tekstDiv = document.querySelector(".tekstDiv");


function byttTekst(id) {
	// midlertidig loading tekst, burde byttes ut med noe som ser litt bedre ut
	//tekstDiv.children[0].innerHTML = "Loading";
	
	setAktivLenke(id); 

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            tekstDiv.innerHTML = this.responseText;
        }
    };
    xmlhttp.open("GET", "/AJAX/tekster/tekst/?id=" + id, true);
    xmlhttp.send();
}

function setAktivLenke(id) {
	for(var i = 0; i < tekstLenker.length; i++) {
		if (tekstLenker[i].getAttribute("teksterID") == id) {
			tekstLenker[i].classList.add("aktiv");
		} else {
			tekstLenker[i].classList.remove("aktiv");
		}
	}
}

window.onload = function() {
	var forsteSideID = getParameterByName("id");
	if (forsteSideID === null) {
		window.history.replaceState({teksterID: 1}, '', '');
	} else {
		window.history.replaceState({teksterID: forsteSideID}, '', '?id='+forsteSideID);
	}
	
	for(var i = 0; i < tekstLenker.length; i++) {
		tekstLenker[i].onclick = function() {
			var id = Number(this.getAttribute("teksterID"));

			byttTekst(id);
			window.history.pushState({teksterID: id}, '', '?id='+id);
		};
		tekstLenker[i].setAttribute("teksterID", tekstLenker[i].getAttribute("href").substring(4));
		tekstLenker[i].removeAttribute("href");
	}
}

window.onpopstate = function(event) {
	if (event.state != null) {
		byttTekst(event.state.teksterID);
	}
}