import express from "express";
import bodyParser from "body-parser";
import { fileURLToPath } from "url"
import path from "path";
import { addLetra } from "./controllers/addLetra.js";
import { addWord } from "./controllers/addWord.js";
import { getLetras } from "./controllers/getLetras.js";

const server = express();
const router = express.Router();
const baseURL = process.env.PORT || 3000;
const __fileName = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__fileName);

router.get("/", (req, res) => {
    return res.redirect("/hub");
});

router.get("/hub", (req, res) => {
    return res.sendFile(__dirname + "/pages/hub.html");
});

router.get("/games/letras", (req, res) => {
    return res.sendFile(__dirname + "/pages/letras.html");
});

router.post("/add/letra", bodyParser.json(), (req, res) => {
    return addLetra(req, res);
})

router.post("/add/word", bodyParser.json(), (req, res) => {
    return addWord(req, res);
})

router.post("/get/letras", bodyParser.json(), (req, res) => {
    return getLetras(req, res);
})

// Required files
router.get("/styles/hub.css", (req, res) => {
    return res.sendFile(__dirname + "/styles/hub.css");
});

router.get("/styles/letras.css", (req, res) => {
    return res.sendFile(__dirname + "/styles/letras.css");
});

router.get("/scripts/letras.js", (req, res) => {
    return res.sendFile(__dirname + "/scripts/letras.js");
});

router.get("/images/exemplo2.png", (req, res) => {
    return res.sendFile(__dirname + "/images/exemplo2.png");
});

router.get("/images/abc.png", (req, res) => {
    return res.sendFile(__dirname + "/images/abc.png");
});

server.use(router)

server.listen(baseURL, () => console.log("Listening to port 3000\nLink: http://localhost:3000/"));