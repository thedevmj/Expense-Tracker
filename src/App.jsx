import { useEffect, useState } from "react";
import Expense_home from "./Expenseform";
import { Route, Routes } from "react-router-dom";
import Expense from "./components/Expense_List";
import "./styles.css";
import Navbar from "./components/Navbar";
import { Footer } from "./Footer";
import Aurora from "./components/Aurora";
import TrackDisplay from "./components/TrackDisplay";



function App() {
  const [expenses, setexpense] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("expenses");
    if (saved) {
      setexpense(JSON.parse(saved));
    }
  }, []);
  
 
  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = (expense) => {
    setexpense((prev) => [...prev, expense]);
  };

  const deleteByid = (id) => {
    setexpense((prev) => prev.filter((exp) => exp.id !== id));
  };

  const updateExpense = (id, title, category, amount, date) => {
    setexpense((prev) =>
      prev.map((exp) =>
        exp.id === id ? { ...exp, title, category, amount, date } : exp,
      ),
    );
  };

  return (
    <>
      <div className="app">
        <Navbar />

        
        
        <div className="page-wrapper">
          <Aurora
            colorStops={["#7cff67", "#B19EEF", "#5227FF"]}
            blend={0.5}
            amplitude={1.0}
            speed={1}
          />
          <div className="content">
            <Routes>
              <Route
                path="/expense"
                element={
                  <Expense
                    expenses={expenses}
                    onDelete={deleteByid}
                    onUpdate={updateExpense}
                  />
                }
              />
              <Route
                path="/"
                element={<Expense_home onAddExpense={addExpense} />}
              />
              <Route path="/Track_expense" element={<TrackDisplay expenses={expenses}/>}></Route>
            </Routes>
          </div>
         
          </div>
      </div>

      <Footer />
    </>
  );
}

export default App;
