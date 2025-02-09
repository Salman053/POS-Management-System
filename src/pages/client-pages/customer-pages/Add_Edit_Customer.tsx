import CustomInput from "@/components/shared/CustomInput"
import CustomTextArea from "@/components/shared/CustomTextArea"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { useMainContext } from "@/context/MainContext";
import { insertCustomer, updateCustomer } from "@/firebase/customer-logic";
import { CustomerType } from "@/types";
import { useFormik } from 'formik';
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from 'yup';


const validationSchema = Yup.object().shape({
    customerName: Yup.string()
        .required('Customer Name is required'),
    address: Yup.string(),
    contactNo: Yup.string()
        .required('Contact No is required'),
    note: Yup.string()
});


const Add_Edit_Customer = () => {
    const { customer } = useLocation().state || {};
    const { currentUser } = useMainContext() as any;
    const navigate = useNavigate();

    const formik = useFormik<Omit<CustomerType, 'id' | 'createdAt' | 'updatedAt'>>({
        initialValues: {
            customerName: customer?.customerName || '',
            address: customer?.address || '',
            contactNo: customer?.contactNo || '',
            note: customer?.note || '',
            userId: currentUser.docId,
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
                if (customer?.docId) {
                    await updateCustomer(customer.docId, values);
                    toast.success('Customer updated successfully');
                } else {
                    await insertCustomer(values);
                    toast.success('Customer added successfully');
                }
                navigate('/shop/customers');
            } catch (error: any) {
                toast.error(error.message || 'Operation failed');
            } 
        }
    });

    return (
        <div className="page-container">
            <Button variant={'outline'} className="mb-4" onClick={() => window.history.back()}>
                Back
            </Button>
            <Card>

                <CardHeader>
                    <div className="">
                        <h4 className="heading-4">Add Customer</h4>
                        <h6 className="muted-text">
                            fill all the fields to add your customer
                        </h6>
                    </div>
                </CardHeader>
                <CardContent>
                    <form onSubmit={formik.handleSubmit} className="grid grid-cols-2 gap-5">
                        <CustomInput
                            label="Customer Name *"
                            name="customerName"
                            value={formik.values.customerName}
                            onChange={formik.handleChange}
                            error={formik.touched.customerName && formik.errors.customerName}
                        />
                        <CustomInput
                            label="Address"
                            name="address"
                            value={formik.values.address}
                            onChange={formik.handleChange}
                            error={formik.touched.address && formik.errors.address}
                        />
                        <CustomInput
                            label="Contact No *"
                            name="contactNo"
                            value={formik.values.contactNo}
                            onChange={formik.handleChange}
                            error={formik.touched.contactNo && formik.errors.contactNo}
                        />
                        <CustomTextArea
                            className="col-span-2"
                            label="Note"
                            name="note"
                            value={formik.values.note as string}
                            onChange={formik.handleChange}
                            error={formik.touched.note && formik.errors.note}
                        />
                        <div className="flex col-span-2 items-center justify-end gap-4">
                            <Button
                                className="px-6"
                                variant="outline"
                                type="button"
                                onClick={() => navigate(-1)}
                            >
                                Cancel
                            </Button>
                            <Button
                                className="px-6"
                                type="submit"
                                disabled={formik.isSubmitting}
                            >
                                {customer ? 'Update' : 'Add'} Customer
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default Add_Edit_Customer