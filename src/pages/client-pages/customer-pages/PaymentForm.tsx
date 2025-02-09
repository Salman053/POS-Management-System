import CustomInput from '@/components/shared/CustomInput';
import CustomTextArea from '@/components/shared/CustomTextArea';
import InfoBadge from '@/components/shared/InfoBadge';
import { Button } from '@/components/ui/button';
import { CustomerType, PaymentType } from '@/types';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

const paymentSchema = Yup.object().shape({
  amount: Yup.number()
    .required('Amount is required')
    .min(1, 'Amount must be greater than 0'),
  date: Yup.string().required('Date is required'),
  description: Yup.string().min(3, 'Description must be at least 3 characters'),
});

const PaymentForm = ({ onSubmit, onCancel, currentDues }: { onSubmit: (values: any) => Promise<void>, onCancel: () => void, currentDues: CustomerType }) => {
  const formik = useFormik({
    initialValues: {
      amount: '',
      date: new Date().toISOString().split('T')[0],
      description: ''
    },
    validationSchema: paymentSchema,
    onSubmit: async (values) => {
      if (currentDues && Number(values.amount) > Number(currentDues.totalDues)) {
        toast.warning('Payment amount cannot be greater than remaining dues amount');
      } else {
        await onSubmit(values); 
        formik.resetForm();
      }
    }
  });

  return (
    <form onSubmit={formik.handleSubmit} className='grid grid-cols-2 gap-4'>
      <CustomInput
        label="Payment Amount *"
        type='number'
        name="amount"
        value={formik.values.amount}
        onChange={formik.handleChange}
        error={formik.touched.amount && formik.errors.amount}
      />
      <CustomInput
        label="Date/Time *"
        type='date'
        name="date"
        value={formik.values.date}
        onChange={formik.handleChange}
        error={formik.touched.date && formik.errors.date}
      />
      <CustomTextArea
        className='col-span-2'
        label="Description"
        name="description"
        value={formik.values.description}
        onChange={formik.handleChange}
        error={formik.touched.description && formik.errors.description}
      />
      <div className="flex items-center col-span-2 justify-end md:justify-between gap-3">
        <InfoBadge size='sm' message={`Remaining Dues is Rs : ${currentDues.totalDues }`} />
        <div className="flex items-center gap-2">
          <Button variant='outline' onClick={onCancel}>Cancel</Button>
          <Button type="submit" disabled={formik.isSubmitting}>
            {formik.isSubmitting ? 'Adding...' : 'Add Payment'}
          </Button>
        </div>
      </div>
    </form>
  );
};


export default PaymentForm