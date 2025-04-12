"use client"

import AlertCard from "@/components/shared/AlertCard"
import ChartLegend from "@/components/shared/ChartLegend"
import CustomSelect from "@/components/shared/CustomSelect"
import DashboardCard from "@/components/shared/DashboardCard"
import DataTable from "@/components/shared/DataTable"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { dashboardCustomerColumns, DashboardRecentSalesColumns } from "@/constants/customerConstants"
import { useMainContext } from "@/context/MainContext"
import GeminiChat from "@/pages/GeminiChat"
import type { MainContextType } from "@/types"
import { Users, ShoppingBag, DollarSign, LineChartIcon as ChartLine, CreditCard, AlertTriangle } from "lucide-react"
import { useEffect, useState, useMemo } from "react"

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  PieChart,
  Pie,
  Cell,
  Legend,
  Area,
  AreaChart,
} from "recharts"

const Home = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [selectedYear, setSelectedYear] = useState<string>("2025")
  const { customers, products, payments, expenses, sales, dues } = useMainContext() as MainContextType

  // Calculate total revenue (sum of all sales totalAmount)
  const totalRevenue = useMemo(() => {
    return sales.reduce((sum, sale) => sum + (Number(sale.totalBill) || 0), 0)
  }, [sales])

  // Calculate total expenses
  const totalExpenses = useMemo(() => {
    return expenses.reduce((sum, expense) => sum + (expense.amount || 0), 0)
  }, [expenses])

  // Calculate total profit (revenue - expenses)
  const totalProfit = useMemo(() => {
    return totalRevenue - totalExpenses
  }, [totalRevenue, totalExpenses])

  // Calculate total dues
  const totalDues = useMemo(() => {
    return customers.reduce((sum, customer) => sum + (customer.totalDues || 0), 0)
  }, [customers])

  // Calculate total payments
  const totalPayments = useMemo(() => {
    return payments.reduce((sum, payment) => sum + (payment.amount || 0), 0)
  }, [payments])

  // Prepare monthly data for chart
  const chartData = useMemo(() => {
    // Initialize monthly data structure
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const monthlyData = months.map((name) => ({
      name,
      revenue: 0,
      profit: 0,
      expense: 0,
    }))

    // Process sales data
    sales.forEach((sale) => {
      if (sale.date) {
        const date = new Date(sale.date)
        const year = date.getFullYear().toString()

        if (year === selectedYear) {
          const month = date.getMonth()
          monthlyData[month].revenue += Number(sale.totalBill) || 0
        }
      }
    })

    // Process expenses data
    expenses.forEach((expense) => {
      if (expense.date) {
        const date = new Date(expense.date)
        const year = date.getFullYear().toString()

        if (year === selectedYear) {
          const month = date.getMonth()
          monthlyData[month].expense += expense.amount || 0
        }
      }
    })

    // Calculate profit for each month
    monthlyData.forEach((month) => {
      month.profit = month.revenue - month.expense
    })

    return monthlyData
  }, [sales, expenses, selectedYear])

  // Prepare dues data for chart
  const duesData = useMemo(() => {
    // Initialize monthly data structure
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const monthlyData = months.map((name) => ({
      name,
      dues: 0,
      payments: 0,
    }))

    // Process dues data
    dues.forEach((due) => {
      if (due.date) {
        const date = new Date(due.date)
        const year = date.getFullYear().toString()

        if (year === selectedYear) {
          const month = date.getMonth()
          monthlyData[month].dues += due.amount || 0
        }
      }
    })

    // Process payments data
    payments.forEach((payment) => {
      if (payment.date) {
        const date = new Date(payment.date)
        const year = date.getFullYear().toString()

        if (year === selectedYear) {
          const month = date.getMonth()
          monthlyData[month].payments += payment.amount || 0
        }
      }
    })

    return monthlyData
  }, [dues, payments, selectedYear])

  // Prepare customer dues distribution data
  const customerDuesDistribution = useMemo(() => {
    const customersWithDues = customers.filter((customer) => customer.totalDues && customer.totalDues > 0)

    // If we have more than 5 customers with dues, group the smallest ones as "Others"
    if (customersWithDues.length > 5) {
      // Sort by dues amount (descending)
      const sortedCustomers = [...customersWithDues].sort((a, b) => (b.totalDues || 0) - (a.totalDues || 0))

      const topCustomers = sortedCustomers.slice(0, 4)
      const otherCustomers = sortedCustomers.slice(4)

      const otherDuesTotal = otherCustomers.reduce((sum, customer) => sum + (customer.totalDues || 0), 0)

      return [
        ...topCustomers.map((customer) => ({
          name: customer.customerName,
          value: customer.totalDues || 0,
        })),
        {
          name: "Others",
          value: otherDuesTotal,
        },
      ]
    }

    // If we have 5 or fewer customers, show them all
    return customersWithDues.map((customer) => ({
      name: customer.customerName,
      value: customer.totalDues || 0,
    }))
  }, [customers])

  // Prepare product inventory data
  const productInventoryData = useMemo(() => {
    return products
      .map((product) => ({
        name: product.productName,
        quantity: product.quantity,
        alertQuantity: product.alertQuantity,
      }))
      .slice(0, 10) // Show only top 10 products
  }, [products])

  // Dashboard card data
  const dashboardCards = useMemo(
    () => [
      {
        icon: <ChartLine size={24} />,
        label: "Revenue",
        value: totalRevenue.toFixed(2),
        isCurrency: true,
        description: "Total revenue from sales",
        trend: totalRevenue > 0 ? ("up" as "up" | "down") : ("down" as "up" | "down"),
      },
      {
        icon: <Users size={24} />,
        label: "Customers",
        value: customers.length,
        description: `${customers.length} customers in system`,
        trend: customers.length > 0 ? ("up" as "up" | "down") : ("down" as "up" | "down"),
      },
      {
        icon: <ShoppingBag size={24} />,
        label: "Sales",
        value: sales.length,
        description: `${sales.length} total sales placed`,
        trend: sales.length > 0 ? ("up" as "up" | "down") : ("down" as "up" | "down"),
      },
      {
        icon: <DollarSign size={24} />,
        label: "Profit",
        value: totalProfit.toFixed(2),
        isCurrency: true,
        description: "Net profit (revenue - expenses)",
        trend: totalProfit > 0 ? ("up" as "up" | "down") : ("down" as "up" | "down"),
      },
    ],
    [totalRevenue, customers.length, sales.length, totalProfit],
  )

  // Additional dashboard cards
  const additionalCards = useMemo(
    () => [
      {
        icon: <AlertTriangle size={24} />,
        label: "Total Dues",
        value: totalDues.toFixed(2),
        isCurrency: true,
        description: "Outstanding customer dues",
        trend: "down" as "up" | "down",
      },
      {
        icon: <CreditCard size={24} />,
        label: "Payments",
        value: totalPayments.toFixed(2),
        isCurrency: true,
        description: "Total payments received",
        trend: "up" as "up" | "down",
      },
    ],
    [totalDues, totalPayments],
  )

  // Filter low stock products
  const lowStockProducts = useMemo(() => {
    return products.filter((product) => product.quantity < product.alertQuantity)
  }, [products])

  // Filter customers with dues
  const customersWithDues = useMemo(() => {
    return customers.filter((customer) => customer.totalDues && customer.totalDues > 0)
  }, [customers])

  // Action for customer table
  const actions = (row: any) => (
    <span className="cursor-pointer hover:text-blue-1 transition-all duration-300">View Details</span>
  )

  // Handle year selection for chart
  const handleYearChange = (year: string) => {
    setSelectedYear(year)
  }

  // Available years for dropdown
  const yearOptions = useMemo(() => {
    const currentYear = new Date().getFullYear()
    return [
      currentYear.toString(),
      (currentYear - 1).toString(),
      (currentYear - 2).toString(),
      (currentYear - 3).toString(),
      (currentYear - 4).toString(),
    ]
  }, [])

  // Colors for pie chart
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"]

  useEffect(() => {
    if (customers?.length === 0) {
      setIsLoading(true)
    } else {
      setIsLoading(false)
    }
  }, [customers])

  return (
    <div className="page-container">
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-7">
        {dashboardCards.map((item, index) => (
          <DashboardCard key={index} {...item} />
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 gap-6 mb-7">
        {additionalCards.map((item, index) => (
          <DashboardCard key={index} {...item} />
        ))}
      </div>

      <Card className="bg-white hidden md:block mb-6 dark:bg-gray-800 rounded-2xl">
        <CardHeader className="flex flex-wrap justify-center flex-row items-center md:justify-between">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-white">Revenue, Profit & Expenses Overview</h3>
          <div className="flex items-center gap-4">
            <ChartLegend />
            <CustomSelect
              triggerClassName="px-2 py-1"
              placeholder={selectedYear}
              options={yearOptions}
              onChange={handleYearChange}
            />
          </div>
        </CardHeader>
        <CardContent className="p-0 pr-5 pb-5">
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={chartData}>
              <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickMargin={12} />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}`}
              />
              <Tooltip
                cursor={false}
                contentStyle={{ fontSize: 12, borderRadius: 10, textTransform: "capitalize" }}
                formatter={(value: number) => [`Rs. ${value.toFixed(2)}`, ""]}
              />
              <Bar
                animationEasing="ease-out"
                animationDuration={500}
                dataKey="revenue"
                fill="#2563EB"
                radius={5}
                name="Revenue"
              />
              <Bar
                dataKey="profit"
                animationEasing="ease-out"
                animationDuration={500}
                fill="#16A34A"
                radius={5}
                name="Profit"
              />
              <Bar
                dataKey="expense"
                animationEasing="ease-out"
                animationDuration={500}
                fill="#DC2626"
                radius={5}
                name="Expense"
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* New Chart: Dues vs Payments */}
      <Card className="bg-white hidden md:block mb-6 dark:bg-gray-800 rounded-2xl">
        <CardHeader className="flex flex-wrap justify-center flex-row items-center md:justify-between">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-white">Dues vs Payments Trend</h3>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#FF8042]"></div>
                <span className="text-xs text-gray-600 dark:text-gray-300">Dues</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#0088FE]"></div>
                <span className="text-xs text-gray-600 dark:text-gray-300">Payments</span>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0 pr-5 pb-5">
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={duesData}>
              <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickMargin={12} />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip
                cursor={false}
                contentStyle={{ fontSize: 12, borderRadius: 10, textTransform: "capitalize" }}
                formatter={(value: number) => [`Rs. ${value.toFixed(2)}`, ""]}
              />
              <Area
                type="monotone"
                dataKey="dues"
                stroke="#FF8042"
                fill="#FF8042"
                fillOpacity={0.3}
                activeDot={{ r: 8 }}
                name="Dues"
              />
              <Area
                type="monotone"
                dataKey="payments"
                stroke="#0088FE"
                fill="#0088FE"
                fillOpacity={0.3}
                activeDot={{ r: 8 }}
                name="Payments"
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 grid-cols-1 gap-4 mb-6">
        {/* Customer Dues Distribution */}
        <Card className="bg-white dark:bg-gray-800 rounded-2xl">
          <CardHeader>
            <h4 className="heading-4">Customer Dues Distribution</h4>
          </CardHeader>
          <CardContent>
            {customerDuesDistribution.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={customerDuesDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {customerDuesDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => [`Rs. ${value.toFixed(2)}`, "Amount"]} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex justify-center items-center h-[300px]">
                <p className="text-gray-500">No customers with dues</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Product Inventory Status */}
        <Card className="bg-white dark:bg-gray-800 rounded-2xl">
          <CardHeader>
            <h4 className="heading-4">Product Inventory Status</h4>
          </CardHeader>
          <CardContent>
            {productInventoryData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={productInventoryData} layout="vertical">
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={100} tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="quantity" fill="#2563EB" name="Current Quantity" />
                  <Bar dataKey="alertQuantity" fill="#DC2626" name="Alert Quantity" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex justify-center items-center h-[300px]">
                <p className="text-gray-500">No product data available</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 grid-cols-1 gap-4 mb-6">
        <Card>
          <CardHeader>
            <h4 className="heading-4">Recent Sales</h4>
          </CardHeader>
          <CardContent>
            <DataTable
              pagination={false}
              selectable={false}
              columns={DashboardRecentSalesColumns}
              rows={sales.slice(0, 5)} // Show only 5 most recent sales
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h4 className="heading-4">Customers</h4>
          </CardHeader>
          <CardContent>
            <DataTable
              isLoading={isLoading}
              actions={actions}
              pagination={false}
              selectable={false}
              columns={dashboardCustomerColumns}
              rows={customers}
            />
          </CardContent>
        </Card>
      </div>

      {(lowStockProducts.length > 0 || customersWithDues.length > 0) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {lowStockProducts.length > 0 && (
            <AlertCard title="⚠️ Low Stock Alerts" items={lowStockProducts} type="warning" />
          )}

          {customersWithDues.length > 0 && (
            <AlertCard title="🔴 Customers With Dues" items={customersWithDues} type="danger" />
          )}
        </div>
      )}
      <GeminiChat/>
    </div>
  )
}

export default Home
