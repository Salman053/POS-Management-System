import CustomInput from "@/components/shared/CustomInput"
import CustomSelect from "@/components/shared/CustomSelect"
import CustomTextArea from "@/components/shared/CustomTextArea"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { EXPENSE_CATEGORIES } from "@/constants/customerConstants"
import { useMainContext } from "@/context/MainContext"
import { insertExpense, updateExpense } from "@/firebase/expense-logic"
import { cleanPrice } from "@/lib/helpers"
import { ExpenseType } from "@/types"
import { useFormik } from "formik"
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import * as Yup from 'yup'


const Add_Edit_Expanse = () => {
    const { expense }: { expense: ExpenseType } = useLocation().state || {}
    console.log(expense)
    const { currentUser } = useMainContext();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const validationSchema = Yup.object().shape({
        date: Yup.string().required('Date is required'),
        category: Yup.string().required('Expense Category is required'),
        amount: Yup.number()
            .typeError('Amount must be a number')
            .min(1, 'Amount must be greater than 0')
            .required('Amount is required'),
        reference: Yup.string(),
        note: Yup.string()
    });

    const formik = useFormik({
        initialValues: {
            date: expense?.date || '',
            category: expense?.category || '',
            amount: cleanPrice(expense?.amount) || 0,
            reference: expense?.reference || '',
            note: expense?.note || '',
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
                setIsSubmitting(true);
                const expenseData = {
                    ...values,
                    userId: currentUser.docId,
                };

                if (expense?.docId) {
                    await updateExpense(expense.docId, expenseData as ExpenseType)
                    toast.success('Expense updated successfully');
                } else {
                    await insertExpense(expenseData as ExpenseType)
                    toast.success('Expense added successfully');
                }
                navigate('/shop/expanses');
            } catch (error: any) {
                toast.error(error.message || 'Operation failed');
            } finally {
                setIsSubmitting(false);
            }
        }
    });


    useEffect(() => {
        const newPath = expense ? "/expanses/edit-expanses" : "/expanses/add-expanses"
        window.history.replaceState(null, "", newPath)

        if (expense) {
            console.log('Original amount:', expense.amount);
            console.log('Formatted amount:', cleanPrice(expense.amount));
        }
    }, [expense])

    return (
        <div className="page-container">
            <Button variant={'outline'} className="mb-4" onClick={() => window.history.back()}>
                Back
            </Button>
            <Card>

                <CardHeader>
                    <div className="">
                        <h4 className="heading-4">Add Expense</h4>
                        <h6 className="muted-text">
                            fill all the fields to add your expense
                        </h6>
                    </div>
                </CardHeader>
                <CardContent>
                    <form onSubmit={formik.handleSubmit} className="grid grid-cols-2 gap-5">
                        <CustomInput
                            type="date"
                            label="Date *"
                            name="date"
                            disabled={isSubmitting}
                            value={formik.values.date}
                            onChange={formik.handleChange}
                            error={formik.touched.date && formik.errors.date}
                        />
                        <CustomSelect
                            options={EXPENSE_CATEGORIES as any}
                            label="Expense Category *"
                            name="category"
                            disabled={isSubmitting}
                            value={formik.values.category}
                            onChange={(value) => formik.setFieldValue('category', value)}
                            error={formik.touched.category && formik.errors.category}
                        />
                        <CustomInput
                            label="Amount *"
                            type="number"
                            disabled={isSubmitting}
                            name="amount"
                            value={formik.values.amount}
                            onChange={formik.handleChange}
                            error={formik.touched.amount && formik.errors.amount}
                        />
                        <CustomInput
                            label="Reference"
                            name="reference"
                            disabled={isSubmitting}
                            value={formik.values.reference}
                            onChange={formik.handleChange}
                            error={formik.touched.reference && formik.errors.reference}
                        />
                        <CustomTextArea
                            className="col-span-2"
                            label="Note"
                            disabled={isSubmitting}
                            name="note"
                            value={formik.values.note}
                            onChange={formik.handleChange}
                            error={formik.touched.note && formik.errors.note}
                        />
                        <div className="flex col-span-2 justify-end gap-4">
                            <Button type="button" variant="outline" onClick={() => navigate(-1)}>
                                Cancel
                            </Button>
                            <Button type="submit" disabled={isSubmitting}>
                                {isSubmitting ? 'Saving' : expense ? 'Update' : 'Add'} Expense
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default Add_Edit_Expanse