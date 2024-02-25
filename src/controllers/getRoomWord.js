import { collection, getDocs, addDoc, query, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase-config.js"

export const getRoomWord = async (req, res) => {
    const room = req.body.room;
    const letrasQuery = query(collection(db, "room-" + room));
    const letrasSnapshot = await getDocs(letrasQuery);

    const letras = [];
    letrasSnapshot.forEach(doc => {
        letras.push(doc.data());
    });

    if (letras.length == 0) {
        const wordsQuery = query(collection(db, "words"));
        const wordsSnapshot = await getDocs(wordsQuery);

        const words = [];

        wordsSnapshot.forEach(doc => {
            words.push(doc.data());
        })

        const newWordId = words[Math.floor(Math.random() * words.length)].id;

        await addDoc(
            letrasQuery,
            {
                letra: "-1",
                room: room,
                id: newWordId,
                timeCreated: serverTimestamp()
            }
        )

        return res.json(newWordId);
    }
    else {
        return res.json(letras[0].id);
    }
}