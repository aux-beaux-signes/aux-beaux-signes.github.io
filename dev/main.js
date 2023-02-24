import "scrambling-letters";

import "./index.html"
import "./main.scss"
import * as S from "./assets/secrets.js";
import scrambler from "scrambling-letters";


// FUNCTIONS
function toggleClass(el, c, state) {
    if (state === true) { el.classList.add(c); } else if (state === false) { el.classList.remove(c);
    } else { el.classList.toggle(c); }
}


// CALENDAR
const calendarContainer = document.querySelector(".calendar"),
      calendarMonths = Object.values(calendarContainer.children).reverse();

function selectMonth() {
    // reset months
    calendarMonths.forEach((m) =>  { m.classList.remove("active"); })

    // focus corresponding months to secret
    for (let i = 0; i < parseInt(document.documentElement.getAttribute("secret")); i++) {
        calendarMonths[i].classList.add("active")
    }
}

// clickable months (for later)
function calendarActivateClicks() {
    for (let i = 0; i < calendarMonths.length; i++) {
        calendarMonths[i].addEventListener("click", (cursorEv) => {
            if (window.location.hash == "#debug") { // only with this hash
                secretCreate(i + 1);
            }
        });
    }
}
calendarActivateClicks();


// SECRETS
// place on the page the secret code
function secretCreate(secretIndex) {
    // secretIndex should be a number between 1-12 (one for each month)

    const secretContainer = document.querySelector(".secret-container"),
          secretData = S.secrets[secretIndex];

    secretContainer.innerHTML = secretData.monogram + secretData.code;
    document.documentElement.setAttribute("secret", secretIndex);
    selectMonth();
}

// get the current month
function getMonth() { const d = new Date(); return d.getMonth() + 1; }

secretCreate(getMonth());

// debug / switch secret by clicking on it
document.querySelector(".secret-container").addEventListener("click", () => {
    if (window.location.hash == "#debug") { // only with this hash
        var c = parseInt(document.documentElement.getAttribute("secret"));
        if (c < 12) { c += 1; }

        else { document.documentElement.setAttribute("secret", 1); c = 1; }
        console.log("secret n°", c); secretCreate(c);
    }
});


// NOTICE
const noticeContainer = document.querySelector(".notice-container"),
      noticeBtn = document.querySelector(".notice-btn");

function noticeCreate() {
    var noticesHTML = ``, delayAdd = 0;
    S.notice.forEach((n) => {
        noticesHTML += `<div style="--delay-add: ${delayAdd}">${n[1]}<span>${n[0]}</span></div>`;
        delayAdd += 0.05;
    })

    noticeContainer.innerHTML = noticesHTML;
}
noticeCreate();

function noticeScramble() {
    setTimeout(() => {
        if (noticeContainer.classList.contains("opened")) {
            scrambler({
                target: '.notice-container span',
                random: [150, 900],
                speed: 35,
            });
        }
    }, 30);
}
noticeBtn.addEventListener("click", () => {
    toggleClass(noticeContainer, "opened");
    toggleClass(noticeBtn, "active");
    noticeScramble();
});

// INFO
const infoContainer = document.querySelector(".info-container");
infoContainer.querySelector(".btn").addEventListener("click", () => { toggleClass(infoContainer, "opened") });
