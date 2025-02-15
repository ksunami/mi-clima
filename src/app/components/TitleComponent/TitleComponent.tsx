import { Typography, Box } from "@mui/material";
import { titleStyles } from "./TitleComponent.styles"; 

const TitleComponent = () => {
  return (
    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>      
      <Typography sx={titleStyles}> 
        ¿Cómo está el clima en tu ciudad?
      </Typography>      
    </Box>
  );
};

export default TitleComponent;
