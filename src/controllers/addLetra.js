import { collection, query, addDoc, getDocs, serverTimestamp, where, deleteDoc } from "firebase/firestore"
import { db } from "../firebase-config.js"

export const addLetra = async (req, res) => {
    const letra = req.body.letra;
    const room = req.body.room;
    const id = req.body.id;

    const letraQuery = query(collection(db, "room-" + room));

    const wordQuery = query(
        collection(db, "words"),
        where("id", "==", id)
    );
    const wordSnapshot = await getDocs(wordQuery);

    const word = "";
    wordSnapshot.forEach(async doc => {
        word = doc.data().word;
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

    if (letra == word) {
        const letrasSnapshot = await getDocs(letraQuery);
        letrasSnapshot.forEach(async doc => {
            await deleteDoc(doc(db, "room-" + room, doc.id));
        })

        return res.json(true);
    }
    else {
        return res.json(false);
    }
}