import { collection, query, addDoc, serverTimestamp } from "firebase/firestore"
import { db } from "../firebase-config.js"

export const addLetra = async (req, res) => {
    const letra = req.body.letra;
    const token = req.body.token;
    const testQuery = query(collection(db, "test"));

    await addDoc(
        testQuery,
        {
            letra: letra,
            token: token,
            timeCreated: serverTimestamp()
        }
    )

    return res.json(true);
}