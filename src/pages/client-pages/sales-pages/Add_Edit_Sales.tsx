
import { useState, useEffect, useCallback, useMemo } from "react"
import { useFormik } from "formik"
import { ChevronLeft, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import CustomInput from "@/components/shared/CustomInput"
import CustomSelect, { OptionType } from "@/components/shared/CustomSelect"
import CustomTextArea from "@/components/shared/CustomTextArea"
import { useMainContext } from "@/context/MainContext"
import type { MainContextType, SalesType, ProductType } from "@/types"

import * as Yup from "yup"

import ProductSelectionOverlay from "./ProductSelectionOverlay"
import SelectedProductList from "./SelectedProductList"
import InfoBadge from "@/components/shared/InfoBadge"
import { insertSales } from "@/firebase/sales-logic"
import { toast } from "react-toastify"
import { formatISO } from "date-fns"

const salesValidationSchema = Yup.object().shape({
  date: Yup.string().required("Date is required"),
  customerId: Yup.string().required("Customer is required"),
  customerName: Yup.string().required("Name is required"),
  phone: Yup.string()
    .required("Phone is required")
    .matches(/^[0-9]+$/, "Phone must be a number"),
  address: Yup.string().required("Address is required"),
  paidAmount: Yup.number().required("Paid Amount is required").min(0, "Paid Amount must be at least 0"),
  note: Yup.string(),
})

const Add_Edit_Sales = () => {
  const { customers, currentUser, products } = useMainContext() as MainContextType
  const [selectedProducts, setSelectedProducts] = useState<ProductType[]>([])
  const [showProductOverlay, setShowProductOverlay] = useState(false)
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [filterProducts, setFilterProducts] = useState<ProductType[]>(products)

  const customerOptions = useMemo(
    () => [
      ...customers
        .filter((c) => c.userId === currentUser.docId)
        .map((c) => ({ label: c.customerName, value: c.docId })),
      { label: "New Customer", value: "new_customer" },
    ],
    [customers, currentUser.docId],
  )



  const formik = useFormik<SalesType>({
    initialValues: {
      date: "",
      remainingAmount: '',
      customerId: "",
      customerName: "",
      phone: "",
      userId: currentUser.docId,
      address: "",
      paidAmount: "",
      totalBill: "",
      note: "",
      products: selectedProducts,
    },
    validationSchema: salesValidationSchema,
    onSubmit: async (values) => {
      console.log(values)
      await insertSales({
        ...values, userId: currentUser.docId,
        remainingAmount: Number(formik.values.totalBill) - Number(formik.values.paidAmount),
        products: selectedProducts
      }).then(() => {
        toast.success("Sales added successfully")
        formik.resetForm()
        setSelectedProducts([])
      }).catch(()=>{
        toast.error("Operation failed")
      })




    },
  })


  // Then update the function with proper typing
  const handleCustomerSelect = (value: string) => {
    if (!value) return; // Guard clause for null events

    try {
      if (value === "new_customer") {
        // Use setValues instead of multiple setFieldValue calls
        formik.setValues({
          ...formik.values,
          customerId: "new_customer",
          customerName: "",
          phone: "",
          address: "",
        });
      } else {
        const selectedCustomer = customers.find((c) => c.docId === value);

        if (!selectedCustomer) {
          console.error("Customer not found");
          return;
        }

        // Use setValues for batch updates
        formik.setValues({
          ...formik.values,
          customerId: selectedCustomer.docId || "",
          customerName: selectedCustomer.customerName || "",
          phone: selectedCustomer.contactNo || "",
          address: selectedCustomer.address || "",
        });
      }
    } catch (error) {
      console.error("Error in handleCustomerSelect:", error);
      // Optionally show an error message to the user
    }
  };

  useEffect(() => {

    if (products && searchTerm) {
      const filteredProducts = products.filter((product) => product.productName.toLowerCase().includes(searchTerm.toLowerCase()));
      setFilterProducts(filteredProducts);
    }
    else {
      setFilterProducts(products)
    }


  }, [searchTerm, products])


  const handleProductAdd = (product: ProductType) => {
    setSelectedProducts(prev => [...prev, { ...product, quantity: 1 }]);
  };

  const handleProductRemove = (productId: string) => {
    setSelectedProducts(prev => prev.filter(p => p.docId !== productId));
  };

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    setSelectedProducts(prev => prev.map(p =>
      p.docId === productId ? { ...p, quantity: newQuantity } : p
    ));
  };

  const handleSelectionData = (data: {
    selectedProducts: ProductType[],
    totalAmount: number
  }) => {
    formik.setFieldValue('totalBill', data.totalAmount)
    // setSelectedProducts(data.selectedProducts)
  }
  return (
    <div className="  p-6">
      <div className="flex  items-center gap-4">
        <Button variant="outline" onClick={() => window.history.back()} className="flex items-center gap-2">
          <ChevronLeft className="h-4 w-4" /> Back
        </Button>
      </div>
      <h1 className="heading-3 ml-1 my-5 ">Add Sales</h1>

      <form onSubmit={formik.handleSubmit} className="flex gap-6 flex-col">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Products</CardTitle>
                <CardDescription>Select products and specify quantities</CardDescription>
              </div>
              <Button type="button" onClick={() => setShowProductOverlay(true)} className="flex items-center gap-2">
                <Plus className="h-4 w-4" /> Add Products
              </Button>
            </div>
          </CardHeader>
          <CardContent>

            <SelectedProductList products={selectedProducts} totalAmount={formik.values.totalBill as number} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Customer Information</CardTitle>
            <CardDescription>Enter customer details and payment information</CardDescription>
          </CardHeader>
          <CardContent >
            <div className="grid grid-cols-2 mb-8 gap-6">

              <CustomInput
                label="Name"
                name="customerName"
                value={formik.values.customerName}
                onChange={formik.handleChange}
                error={formik.touched.customerName && formik.errors.customerName}
              />
              <CustomSelect
                label="Customer"
                options={customerOptions as OptionType[]}
                onChange={handleCustomerSelect}
                name="customerId"
                value={formik.values.customerId}
                error={formik.touched.customerId && formik.errors.customerId}
              />
              <CustomInput
                label="Phone"
                placeholder="Phone Number"
                name="phone"
                type="tel"
                value={formik.values.phone}
                onChange={formik.handleChange}
                error={formik.touched.phone && formik.errors.phone}
              />
              <CustomInput
                label="Address"
                placeholder="Address"
                name="address"
                value={formik.values.address}
                onChange={formik.handleChange}
                error={formik.touched.address && formik.errors.address}
              />
              <CustomInput
                label="Date"
                type="date"
                name="date"
                value={formik.values.date}
                onChange={formik.handleChange}
                error={formik.touched.date && formik.errors.date}
              />
              <CustomInput
                label="Total Bill"
                disabled
                min={0}
                name="totalBill"
                type="number"
                value={formik.values.totalBill}
                onChange={() => { }}
              />

              <CustomTextArea
                label="Note"
                placeholder="Note"
                name="note"
                value={formik.values.note}
                onChange={formik.handleChange}
                error={formik.touched.note && formik.errors.note}
              />

              {/* <CustomInput
                label="Present Dues"
                disabled
                // name="totalBill"
                type="number"
                value={formik.values.}
                onChange={() => { }}
              /> */}


              <CustomInput
                label="Paid Amount"
                placeholder="Paid Amount"
                name="paidAmount"
                min={0}
                max={formik.values.totalBill}
                type="number"
                value={formik.values.paidAmount}
                onChange={formik.handleChange}
                error={formik.touched.paidAmount && formik.errors.paidAmount}
              />
              <InfoBadge variant="warning" message={`The Remaining Amount will be added in the customer dues Rs : ${Number(formik.values.totalBill) - Number(formik.values.paidAmount)}`} />
            </div>

          </CardContent>
        </Card>



        <div className="flex justify-end gap-4">
          <Button
            variant="outline"
            onClick={() => {
              formik.resetForm()
              setSelectedProducts([])
            }}
          >
            Cancel
          </Button>
          <Button disabled={!formik.isValid || formik.isSubmitting} type="submit">Complete Sale</Button>
        </div>
      </form>


      <ProductSelectionOverlay
        isOpen={showProductOverlay}
        getProducts={handleSelectionData}
        onClose={() => setShowProductOverlay(false)}
        products={filterProducts}
        selectedProducts={selectedProducts}
        onProductAdd={handleProductAdd}
        onProductRemove={handleProductRemove}
        onQuantityChange={handleQuantityChange}
        searchTerm={searchTerm}
        onSearchChange={(value) => setSearchTerm(value)}
      />
    </div>
  )
}

export default Add_Edit_Sales

