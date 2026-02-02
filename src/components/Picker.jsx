import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { useState } from "react";

export default function BasicDatePicker({ onRangeSelect }) {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleDateChange = (newDate) => {
    //  First click → set start date
    if (!startDate) {
      setStartDate(newDate);
      return;
    }

    // Second click → set end date
    if (!endDate) {
      if (newDate.isBefore(startDate)) {
        // if user clicks earlier date, swap
        setEndDate(startDate);
        setStartDate(newDate);
      } else {
        setEndDate(newDate);
      }

      // notify parent when range is complete
      onRangeSelect?.({
        startDate: newDate.isBefore(startDate) ? newDate : startDate,
        endDate: newDate.isBefore(startDate) ? startDate : newDate
      });

      return;
    }

    //Third click → reset and start over
    setStartDate(newDate);
    setEndDate(null);
  };

  const resetDates = () => {
    setStartDate(null);
    setEndDate(null);
    onRangeSelect?.(null);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        <DatePicker
          label="Select Budget Period"
          value={endDate || startDate}
          onChange={handleDateChange}
          slotProps={{ textField: { size: "small" } }}
        />

        {/* UX helper text */}
        <span style={{ fontSize: "12px", color: "#666" }}>
          {!startDate && "Select start date"}
          {startDate && !endDate && "Select end date"}
          {startDate && endDate && "Date range selected"}
        </span>

        <button type="button" onClick={resetDates}>
          Reset
        </button>
      </div>
    </LocalizationProvider>
  );
}
