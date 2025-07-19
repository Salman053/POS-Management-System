import ConfirmationDialog from '@/components/shared/ConfirmationDialog'
import CustomSearchInput from '@/components/shared/CustomSearchInput'
import DataTable from '@/components/shared/DataTable'
import Overlay from '@/components/shared/Overlay'
import PrintPreview from '@/components/shared/PrintPreview'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { salesColumns, salesRows } from '@/constants/customerConstants'
import { useMainContext } from '@/context/MainContext'
import { deleteSales } from '@/firebase/sales-logic'
import { exportToCSV } from '@/lib/helpers'
import { MainContextType, SalesType } from '@/types'
import { ChevronDown } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Sales = () => {
    const { sales, currentUser } = useMainContext() as MainContextType
    const [filteredSales, setFilteredSales] = useState<SalesType[]>([])
    const [searchTerm, setSearchTerm] = useState<string>('')
    const [isDeleting, setIsDeleting] = useState<boolean>(false)
    const navigate = useNavigate()
    const [selectedSale, setSelectedSale] = useState<SalesType | any>(null)
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
                {/* <DropdownMenuItem onClick={() => handleEditSales(row)} >Edit</DropdownMenuItem> */}
                <DropdownMenuItem onClick={() => navigate(`/shop/sales/sales-details`, { state: { sale: row } })}>View Details</DropdownMenuItem>

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
        setSelectedSale(row)
        toggleModal("isDeleteSalesOpen")

    }
    const deleteSelectedSales = async () => {
        setIsDeleting(true)
        await deleteSales(selectedSale.id).then(
            () => {
                toast.success("Sales deleted successfully")
                toggleModal("isDeleteSalesOpen")
            }
        ).catch(() => {
            toast.error("Operation failed")
            toggleModal("isDeleteSalesOpen")
        }).finally(() => {
            setIsDeleting(false)

        })
    }



    useEffect(() => {

        const modifiedSales = sales.filter(sale => sale.userId === currentUser.docId).map(
            (sale, index) => ({
                ...sale,
                billNo: Date.now().toString().slice(0, 6) + index,
            }))

        if (searchTerm) {
            const filtered = modifiedSales.filter((item) => item.customerName.toLowerCase().includes(searchTerm.toLowerCase()))
            setFilteredSales(filtered)
        }
        else {
            setFilteredSales(modifiedSales)
        }

    }, [searchTerm, sales])

    return (

        <div className='page-container'>
            <Card>
                <CardHeader className='flex flex-row flex-wrap justify-between items-center'>
                    <h4 className='heading-4'>
                        Sales
                    </h4>
                    <div className="flex item-center gap-4">
                        <Button variant={"outline"} onClick={()=>exportToCSV(filteredSales)}>
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
                            onSearchChange={(e) => setSearchTerm(e.target.value)}
                            className="md:w-[400px]"

                        />
                    </div>
                    <DataTable selectable={false} columns={salesColumns} rows={filteredSales} actions={actions} />
                </CardContent>
            </Card>
            <ConfirmationDialog
                isOpen={modalState.isDeleteSalesOpen}
                onOpenChange={() => toggleModal("isDeleteSalesOpen")}
                onActionClick={deleteSelectedSales}
                disable={isDeleting}
                message={`
    This action will:
    • Restore product quantities back to inventory
    • Remove customer dues and payments related to this sale
    • Permanently delete the sale record
    
    This process is irreversible. Are you sure you want to proceed?
  `}
                messageHeading='Delete Sales & Reverse Changes'
                actionText='Delete & Reverse'
            />

        </div>
    )
}

export default Sales