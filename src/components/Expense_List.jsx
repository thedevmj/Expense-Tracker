
import React, { useEffect, useState } from 'react'
import Expense_home from '../Expenseform';
import Expense_Card from './Expense_Card';
import TrackDisplay from './TrackDisplay';

export default function Expense({ expenses ,onDelete,onUpdate,OnFetch}) {


    return (
       <>
       <div className='expense-list'>
       <h1 style={{fontFamily:'ui-serif',paddingRight:'50%',paddingLeft:'50%',paddingTop:"30px"}}>Expenses</h1>
    
        {expenses.length === 0 && <p>No Expenses saved </p>}
       
        {
         
            expenses.map((exp)=>(

                <Expense_Card key={exp.id} expenses={exp} onDelete={onDelete} onUpdate={onUpdate}/>
               
            ))
            
        }
        
       </div>
       </>
    )
}
