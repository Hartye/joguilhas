import { collection, query, addDoc, serverTimestamp } from "firebase/firestore"
import { db } from "../firebase-config.js"

export const addWord = async (req, res) => {
    try {
        const word = req.body.word;
        const wordQuery = query(collection(db, "words"));

        await addDoc(
            wordQuery,
            {
                word: word,
                timeCreated: serverTimestamp()
            }
        )

        return res.json(true);
    }
    catch {
        return res.json(false);
    }
}