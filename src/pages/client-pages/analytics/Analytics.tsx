import SalesAnalytics from '@/components/shared/SalesAnalytics'
import { useMainContext } from '@/context/MainContext'
import { MainContextType } from '@/types'
import React from 'react'

const Analytics = () => {
     const {  sales } = useMainContext() as MainContextType
  return (
        <div className="mb-6 p-5">
         <SalesAnalytics sales={sales} />
       </div>
  )
}

export default Analytics