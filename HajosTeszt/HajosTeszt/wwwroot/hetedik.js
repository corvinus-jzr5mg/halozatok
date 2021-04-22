var kérdések;
var Kérdés;
var kérdésszám = 1;

function letöltés() {
    console.log("Fetching all")
    fetch('/questions/all')
        .then(response => response.json())
        .then(data => { kérdésszám = data.length });
};

function kérdésBetöltés(id) {
    fetch(`/questions/${id}`)
        .then(response => {
            if (!response.ok) {
                console.error(`Hibás válasz: ${response.status}`)
            }
            else {
                return response.json()
            }
        })
        .then(data => feltöltés(data));
} 

function letöltésBefejeződött(d) {
    console.log("Sikeres letöltés");
    console.log(d);
    kérdések = d;
    kérdésBetöltés(1);
};

window.onload = (event) => {
    letöltés();
    kérdésBetöltés(1)
};

id = 1;

function feltöltés(kérdés) {
    Kérdés = kérdés;
    document.getElementById("kérdés_szöveg").innerHTML = kérdés.questionText;
    document.getElementById("válasz1").innerHTML = kérdés.answer1;
    document.getElementById("válasz2").innerHTML = kérdés.answer2;
    document.getElementById("válasz3").innerHTML = kérdés.answer3;
    document.getElementById("kép1").src = "https://szoft1.comeback.hu/hajo/" + kérdés.image;
    if (kérdés.image == "") {
        document.getElementById("kép1").style.display = "none";
    }
    else {
        document.getElementById("kép1").style.display = "block";
    }
};



function előre() {
    visszaszinez()
    id++;
    if (id <= kérdésszám - 1) {
        kérdésBetöltés(id);
    }
    else {
        id = 1;
        kérdésBetöltés(id);
    }
};

function vissza() {
    visszaszinez()
    id--;
    if (id >= 1) {
        kérdésBetöltés(id);
    }
    else {
        id = kérdésszám-1;
        kérdésBetöltés(id);
    }
};

function szinezés(valaszID) {
    if (Kérdés.correctAnswer == parseInt(valaszID.slice(-1))) {
        document.getElementById(valaszID).style.background = "green";
    }
    else {
        document.getElementById(valaszID).style.background = "red";
    }
};

function visszaszinez() {
    document.getElementById("válasz1").style.background = "white";
    document.getElementById("válasz2").style.background = "white";
    document.getElementById("válasz3").style.background = "white";
}