import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { toast } from 'react-toastify'
import { Loader, ArrowLeft } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import CustomInput from '@/components/shared/CustomInput'
import CustomCheckboxInput from '@/components/shared/CustomCheckboxInput'
import { cleanPrice } from '@/lib/helpers'
import { insertProduct, updateProduct } from '@/firebase/product-logic'
import { MainContextType, ProductType } from '@/types'
import { useMainContext } from '@/context/MainContext'
import CustomSelect from '@/components/shared/CustomSelect'

interface LocationState {
    product?: ProductType
    imageSrc?: string
}

const initialFormValues = {
    barcode: "",
    productName: "",
    productCategory: "",
    purchasePrice: 0,
    salesPrice: 0,
    quantity: 0,
    alertQuantity: 0,
    productImage: "",
    featured: false,
    supplier: "",
}

const productSchema = Yup.object().shape({
    barcode: Yup.string().required("Product Barcode is required"),
    productName: Yup.string().required("Product Name is required"),
    productCategory: Yup.string().required("Product Category is required"),
    purchasePrice: Yup.number()
        .typeError("Purchase Price must be a number")
        .min(1, "Purchase Price must be greater than 0")
        .required("Purchase Price is required"),
    salesPrice: Yup.number()
        .typeError("Sales Price must be a number")
        .min(1, "Sales Price must be greater than 0")
        .required("Sales Price is required"),
    quantity: Yup.number()
        .typeError("Quantity must be a number")
        .min(1, "Quantity must be greater than 0")
        .required("Quantity is required"),
    alertQuantity: Yup.number()
        .typeError("Alert Quantity must be a number")
        .min(1, "Alert Quantity must be greater than 0")
        .required("Alert Quantity is required"),
    supplier: Yup.string().min(3, "Supplier name must be at least 3 characters"),
    featured: Yup.boolean(),
    productImage: Yup.mixed()
})

const AddEditProduct = () => {
    const navigate = useNavigate()
    const { state } = useLocation() as { state: LocationState }
    const { product, imageSrc } = state || {}
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { currentUser } = useMainContext() as MainContextType

    useEffect(() => {
        const newPath = product ? "/products/edit-product" : "/products/add-product"
        window.history.replaceState(null, "", newPath)
    }, [product])

    const formik = useFormik({
        initialValues: product ? {
            barcode: product.barcode || "",
            productName: product.productName || "",
            productCategory: product.productCategory || "",
            purchasePrice: cleanPrice(product.purchasePrice) || "",
            salesPrice: cleanPrice(product.salesPrice) || "",
            quantity: product.quantity || 0,
            alertQuantity: product.alertQuantity || 0,
            productImage: imageSrc || "",
            featured: product.featured || false,
            supplier: product.supplier || "",
        } : initialFormValues,
        validationSchema: productSchema,
        onSubmit: async (values) => {
            try {
                setIsSubmitting(true)
                const productData = {
                    ...values,
                    userId: currentUser.docId,
                }

                if (product) {
                    await updateProduct(product.docId as string, productData as ProductType)
                    toast.success("Product updated successfully")
                    navigate(-1)
                } else {
                    await insertProduct(productData as ProductType)
                    toast.success("Product added successfully")
                    formik.resetForm({ values: initialFormValues })
                }
            } catch (error: any) {
                toast.error(error.message || "Operation failed")
            } finally {
                setIsSubmitting(false)
            }
        },
    })

    const handleBack = () => navigate(-1)

    return (
        <div className="mx-auto p-6">
            <Button
                variant="ghost"
                className="mb-6 flex items-center gap-2"
                onClick={handleBack}
            >
                <ArrowLeft className="w-4 h-4" />
                Back
            </Button>

            <Card>
                <CardHeader>
                    <CardTitle>{product ? "Edit Product" : "Add Product"}</CardTitle>
                    <CardDescription>
                        {product
                            ? "Update the product information below"
                            : "Fill in the product details to add a new product"
                        }
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <form
                        className="grid grid-cols-1 md:grid-cols-2 gap-6"
                        onSubmit={formik.handleSubmit}
                        onReset={() => formik.resetForm({ values: initialFormValues })}
                    >
                        <div className="space-y-6">
                            <CustomInput
                                name="barcode"
                                label="Product Barcode"
                                value={formik.values.barcode}
                                onChange={formik.handleChange}
                                error={formik.touched.barcode ? formik.errors.barcode : ""}
                            />

                            <CustomInput
                                name="productName"
                                label="Product Name"
                                value={formik.values.productName}
                                onChange={formik.handleChange}
                                error={formik.touched.productName ? formik.errors.productName : ""}
                            />

                            <CustomSelect
                                name="productCategory"
                                options={[
                                    { value: "Grocery", label: "Grocery" },
                                    { value: "Electronics", label: "Electronics" },
                                    { value: "Clothing", label: "Clothing" },
                                    { value: "Furniture", label: "Furniture" },
                                    { value: "Other", label: "Other" },
                                ]
                                }
                                label="Product Category"
                                value={formik.values.productCategory}
                                onChange={(value)=>formik.setFieldValue("productCategory", value)}
                                error={formik.touched.productCategory ? formik.errors.productCategory : ""}
                            />

                            <CustomInput
                                name="supplier"
                                label="Supplier"
                                value={formik.values.supplier}
                                onChange={formik.handleChange}
                                error={formik.touched.supplier ? formik.errors.supplier : ""}
                            />
                        </div>

                        <div className="space-y-6">
                            <CustomInput
                                name="purchasePrice"
                                label="Purchase Price"
                                type="number"
                                value={formik.values.purchasePrice}
                                onChange={formik.handleChange}
                                error={formik.touched.purchasePrice ? formik.errors.purchasePrice : ""}
                            />

                            <CustomInput
                                name="salesPrice"
                                label="Sales Price"
                                type="number"
                                value={formik.values.salesPrice}
                                onChange={formik.handleChange}
                                error={formik.touched.salesPrice ? formik.errors.salesPrice : ""}
                            />

                            <CustomInput
                                name="quantity"
                                label="Quantity"
                                type="number"
                                value={formik.values.quantity}
                                onChange={formik.handleChange}
                                error={formik.touched.quantity ? formik.errors.quantity : ""}
                            />

                            <CustomInput
                                name="alertQuantity"
                                label="Alert Quantity"
                                type="number"
                                value={formik.values.alertQuantity}
                                onChange={formik.handleChange}
                                error={formik.touched.alertQuantity ? formik.errors.alertQuantity : ""}
                            />
                        </div>

                        <div className="col-span-full space-y-6">
                            <CustomInput
                                name="productImage"
                                type="file"
                                label="Product Image"
                                onChange={(event) => {
                                    const file = event.currentTarget.files?.[0]
                                    if (file) {
                                        formik.setFieldValue("productImage", file)
                                    }
                                }}
                                error={formik.touched.productImage ? formik.errors.productImage : ""}
                            />

                            <CustomCheckboxInput
                                name="featured"
                                label="Featured Product"
                                checked={formik.values.featured as boolean}
                                onChange={(value) => formik.setFieldValue("featured", value)}
                            />
                        </div>

                        <div className="col-span-full flex items-center justify-end gap-4 mt-6">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={handleBack}
                                disabled={isSubmitting}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="min-w-[120px]"
                            >
                                {isSubmitting ? (
                                    <Loader className="w-4 h-4 animate-spin" />
                                ) : product ? (
                                    'Update Product'
                                ) : (
                                    'Add Product'
                                )}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default AddEditProduct