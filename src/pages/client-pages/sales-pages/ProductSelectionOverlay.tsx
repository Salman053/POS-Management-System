import { FormEvent, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { ProductType } from "@/types"
import CustomSearchInput from "@/components/shared/CustomSearchInput"
import Overlay from "@/components/shared/Overlay"

interface ProductSelectionOverlayProps {
  isOpen: boolean
  onClose: () => void
  getProducts: (data: {
    selectedProducts: ProductType[]
    totalAmount: number
  }) => void
  products: ProductType[]
  selectedProducts: ProductType[]
  onProductAdd: (product: ProductType) => void
  onProductRemove: (productId: string) => void
  onQuantityChange: (productId: string, quantity: number) => void
  searchTerm: string
  onSearchChange: (value:string) => void
}

const ProductSelectionOverlay = ({
  isOpen,
  onClose,
  getProducts,
  products,
  selectedProducts,
  onProductAdd,
  onProductRemove,
  onQuantityChange,
  searchTerm,
  onSearchChange,
}: ProductSelectionOverlayProps) => {
  // Filter products based on search
  const filteredProducts = useMemo(() => {
    if (!searchTerm) return products
    const searchLower = searchTerm.toLowerCase()
    return products.filter(
      product =>
        product.productName.toLowerCase().includes(searchLower) ||
        product?.docId?.toLowerCase().includes(searchLower) ||
        product.salesPrice.toString().includes(searchLower)
    )
  }, [products, searchTerm])

  // Calculate total amount
  const totalAmount = useMemo(() => {
    return selectedProducts.reduce((sum, product) => {
      return sum + (product.salesPrice || 0) * (product.quantity || 0)
    }, 0)
  }, [selectedProducts])

  // Handle done button click
  const handleDone = () => {
    getProducts({
      selectedProducts,
      totalAmount
    })

    onClose()
  }

  return (
    <Overlay
      contentClassName="md:min-w-[90%]  max-h-[80vh]"
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="md:p-6">
        <div className="flex gap-2 flex-wrap items-center justify-between mb-6">
          <h3 className="md:text-2xl font-semibold">Select Products</h3>
          <div className="flex items-center gap-2">
            <CustomSearchInput
              placeholder="Search products..."
              className="w-[300px]"
              onSearchChange={(e)=>onSearchChange(e.target.value)}
              value={searchTerm}
            />
          </div>
        </div>

        <div className="overflow-x-auto text-xs md:text-sm rounded-md border">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 px-3 text-left font-medium">Name</th>
                <th className="p-2 px-3 text-left font-medium">Price</th>
                <th className="p-2 px-3 text-left font-medium">Stock</th>
                <th className="p-2 px-3 text-left font-medium">Quantity</th>
                <th className="p-2 px-3 text-left font-medium">Total</th>
                <th className="p-2 px-3 text-left font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-4 text-center text-gray-500">
                    No products found matching "{searchTerm}"
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product) => {
                  const isSelected = selectedProducts.some(p => p.docId === product.docId)
                  const selectedProduct = selectedProducts.find(p => p.docId === product.docId)
                  const quantity = selectedProduct?.quantity || 0
                  const total = (product.salesPrice || 0) * quantity

                  return (
                    <tr key={product.docId} className="hover:bg-gray-50">
                      <td className="p-2 px-3">{product.productName}</td>
                      <td className="p-2 px-3">Rs. {product.salesPrice}</td>
                      <td className="p-2 px-3">{product.quantity}</td>
                      <td className="p-2 px-3">
                        {isSelected ? (
                          <div className="flex items-center md:gap-2">
                            <Button
                              size="icon"
                              variant="outline"
                              className="h-8 md:w-8"
                              onClick={() => onQuantityChange(product.docId as string, Math.max(0, quantity - 1))}
                              disabled={quantity <= 0}
                            >
                              -
                            </Button>
                            <span className="w-12 text-center font-medium">
                              {quantity}
                            </span>
                            <Button
                              size="icon"
                              variant="outline"
                              className="h-8 md:w-8"
                              disabled={quantity >= (product.quantity || 0)}
                              onClick={() => onQuantityChange(product.docId as string, quantity + 1)}
                            >
                              +
                            </Button>
                          </div>
                        ) : (
                          <span>-</span>
                        )}
                      </td>
                      <td className="p-2 px-3 font-medium">
                        Rs. {total.toFixed(2)}
                      </td>
                      <td className="p-2 px-3">
                        {isSelected ? (
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => onProductRemove(product.docId as string)}
                          >
                            Remove
                          </Button>
                        ) : (
                          <Button
                            size="sm"
                            onClick={() => onProductAdd(product)}
                            disabled={!product.quantity}
                          >
                            Add
                          </Button>
                        )}
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex items-center flex-wrap-reverse justify-end gap-2 md:justify-between">
          <div className="text-sm text-gray-500">
            {selectedProducts.length} products selected • Total: Rs. {totalAmount.toFixed(2)}
          </div>
          <div className="flex gap-4">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              onClick={handleDone}
              disabled={selectedProducts.length === 0}
            >
              Done ({selectedProducts.length})
            </Button>
          </div>
        </div>
      </div>
    </Overlay>
  )
}

export default ProductSelectionOverlay