import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function BasicDatePicker({ value, onChange }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label="Select Date"
        value={value}
        onChange={(newValue) => onChange(newValue)}
        slotProps={{
          textField: { size: "small" },
        }}
      />

      <button
        type="button"
        onClick={() => onChange(null)} 
        style={{ marginLeft: "8px" }}
      >
       Refresh
      </button>
    </LocalizationProvider>
  );
}
