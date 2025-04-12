import { useMainContext } from "@/context/MainContext"
import { MainContextType, ProductType, CustomerType } from "@/types"

const Alerts = () => {
    const { products, customers } = useMainContext() as MainContextType

    // Filter products with low stock
    const lowStockProducts = products.filter(
        (product: ProductType) => product.quantity < product.alertQuantity
    )

    // Filter customers with dues
    const customersWithDues = customers.filter(
        (customer: CustomerType) => customer.totalDues && customer.totalDues > 0
    )

    return (
        <div className="p-4 space-y-4">
            <h2 className="text-xl font-semibold">Alerts</h2>

            {lowStockProducts.length > 0 ? (
                <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 rounded">
                    <h3 className="font-bold text-yellow-700">Low Stock Alerts</h3>
                    <ul className="list-disc list-inside">
                        {lowStockProducts.map(product => (
                            <li key={product.id}>
                                <span className="font-medium">{product.productName}</span> is low on stock. Current: {product.quantity}, Threshold: {product.alertQuantity}
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p className="text-green-600">All products are sufficiently stocked.</p>
            )}

            {customersWithDues.length > 0 ? (
                <div className="bg-red-100 border-l-4 border-red-500 p-4 rounded">
                    <h3 className="font-bold text-red-700">Customer Dues</h3>
                    <ul className="list-disc list-inside">
                        {customersWithDues.map(customer => (
                            <li key={customer.id}>
                                <span className="font-medium">{customer.customerName}</span> Contact Number: {customer.contactNo} has dues of Rs.  {customer.totalDues.toLocaleString()}
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p className="text-green-600">No pending customer dues.</p>
            )}
        </div>
    )
}

export default Alerts
