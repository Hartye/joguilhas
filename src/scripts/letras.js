const room = 1;
let currentWords = [];
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
        addLetra(currentWords.join(''));
        currentWords = [];
        updateGame();
    })
}

const addKeyToScreen = (key) => {
    if (key == "BACK") {
        currentWords.splice(-1);
        updateGame();
    }
    else {
        if (currentWords.length < 5) {
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
    let url = new Request(apiBaseUrl + "/get/room/word");

    fetch(url, {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify({
            room: room
        })
    })
        .then((id) => id.json())
        .then((id) => {
            url = new Request(apiBaseUrl + "/add/letra");

            fetch(url, {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify({
                    letra: letra,
                    room: room,
                    id: id
                })
            })
                .then((data) => data.json())
                .then((data) => {
                    if (data) {
                        alert("Correto");
                        location.pathname = "/hub";
                    }
                })
                .catch((err) => { console.log(err) })
        })
        .catch((err) => { console.log(err) })
}

const updateFromFirebase = () => {
    const url = new Request(apiBaseUrl + "/get/letras");

    fetch(url, {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify({
            letra: letra,
            token: "token"
        })
    })
        .then((data) => data.json())
        .then((data) => {

        })
        .catch((err) => { console.log(err) })
}

addListenerToButtons();