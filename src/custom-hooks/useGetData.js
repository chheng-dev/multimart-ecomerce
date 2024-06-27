import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState, useMemo } from "react";
import { db } from "../firebase.config";

const useGetData = (collectionName) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const collectionRef = useMemo(() => collection(db, collectionName), [collectionName]);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      setError(null);
      try {
        const querySnapshot = await getDocs(collectionRef);
        const fetchedData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setData(fetchedData);
      } catch (err) {
        setError(err);
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [collectionRef]);

  return { data, loading, error };
};

export default useGetData;