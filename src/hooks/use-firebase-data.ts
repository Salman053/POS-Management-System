import { db } from '@/firebase';
import { CustomerType, DuesType, ExpenseType, PaymentType, ProductType, SalesType } from '@/types';
import { collection, onSnapshot } from 'firebase/firestore';
import { useState, useEffect } from 'react';

export const useFirestoreData = () => {
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

            const unsubscribeUsers = onSnapshot(collection(db, 'users'), (snapshot) => {
                const usersData = snapshot.docs.map(doc => ({ id: doc.id, docId: doc.id, ...doc.data() }))
                setUsers(usersData)
            }, handleError);


            const unsubscribeProducts = onSnapshot(collection(db, 'products'), (snapshot) => {
                const productsData = snapshot.docs.map(doc => ({ id: doc.id, docId: doc.id, ...doc.data() }))
                setProducts(productsData as any)
            }, handleError);
            const unsubscribeExpenses = onSnapshot(collection(db, 'expenses'), (snapshot) => {
                const expenseData = snapshot.docs.map(doc => ({ id: doc.id, docId: doc.id, ...doc.data() }))
                setExpenses(expenseData as any)
            }, handleError);

            const unsubscribeCustomers = onSnapshot(collection(db, 'customers'), (snapshot) => {
                const customerData = snapshot.docs.map(doc => ({ id: doc.id, docId: doc.id, ...doc.data() }))
                setCustomers(customerData as any)
            }, handleError);

            const unsubscribeDues = onSnapshot(collection(db, 'dues'), (snapshot) => {
                const duesData = snapshot.docs.map(doc => ({ id: doc.id, docId: doc.id, ...doc.data() }))
                setDues(duesData as any)
            }, handleError);

            const unsubscribePayments = onSnapshot(collection(db, 'payments'), (snapshot) => {
                const paymentsData = snapshot.docs.map(doc => ({ id: doc.id, docId: doc.id, ...doc.data() }))
                setPayments(paymentsData as any)
            }, handleError);

            const unsubscribeSales = onSnapshot(collection(db, 'sales'), (snapshot) => {
                const salesData = snapshot.docs.map(doc => ({ id: doc.id, docId: doc.id, ...doc.data() }))
                setSales(salesData as any)
            }, handleError);



            setLoading(false);
            return () => {
                unsubscribeUsers();
                unsubscribeProducts()
                unsubscribeExpenses()
                unsubscribeCustomers()
                unsubscribePayments()
                unsubscribeDues()
                unsubscribeSales()

            };
        };




        fetchData();
    }, []);

    const handleError = (error: any) => {
        console.error('Error fetching data:', error);
        setError('Failed to fetch data.');
        setLoading(false);
    };

    return { users, loading, error, products, expenses, customers, dues, payments ,sales};
};