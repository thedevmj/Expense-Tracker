import React from 'react'

export default function Getmonthly_insight({expense}) {
 
 const total=expense.reduce((sum,exp)=>sum+=exp.amount  ,0)

 const food=expense.filter((exp)=>exp.category==="Food").reduce((sum,exp)=>sum+=exp.amount,0)
  const travel=expense.filter((exp)=>exp.category==="Travel").reduce((sum,exp)=>sum+=exp.amount,0)
  const transport=expense.filter((exp)=>exp.category==="Transport").reduce((sum,exp)=>sum+=exp.amount,0)
  const shopping=expense.filter((exp)=>exp.category==="Shopping").reduce((sum,exp)=>sum+=exp.amount,0)
  const bills=expense.filter((exp)=>exp.category==="Bills").reduce((sum,exp)=>sum+=exp.amount,0)
  const others=expense.filter((exp)=>exp.category==="Others").reduce((sum,exp)=>sum+=exp.amount,0)
  
  return (
    <div>
      
    </div>
  )
}
