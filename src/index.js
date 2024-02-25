import express from "express";
import { fileURLToPath } from "url"
import path from "path";
import { addLetra } from "./controllers/addLetra.js";
import { addWord } from "./controllers/addWord.js";

const server = express();
const baseURL = process.env.PORT || 3000;
const __fileName = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__fileName);

server.get("/", (req, res) => {
    return res.redirect("/hub");
});

server.get("/hub", (req, res) => {
    return res.sendFile(__dirname + "/pages/hub.html");
});

server.get("/games/letras", (req, res) => {
    return res.sendFile(__dirname + "/pages/letras.html");
});

server.post("/add/letra", (req, res) => {
    return addLetra(req, res);
})

server.post("/add/word", (req, res) => {
    return addWord(req, res);
})

// Required files
server.get("/styles/hub.css", (req, res) => {
    return res.sendFile(__dirname + "/styles/hub.css");
});

server.get("/styles/letras.css", (req, res) => {
    return res.sendFile(__dirname + "/styles/letras.css");
});

server.get("/scripts/letras.js", (req, res) => {
    return res.sendFile(__dirname + "/scripts/letras.js");
});

server.get("/images/exemplo2.png", (req, res) => {
    return res.sendFile(__dirname + "/images/exemplo2.png");
});

server.get("/images/abc.png", (req, res) => {
    return res.sendFile(__dirname + "/images/abc.png");
});

server.listen(baseURL, () => console.log("Listening to port 3000\nLink: http://localhost:3000/"));