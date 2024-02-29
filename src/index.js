import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import bodyParser from "body-parser";
import { fileURLToPath } from "url"
import path from "path";
import { addLetra } from "./controllers/addLetra.js";
import { addWord } from "./controllers/addWord.js";
import { getLetras } from "./controllers/getLetras.js";
import { getWords } from "./controllers/getWords.js";
import { getRoomWord } from "./controllers/getRoomWord.js";

const server = express();
const router = express.Router();
const baseURL = process.env.PORT || 3000;
const __fileName = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__fileName);
const app = createServer(server);
const io = new Server(app);

const FPS = 30;
let rooms = [];

// Socket
io.on('connection', (socket) => {
    console.log(("User connected: " + socket.id));

    socket.on('message', (data) => {
        console.log("Message: " + data + "\nFrom: " + socket.id);
        io.emit('message', data);
    });

    socket.on('join room', (data) => {
        rooms.push({
            ...data,
            id: socket.id
        });
        console.log(`${socket.id} joined the room`)
        console.log(rooms);
    });

    socket.on('move', (data) => {
        const index = rooms.findIndex(s => s.id === socket.id);
        rooms[index] = {
            ...data,
            id: socket.id
        }
        rooms[index].afk = 1800;
    });

    setInterval(() => {
        io.emit('move', rooms);
        rooms.forEach(s => {
            if (s.afk <= 0) {
                rooms.splice(rooms.findIndex(i => i.id == s.id), 1);
                io.emit('dead', s.id);
            }
            else {
                s.afk -= 1;
            }
        });

        rooms.filter(enemies => enemies.enemy === true).forEach(enemy => {
            rooms.filter(victims => victims.enemy === false).forEach(victim => {
                if (objectColide(enemy, victim)) {
                    rooms.splice(rooms.findIndex(i => i.id == victim.id), 1);
                    io.emit('dead', victim.id);
                }
            });
        });
    }, 1000 / FPS);
});

const objectColide = (obj1, obj2) => {
    for (let i = obj1.posX; i < obj1.posX + obj1.width; i++) {
        for (let p = obj2.posX; p < obj2.posX + obj1.width; p++) {
            if (p === i) {
                for (let j = obj1.posY; j < obj1.posY + obj1.posY; j++) {
                    for (let w = obj2.posY; w < obj2.posY + obj2.height; w++) {
                        if (w === j) {
                            return true;
                        }
                    }
                }
            }
        }
    }

    return false;
};

// Routes
router.get("/", (req, res) => {
    return res.redirect("/hub");
});

router.get("/hub", (req, res) => {
    return res.sendFile(__dirname + "/pages/hub.html");
});

router.get("/games/letras", (req, res) => {
    return res.sendFile(__dirname + "/pages/letras.html");
});

router.get("/games/chat", (req, res) => {
    return res.sendFile(__dirname + "/pages/chat.html");
});

router.get("/games/chase", (req, res) => {
    return res.sendFile(__dirname + "/pages/chase.html");
});

// Endpoints da API
router.post("/add/letra", bodyParser.json(), (req, res) => {
    return addLetra(req, res);
})

router.post("/add/word", bodyParser.json(), (req, res) => {
    return addWord(req, res);
})

router.post("/get/letras", bodyParser.json(), (req, res) => {
    return getLetras(req, res);
})

router.get("/get/words", (req, res) => {
    return getWords(req, res);
})

router.post("/get/room/word", bodyParser.json(), (req, res) => {
    return getRoomWord(req, res);
})

// Required files
router.get("/styles/hub.css", (req, res) => {
    return res.sendFile(__dirname + "/styles/hub.css");
});

router.get("/styles/letras.css", (req, res) => {
    return res.sendFile(__dirname + "/styles/letras.css");
});

router.get("/styles/chat.css", (req, res) => {
    return res.sendFile(__dirname + "/styles/chat.css");
});

router.get("/styles/chase.css", (req, res) => {
    return res.sendFile(__dirname + "/styles/chase.css");
});

router.get("/scripts/letras.js", (req, res) => {
    return res.sendFile(__dirname + "/scripts/letras.js");
});

router.get("/scripts/chase.js", (req, res) => {
    return res.sendFile(__dirname + "/scripts/chase.js");
});

router.get("/images/chat.svg", (req, res) => {
    return res.sendFile(__dirname + "/images/chat.svg");
});

router.get("/images/chase.svg", (req, res) => {
    return res.sendFile(__dirname + "/images/chase.svg");
});

router.get("/images/abc.png", (req, res) => {
    return res.sendFile(__dirname + "/images/abc.png");
});

server.use(router)

app.listen(baseURL, () => console.log("Listening to port 3000\nLink: http://localhost:3000/"));