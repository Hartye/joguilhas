import { collection, query, addDoc, serverTimestamp } from "firebase/firestore"
import { db } from "../firebase-config.js"

export const addLetra = async (req, res) => {
    const letra = req.body.letra;
    const room = req.body.room;
    const testQuery = query(collection(db, "room-" + room));

    await addDoc(
        testQuery,
        {
            letra: letra,
            room: room,
            timeCreated: serverTimestamp()
        }
    )

    return res.json(true);
}