import React, { useMemo, useState } from "react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import BasicDatePicker from "./Picker";
import "./trackdisplay.css"

dayjs.extend(customParseFormat);

export default function TrackDisplay({ expenses }) {
  
  const [selectedDate, setSelectedDate] = useState(null);
  
  
  const filteredExpenses = useMemo(() => {
   if(!selectedDate) return expenses;
    return expenses.filter(
      (exp) => exp.date === selectedDate.format("DD-MM-YYYY"),
    );
  }, [expenses, selectedDate]);

  const total = filteredExpenses.reduce((sum, exp) => sum + exp.amount, 0);

  return (
    <div className="content">
  
      <BasicDatePicker value={selectedDate} onChange={setSelectedDate} />
      
      {

      filteredExpenses.length === 0 && selectedDate === null ? (
        <p>No expenses saved yet </p>
      ) : (
        <table className="table table-sm">
          <thead>
            <tr>
              <th>Date</th>
              <th>Title</th>
              <th>Category</th>
              <th>Amount</th>
            </tr>
          </thead>

          <tbody>

            {
           

            filteredExpenses.map((exp) => (
              <tr key={exp.id}>
                <td>{exp.date}</td>
                <td>{exp.title}</td>
                <td>{exp.category}</td>
                <td>₹{exp.amount}</td>
              </tr>
            ))}

            <tr>
              <td colSpan="3">
                <strong>Total Expense</strong>
              </td>
              <td>₹{total}</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
}
