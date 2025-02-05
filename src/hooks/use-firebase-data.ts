import { db } from '@/firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import { useState, useEffect } from 'react';

export const useFirestoreData = () => {
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = () => {
            setLoading(true);
            setError(null);

            const unsubscribeUsers = onSnapshot(collection(db, 'user'), (snapshot) => {
                const usersData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
                setUsers(usersData)
            }, handleError);



            setLoading(false);
            return () => {
                unsubscribeUsers();

            };
        };




        fetchData();
    }, []);

    const handleError = (error: any) => {
        console.error('Error fetching data:', error);
        setError('Failed to fetch data.');
        setLoading(false);
    };

    return { users, loading, error };
};