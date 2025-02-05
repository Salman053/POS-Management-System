import ConfirmationDialog from '@/components/shared/ConfirmationDialog'
import CustomSearchInput from '@/components/shared/CustomSearchInput'
import DataTable from '@/components/shared/DataTable'
import Overlay from '@/components/shared/Overlay'
import PrintPreview from '@/components/shared/PrintPreview'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { salesColumns, salesRows } from '@/constants/customerConstants'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Sales = () => {

    const navigate = useNavigate()
    const [modalState, setModalState] = useState({
        isDeleteSalesOpen: false,
        isPrintOpen: false,

    })
    const toggleModal = (type: "isDeleteSalesOpen" | "isPrintOpen") => {
        setModalState((prev) => ({ ...prev, [type]: !prev[type] }))
    }
    const actions = (row: any) => (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Button variant={'outline'}>Action <ChevronDown /></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem onClick={() => handleEditSales(row)} >Edit</DropdownMenuItem>
                <DropdownMenuItem >View Details</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handlePrintOverlay(row)} >Print</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleDeleteSalesOverlay(row)} >Delete</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )

    const handleAddSales = () => {
        navigate("/shop/sales/add-sales")

    }
    const handleEditSales = (row: any) => {
        navigate("/shop/sales/add-sales")

    }
    const handleDeleteSalesOverlay = (row: any) => {
        toggleModal("isDeleteSalesOpen")

    }
    const deleteSales = () => {
        toggleModal("isDeleteSalesOpen")
        toast("Sales is Delete Successfully")
    }

    const handlePrintOverlay = (row: any) => {
        toggleModal("isPrintOpen")

    }
    const printSales = () => {
        toggleModal("isPrintOpen")
        toast("Sales is Print Successfully", { type: "info" })
    }

    return (

        <div className='page-container'>
            <Card>
                <CardHeader className='flex flex-row flex-wrap justify-between items-center'>
                    <h4 className='heading-4'>
                        Sales
                    </h4>
                    <div className="flex item-center gap-4">
                        <Button variant={"outline"}>
                            Export Sales
                        </Button>
                        <Button onClick={handleAddSales} >
                            Add Sales
                        </Button>
                    </div>

                </CardHeader>
                <CardContent>
                    <div className="flex item-center mb-7 justify-end ">
                        <CustomSearchInput
                            className="md:w-[400px]"

                        />
                    </div>
                    <DataTable selectable={false} columns={salesColumns} rows={salesRows} actions={actions} />
                </CardContent>
            </Card>
            <ConfirmationDialog isOpen={modalState.isDeleteSalesOpen} onOpenChange={() => toggleModal("isDeleteSalesOpen")} onActionClick={deleteSales} message='This process is irreversible. Are you sure you want to delete? ' messageHeading='Delete Sales' actionText='Delete' />
            <Overlay isOpen={modalState.isPrintOpen} contentClassName='md:w-[80%] w-[96%] relative md:p-8 p-2' onClose={() => toggleModal("isPrintOpen")} >
                <PrintPreview onPrint={printSales} />

            </Overlay>
        </div>
    )
}

export default Sales