import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { sortOptions } from "../constants/sortOptions";

export default function SortSelector({ value, onChange }) {
  return (
    <Autocomplete
      options={sortOptions}
      groupBy={(option) => option.group}
      getOptionLabel={(option) => option.label}
      isOptionEqualToValue={(option, value) =>
        option.value === value.value
      }
      value={value}
      onChange={(newValue) =>
        onChange(newValue?.value ?? "latest")
      }
      sx={{ width: 300 }}
      renderInput={(params) => (
        <TextField {...params} label="Sort Expenses By" />
      )}
    />
  );
}
