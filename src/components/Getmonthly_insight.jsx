import { useRef, useEffect } from "react";
import { toast } from "react-toastify";
import Budget_Bar from "./Budget_Bar";

export default function Getmonthly_insight({ expense, budget }) {
  const warnedRef = useRef({});
 
  const CATEGORY_LIMITS = {
    Food: 0.4,
    Travel: 0.2,
    Transport: 0.15,
    Shopping: 0.15,
    Bills: 0.25,
    Others: 0.1,
  };

  useEffect(() => {
    if (!budget || expense.length === 0) return;

    const total = expense.reduce((sum, exp) => sum + exp.amount, 0);
    if (total === 0) return;

  const  percentageUsed = (total / budget) * 100;

    if (percentageUsed >= 100) {
      toast.error("Overall budget exceeded!");
    }

    const categoryTotals = expense.reduce((acc, exp) => {
      acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
      return acc;
    }, {});

    Object.entries(categoryTotals).forEach(([category, amount]) => {
      const limitRatio = CATEGORY_LIMITS[category];
      if (!limitRatio) return;

      const categoryLimit = budget * limitRatio;

      if (amount >= categoryLimit && !warnedRef.current[category]) {
        toast.warn(
          `⚠️ ${category} reached ${Math.round(
            (amount / categoryLimit) * 100
          )}% of its budget`
        );

        warnedRef.current[category] = true;
      }
    });
  }, [expense, budget]);

  return (
    <>
      </>
  );
}
