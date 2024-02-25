import { collection, query, addDoc } from "firebase/firestore"
import { db } from "../firebase-config.js"

export const addLetra = async (req, res) => {
    const testQuery = query(collection(db, "test"));

    await addDoc(
        testQuery,
        {
            test: "Olá"
        }
    )

    res.json(true);
}