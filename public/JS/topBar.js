var navNedtrekkPaa = false;

var brukerKnapp = document.querySelector("#userArea");
var brukerOmraade = document.querySelector(".navBruker");

var navNedtrekk = document.querySelector(".topnav");
var navKnapp = document.querySelector("#navButton");

navKnapp.addEventListener("click", function () {toggleNavMenu(); });

var brukerKnapper = document.querySelectorAll(".brukerKnapp");
for (knapp of brukerKnapper) {
    knapp.addEventListener("click", function () {toggleBruker(); });
}

function toggleBruker() {
    "use strict";
    brukerOmraade.classList.toggle("vis");
    brukerKnapp.classList.toggle("vis");
}

// Skrur av eller på nedtrekksmenyen. Hvis ikke retning er spesifisert blir den satt til det motsatte av det den er.
function toggleNavMenu(paa) {
    "use strict";

    if (paa === undefined) {
        navNedtrekkPaa = !navNedtrekkPaa;
    } else {
        navNedtrekkPaa = paa;
    }
    
    navKnapp.classList.toggle("vis");

    if (navNedtrekkPaa) {
        animerNavKnapp(true);
        navNedtrekk.classList.add("vis");
    } else {
        animerNavKnapp(false);
        navNedtrekk.classList.remove("vis");
        navNedtrekk.classList.add("skjul");

        // fjern skjul klassen etter 1 sekund for å unngå at transitionen spilles av når brukeren gjør vinduet større/mindre
        setTimeout(function(){ 
            navNedtrekk.classList.remove("skjul"); 
        }, 1000);
    }
}

function animerNavKnapp(retning) {
    if (retning) {
        TweenLite.to(".menyKnappLinje1", 0.6, {
            rotation:45, 
            y:12, 
            transformOrigin:"50% 50%"
        });
        TweenLite.to(".menyKnappLinje2", 0.6, {
            css: {opacity: 0}
        });
        TweenLite.to(".menyKnappLinje3", 0.6, {
            rotation:-45, 
            y:-12, 
            transformOrigin:"50% 50%"
        });
    } else {
        TweenLite.to(".menyKnappLinje1", 0.6, {
            rotation:0, 
            y:0, 
            transformOrigin:"50% 50%"
        });
        TweenLite.to(".menyKnappLinje2", 0.6, {
            css: {opacity: 1}
        });
        TweenLite.to(".menyKnappLinje3", 0.6, {
            rotation:0, 
            y:0, 
            transformOrigin:"50% 50%"
        });
    }
}