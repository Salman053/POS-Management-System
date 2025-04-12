import React, { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import { X } from 'lucide-react'

type FloatingAlertProps = {
  message: string
  type: 'warning' | 'danger'
  onDismiss: () => void
}

const FloatingAlert: React.FC<FloatingAlertProps> = ({ message, type, onDismiss }) => {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false)
      onDismiss() // Remove alert after 5 seconds
    }, 5000) // Auto dismiss after 5 seconds

    return () => clearTimeout(timer)
  }, [onDismiss])

  if (!visible) return null

  const colorClass =
    type === 'warning'
      ? 'bg-yellow-500 text-yellow-800 border-yellow-700'
      : 'bg-red-500 text-red-800 border-red-700'

  return (
    <div className="fixed top-4 right-4 z-50 w-80 max-w-xs space-y-2">
      <Card className={`border-l-4 ${colorClass} shadow-lg`}>
        <div className="flex justify-between items-center p-3">
          <div>
            <strong>{message}</strong>
          </div>
          <button
            onClick={() => {
              setVisible(false)
              onDismiss()
            }}
            className="p-1 rounded-full hover:bg-opacity-10 transition-all duration-200"
          >
            <X size={16} />
          </button>
        </div>
      </Card>
    </div>
  )
}

export default FloatingAlert
