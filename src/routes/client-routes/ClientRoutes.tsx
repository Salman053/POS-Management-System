import ErrorBoundary from "@/ErrorBoundary"
import Add_Edit_Customer from "@/pages/client-pages/customer-pages/Add_Edit_Customer"
import CustomerDetails from "@/pages/client-pages/customer-pages/CustomerDetails"
import Customers from "@/pages/client-pages/customer-pages/Customers"
import Add_Edit_Expanse from "@/pages/client-pages/expanses-pages/Add_Edit_Expanse"
import Expanses from "@/pages/client-pages/expanses-pages/Expanses"
import Home from "@/pages/client-pages/home-pages/Home"
import Pos from "@/pages/client-pages/ponit-of-sales/Pos"
import Add_Edit_Product from "@/pages/client-pages/product-pages/Add_Edit_Product"
import Product from "@/pages/client-pages/product-pages/Product"
import ProductDetails from "@/pages/client-pages/product-pages/ProductDetails"
import Add_Edit_Sales from "@/pages/client-pages/sales-pages/Add_Edit_Sales"
import Sales from "@/pages/client-pages/sales-pages/Sales"
import SalesDetails from "@/pages/client-pages/sales-pages/SalesDetails"
import { Navigate, Route, Routes } from "react-router-dom"

const ClientRoutes = () => {
    return (
        <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/products" element={<Product />} />
            <Route path="/products/details" element={<ProductDetails />} />
            <Route path="/products/add-product" element={<Add_Edit_Product />} />
            <Route path="/expanses" element={<Expanses />} />
            <Route path="/expanses/add-expanse" element={<Add_Edit_Expanse />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/customers/customer-details" element={<CustomerDetails />} />
            <Route path="/customers/add-customer" element={<Add_Edit_Customer />} />

            <Route path="/sales/add-sales" element={<ErrorBoundary>
                <Add_Edit_Sales />
            </ErrorBoundary>} />
            <Route path="/sales" element={<Sales />} />
            <Route path="/sales/sales-details" element={<SalesDetails />} />


            <Route path="/pos" element={<Pos />} />
            <Route path="*" element={<Navigate to='/shop/home' replace />} />


        </Routes>
    )
}

export default ClientRoutes