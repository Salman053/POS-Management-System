
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '..';

// const ALERT_QUANTITY_THRESHOLD = 10;

export const generateAlerts = async (userId: string, products: any[], customers: any[]) => {
  // Product Alerts
  for (const product of products) {
    if (product.quantity <= product.alertQuantity) {
      await addDoc(collection(db, 'notifications'), {
        userId,
        type: 'low-stock',
        message: `⚠️ ${product.productName} is running low on stock (${product.quantity} left)`,
        createdAt: serverTimestamp(),
        read: false
      });
    }
  }

  // Customer Dues
  for (const customer of customers) {
    if (customer.dueAmount && customer.dueAmount > 0) {
      await addDoc(collection(db, 'notifications'), {
        userId,
        type: 'customer-due',
        message: `🧾 ${customer.name} has an outstanding due of Rs. ${customer.dueAmount}`,
        createdAt: serverTimestamp(),
        read: false
      });
    }
  }
};