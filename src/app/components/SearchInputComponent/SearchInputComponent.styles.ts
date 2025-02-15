import { SxProps, Theme } from "@mui/system";

export const buttonStyles: SxProps<Theme> = {
  backgroundColor: "#4f84e6",
  padding: "10px 20px",
  fontSize: "14px",
  textTransform: "none",
  borderRadius: "30px",
  boxShadow: "none",
  transition: "background-color 0.3s ease",
  "&:hover": {
    backgroundColor: "#3a70c5",
  },
};

export const textFieldStyles: SxProps<Theme> = {
  backgroundColor: "#fff",
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#ccc",
    },
    "&:hover fieldset": {
      borderColor: "#aaa",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#4f84e6",
    },
  },
  fontSize: "14px",
  borderRadius: "5px",
};

export const errorBoxStyles: SxProps<Theme> = {
  display: "flex",
  alignItems: "center",
  backgroundColor: "#d32f2f",
  color: "white",
  padding: "8px 12px",
  borderRadius: "5px",
  fontSize: "14px",
  fontWeight: "bold",
  marginTop: "5px",
};
