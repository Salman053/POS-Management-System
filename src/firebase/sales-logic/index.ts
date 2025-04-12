import { collection, doc, deleteDoc, updateDoc, addDoc, writeBatch, increment, getDoc } from 'firebase/firestore';
import { ProductType, SalesType } from '@/types';
import { db } from '..';

export const insertSales = async (salesData: SalesType) => {
  try {
    // 1. Check product availability
    const availabilityCheck = await checkProductAvailability(salesData.products);
    if (!availabilityCheck.available) {
      throw new Error(`Insufficient stock for product: ${availabilityCheck.productName}`);
    }

    // 2. Prepare sales document
    const dataWithTimestamp = {
      ...salesData,
      createdAt: new Date().toISOString(),
      totalAmount: salesData.products.reduce(
        (total, product) => total + product.quantity * product.salesPrice,
        0
      ),
    };

    // 3. Add sales document to Firestore
    const docRef = await addDoc(collection(db, "sales"), dataWithTimestamp);

    // 4. Update customer's balance & dues if it's not a new customer
    if (salesData.customerId !== "new_customer") {
      const customerRef = doc(db, "customers", salesData.customerId);
      const customerSnap = await getDoc(customerRef);

      if (customerSnap.exists()) {
        const customerData = customerSnap.data();
        const prevDues = Number(customerData.totalDues) || 0;
        const newDues = Number(salesData.remainingAmount) || 0;

        const updatedDues = prevDues + newDues;

        await updateDoc(customerRef, {
          balance: Number(salesData.remainingAmount),
          totalDues: updatedDues,
        });
      }
    }

    // 5. Update product stock
    await updateProductQuantities(salesData.products);

    return docRef.id;
  } catch (error) {
    console.error("Error adding sales:", error);
    throw error;
  }
};

// Add this new helper function
const checkProductAvailability = async (products: ProductType[]): Promise<{ available: boolean; productName?: string }> => {
    try {
        for (const product of products) {
            const productRef = doc(db, 'products', product.docId as string);
            const productDoc = await getDoc(productRef);
            
            if (!productDoc.exists()) {
                return { available: false, productName: product.productName };
            }

            const currentStock = productDoc.data().quantity;
            if (currentStock < product.quantity) {
                return { available: false, productName: product.productName };
            }
        }

        return { available: true };
    } catch (error) {
        console.error('Error checking product availability:', error);
        throw error;
    }
};

// Update the updateProductQuantities function
const updateProductQuantities = async (products: ProductType[]) => {
    try {
        const batch = writeBatch(db);

        console.log(products)
        products.forEach(product => {
            const productRef = doc(db, 'products', product.docId as string);
            batch.update(productRef, {
                quantity: increment(-product.quantity)
            });
        });

        await batch.commit();
    } catch (error) {
        console.error('Error updating product quantities:', error);
        throw error;
    }
};

export const updateSales = async (salesId: string, salesData: SalesType) => {
    try {
        // Add update timestamp
        const dataWithTimestamp = {
            ...salesData,
            updatedAt: new Date().toISOString(),
            totalAmount: salesData.products.reduce((total, product) => 
                total + (product.quantity * product.salesPrice), 0)
        };

        // Update the sales document
        const salesRef = doc(db, 'sales', salesId);
        await updateDoc(salesRef, dataWithTimestamp);

        // Update customer's dues and payments
        await updateCustomerBalance(
            salesData.customerId,
            Number(salesData.remainingAmount),
            Number(salesData.paidAmount)
        );

        // Update product quantities
        await updateProductQuantities(salesData.products);

        return salesId;
    } catch (error) {
        console.error('Error updating sales:', error);
        throw error;
    }
};

const updateCustomerBalance = async (
    customerId: string, 
    dues: number, 
    paidAmount: number
) => {
    try {
        const customerRef = doc(db, 'customers', customerId);
        await updateDoc(customerRef, {
            totalDues: dues,
            totalPayments: paidAmount
        });
    } catch (error) {
        console.error('Error updating customer balance:', error);
        throw error;
    }
};
export const deleteSales = async (salesId: string): Promise<void> => {
    try {
      // Get the sale data first
      const saleRef = doc(db, 'sales', salesId);
      const saleDoc = await getDoc(saleRef);
      
      if (!saleDoc.exists()) {
        throw new Error('Sale not found');
      }
  
      const saleData = saleDoc.data() as SalesType;
  
      // Start a batch write for atomic operations
      const batch = writeBatch(db);
  
      // 1. Reverse product quantities
      saleData.products.forEach(product => {
        const productRef = doc(db, 'products', product.docId as string);
        batch.update(productRef, {
          quantity: increment(product.quantity) // Add back the quantity
        });
      });
  
      // 2. Reverse customer balance if it's not a new customer
      if (saleData.customerId !== 'new_customer') {
        const customerRef = doc(db, 'customers', saleData.customerId);
        batch.update(customerRef, {
          totalDues: increment(-Number(saleData.remainingAmount)), // Subtract the dues
          totalPayments: increment(-Number(saleData.paidAmount)) // Subtract the payments
        });
      }
  
      // 3. Delete the sale
      batch.delete(saleRef);
  
      // Commit all changes atomically
      await batch.commit();
  
    } catch (error) {
      console.error('Error deleting sales:', error);
      throw new Error('Failed to delete sales');
    }
  };
  




  