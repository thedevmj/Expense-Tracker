import React, { useMemo, useState } from "react";
import BasicDatePicker from "./Picker";
import dayjs from "dayjs";
import ExpenseSearch from "./ExpenseSearch";

export default function TrackDisplay({ expenses }) {
  const [selectedDate, setselectedDate] = useState(dayjs());

  const filterExpenses = useMemo(() => {
    return expenses.filter (exp => 
     exp.date === selectedDate.format("DD-MM-YYYY")
  );
  }, [expenses, selectedDate]);

  const total = filterExpenses.reduce((sum, exp) => sum + exp.amount, 0);

  console.log(filterExpenses);

  return (
    <div className="content">
      <BasicDatePicker value={selectedDate} onChange={setselectedDate} />

      <p>{selectedDate.format("DD-MM-YYYY")}</p>
      {
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
            {expenses.map((exp) => (
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
      }
    </div>
  );
}
