import { CustomerType, DuesType, MainContextType, PaymentType } from '@/types';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ArrowLeft, Phone, MapPin,  Edit, Plus, Trash2, Pencil } from 'lucide-react';
import { useMainContext } from '@/context/MainContext';
import { useEffect, useState } from 'react';
import { createDues, createPayment, deleteDues, deletePayment } from '@/firebase/customer-logic';
import { toast } from 'react-toastify';
import Overlay from '@/components/shared/Overlay';
import InfoBadge from '@/components/shared/InfoBadge';
import PaymentForm from './PaymentForm';
import DuesForm from './DuesForm';
import ConfirmationDialog from '@/components/shared/ConfirmationDialog';

const CustomerDetails = () => {
    const { customerId }: { customerId: string } = useLocation().state || {};

    const { dues, payments, currentUser, customers } = useMainContext() as MainContextType;
    const [selectedItem, setSelectedItem] = useState<PaymentType | DuesType | any>(null)
    const [isLoading, ] = useState<boolean>(false)
    const [customer, setCustomer] = useState<CustomerType | any>({});
    const [modalState, setModalState] = useState({
        isDeletePaymentModal: false,
        isDeleteDuesModal: false,
        isAddDues: false,
        isAddPayment: false,
    });

    const toggleModal = (type: keyof typeof modalState) => {
        setModalState((prev) => ({ ...prev, [type]: !prev[type] }));
    };

    const navigate = useNavigate();

    const handleEditCustomer = () => {
        navigate("/shop/customers/add-customer", { state: { customer } });
    };

    const addPayment = async (values: PaymentType) => {
        toggleModal("isAddPayment");

        try {
            await createPayment({
                ...values,
                customerId: customer?.docId as string,
                userId: currentUser.docId,
            });
            toast.success('Payment added successfully');
        } catch (error: any) {
            toast.error(error.message || 'Failed to add payment');
        }
    };
    const addDues = async (values: any) => {
        toggleModal("isAddDues")
        createDues({ ...values, customerId: customerId, userId: currentUser.docId }).then(() => {
            toast("Dues are added successfully", { type: "info" })
        }).catch((error: any) => {
            toast.error(error.message)
        })
    }

    const handleDeletePayment = async () => {
        toggleModal("isDeletePaymentModal")

        deletePayment(selectedItem.docId, customerId, selectedItem.amount).then(() => {
            toast("Payment deleted successfully", { type: "info" })
        }).catch((error: any) => {
            toast.error(error.message)
        })
    }

    const handleDeleteDues = async () => {
        toggleModal("isDeleteDuesModal")
        deleteDues(selectedItem.docId, customerId, selectedItem.amount).then(() => {
            toast("Dues deleted successfully", { type: "info" })
        }).catch((error: any) => {
            toast.error(error.message)
        })
    }

    useEffect(() => {
        if (customerId && customers?.length) {
            const foundCustomer = customers.find((cust: CustomerType) => cust.id === customerId);
            setCustomer(foundCustomer || null);
        }
    }, [customerId, customers]);

    if (!customerId) {
        return <Navigate to="/shop/customers" replace />;
    }




    return (
        <div className="page-container flex gap-4 flex-col">
            {/* Header with Actions */}
            <div className="flex items-center justify-between">
                <Button
                    variant="outline"
                    onClick={() => navigate(-1)}
                    className="gap-2"
                >
                    <ArrowLeft size={16} /> Back
                </Button>
                <div className="flex items-center gap-3">
                    <Button
                        variant="outline"
                        onClick={handleEditCustomer}
                        className="gap-2"
                    >
                        <Edit size={16} /> Edit Customer
                    </Button>
                    <Button onClick={() => toggleModal("isAddPayment")} className="gap-2">
                        <Plus size={14} /> Add Payment
                    </Button>
                    <Button variant={'destructive'} onClick={() => toggleModal("isAddDues")} className="gap-2">
                        <Plus size={14} /> Add Dues
                    </Button>
                </div>
            </div>

            {/* Customer Overview */}
            <Card>
                <CardHeader>
                    <h3 className="text-2xl font-bold">{customer.customerName}</h3>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <Phone size={16} />
                            <span>{customer.contactNo}</span>
                        </div>
                        {customer.address && (
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <MapPin size={16} />
                                <span>{customer.address}</span>
                            </div>
                        )}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <InfoCard
                            title="Total Dues"
                            value={`Rs. ${customer.totalDues || 0}`}
                            type="error"
                        />
                        <InfoCard
                            title="Total Payments"
                            value={`Rs. ${customer.totalPayments || 0}`}
                            type="success"
                        />
                    </div>
                </CardContent>
            </Card>

            {/* Transaction History */}
            <div className="grid md:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <h4 className="text-xl font-semibold">Payment History</h4>
                    </CardHeader>
                    <CardContent>
                        <TransactionList
                            onEdit={() => null}
                            onDelete={(item) => { setSelectedItem(item); toggleModal("isDeletePaymentModal") }}
                            transactions={payments.filter((payment) => payment.customerId === customer.docId) || []}
                            type="payment"
                        />
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <h4 className="text-xl font-semibold">Dues History</h4>
                    </CardHeader>
                    <CardContent>
                        <TransactionList
                            onEdit={() => null}

                            onDelete={(item) => { setSelectedItem(item); toggleModal("isDeleteDuesModal") }}
                            transactions={dues.filter((dues) => dues.customerId === customer.docId) || []}
                            type="dues"
                        />
                    </CardContent>
                </Card>
            </div>

            {/* Notes Section */}
            {customer.note && (
                <Card>
                    <CardHeader>
                        <h4 className="text-xl font-semibold">Notes</h4>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">{customer.note}</p>
                    </CardContent>
                </Card>
            )}

            <Overlay
                isOpen={modalState.isAddPayment}
                onClose={() => null}
                contentClassName='md:w-[60%]'
            >
                <div className="flex justify-between mb-5 flex-wrap items-center">
                    <h4 className='heading-4'>
                        Add Payment
                    </h4>
                    <InfoBadge size='sm' message='Dues are automatically deducted when payment is added' />
                </div>
                <PaymentForm onCancel={() => toggleModal("isAddPayment")} onSubmit={addPayment} currentDues={customer} />

            </Overlay>


            <Overlay
                isOpen={modalState.isAddDues}
                onClose={() => null}
                contentClassName='md:w-[60%]'
            >
                <div className="flex justify-between flex-wrap items-center">
                    <h4 className='heading-4'>
                        Add Dues
                    </h4>
                    <InfoBadge size='sm' message='The dues will be automatically added in customer dues' />
                </div>
                <DuesForm currentPayments={customer} onCancel={() => toggleModal("isAddDues")} onSubmit={(values) => addDues(values)} />

            </Overlay>
            <ConfirmationDialog isOpen={modalState.isDeletePaymentModal} onOpenChange={() => toggleModal("isDeletePaymentModal")}
                message='Are you sure you want to delete this payment?' onActionClick={handleDeletePayment}
                disable={isLoading}
            />
            <ConfirmationDialog isOpen={modalState.isDeleteDuesModal} onOpenChange={() => toggleModal("isDeleteDuesModal")}
                message='Are you sure you want to delete this dues?' onActionClick={handleDeleteDues}
                disable={isLoading}
            />
        </div>
    );
};

const InfoCard = ({ title, value, type = 'default' }: { title: string; value: string; type?: 'error' | 'success' | 'default' }) => (
    <div className={`p-4 rounded-lg border ${type === 'error' ? 'bg-red-50 border-red-100' :
        type === 'success' ? 'bg-green-50 border-green-100' :
            'bg-gray-50 border-gray-100'
        }`}>
        <p className="text-sm text-muted-foreground">{title}</p>
        <p className={`text-xl font-semibold ${type === 'error' ? 'text-red-600' :
            type === 'success' ? 'text-green-600' :
                'text-gray-900'
            }`}>{value}</p>
    </div>
);

const TransactionList = ({ transactions, type, onEdit,
    onDelete }: {
        transactions: PaymentType[] | DuesType[]; type: 'payment' | 'dues', onEdit?: (item: PaymentType | DuesType) => void;
        onDelete?: (item: PaymentType | DuesType) => void;
    }) => (
    <div className="space-y-3">
        {transactions.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">
                No {type} history available
            </p>
        ) : (
            transactions.slice(0,2).map((transaction) => (
                <div
                    key={transaction.docId}
                    className="flex justify-between items-center p-4 border rounded-lg shadow-sm bg-white hover:shadow-md transition duration-200"
                >
                    {/* Transaction Details */}
                    <div className="flex flex-col space-y-1">
                        <p className="text-lg font-semibold text-gray-800">
                            Rs. {transaction.amount}
                        </p>
                        <p className="text-sm text-gray-500">
                            {new Date(transaction.date).toLocaleDateString()}
                        </p>
                        {transaction.description && (
                            <p className="text-xs text-gray-600">{transaction.description}</p>
                        )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                        {/* {onEdit && (
                            <button
                                onClick={() => onEdit(transaction)}
                                className="p-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition"
                                title="Edit"
                            >
                                <Pencil size={16} />
                            </button>
                        )} */}
                        {onDelete && (
                            <button
                                onClick={() => onDelete(transaction)}
                                className="p-2 rounded-md bg-red-500 text-white hover:bg-red-600 transition"
                                title="Delete"
                            >
                                <Trash2 size={16} />
                            </button>
                        )}
                    </div>
                </div>
            ))
        )}
    </div>
);

export default CustomerDetails;