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
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Customers = () => {
    const navigate = useNavigate()
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
        navigate("/shop/customers/add-customer")
    }

    const handleAddPaymentOverlay = (row: any) => {
        toggleModal("isAddPayment");

    }

    const addPayment = () => {
        toggleModal("isAddPayment");
        toast("Dues are added successfully", { type: "info" })

    }

    const handleAddDuesOverlay = (row: any) => {
        toggleModal("isAddDues");
    }
    const addDues = () => {
        toggleModal("isAddDues")
        toast("Dues are added successfully", { type: "info" })
    }

    // delete logic
    const handleDeleteOverlay = (row: any) => {

        toggleModal("isDeleteCustomerOpen")
    }
    const deleteCustomer = () => {
        toggleModal("isDeleteCustomerOpen")

        toast("Customer deleted successfully", { type: "success", autoClose: 1000 })
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
                <DropdownMenuItem>View</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleDeleteOverlay(row)}>Delete</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
    return (
        <div className='page-container'>
            <Card>
                <CardHeader className='flex flex-row flex-wrap md:justify-between  items-center'>

                    <h4 className='heading-4'>Customers</h4>
                    <div className="flex items-center gap-3">
                        <Button variant={'outline'}>
                            Export Customers
                        </Button>
                        <Button onClick={handleAddCustomer}>
                            Add Customer
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="flex justify-end mb-7 ">
                        <CustomSearchInput className="md:w-[400px]"
                        />

                    </div>
                    <DataTable
                        columns={customerColumns}
                        rows={customerRows}
                        selectable={false}
                        actions={actions}
                    />
                </CardContent>
            </Card>

            <ConfirmationDialog isOpen={modalState.isDeleteCustomerOpen} onOpenChange={() => toggleModal("isDeleteCustomerOpen")} message='Are you sure want to delete this customer? This will also delete all info about this Customer like dues, payments etc' onActionClick={deleteCustomer} />

            <Overlay
                isOpen={modalState.isAddDues}
                onClose={() => null}
                contentClassName='md:w-[60%]'
            ><div className="flex justify-between flex-wrap items-center">

                    <h4 className='heading-4'>
                        Add Dues
                    </h4>
                    <InfoBadge size='sm' message='The dues will be automatically added in customer dues' />
                </div>

                <form action="" className='mt-6 grid grid-cols-2 gap-4' onSubmit={(e) => e.preventDefault()}>
                    <CustomInput label="Dues Amount *" type='number' />
                    <CustomInput label="Date/Time *" type='date' />
                    <CustomTextArea className='col-span-2' label="Description" />
                    <div className="flex items-center justify-end md:justify-between  col-span-2   flex-wrap gap-3">
                        <InfoBadge size='sm' message='Current Dues is Rs : 400' />

                        <div className="flex item-center gap-3">
                            <Button variant={'outline'} onClick={() => toggleModal("isAddDues")}>
                                Cancel
                            </Button>
                            <Button onClick={addDues}>
                                Add Dues
                            </Button>
                        </div>
                    </div>
                </form>

            </Overlay>
            <Overlay
                isOpen={modalState.isAddPayment}
                onClose={() => null}
                contentClassName='md:w-[60%]'
            >
                <div className="flex justify-between flex-wrap items-center">
                    <h4 className='heading-4'>
                        Add Payment
                    </h4>
                    <InfoBadge size='sm' message='Dues are automatically deducted when payment is added' />
                </div>
                <form action="" className='mt-6 grid grid-cols-2 gap-4' onSubmit={(e) => e.preventDefault()}>
                    <CustomInput label="Payment Amount *" type='number' />
                    <CustomInput label="Date/Time *" type='date' />
                    <CustomTextArea className='col-span-2' label="Description" />
                    <div className="flex items-center flex-wrap  col-span-2   justify-end md:justify-between gap-3">
                        <InfoBadge size='sm' message='Remaining Dues is Rs : 400' />

                        <div className="flex items-center gap-2">
                            <Button variant={'outline'} onClick={() => toggleModal("isAddPayment")}>
                                Cancel
                            </Button>
                            <Button onClick={addPayment}>
                                Add Payment
                            </Button>
                        </div>
                    </div>
                </form>

            </Overlay>
        </div>

    )
}

export default Customers