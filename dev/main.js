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


// SECRETS
// place on the page the secret code
function secretCreate(secretIndex) {
    // secretIndex should be a number between 1-12 (one for each month)

    const secretContainer = document.querySelector(".secret-container"),
          secretData = S.secrets[secretIndex];

    secretContainer.innerHTML = secretData.monogram + secretData.code;
}

// get the current month
function getMonth() { const d = new Date(); return d.getMonth() + 1; }

secretCreate(getMonth());

// debug / switch secret by clicking on viewport
var c = 0;
document.querySelector(".secret-container").addEventListener("click", () => {
    if (window.location.hash == "#debug") { // only with this hash
        console.log("secret n°", c+1); secretCreate(c+1); c = (c < 11) ? c + 1 : 0;
    }
});


// NOTICE
const noticeContainer = document.querySelector(".notice-container"),
      noticeBtn = document.querySelector(".notice-btn");

function noticeCreate() {
    var noticesHTML = ``;
    S.notice.forEach((n) => {
        noticesHTML += `<div>${n[1]}<span>${n[0]}</span></div>`;
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
noticeBtn.addEventListener("click", () => { toggleClass(noticeContainer, "opened") });
noticeBtn.addEventListener("click", () => { toggleClass(noticeBtn, "active") });
noticeBtn.addEventListener("click", noticeScramble);

// INFO
const infoContainer = document.querySelector(".info-container");
infoContainer.querySelector(".btn").addEventListener("click", () => { toggleClass(infoContainer, "opened") });
