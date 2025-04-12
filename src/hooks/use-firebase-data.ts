import { useMainContext } from '@/context/MainContext';
import { db } from '@/firebase';
import { CustomerType, DuesType, ExpenseType, MainContextType, PaymentType, ProductType, SalesType } from '@/types';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { useState, useEffect } from 'react';

export const useFirestoreData = (currentUser: any) => {

    // const { currentUser } = useMainContext() as MainContextType
    const [users, setUsers] = useState<any[]>([]);
    const [products, setProducts] = useState<ProductType[]>([]);
    const [payments, setPayments] = useState<PaymentType[]>([]);
    const [expenses, setExpenses] = useState<ExpenseType[]>([]);
    const [sales, setSales] = useState<SalesType[]>([]);
    const [customers, setCustomers] = useState<CustomerType[]>([]);
    const [dues, setDues] = useState<DuesType[]>([])
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {

        const fetchData = () => {
            setLoading(true);
            setError(null);

            const uid = currentUser?.docId;

            if (!uid) return;

            const handleSnapshot = (colName: string, setState: (data: any[]) => void) => {
                const q = query(collection(db, colName), where('userId', '==', uid));
                return onSnapshot(q, (snapshot) => {
                    const data = snapshot.docs.map(doc => ({
                        id: doc.id,
                        docId: doc.id,
                        ...doc.data()
                    }));
                    setState(data);
                }, handleError);
            };

            const unsubscribeUsers = handleSnapshot('users', setUsers); // Optional: depends on access model
            const unsubscribeProducts = handleSnapshot('products', setProducts);
            const unsubscribeExpenses = handleSnapshot('expenses', setExpenses);
            const unsubscribeCustomers = handleSnapshot('customers', setCustomers);
            const unsubscribeDues = handleSnapshot('dues', setDues);
            const unsubscribePayments = handleSnapshot('payments', setPayments);
            const unsubscribeSales = handleSnapshot('sales', setSales);

            setLoading(false);

            return () => {
                unsubscribeUsers?.();
                unsubscribeProducts?.();
                unsubscribeExpenses?.();
                unsubscribeCustomers?.();
                unsubscribePayments?.();
                unsubscribeDues?.();
                unsubscribeSales?.();
            };
        };



        if (currentUser) {
            fetchData()
        }
    }, [currentUser]);

    const handleError = (error: any) => {
        console.error('Error fetching data:', error);
        setError('Failed to fetch data.');
        setLoading(false);
    };

    return { users, loading, error, products, expenses, customers, dues, payments, sales };
};