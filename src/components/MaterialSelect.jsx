import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from '@mui/material/FormControl';
import Select from "@mui/material/Select";
import classes from "./MaterialSelect.module.css";

export default function MaterialSelect({ value, label, handleChange, options, name, disabled }) {
  return (
    <FormControl>
      <InputLabel id={`${label}-label`} className={classes.label}>{label}</InputLabel>
      <Select
        labelId={`${label}-label`}
        id={label}
        className={classes.select}
        value={value}
        name={name}
        label={label}
        disabled={disabled}
        onChange={handleChange}
      >
        {
           options.map((option, i) => {
             return name === "state" ? <MenuItem key={option.state_id} value={option.state_name}>{option.state_name}</MenuItem> : <MenuItem key={option.district_id} value={option.district_name}>{option.district_name}</MenuItem>
           })
        }
      </Select>
    </FormControl>
  );
}
