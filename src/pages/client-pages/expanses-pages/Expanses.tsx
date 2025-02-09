import ConfirmationDialog from '@/components/shared/ConfirmationDialog'
import CustomSearchInput from '@/components/shared/CustomSearchInput'
import DataTable from '@/components/shared/DataTable'
import DefaultText from '@/components/shared/DefaultText'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { expensesColumns } from '@/constants/customerConstants'
import { useMainContext } from '@/context/MainContext'
import { deleteExpense } from '@/firebase/expense-logic'
import { exportToCSV } from '@/lib/helpers'
import { ExpenseType, MainContextType } from '@/types'
import { ChevronDown } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Expanses = () => {
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [isDeleting, setIsDeleting] = useState<boolean>(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedExpense, setSelectedExpense] = useState<ExpenseType | any>(null)
  const { expenses } = useMainContext() as MainContextType
  const [modifiedExpenses, setModifiedExpenses] = useState<ExpenseType[]>([])
  const navigate = useNavigate()

  // console.log(selectedExpense)
  const handleAddExpense = () => {
    navigate('/shop/expanses/add-expanse')
  }

  const handleEdit = (row: any) => {
    navigate('/shop/expanses/add-expanse', { state: { expense: row } })
  }

  const handleDelete = (row: ExpenseType) => {
    setSelectedExpense(row)
    setIsDeleteModalOpen(true)
  }

  const deleteSelectedExpense = async () => {
    if (!selectedExpense?.id) return;

    try {
      setIsDeleting(true);
      await deleteExpense(selectedExpense.docId as string);

      toast.success("Expense deleted successfully");
      setIsDeleteModalOpen(false)
      setSelectedExpense(null); // Reset selected expense
    } catch (error: any) {
      toast.error(error.message || "Failed to delete expense");
      console.error("Delete expense error:", error);
    } finally {
      setIsDeleting(false);
      setIsDeleteModalOpen(false)

    }
  };

  const actions = (row: any) => (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant={'outline'}>Action <ChevronDown /></Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>View</DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleEdit(row)}>Edit</DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleDelete(row)}>Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )

  useEffect(() => {
    if (!expenses) return;

    const formatExpenseData = (expense: ExpenseType) => ({
      ...expense,
      amount: "Rs. " + (expense.amount),
      category: expense.category || 'N/A',
      reference: expense.reference || 'N/A'
    });

    const processedData = expenses.map(formatExpenseData);

    if (searchQuery) {
      const filtered = processedData.filter((expense) =>
        expense.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        expense.reference.toLowerCase().includes(searchQuery.toLowerCase())
        // expense.note?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setModifiedExpenses(filtered as any);
    } else {
      setModifiedExpenses(processedData as any);
    }
  }, [expenses, searchQuery]);



  const handleExport = () => {
    try {
      const exportConfig = {
        fileName: 'expenses',
        excludeFields: ['id', 'docId', "userId", "createdAt", 'updatedAt'],

      };

      exportToCSV(modifiedExpenses, exportConfig);
      toast.info("csv file exported successfully")
    } catch (error) {
      toast.error('Export failed');
    }
  };

  return (
    <div className='page-container'>
      <Card>
        <CardHeader className='flex flex-row flex-wrap justify-between items-center'>

          <h4 className='heading-4'>Expanse</h4>

          <div className="flex gap-2">
            <Button onClick={handleExport} variant={'outline'}>
              Export Expanses
            </Button>
            <Button onClick={handleAddExpense}>
              Add Expanse
            </Button>
          </div>
        </CardHeader>
        <CardContent>

          <div className="flex justify-end mb-7 items-center">
            <CustomSearchInput placeholder='Search Expanses by category, reference'
              value={searchQuery}
              onSearchChange={(e) => setSearchQuery(e.target.value)} className="md:w-[400px]"
            />
          </div>
          {
            modifiedExpenses.length > 0 ? (
              <DataTable selectable={false} columns={expensesColumns} rows={modifiedExpenses} actions={actions}  
              pagination={modifiedExpenses.length !== 0}
              />
            ) :
              <DefaultText label='Expenses' />
          }

        </CardContent>
      </Card>
      <ConfirmationDialog isOpen={isDeleteModalOpen} onOpenChange={() => setIsDeleteModalOpen(false)}
        actionText='Delete Expense'
        message='Are you sure you want to delete this expense?'
        disable={isDeleting}
        onActionClick={deleteSelectedExpense}
      />
    </div>
  )
}

export default Expanses




