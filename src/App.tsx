import { Navigate, Route, Routes, useLocation } from "react-router-dom"
import Sidebar from "./components/shared/Sidebar"
import ClientRoutes from "./routes/client-routes/ClientRoutes"
import Header from "./components/shared/Header"
import useScrollToTop from "./hooks/use-scroll-restore";
import AuthRoutes from "./routes/auth-routes/AuthRoutes";
import { useMainContext } from "./context/MainContext";
import { MainContextType } from "./types";
import { useEffect, useState } from "react";
import FloatingAlert from "./components/shared/FloatingAlert";
import { toast } from "react-toastify";
import CustomToast from "./components/shared/CustomToast";

const App = () => {
  const location = useLocation();
  const { currentUser, customers, products } = useMainContext() as MainContextType;

  const lowStockProducts = products.filter(
    (product) => product.quantity < product.alertQuantity
  );

  const customersWithDues = customers.filter(
    (customer) => customer.totalDues && customer.totalDues > 0
  );

  const addAlert = (id: string, message: string) => {
    const dismissed = JSON.parse(localStorage.getItem("dismissedAlerts") || "[]");
    if (dismissed.includes(id)) return;
  
    toast(<CustomToast id={id} message={message} />, {
      position: "top-right",
      autoClose: false, // Manual close with button
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      hideProgressBar: true,
      type: message.includes("dues") ? "error" : "warning",
    });
  };
  useEffect(() => {
    lowStockProducts.forEach((product) =>
      addAlert(`product-${product.id}`, `${product.productName} is low on stock! Only ${product.quantity} left.`)
    );
  
    customersWithDues.forEach((customer) =>
      addAlert(`customer-${customer.id}`, `${customer.customerName} has outstanding dues of ₹${customer.totalDues}.`)
    );
  }, [lowStockProducts, customersWithDues]);
  

  useScrollToTop(location.pathname, '.content-area');

  // Auth routes
  if (!currentUser) {
    return (
      <Routes>
        <Route path="/auth/*" element={<AuthRoutes />} />
        <Route path="*" element={<Navigate replace to="/auth/" />} />
      </Routes>
    );
  }

  // Protected routes
  return (
    <div className="flex h-screen overflow-y-hidden select-none bg-gray-50">

      <Sidebar />
      <div className="main flex-1">
        <Header />
        <div className="content-area max-w-[100vw] max-h-[calc(100vh-4rem)] overflow-y-auto">
          <Routes>
            <Route path="/shop/*" element={<ClientRoutes />} />
            <Route path="*" element={<Navigate replace to="/shop/home" />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
