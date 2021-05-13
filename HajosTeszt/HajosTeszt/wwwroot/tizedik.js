var kérdések;
var Kérdés;
var kérdésszám = 1;

var hotList = [];           //Az éppen gyakoroltatott kérdések listája 
var questionsInHotList = 3; //Ez majd 7 lesz, teszteléshez jobb a 3. 
var displayedQuestion;      //A hotList-ből éppen ez a kérdés van kint
var numberOfQuestions;      //Kérdések száma a teljes adatbázisban
var nextQuestion = 1;       //A következő kérdés száma a teljes listában

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
            timeoutHandler = setTimeout(előre, 3000);
        })
        .then(
            //kérdésMegjelenítés;
            q => {
                hotList[destination].question = q;
                hotList[destination].goodAnswers = 0;
                console.log(`A ${questionNumber}. kérdés letöltve a hot list ${destination}. helyére`)
                if (displayedQuestion == undefined && destination == 0) { //!!!!!!!!!!!!!
                    displayedQuestion = 0;
                    kérdésMegjelenítés();
                }
            }
        );
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
    kérdés = hotList[displayedQuestion].question;
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

function init() {
    for (var i = 0; i < questionsInHotList; i++) {
        let q = {
            question: {},
            goodAnswers: 0
        }
        hotList[i] = q;
    }

    //Első kérdések letöltése
    for (var i = 0; i < questionsInHotList; i++) {
        kérdésBetöltés(nextQuestion, i);
        nextQuestion++;
    }

    if (!localStorage.getItem("hotList"));
}

function előre() {
    clearTimeout(timeoutHandler);
    visszaszinez();
    id++;
    if (displayedQuestion == questionsInHotList) displayedQuestion = 0;
    feltöltés();
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