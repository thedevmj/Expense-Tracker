import React, { useEffect, useState } from "react";


export default function Expense_Card({ expenses, onDelete, onUpdate }) {
  const [isEditing, setisEditing] = useState(false);
  const [title, settitle] = useState("");
  const [amount, setamount] = useState("");
  const [category, setcategory] = useState("");

  useEffect(() => {
    settitle(expenses.title)
    setcategory(expenses.category)
    setamount(expenses.amount)
  }, [expenses]);

  const submitHandler=(e)=>{
    e.preventDefault();
    onUpdate(expenses.id,title,category,amount);
    setisEditing(false);
  }
  return (
  <div className="expense-card mb-3">
    {!isEditing ? (
      /* VIEW CARD */
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{expenses.title}</h5>
          <h6 className="card-subtitle mb-2 text-muted">
            Date: {expenses.date}
          </h6>
          <p className="card-text">Category: {expenses.category}</p>
          <p className="card-text">Amount: ₹{expenses.amount}</p>

          <button
            className="btn btn-sm btn-primary me-2"
            onClick={() => setisEditing(true)}
          >
            Edit
          </button>
          <button
            className="btn btn-sm btn-danger"
            onClick={() => onDelete(expenses.id)}
          >
            Delete
          </button>
        </div>
      </div>
    ) : (
      /* EDIT CARD */
      <div className="card border-warning">
        <div className="card-body">
          <h5 className="card-title text-warning">Edit Expense</h5>

          <form onSubmit={submitHandler}>
            <div className="mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Title"
                value={title}
                onChange={(e) => settitle(e.target.value)}
              />
            </div>

            <div className="mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Category"
                value={category}
                onChange={(e) => setcategory(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <input
                type="number"
                className="form-control"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setamount(e.target.value)}
              />
            </div>

            <button type="submit" className="btn btn-success me-2">
              Update
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => setisEditing(false)}
            >
              Cancel
            </button>
          </form>
        </div>
         </div>
    )}
  </div>
);
}