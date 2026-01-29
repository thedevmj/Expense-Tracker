
import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import Navbar from "./components/Navbar";
import dayjs from "dayjs";

export default function Expense_home({ onAddExpense }) {
  const savedExpense = localStorage.getItem("expenses");

  const [title, settitle] = useState("");
  const [amount, setamount] = useState("");
  const [category, setcategory] = useState("");
  const inputRef = useRef(null);
  
 function focus_after_input() {
    inputRef.current.focus();
 }

  const handlesubmit = (e) => {
    e.preventDefault();
    if (!title || !amount || !category) return;

    const newexpense = {
      id: crypto.randomUUID(),
      date: dayjs().format("DD-MM-YYYY"),
      category,
      title,
      amount: parseFloat(amount),

    };

    onAddExpense(newexpense);
    
    setamount("");
    setcategory("");
    settitle("");
    focus_after_input();
  };

  return (
    <div>
      <form onSubmit={handlesubmit}>
        <div className="page-content">
          <div className="expense-form">
            <h1
              style={{
                fontFamily: "Gravitas One"
              }}
            >
              Add Expense
            </h1>

            <p>Title : </p>
            <input
              type="text"
              ref={inputRef}
              placeholder="Enter Tiitle"
              value={title}
              onChange={(e) => {
                settitle(e.target.value);
              }}
            />
            <p>Category :</p>
            <input
              type="text"
              placeholder="Enter category"
              value={category}
              onChange={(e) => setcategory(e.target.value)}
            />
            <p>Amount :</p>
            <input
              type="text"
              placeholder="Enter Amount spend"
              value={amount}
              onChange={(e) => setamount(e.target.value)}
            />
            <button type="submit">Add expense</button>
          </div>
        </div>
        <div />
      </form>
    </div>
  );
}
