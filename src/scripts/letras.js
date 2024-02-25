const word = ["C", "A", "R", "R", "O"];
const currentWords = [];
const apiBaseUrl = "https://joguilhas.vercel.app";

const addListenerToButtons = () => {
    const keys = document.querySelectorAll(".teclado button");
    const btnConfirm = document.querySelector("#confirm");

    keys.forEach(s => {
        s.addEventListener("click", () => {
            addKeyToScreen(s.id)
        });
    });

    btnConfirm.addEventListener("click", () => {
        addLetra("A")
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

const addLetra = (letra) => {
    const url = new Request(apiBaseUrl + "/add/letras");

    fetch(url, {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify({
            letra: letra,
            user: "token"
        })
    })
        .then((data) => data.json())
        .then((data) => {
            alert(data);
        })
        .catch((err) => { console.log(err) })
}

addListenerToButtons();