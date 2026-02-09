import React, { useMemo } from "react";

export default function Budget_Bar({ expense = [], budget = 0 }) {
  const categoryTotals = useMemo(() => {
    return expense.reduce((acc, exp) => {
      if (!exp.category) return acc;

      acc[exp.category] =
        (acc[exp.category] || 0) + Number(exp.amount || 0);

      return acc;
    }, {});
  }, [expense]);

  const getColor = (percent) => {
    if (percent <= 50) return "#4CAF50";
    if (percent <= 75) return "#FFC107";
    if (percent <= 100) return "#F44336";
    return "#551c18";
  };

  const styles = {
  container: {
  width: "100%",
  maxWidth: "100vw",
  overflow: "hidden",
  boxSizing: "border-box",
  marginBottom: "20px",
},

  header: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontWeight: 500,
    marginBottom: "6px",
    minWidth: 0,
  },

  category: {
    flex: 1,
    minWidth: 0,
    textTransform: "capitalize",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },

  amount: {
    flexShrink: 0,
    fontSize: "13px",
    color: "#444",
    whiteSpace: "nowrap",
  },

  bar: {
    width: "100%",
    height: "14px",
    background: "#e0e0e0",
    borderRadius: "8px",
    overflow: "hidden",
  },

  progress: {
    height: "100%",
    borderRadius: "8px",
  },

  percent: {
    fontSize: "12px",
    marginTop: "4px",
    textAlign: "right",
    color: "#f2f2f4",
  },
};


  if (!expense.length) {
    return <p style={{ color: "#fffafa" }}>No expenses yet</p>;
  }

  return (
    <>
      {Object.entries(categoryTotals).map(([category, spent]) => {
        const percent = budget > 0 ? (spent / budget) * 100 : 0;
        const cappedPercent = Math.min(percent, 120);

        return (
          <div key={category} style={styles.containerx}>
            <div style={styles.header}>
              <span style={styles.category}>{category}</span>
              <span style={styles.amount}>
                ₹{spent} / ₹{budget}
              </span>
            </div>

            <div style={styles.bar}>
              <div
                style={{
                  ...styles.progress,
                  width: `${cappedPercent}%`,
                  backgroundColor: getColor(percent),
                }}
              />
            </div>

            <div style={styles.percent}>
              {percent.toFixed(0)}%
            </div>
          </div>
        );
      })}
    </>
  );
}
