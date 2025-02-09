import CustomInput from '@/components/shared/CustomInput';
import CustomTextArea from '@/components/shared/CustomTextArea';
import InfoBadge from '@/components/shared/InfoBadge';
import { Button } from '@/components/ui/button';
import { DuesType } from '@/types';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const duesSchema = Yup.object().shape({
    amount: Yup.number()
        .required('Amount is required')
        .min(1, 'Amount must be greater than 0'),
    date: Yup.string().required('Date is required'),
    description: Yup.string(),
});

const DuesForm = ({ onSubmit, onCancel, currentPayments }: { onSubmit: (values: any) => Promise<void>, onCancel: () => void, currentPayments: DuesType }) => {
    const formik = useFormik({
        initialValues: {
            amount: '',
            date: new Date().toISOString().split('T')[0],
            description: '',

        },
        validationSchema: duesSchema,
        onSubmit: async (values) => {
            await onSubmit(values);
            formik.resetForm();
        }
    });

    return (
        <form action="" className='mt-6 grid grid-cols-2 gap-4' onSubmit={formik.handleSubmit}>
            <CustomInput
                name='amount'
                error={formik.touched.amount && formik.errors.amount}
                value={formik.values.amount}
                onChange={formik.handleChange}
                label="Dues Amount *"
                type='number' />

            <CustomInput
                name='date'
                error={formik.touched.date && formik.errors.date}
                value={formik.values.date}
                onChange={formik.handleChange}
                label="Date/Time *"
                type='date' />

            <CustomTextArea
                error={formik.touched.description && formik.errors.description}
                name='description'
                value={formik.values.description}
                onChange={formik.handleChange}
                className='col-span-2' label="Description" />

            <div className="flex items-center justify-end md:justify-between  col-span-2   flex-wrap gap-3">
                <InfoBadge size='sm' message='Current Dues is Rs : 400' />

                <div className="flex item-center gap-3">
                    <Button type='button' variant={'outline'} onClick={onCancel}>
                        Cancel
                    </Button>
                    <Button disabled={formik.isSubmitting} type='submit'>
                        {formik.isSubmitting ? 'Saving...' : 'Add Dues'}
                    </Button>
                </div>
            </div>
        </form>
    );
};


export default DuesForm