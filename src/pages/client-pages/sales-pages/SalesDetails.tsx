import { format } from "date-fns"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { SalesType, ProductType } from "@/types"
import { useLocation } from "react-router-dom"
import { Package, Printer } from "lucide-react"
import { useReactToPrint } from 'react-to-print'
import { useEffect, useRef, useState } from 'react'

const SaleDetails = () => {
    const { sale }: { sale: SalesType } = useLocation().state || {}
    const [isPrinting, setIsPrinting] = useState(false)
    const printRef = useRef<HTMLDivElement>(null)

    const handleCustomPrint = () => {
        setIsPrinting(true)

        const printContent = printRef.current
        if (!printContent) {
            setIsPrinting(false)
            return
        }

        // Store original styles
        const originalStyles = {
            body: document.body.style.cssText,
            html: document.documentElement.style.cssText
        }

        // Prepare for printing
        const styleSheet = document.createElement('style')
        styleSheet.textContent = `
            @page { size: A4; margin: 20mm; }
            @media print {
                body * { visibility: hidden; }
                #print-area, #print-area * { visibility: visible; }
                #print-area { position: absolute; left: 0; top: 0; }
                .print\:hidden { display: none !important; }
            }
        `
        document.head.appendChild(styleSheet)

        // Add print-specific ID
        printContent.id = 'print-area'

        // Print
        window.print()

        // Cleanup
        document.head.removeChild(styleSheet)
        printContent.removeAttribute('id')
        document.documentElement.style.cssText = originalStyles.html
        document.body.style.cssText = originalStyles.body

        setIsPrinting(false)
    }

    return (
        <div className="container mx-auto p-4 md:p-6 max-w-7xl">
            {/* Print Button */}
            <div className="flex justify-between mb-6">
                <Button variant={'outline'} onClick={() => window.history.back()}>
                    Back
                </Button>
                <Button
                    onClick={handleCustomPrint}
                    disabled={isPrinting}
                    className="print:hidden flex items-center gap-2"
                >
                    <Printer className="h-4 w-4" />
                    {isPrinting ? 'Preparing...' : 'Print Invoice'}
                </Button>
            </div>

            <div ref={printRef} className="space-y-6">
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                    <div>
                        <h1 className="text-xl md:text-2xl font-bold">Sale Details</h1>
                        <p className="text-gray-500">
                            Invoice #: {sale.billNo}
                        </p>
                    </div>
                    <div className="text-left sm:text-right">
                        <p className="font-medium">Date: {format(new Date(sale.date), "PPP")}</p>
                        <p className="text-gray-500">Time: {format(new Date(sale.createdAt), "p")}</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    {/* Customer Information */}
                    <Card>
                        <CardHeader className="p-4 md:p-6">
                            <CardTitle className="text-lg md:text-xl">Customer Information</CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 md:p-6">
                            <dl className="space-y-2 md:space-y-4">
                                <div className="flex flex-col sm:flex-row justify-between gap-1">
                                    <dt className="text-gray-500">Name:</dt>
                                    <dd className="font-medium">{sale.customerName}</dd>
                                </div>
                                <div className="flex flex-col sm:flex-row justify-between gap-1">
                                    <dt className="text-gray-500">Phone:</dt>
                                    <dd className="font-medium">{sale.phone}</dd>
                                </div>
                                <div className="flex flex-col sm:flex-row justify-between gap-1">
                                    <dt className="text-gray-500">Address:</dt>
                                    <dd className="font-medium sm:text-right sm:max-w-[60%]">{sale.address}</dd>
                                </div>
                            </dl>
                        </CardContent>
                    </Card>

                    {/* Payment Information */}
                    <Card>
                        <CardHeader className="p-4 md:p-6">
                            <CardTitle className="text-lg md:text-xl">Payment Details</CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 md:p-6">
                            <dl className="space-y-2 md:space-y-4">
                                <div className="flex justify-between">
                                    <dt className="text-gray-500">Total Bill:</dt>
                                    <dd className="font-medium">Rs. {sale.totalBill}</dd>
                                </div>
                                <div className="flex justify-between">
                                    <dt className="text-gray-500">Paid Amount:</dt>
                                    <dd className="font-medium">Rs. {sale.paidAmount}</dd>
                                </div>
                                <div className="flex justify-between font-medium">
                                    <dt className="text-gray-900">Remaining:</dt>
                                    <dd className="text-red-600">
                                        Rs. {Number(sale.totalBill) - Number(sale.paidAmount)}
                                    </dd>
                                </div>
                            </dl>
                        </CardContent>
                    </Card>
                </div>

                {/* Products Table */}
                <Card>
                    <CardHeader className="p-4 md:p-6">
                        <CardTitle className="text-lg md:text-xl">Products</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[600px]">
                                <thead className="bg-gray-50 text-sm">
                                    <tr>
                                        <th className="p-3 md:p-4 text-left font-medium text-white">Product</th>
                                        <th className="p-3 md:p-4 text-right font-medium text-white">Unit Price</th>
                                        <th className="p-3 md:p-4 text-right font-medium text-white">Quantity</th>
                                        <th className="p-3 md:p-4 text-right font-medium text-white">Total</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y">
                                    {sale.products.map((product: ProductType) => (
                                        <tr key={product.docId} className="text-sm">
                                            <td className="p-3 md:p-4">
                                                <div>
                                                    <div className="font-medium">{product.productName}</div>
                                                    <div className="text-gray-500">{product.productCategory}</div>
                                                </div>
                                            </td>
                                            <td className="p-3 md:p-4 text-right">Rs. {product.salesPrice}</td>
                                            <td className="p-3 md:p-4 text-right">{product.quantity}</td>
                                            <td className="p-3 md:p-4 text-right font-medium">
                                                Rs. {(product.salesPrice * product.quantity).toFixed(2)}
                                            </td>
                                        </tr>
                                    ))}
                                    <tr className="bg-gray-50 font-medium">
                                        <td colSpan={3} className="p-3 md:p-4 text-right">Total Amount</td>
                                        <td className="p-3 md:p-4 text-right">Rs. {sale.totalBill}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>

                {/* Additional Information */}
                {sale.note && (
                    <Card>
                        <CardHeader className="p-4 md:p-6">
                            <CardTitle className="text-lg md:text-xl">Notes</CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 md:p-6">
                            <p className="text-gray-600">{sale.note}</p>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    )
}

export default SaleDetails