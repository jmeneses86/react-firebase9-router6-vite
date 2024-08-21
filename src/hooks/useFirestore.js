import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import {
    collection,
    deleteDoc,
    doc,
    getDocs,
    query,
    setDoc,
    updateDoc,
    where,
} from "firebase/firestore/lite";
import { nanoid } from "nanoid";

const useFirestore = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const getData = async () => {
        console.log(auth);
        try {
            setLoading((prev) => ({ ...prev, getData: true }));
            const dataRef = collection(db, "urls");
            const dataQuery = query(
                dataRef,
                where("uid", "==", auth.currentUser.uid)
            );
            const querySnapshot = await getDocs(dataQuery);
            /* querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })); */
            const dataDB = querySnapshot.docs.map((doc) => doc.data());
            setData(dataDB);
        } catch (error) {
            console.log(error);
            setError(error.message);
        } finally {
            setLoading((prev) => ({ ...prev, getData: false }));
        }
    };

    const addData = async (text) => {
        try {
            setLoading((prev) => ({ ...prev, addData: true }));
            const newDoc = {
                enabled: true,
                nanoId: nanoid(6),
                origin: text,
                uid: auth.currentUser.uid,
            };
            const docRef = doc(db, "urls", newDoc.nanoId);
            await setDoc(docRef, newDoc);
            setData([...data, newDoc]);
        } catch (error) {
            console.log(error);
            setError(error.message);
        } finally {
            setLoading((prev) => ({ ...prev, addData: false }));
        }
    };

    const deleteData = async (nanoId) => {
        try {
            setLoading((prev) => ({ ...prev, [nanoId]: true }));
            const docRef = doc(db, "urls", nanoId);
            await deleteDoc(docRef);
            setData(data.filter((item) => item.nanoId !== nanoId));
        } catch (error) {
            console.log(error);
            setError(error.message);
        } finally {
            setLoading((prev) => ({ ...prev, [nanoId]: false }));
        }
    };

    const updateData = async (nanoId, newOrigin) => {
        try {
            setLoading((prev) => ({ ...prev, updateData: true }));
            const docRef = doc(db, "urls", nanoId);
            await updateDoc(docRef, { origin: newOrigin });
            setData(
                data.map((item) =>
                    item.nanoId === nanoId
                        ? { ...item, origin: newOrigin }
                        : item
                )
            );
        } catch (error) {
            console.log(error);
            setError(error.message);
        } finally {
            setLoading((prev) => ({ ...prev, updateData: false }));
        }
    };

    return { data, error, loading, getData, addData, deleteData, updateData };
};

export default useFirestore;
