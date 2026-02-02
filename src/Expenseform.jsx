import React, { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import Getmonthly_insight from "./components/Getmonthly_insight";

export default function Expense_home({ onAddExpense }) {
  const Default_categories = [
    { id: "food", name: "Food" },
    { id: "travel", name: "Travel" },
    { id: "transport", name: "Transport" },
    { id: "shopping", name: "Shopping" },
    { id: "bills", name: "Bills" },
    { id: "others", name: "Others" },
  ];

  const [title, settitle] = useState("");
  const [amount, setamount] = useState("");
  const [categories, setcategories] = useState(Default_categories);
  const [category, setcategory] = useState("");
  const [newcategory, setnewcategory] = useState("");
  const [showcategory, setshowcategory] = useState(false);

  const inputRef = useRef(null);

  // LOADINg categories ONCE
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("categories"));
    if (stored && stored.length > 0) {
      setcategories(stored);
    } else {
      localStorage.setItem("categories", JSON.stringify(Default_categories));
      setcategories(Default_categories);
    }
  }, []);

  const addnewcategory = () => {
    if (!newcategory.trim()) return;

    const exists = categories.some(
      (cat) => cat.name.toLowerCase() === newcategory.toLowerCase(),
    );
    if (exists) return;

    const categoryobject = {
      id: crypto.randomUUID(),
      name: newcategory.trim(),
    };

    const updatedCategories = [...categories, categoryobject];

    setcategories(updatedCategories);
    localStorage.setItem("categories", JSON.stringify(updatedCategories));

    setnewcategory("");
    setshowcategory(false);
  };

  function focus_after_input() {
    inputRef.current.focus();
  }

  const handlesubmit = (e) => {
    e.preventDefault();
    if (!title || !amount || !category) return;

    const newexpense = {
      id: crypto.randomUUID(),
      date: dayjs().format("DD-MM-YYYY"),
      category: category.toLocaleUpperCase(),
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
            <h1 style={{ fontFamily: "Gravitas One" }}>Add Expense</h1>

            <p>Title : </p>
            <input
              type="text"
              ref={inputRef}
              placeholder="Enter Tiitle"
              value={title}
              onChange={(e) => settitle(e.target.value)}
            />

            <p>Category :</p>
            <select
              className="glass-select"
              value={category}
              onChange={(e) => setcategory(e.target.value)}
            >
              <option value="">Select category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>

            {showcategory && (
              <div>
                <input
                  type="text"
                  placeholder="Enter Custom Category"
                  value={newcategory}
                  onChange={(e) => setnewcategory(e.target.value)}
                />
                <button
                  type="button"
                  className="glass-button"
                  onClick={addnewcategory}
                >
                  Add Category
                </button>
              </div>
            )}

            <button
              type="button"
              className="glass-button"
              onClick={() => setshowcategory(true)}
            >
              Custom Category
            </button>

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
      </form>
    </div>
  );
}
