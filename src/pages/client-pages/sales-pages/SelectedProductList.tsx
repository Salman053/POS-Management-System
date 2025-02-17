import { ProductType } from "@/types"
import { useState, useRef, useEffect } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SelectedProductListProps {
  products: ProductType[]
  totalAmount: number
}

const SelectedProductList = ({ products, totalAmount }: SelectedProductListProps) => {
  const [expand, setExpand] = useState(true)
  const contentRef = useRef<HTMLDivElement>(null)
  
  const formattedTotal = typeof totalAmount === 'string'
    ? parseFloat(totalAmount)
    : totalAmount

  return (
    <div className="border overflow-hidden rounded-md">
      {/* Header with toggle button */}
      <div className="flex items-center  justify-between py-2 px-3 bg-gray-50">
        <div className="font-medium">
          Selected Products ({products.length})
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setExpand(!expand)}
          className="p-1 h-8 w-8"
        >
          {expand ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Animated content */}
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden`}
        style={{
          maxHeight: expand ? contentRef.current?.scrollHeight + 'px' : '0',
          opacity: expand ? 1 : 0
        }}
      >
        <div ref={contentRef}>
          <table className="w-full">
            <thead className="bg-gray-50 text-sm">
              <tr>
                <th className="p-3 text-left font-medium">Product</th>
                <th className="p-3 text-left font-medium">Unit Price</th>
                <th className="p-3 text-left font-medium">Quantity</th>
                <th className="p-3 text-right font-medium">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {products.map((product) => (
                <tr key={product.docId} className="text-sm">
                  <td className="p-3">
                    <div>
                      <div className="font-medium text-gray-900">
                        {product.productName}
                      </div>
                      <div className="text-gray-500">
                        {product.productCategory}
                      </div>
                    </div>
                  </td>
                  <td className="p-3 text-left">Rs. {product.salesPrice}</td>
                  <td className="p-3 text-left">{product.quantity}</td>
                  <td className="p-3 text-right">
                    Rs. {(product.salesPrice * (product.quantity || 0))?.toFixed(2)}
                  </td>
                </tr>
              ))}
              <tr className="bg-gray-50 font-medium">
                <td colSpan={3} className="p-3 text-left">Total Amount</td>
                <td className="p-3 text-right">
                  Rs. {Number.isNaN(formattedTotal) ? '0.00' : formattedTotal.toFixed(2)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default SelectedProductList