import React from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

type AlertCardProps = {
  title: string
  items: Array<any> // You can refine this to a specific type if needed, e.g. ProductType or CustomerType
  type: 'warning' | 'danger'
}

const AlertCard: React.FC<AlertCardProps> = ({ title, items, type }) => {
  const colorClass =
    type === 'warning'
      ? 'border-yellow-500 bg-yellow-50 text-yellow-800 dark:bg-yellow-100/10 dark:text-yellow-200'
      : 'border-red-500 bg-red-50 text-red-800 dark:bg-red-100/10 dark:text-red-200'

  return (
    <Card className={`border-l-4 ${colorClass}`}>
      <CardHeader>
        <h3 className="font-semibold">{title}</h3>
      </CardHeader>
      <CardContent>
        <ul className="list-disc pl-4">
          {items.map((item, index) => (
            <li key={index}>{item.productName || item.customerName} – {item.quantity || `Rs.  ${item.totalDues.toLocaleString()}`}</li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

export default AlertCard
