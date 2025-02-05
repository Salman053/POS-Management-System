import CustomSearchInput from '@/components/shared/CustomSearchInput'
import DataTable from '@/components/shared/DataTable'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { expensesColumns, expensesRows } from '@/constants/customerConstants'
import { ChevronDown } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Expanses = () => {

  const navigate = useNavigate()

  const handleAddExpense = () => {
    navigate('/shop/expanses/add-expanse')
  }

  const handleEdit = (row: any) => {
    navigate('/shop/expanses/add-expanse', { state: { expense: row } })
  }

  const actions = (row: any) => (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant={'outline'}>Action <ChevronDown /></Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>View</DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleEdit(row)}>Edit</DropdownMenuItem>
        <DropdownMenuItem>Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
  return (
    <div className='page-container'>
      <Card>
        <CardHeader className='flex flex-row flex-wrap justify-between items-center'>

          <h4 className='heading-4'>Expanse</h4>

          <div className="flex gap-2">
            <Button variant={'outline'}>
              Export Expanses
            </Button>
            <Button onClick={handleAddExpense}>
              Add Expanse
            </Button>
          </div>
        </CardHeader>
        <CardContent>

          <div className="flex justify-end mb-7 items-center">
            <CustomSearchInput className="md:w-[400px]"
            />
          </div>
          <DataTable selectable={false} columns={expensesColumns} rows={expensesRows} actions={actions} />
        </CardContent>
      </Card>
    </div>
  )
}

export default Expanses




