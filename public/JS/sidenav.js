var sidenav = document.querySelector(".sidenav");

function togglesidenav() {
    "use strict";
    sidenav.classList.toggle("vis");
}

document.querySelector("#sidenavKnapp").addEventListener("click", function () {togglesidenav(); });