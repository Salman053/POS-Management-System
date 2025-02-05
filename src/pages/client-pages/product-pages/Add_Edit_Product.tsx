import CustomCheckboxInput from '@/components/shared/CustomCheckboxInput'
import CustomInput from '@/components/shared/CustomInput'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { useLocation } from 'react-router-dom'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { toast } from 'react-toastify'
import { useEffect } from 'react'
import { cleanPrice } from '@/lib/helpers'
const Add_Edit_Product = () => {
    const { product, imageSrc } = useLocation().state || {}

    useEffect(() => {
        // Change the URL dynamically without affecting routing
        const newPath = product ? "/products/edit-product" : "/products/add-product";
        window.history.replaceState(null, "", newPath);
    }, [product]);






    // Validation schema
    const productSchema = Yup.object({
        barcode: Yup.string()
            .required("Product Barcode  is required"),
        productName: Yup.string().required("Product Name is required"),
        productCategory: Yup.string().required("Product Category is required"),
        purchasePrice: Yup.number()
            .typeError("Purchase Price must be a number")
            .min(1, "Purchase Price must be greater than 0")
            .required("Purchase Price is required"),

        salesPrice: Yup.number()
            .min(1, "Sales Price must be greater than 0")
            .required("Sales Price is required"),
        quantity: Yup.number()
            .min(1, "Quantity must be greater than 0")
            .required("Quantity is required"),
        alertQuantity: Yup.number()
            .min(1, "Alert Quantity must be greater than 0")
            .required("Alert Quantity is required"),
        productImage: Yup.mixed()
            .required("Product Image is required")
            .test("fileType", "Only images are allowed", (value) => {
                return value && value instanceof File && ["image/jpeg", "image/png", "image/jpg"].includes(value.type);
            }),


    });






    // Formik setup
    const formik = useFormik({

        initialValues: {
            barcode: product?.barcode || "",
            productName: product?.name || "",
            productCategory: product?.category || "",
            purchasePrice: cleanPrice(product?.purchasePrice),
            salesPrice: cleanPrice(product?.salesPrice),
            quantity: product?.quantity || 0,
            alertQuantity: product?.alertQuantity || 0,
            productImage: imageSrc || "",
            featured: product?.featured || false,
        },


        validationSchema: productSchema,
        onSubmit: (values) => {
            toast("Product added successfully", {
                type: "success",
            });
            console.log(values)
            //   onOpenChange(false); // Close the dialog on submission
        },
    });


    return (
        <div className="page-container">
            <Button variant="outline" className='mb-5' onClick={() => window.history.back()}>Back</Button>
            <Card>
                <CardHeader className=" mb-5">
                    <h3 className="heading-4">
                        {product ? "Edit Product" : "Add Product"}
                    </h3>
                    <h6 className="muted-text">
                        {
                            product ? "Please Fill the form to edit product" : "Please Fill the form to add product"
                        }
                    </h6>
                </CardHeader>
                <CardContent className="">
                    <form action="" className='grid grid-cols-2 gap-5' onReset={formik.handleReset} onSubmit={formik.handleSubmit}>
                        <CustomInput name='barcode' value={formik.values.barcode} onChange={formik.handleChange}
                            error={formik.touched.barcode ? formik.errors.barcode : ""} label="Product Barcode"
                        />
                        <CustomInput
                            name="productImage"
                            type="file"
                            onChange={(event) => {
                                const files = event?.currentTarget?.files;
                                if (files && files.length > 0) {
                                    const file = files[0];
                                    formik.setFieldValue("productImage", file);
                                }
                            }}
                            error={formik.touched.productImage ? formik.errors.productImage : ""}
                            label="Product Image"
                        />

                        <CustomInput
                            name="productName"
                            value={formik.values.productName}
                            onChange={formik.handleChange}
                            error={formik.touched.productName ? formik.errors.productName : ""}

                            label="Product Name"
                        />
                        <CustomInput label="Product Category"
                            name="productCategory"
                            value={formik.values.productCategory}
                            onChange={formik.handleChange}
                            error={formik.touched.productCategory ? formik.errors.productCategory : ""}
                        />
                        <CustomInput label="Purchase Price"
                            name="purchasePrice"
                            value={formik.values.purchasePrice}
                            onChange={formik.handleChange}
                            type='number'
                            error={formik.touched.purchasePrice ? formik.errors.purchasePrice : ""}

                        />
                        <CustomInput label="Sales Price"
                            name="salesPrice"
                            value={formik.values.salesPrice}
                            onChange={formik.handleChange}
                            type='number'

                            error={formik.touched.salesPrice ? formik.errors.salesPrice : ""}

                        />
                        <CustomInput label="Quantity"
                            name="quantity"
                            type='number'

                            value={formik.values.quantity}
                            onChange={formik.handleChange}
                            error={formik.touched.quantity ? formik.errors.quantity : ""}

                        />
                        <CustomInput label="Alert Quantity"
                            name="alertQuantity"
                            value={formik.values.alertQuantity}
                            type='number'

                            onChange={formik.handleChange}
                            error={formik.touched.alertQuantity ? formik.errors.alertQuantity : ""}
                        />
                        <CustomCheckboxInput onChange={formik.handleChange} name="featured" label="Featured" />

                        <div className="flex items-center justify-end mt-5 gap-5 col-span-2">
                            <Button type='button' className='px-6' onClick={() => window.history.back()} variant="outline" >
                                Cancel
                            </Button>
                            <Button type='submit' className='px-10'>{
                                product ? "Edit Product" : "Add Product"
                            }</Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default Add_Edit_Product