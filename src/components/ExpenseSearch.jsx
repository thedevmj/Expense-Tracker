import React, { useMemo, useState } from "react";
import SortSelector from "./CategorySelector";
import TrackDisplay from "./TrackDisplay";
import { sortOptions } from "../constants/sortOptions";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

export default function ExpenseSearch({ expenses }) {
  const [sortBy, setSortBy] = useState("latest");

  const selectedOption =
    sortOptions.find((option) => option.value === sortBy) || null;
  const sortExpenses = useMemo(() => {
    
    const collator = new Intl.Collator(undefined, {
      numeric: true,
      sensitivity: "base",
    });
   
    switch (sortBy) {
      case "latest":
        return [...expenses].sort(
          (a, b) =>
            dayjs(b.date, "DD-MM-YYYY").toDate() -
            dayjs(a.date, "DD-MM-YYYY").toDate(),
        );
      case "oldest":
        return [...expenses].sort(
          (a, b) =>
            dayjs(a.date, "DD-MM-YYYY").toDate() -
            dayjs(b.date, "DD-MM-YYYY").toDate(),
        );
      case "title-a-z":
        return [...expenses].sort((a, b) => collator.compare(a.title, b.title));
      case "category-a-z":
        return [...expenses].sort((a, b) =>
          collator.compare(a.category, b.category),
        );
      case "amount-lowest":
        return [...expenses].sort((a, b) => a.amount - b.amount);
      case "amount-highest":
        return [...expenses].sort((a, b) => b.amount - a.amount);
      default:
        return expenses;
    }
  }, [expenses, sortBy]);
  
  return (
    <div className="content" style={{ padding: "3rem" }}>
      <SortSelector value={selectedOption} onChange={(option)=>setSortBy(option.value)} />
      <TrackDisplay expenses={sortExpenses} />
    </div>
  );
}
