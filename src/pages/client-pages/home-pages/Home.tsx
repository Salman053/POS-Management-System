import ChartLegend from '@/components/shared/ChartLegend';
import CustomSelect from '@/components/shared/CustomSelect';
import DashboardCard from '@/components/shared/DashboardCard'
import DataTable from '@/components/shared/DataTable';
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { dashboardCustomerColumns, dashboardCustomerData, DashboardRecentSalesColumns, DashboardRecentSalesData } from '@/constants/customerConstants';
import { Users, ShoppingBag, DollarSign, ChartLine, } from 'lucide-react';

import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
const Home = () => {

  const chartData = [
    { name: 'Jan', revenue: 4000, profit: 2400, expense: 1500 },
    { name: 'Feb', revenue: 3000, profit: 2210, expense: 1200 },
    { name: 'Mar', revenue: 5000, profit: 2900, expense: 1800 },
    { name: 'Apr', revenue: 4500, profit: 2800, expense: 1700 },
    { name: 'May', revenue: 4700, profit: 3000, expense: 2000 },
    { name: 'Jun', revenue: 5200, profit: 3200, expense: 2200 },
    { name: 'July', revenue: 5200, profit: 1344, expense: 1335 },
    { name: 'Aug', revenue: 2342, profit: 1000, expense: 2345 },
    { name: 'Sep', revenue: 4563, profit: 3200, expense: 2200 },
    { name: 'Oct', revenue: 909, profit: 2333, expense: 1356 },
    { name: 'Nov', revenue: 3334, profit: 3200, expense: 2200 },
    { name: 'Dec', revenue: 5200, profit: 1363, expense: 1933 },
  ];

  const data = [
    {
      icon: <ChartLine size={24} />, label: 'Revenue', value: '25,600', isCurrency: true, description: 'Total revenue this month', trend: 'up' as 'up'
    },
    {
      icon: <Users size={24} />, label: 'Customers', value: '10', description: 'Customer in system', trend: 'up' as 'up'
    },
    {
      icon: <ShoppingBag size={24} />, label: 'Sales', value: '4,320', description: 'Total sales placed', trend: 'down' as 'down'
    },
    {
      icon: <DollarSign size={24} />, label: 'Profit', value: '7,500', isCurrency: true, description: 'Net profit this quarter', trend: 'up' as 'up'
    }
  ];


  const actions = (row: any) => (
    <span className='cursor-pointer hover:text-blue-1 transition-all duration-300'>
      View Details
    </span>
  )
  return (
    <div className='page-container'>
      <div className='grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-7'>
        {data.map((item, index) => (
          <DashboardCard key={index} {...item} />
        ))}
      </div>

      <Card className="bg-white hidden md:block mb-6 dark:bg-gray-800  rounded-2xl ">
        <CardHeader className="flex flex-wrap justify-center flex-row items-center md:justify-between">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-white">Revenue, Profit & Expenses Overview</h3>
          <div className="flex items-center gap-4 ">
            <ChartLegend />
            <CustomSelect triggerClassName='px-2 py-1 ' placeholder='2025' options={['2025', '2024', '2023', '2022', '2021']} />
          </div>
        </CardHeader>
        <CardContent className='p-0 pr-5 pb-5'>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart  data={chartData}>
              <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false}
                tickMargin={12}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}`}
              />
              <Tooltip cursor={false} contentStyle={{ fontSize: 12, borderRadius: 10 ,textTransform:"capitalize" }} />
              <Bar animationEasing='ease-out' animationDuration={500} dataKey="revenue" fill="#2563EB" radius={5} />  {/* Deep Royal Blue */}
              <Bar dataKey="profit" animationEasing='ease-out' animationDuration={500} fill="#16A34A" radius={5} />  {/* Rich Emerald Green */}
              <Bar dataKey="expense"  animationEasing='ease-out' animationDuration={500} fill="#DC2626" radius={5} />  {/* Bold Crimson Red */}

            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 grid-cols-1 gap-4">

        <Card>
          <CardHeader>
            <h4 className='heading-4'>
              Recent Sales
            </h4>
          </CardHeader>
          <CardContent>
            <DataTable pagination={false} selectable={false} columns={DashboardRecentSalesColumns} rows={DashboardRecentSalesData} />
          </CardContent>

        </Card>
        <Card>
          <CardHeader>
            <h4 className='heading-4'>
              Recent Sales
            </h4>
          </CardHeader>
          <CardContent>
            <DataTable actions={actions} pagination={false} selectable={false} columns={dashboardCustomerColumns} rows={dashboardCustomerData} />
          </CardContent>

        </Card>
      </div>
    </div>
  )
}

export default Home


