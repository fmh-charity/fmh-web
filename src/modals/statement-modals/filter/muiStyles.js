import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(() => ({
  checkbox: {
    color: "#01A19F",
    "&.MuiCheckbox-colorSecondary.Mui-checked": {
      color: "#01A19F",
    },
  },
  saveButton: {
    boxShadow: "none",
    textTransform: "uppercase",
    alignSelf: "center",
    color: "#fff",
    width: "100%",
    height: "35px",
    fontSize: "12px",
    marginBottom: "20px",
    backgroundColor: "#01A19F",
    "&:hover": {
      backgroundColor: "#01A19F",
    },
  },
}));
