import { query, collection, where, orderBy, onSnapshot } from "firebase/firestore"
import { useEffect, useState } from "react";
import { db } from "../config/firebase-config";
import { useGetUserInfo } from "./useGetUserInfo";


export const useGetTransactions = () => {
    let unsubscribe;
    const [transactions, setTransactions] = useState([]);
    const transactionCollectionRef = collection(db, "transactions");
    const { userID } = useGetUserInfo()
    const getTransactions = async () => {
        try {
            const queryTransactions = query(transactionCollectionRef, where("userID", "==", userID),
                orderBy("createdAt")
            );

            unsubscribe = onSnapshot(queryTransactions, (snapshot) => {
                let docs = [];
                snapshot.forEach((doc) => {
                    const data = doc.data()
                    const id = doc.id
                    docs.push({ ...data, id });
                })
                setTransactions(docs)
            })

        } catch (error) {
            console.error(error);
        }
        return () => unsubscribe();
    }
    useEffect(() => {
        getTransactions()
    }, [])
    return { transactions };
}