import { collection, doc, setDoc, deleteDoc, serverTimestamp, increment, updateDoc, writeBatch, query, where, getDocs } from 'firebase/firestore';
import { db } from '..';
import { CustomerType, PaymentType } from '@/types';

export const insertCustomer = async (customerData: Omit<CustomerType, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> => {
  console.log(customerData)
  try {
    const customersCollection = collection(db, 'customers');
    const docRef = doc(customersCollection);

    const customer = {
      ...customerData,
      id: docRef.id,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      totalDues: 0,
      totalPayments: 0
    };

    await setDoc(docRef, customer);
    return docRef.id;
  } catch (error) {
    console.error('Error creating customer:', error);
    throw new Error('Failed to create customer');
  }
};

export const updateCustomer = async (customerId: string, customerData: Partial<CustomerType>): Promise<void> => {
  try {
    const docRef = doc(db, 'customers', customerId);

    const updatedCustomer = {
      ...customerData,
      updatedAt: serverTimestamp()
    };

    await setDoc(docRef, updatedCustomer, { merge: true });
  } catch (error) {
    console.error('Error updating customer:', error);
    throw new Error('Failed to update customer');
  }
};

export const deleteCustomer = async (customerId: string): Promise<void> => {
  try {
    const batch = writeBatch(db);

    // Delete customer
    const customerRef = doc(db, 'customers', customerId);
    batch.delete(customerRef);

    // Delete all payments
    const paymentsQuery = query(
      collection(db, 'payments'),
      where('customerId', '==', customerId)
    );
    const paymentsSnapshot = await getDocs(paymentsQuery);
    paymentsSnapshot.forEach((doc) => {
      batch.delete(doc.ref);
    });

    // Delete all dues
    const duesQuery = query(
      collection(db, 'dues'),
      where('customerId', '==', customerId)
    );
    const duesSnapshot = await getDocs(duesQuery);
    duesSnapshot.forEach((doc) => {
      batch.delete(doc.ref);
    });

    // Execute batch
    await batch.commit();
  } catch (error) {
    console.error('Error deleting customer and related data:', error);
    throw new Error('Failed to delete customer and related data');
  }
};


// payments 


export const createPayment = async (paymentData: Omit<PaymentType, 'id'>): Promise<string> => {
  try {
    const paymentsCollection = collection(db, 'payments');
    const docRef = doc(paymentsCollection);

    const payment = {
      ...paymentData,
      docId: docRef.id,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };

    await setDoc(docRef, payment);

    // Update customer's total payments
    const customerRef = doc(db, 'customers', paymentData.customerId);

    await setDoc(customerRef, {
      totalPayments: increment(paymentData.amount),
      totalDues: increment(-paymentData.amount)
    }, { merge: true });

    return docRef.id;
  } catch (error) {
    console.error('Error creating payment:', error);
    throw new Error('Failed to create payment');
  }
};

export const updatePayment = async (
  paymentId: string,
  oldAmount: number,
  paymentData: Partial<PaymentType>
): Promise<void> => {
  try {
    const docRef = doc(db, 'payments', paymentId);

    const updatedPayment = {
      ...paymentData,
      updatedAt: serverTimestamp()
    };

    await setDoc(docRef, updatedPayment, { merge: true });

    // Update customer's total payments
    if (paymentData.amount && paymentData.customerId) {
      const diff = paymentData.amount - oldAmount;
      const customerRef = doc(db, 'customers', paymentData.customerId);
      await setDoc(customerRef, {
        totalPayments: increment(diff)
      }, { merge: true });
    }
  } catch (error) {
    console.error('Error updating payment:', error);
    throw new Error('Failed to update payment');
  }
};

export const deletePayment = async (
  paymentId: string,
  customerId: string,
  amount: number
): Promise<void> => {
  try {
    const docRef = doc(db, 'payments', paymentId);
    await deleteDoc(docRef);

    // Update customer's total payments
    const customerRef = doc(db, 'customers', customerId);
    await setDoc(customerRef, {
      totalPayments: increment(-amount),
      totalDues: increment(amount)
    }, { merge: true });
  } catch (error) {
    console.error('Error deleting payment:', error);
    throw new Error('Failed to delete payment');
  }
};



///dues


export const createDues = async (duesData: Omit<PaymentType, 'id'>): Promise<string> => {
  try {
    console.log(duesData)
    // Create dues document
    const duesCollection = collection(db, 'dues');
    const docRef = doc(duesCollection);

    const dues = {
      ...duesData,
      id: docRef.id,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };

    await setDoc(docRef, dues);

    // Increase customer's total dues
    const customerRef = doc(db, 'customers', duesData.customerId);
    await updateDoc(customerRef, {
      totalDues: increment(duesData.amount)
    });

    return docRef.id;
  } catch (error) {
    console.error('Error creating dues:', error);
    throw new Error('Failed to create dues');
  }
};

export const updateDues = async (
  duesId: string,
  oldAmount: number,
  duesData: Partial<PaymentType>
): Promise<void> => {
  try {
    // Update dues document
    const docRef = doc(db, 'dues', duesId);
    const updatedDues = {
      ...duesData,
      updatedAt: serverTimestamp()
    };

    await setDoc(docRef, updatedDues, { merge: true });

    // Update customer's total dues with difference
    if (duesData.amount && duesData.customerId) {
      const diff = duesData.amount - oldAmount;
      const customerRef = doc(db, 'customers', duesData.customerId);
      await updateDoc(customerRef, {
        totalDues: increment(diff)
      });
    }
  } catch (error) {
    console.error('Error updating dues:', error);
    throw new Error('Failed to update dues');
  }
};

export const deleteDues = async (
  duesId: string,
  customerId: string,
  amount: number
): Promise<void> => {
  try {
    // Delete dues document
    const docRef = doc(db, 'dues', duesId);
    await deleteDoc(docRef);

    // Decrease customer's total dues
    const customerRef = doc(db, 'customers', customerId);
    await updateDoc(customerRef, {
      totalDues: increment(-amount)
    });
  } catch (error) {
    console.error('Error deleting dues:', error);
    throw new Error('Failed to delete dues');
  }
};