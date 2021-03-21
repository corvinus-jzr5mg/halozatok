var faktor = (n) => {
    if (n === 0 || n === 1) {
        return 1;
    } else {
        return n * faktor(n - 1)
    }
}


console.log("betöltődött")

for (var sor = 0; sor < 10; sor++) {
    var ujSor = document.createElement("div")
    ujSor.classList.add("sor")
    document.getElementById("pascal").appendChild(ujSor);

    for (var oszlop = 0; oszlop <= sor; oszlop++) {
        var ujElem = document.createElement("div");
        ujElem.classList.add("elem");
        ujElem.classList.add("doboz");
        ujElem.innerText = faktor(sor) / (faktor(oszlop) * faktor(sor - oszlop));
        ujSor.appendChild(ujElem);
    }
}