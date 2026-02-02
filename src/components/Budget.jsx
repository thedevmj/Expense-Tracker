import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import BasicDatePicker from "./Picker";

export default function Budget({ expenses }) {
  const [budget, setBudget] = useState(null);
  const [amount, setAmount] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const isRangeComplete = startDate && endDate;

  const budgetObj = {
    amount,
    startDate,
    endDate
  };

  // single date picker → double state logic
  const handleDateChange = (newDate) => {
    if (!startDate) {
      setStartDate(newDate);
      return;
    }

    if (!endDate) {
      if (newDate.isBefore(startDate)) {
        setEndDate(startDate);
        setStartDate(newDate);
      } else {
        setEndDate(newDate);
      }
      return;
    }

    // reset on third click
    setStartDate(newDate);
    setEndDate(null);
  };

  // load saved budget
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("budget"));
    if (saved) {
      setBudget(saved);
      setAmount(saved.amount);
      setStartDate(dayjs(saved.startDate));
      setEndDate(dayjs(saved.endDate));
    }
  }, []);

  // save budget
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isRangeComplete || !amount) return;

    localStorage.setItem("budget", JSON.stringify(budgetObj));
    setBudget(budgetObj);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="page-content">
          <div className="expense-form">
            <h1 style={{ fontFamily: "-apple-system" }}>Budget</h1>

            <input
              type="text"
              placeholder="Enter Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />

            <BasicDatePicker
              value={endDate || startDate}
              onChange={handleDateChange}
            />

            <p style={{ fontSize: "12px", color: "#666" }}>
              {!startDate && "Select start date"}
              {startDate && !endDate && "Select end date"}
              {isRangeComplete && "Date range selected"}
            </p>

            <button type="submit" disabled={!isRangeComplete}>
              Save Budget
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
