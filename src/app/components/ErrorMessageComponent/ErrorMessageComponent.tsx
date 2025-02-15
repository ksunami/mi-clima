import { Typography, Box } from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error"; 
import { ErrorMessageComponentProps } from "../../interfaces/types";

const ErrorMessageComponent: React.FC<ErrorMessageComponentProps> = ({ error }) => {
  return error ? (
    <Box display="flex" alignItems="center" color="white" marginTop={2}>
      <ErrorIcon sx={{ marginRight: 1 }} />
      <Typography variant="body2">{error}</Typography>
    </Box>
  ) : null;
};

export default ErrorMessageComponent;
