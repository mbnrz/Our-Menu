import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import db from "../FireBase/config";


export const RealTimeUpdate = (c) => {
  const [collectionn, setCollection] = useState([]);
  useEffect(() => {
    let ref = collection(db, c);
    const unsub = onSnapshot(ref, (snapshot) => {
      let result = [];
      snapshot.docs.forEach((doc) => {
        result.push({ id: doc.id, ...doc.data() });
      });
      setCollection(result);
    });
    return () => unsub();
  }, [c]);
  return { collectionn };
};
