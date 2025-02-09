import { collection, doc, setDoc, deleteDoc, serverTimestamp } from "firebase/firestore";
import { ExpenseType } from "@/types";
import { db } from "..";

export const insertExpense = async (expenseData: Omit<ExpenseType, 'id'>): Promise<string> => {
  try {
    const expensesCollection = collection(db, 'expenses');
    const docRef = doc(expensesCollection);
    
    const expense = {
      ...expenseData,
      id: docRef.id,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    await setDoc(docRef, expense);
    return docRef.id;
  } catch (error) {
    console.error('Error creating expense:', error);
    throw new Error('Failed to create expense');
  }
};

export const updateExpense = async (expenseId: string, expenseData: Partial<ExpenseType>): Promise<void> => {
  try {
    const docRef = doc(db, 'expenses', expenseId);
    
    const updatedExpense = {
      ...expenseData,
      updatedAt: serverTimestamp(),
    };

    await setDoc(docRef, updatedExpense, { merge: true });
  } catch (error) {
    console.error('Error updating expense:', error);
    throw new Error('Failed to update expense');
  }
};

export const deleteExpense = async (expenseId: string): Promise<void> => {
  try {
    const docRef = doc(db, 'expenses', expenseId);
    await deleteDoc(docRef);
  } catch (error) {
    console.error('Error deleting expense:', error);
    throw new Error('Failed to delete expense');
  }
};