// Iegūstam elementu, kas attēlo ievadi (tā vērtību)
const inputValue = document.getElementById("user-input");

// Iegūstam elementu, kurā tiks attēlota vēsture
const historyContainer = document.querySelector('.historyContainer');

// Nosaukums, kādā tiks saglabāta vēsture vietējā krātuvē (localStorage)
const STORAGE_NAME = 'history_v4';

// Ja vēsture vietējā krātuvē ir tukša, inicializējam to ar tukšu masīvu
if (localStorage.getItem(STORAGE_NAME) == null) {
    localStorage.setItem(STORAGE_NAME, JSON.stringify([]));
}

// Funkcija, kas atjauno vēstures skatu
function refreshHistory() {
    // Iegūstam saglabāto vēsturi no localStorage
    const history = JSON.parse(localStorage.getItem(STORAGE_NAME));

    // Iztīrām esošo vēstures skatu
    historyContainer.innerHTML = '';

    // Iterējam cauri visiem vēstures ierakstiem
    history.forEach(item => {
        const historyItem = document.createElement('div');
        historyItem.classList.add('history-item');
        // Pievienojam vēstures ierakstu
        historyItem.innerHTML = `<span>${item.expression} = </span><span>${item.result}</span>`;
        historyContainer.appendChild(historyItem);
    });
}

// Piešķiram klikšķa notikumu visiem ciparu taustiņiem
document.querySelectorAll(".numbers").forEach(function (item) {
    item.addEventListener("click", function (e) {
        // Ja ekrānā ir NaN vai 0, tad iztīram ievadi
        if (inputValue.innerText === "NaN" || inputValue.innerText === "0") {
            inputValue.innerText = "";
        }
        // Pievienojam uzklikšķināto ciparu ievadei
        inputValue.innerText += e.target.innerHTML.trim();
    });
});

// Piešķiram klikšķa notikumu visiem darbības (operatoru) taustiņiem
document.querySelectorAll(".operations").forEach(function (item) {
    item.addEventListener("click", function (e) {
        const operation = e.target.innerHTML; // Iegūstam uzklikšķināto operatoru
        
        // Ja operatora taustiņš ir "=", veicam aprēķinu
        if (operation === "=") {
            try {
                const expression = inputValue.innerText; // Iegūstam matemātisko izteiksmi
                // Izpildām izteiksmi un iegūstam rezultātu
                const result = new Function('return ' + expression)();
                inputValue.innerText = result; // Attēlojam rezultātu ekrānā

                // Saglabājam izteiksmi un rezultātu vēsturē
                const history = JSON.parse(localStorage.getItem(STORAGE_NAME));
                history.push({ expression, result });
                localStorage.setItem(STORAGE_NAME, JSON.stringify(history));

                // Atjaunojam vēstures skatu
                refreshHistory();
            } catch (error) {
                inputValue.innerText = "NaN"; // Ja ir kļūda, rādām NaN
            }
        } 
        // Ja uzklikšķinām "AC" (All Clear), notīrām ievadi
        else if (operation === "AC") {
            inputValue.innerText = "0";
        } 
        // Ja uzklikšķinām "DEL" (Delete), dzēšam pēdējo simbolu
        else if (operation === "DEL") {
            inputValue.innerText = inputValue.innerText.slice(0, -1) || "0";
        } 
        // Ja uzklikšķinām operatoru, pievienojam to izteiksmei
        else {
            inputValue.innerText += operation;
        }
    });
});

// Inicializējam vēsturi, kad lapa tiek ielādēta
refreshHistory();