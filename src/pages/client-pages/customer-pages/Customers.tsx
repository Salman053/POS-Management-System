import ConfirmationDialog from '@/components/shared/ConfirmationDialog'
import CustomInput from '@/components/shared/CustomInput'
import CustomSearchInput from '@/components/shared/CustomSearchInput'
import CustomTextArea from '@/components/shared/CustomTextArea'
import DataTable from '@/components/shared/DataTable'
import InfoBadge from '@/components/shared/InfoBadge'
import Overlay from '@/components/shared/Overlay'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardContent, } from '@/components/ui/card'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { customerColumns, customerRows } from '@/constants/customerConstants'
import { ChevronDown } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { CustomerType, DuesType, MainContextType, PaymentType } from '@/types'
import PaymentForm from './PaymentForm'
import { useMainContext } from '@/context/MainContext'
import { createDues, createPayment, deleteCustomer } from '@/firebase/customer-logic'
import DuesForm from './DuesForm'
import { exportToCSV } from '@/lib/helpers'
import DefaultText from '@/components/shared/DefaultText'

const Customers = () => {
    const navigate = useNavigate()
    const { customers, currentUser } = useMainContext() as MainContextType
    const [searchQuery, setSearchQuery] = useState<string>('')
    const [filteredCustomers, setFilteredCustomers] = useState<CustomerType[]>(customers)
    const [selectedCustomer, setSelectedCustomer] = useState<CustomerType | any>(null)
    const [modalState, setModalState] = useState({
        isDeleteCustomerOpen: false,
        isAddDues: false,
        isAddPayment: false,

    })

    const toggleModal = (type: "isDeleteCustomerOpen" | "isAddDues" | "isAddPayment") => {
        setModalState((prev) => ({ ...prev, [type]: !prev[type] }))
    }
    const handleAddCustomer = () => {
        navigate("/shop/customers/add-customer")
    }
    const handleEditCustomer = (row: any) => {
        navigate("/shop/customers/add-customer", { state: { customer: row } })
    }
    const handleAddPaymentOverlay = (row: CustomerType) => {
        setSelectedCustomer(row)
        toggleModal("isAddPayment");

    }
    const addPayment = async (values: PaymentType) => {
        toggleModal("isAddPayment");

        try {
            // Add payment logic here
            createPayment({ ...values, customerId: selectedCustomer.docId, userId: currentUser.docId }).then(() => {
                toast.success('Payment added successfully');
            }).catch((error: any) => {
                toast.error(error.message);
            })
        } catch (error) {
            toast.error('Failed to add payment');
        }
    }

    const handleAddDuesOverlay = (row: DuesType) => {
        setSelectedCustomer(row)
        toggleModal("isAddDues");
    }
    const addDues = async (values: any) => {
        toggleModal("isAddDues")
        createDues({ ...values, customerId: selectedCustomer.docId, userId: currentUser.docId }).then(() => {
            toast("Dues are added successfully", { type: "info" })

        }).catch((error: any) => {
            toast.error(error.message)
        })
    }
    // delete logic
    const handleDeleteOverlay = (row: CustomerType) => {
        setSelectedCustomer(row)
        toggleModal("isDeleteCustomerOpen")
    }
    const deleteSelectedCustomer = () => {
        toggleModal("isDeleteCustomerOpen")
        deleteCustomer(selectedCustomer.docId).then(() => {
            toast("Customer deleted successfully", { type: "success", autoClose: 1000 })

        }).catch((error: any) => {
            toast.error(error.message)
        })
    }

    const handleViewCustomer = (row: CustomerType) => {
        navigate(`/shop/customers/customer-details`, { state: { customerId: row.docId } })
    }

    const actions = (row: any) => (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Button variant={'outline'}> Action <ChevronDown /></Button>

            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem onClick={() => handleEditCustomer(row)}>Edit</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleAddDuesOverlay(row)}>Add Dues</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleAddPaymentOverlay(row)}>Add Payment</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleViewCustomer(row)}>View</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleDeleteOverlay(row)}>Delete</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )

    useEffect(() => {
        if (searchQuery.length > 1) {
            const filteredCustomers = customers.filter((customer) => customer.customerName.toLowerCase().includes(searchQuery.toLowerCase()));
            setFilteredCustomers(filteredCustomers);
        }
        else {

            setFilteredCustomers(customers);
        }
    }, [searchQuery, customers])

    const handleExport = () => {
        try {
            const exportConfig = {
                fileName: 'customers',
                excludeFields: ['id', 'docId', "userId", "createdAt", 'updatedAt'],

            };

            exportToCSV(customers, exportConfig);
            toast.info("csv file exported successfully")
        } catch (error) {
            toast.error('Export failed');
        }
    };
    return (
        <div className='page-container'>
            <Card>
                <CardHeader className='flex flex-row flex-wrap justify-between  items-center'>

                    <h4 className='heading-4'>Customers</h4>
                    <div className="flex flex-wrap items-center gap-3">
                        <Button onClick={handleExport} variant={'outline'}>
                            Export Customers
                        </Button>
                        <Button onClick={handleAddCustomer}>
                            Add Customer
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="flex justify-end mb-7 ">
                        <CustomSearchInput placeholder='Search by name' value={searchQuery} onSearchChange={(e) => setSearchQuery(e.target.value)} className="md:w-[400px]"
                        />

                    </div>
                    {filteredCustomers.length > 0 ? (
                        <DataTable
                            columns={customerColumns}
                            rows={filteredCustomers}
                            selectable={false}
                            pagination={filteredCustomers.length !== 0}

                            actions={actions}
                        />
                    ) : (
                        <DefaultText label='customer' />)}
                </CardContent>
            </Card>

            <ConfirmationDialog isOpen={modalState.isDeleteCustomerOpen} onOpenChange={() => toggleModal("isDeleteCustomerOpen")} message='Are you sure want to delete this customer? This will also delete all info about this Customer like dues, payments etc' onActionClick={deleteSelectedCustomer} />

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

                <DuesForm currentPayments={selectedCustomer} onCancel={() => toggleModal("isAddDues")} onSubmit={(values) => addDues(values)} />

            </Overlay>
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
                <PaymentForm onCancel={() => toggleModal("isAddPayment")} onSubmit={addPayment} currentDues={selectedCustomer} />

            </Overlay>
        </div>

    )
}

export default Customers