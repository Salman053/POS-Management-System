import { doc, setDoc, deleteDoc, serverTimestamp, collection } from "firebase/firestore";
import { ProductType } from "@/types";
import { db } from "..";

// Insert new product
export const insertProduct = async (productData: Omit<ProductType, 'id'>): Promise<string> => {
    try {
        // Create a reference to the products collection
        const productsCollection = collection(db, 'products');

        // Generate a new document reference with auto-generated ID
        const newDocRef = doc(productsCollection);
        const newProduct = {
            ...productData,
            docId: newDocRef.id,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        await setDoc(newDocRef, newProduct);
        return newDocRef.id;
    } catch (error) {
        console.error('Error adding product:', error);
        throw new Error('Failed to add product');
    }
};

// Update existing product
export const updateProduct = async (productId: string, productData: Partial<ProductType>): Promise<void> => {
    try {
        const docRef = doc(db, 'products', productId);
        const updatedProduct = {
            ...productData,
            updatedAt: new Date().toISOString()
        };

        const updatedDoc = await setDoc(docRef, updatedProduct, { merge: true });
        return updatedDoc
    } catch (error) {
        console.error('Error updating product:', error);
        throw new Error('Failed to update product');
    }
};

// Delete product
export const deleteProduct = async (productId: string): Promise<void> => {
    try {
        const docRef = doc(db, 'products', productId);
        await deleteDoc(docRef);
    } catch (error) {
        console.error('Error deleting product:', error);
        throw new Error('Failed to delete product');
    }
};