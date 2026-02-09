import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function BasicDatePicker({ value, onChange }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label="Select Budget Period"
        value={value}
        onChange={(newDate) => {
          console.log("📅 Picker selected:", newDate);
          onChange(newDate); 
        }}
        slotProps={{ textField: { size: "small" } }}
      />
      <button onClick={() => { onChange(null); }}>Clear</button>
    </LocalizationProvider>
  );
}
