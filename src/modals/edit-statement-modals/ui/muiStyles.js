import { makeStyles } from "@material-ui/core/styles";
import { createTheme } from "@material-ui/core/styles";

export const theme = createTheme({
  overrides: {
    MuiPickersToolbar: {
      toolbar: {
        backgroundColor: "#01a19f",
      },
    },
    MuiButton: { label: { color: "#01a19f" } },
    MuiPickersDay: {
      daySelected: { backgroundColor: "#01a19f", "&:hover": { backgroundColor: "#01a19f" } },
    },
    MuiPickersClockPointer: {
      pointer: { backgroundColor: "#01a19f" },
      noPoint: { backgroundColor: "#01a19f" },
      thumb: { border: "14px solid", borderColor: "#01a19f" },
    },
    MuiPickersClock: { pin: { backgroundColor: "#01a19f" } },
  },
});

export const useStyles = makeStyles(() => ({
  root: {
    "& .MuiFormLabel-root.Mui-focused": {
      color: "#01a19f",
    },
    "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "#01a19f",
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#01a19f",
    },
  },
  title: {
    width: "100%",
    marginBottom: "10px",
  },
  params: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "10px",
  },
  select: {
    width: "200px",
    height: "40px",
  },
  date: {
    width: "175px",
  },
  time: {
    width: "161px",
  },
  description: {
    width: "100%",
  },
  saveButton: {
    boxShadow: "none",
    textTransform: "uppercase",
    alignSelf: "center",
    color: "#fff",
    width: "120px",
    height: "30px",
    fontSize: "12px",
    backgroundColor: "#01A19F",
    "&:hover": {
      backgroundColor: "#01A19F",
    },
  },
}));
