const word = ["C", "A", "R", "R", "O"];
const currentWords = [];

const addListenerToButtons = () => {
    const keys = document.querySelectorAll(".teclado button");
    const btnConfirm = document.querySelector("#confirm");

    keys.forEach(s => {
        s.addEventListener("click", () => {
            addKeyToScreen(s.id)
        });
    });

    btnConfirm.addEventListener("click", () => {
        alert("Listened")
    })
}

const addKeyToScreen = (key) => {
    if (key == "BACK") {
        currentWords.splice(-1);
        updateGame();
    }
    else {
        if (currentWords.length < word.length) {
            currentWords.push(String(key));
            updateGame();
        }
    }
}

const updateGame = () => {
    const slots = document.querySelectorAll(".jogo span");
    slots.forEach((s, index) => {
        s.innerHTML = "";
        if (index < currentWords.length) {
            s.innerHTML = currentWords[index];
        }
    });
}

addListenerToButtons();