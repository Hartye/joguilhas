import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../firebase-config.js"

export const getWords = async (req, res) => {
    const wordsQuery = query(collection(db, "words"))
    const wordsSnapshot = await getDocs(wordsQuery);

    const words = [];
    wordsSnapshot.forEach(doc => {
        words.push({
            word: doc.data().word,
            id: doc.data().id
        });
    });

    return res.json(words);
}