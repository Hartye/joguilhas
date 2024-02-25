import { collection, query, addDoc, getDocs, serverTimestamp, doc, deleteDoc } from "firebase/firestore"
import { db } from "../firebase-config.js"

export const addLetra = async (req, res) => {
    const letra = req.body.letra;
    const room = req.body.room;
    const id = req.body.id;

    const letraQuery = query(collection(db, "room-" + room));

    const wordQuery = query(collection(db, "words"));
    const wordSnapshot = await getDocs(wordQuery);

    const word = [];
    wordSnapshot.forEach(async doc => {
        word.push(doc.data());
    })

    await addDoc(
        letraQuery,
        {
            letra: letra,
            room: room,
            id: id,
            timeCreated: serverTimestamp()
        }
    )

    if (letra == word.find(s => s.id == id).word) {
        const letrasSnapshot = await getDocs(letraQuery);
        letrasSnapshot.forEach(async s => {
            await deleteDoc(doc(db, "room-" + room, s.id));
        })

        return res.json(true);
    }
    else {
        return res.json(false);
    }
}