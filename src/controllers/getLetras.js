import { db } from "../firebase-config.js";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";

export const getLetras = async (req, res) => {
    const room = req.body.room;

    const refToLetras = collection(db, "room-" + room);
    const letrasQuery = query(
        refToLetras,
        where("room", "==", room),
        orderBy("timeCreated")
    );
    const letrasSnapshot = await getDocs(letrasQuery);

    const letras = [];
    letrasSnapshot.forEach(doc => {
        letras.push(doc.data().letra);
    });

    return res.json(letras);
}