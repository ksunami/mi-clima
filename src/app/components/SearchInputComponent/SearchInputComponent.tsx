import { Button, TextField, Box, FormHelperText, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ErrorIcon from "@mui/icons-material/Error"; 
import { useState } from "react";
import { SearchInputComponentProps } from "../../interfaces/types";
import { textFieldStyles, buttonStyles, errorBoxStyles } from "./SearchInputComponent.styles";

/**
 * Valida si la entrada es una ciudad válida:
 * - Solo permite letras y espacios.
 * - No permite múltiples espacios consecutivos.
 * - No permite espacios en blanco al inicio o final.
 */
const isValidCity = (input: string) => /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(input) && !/\s{2,}/.test(input);

const SearchInputComponent: React.FC<SearchInputComponentProps> = ({ city, setCity, fetchWeather }) => {
  const [error, setError] = useState<string | null>(null);
  const [weather, setWeather] = useState(null);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      validateAndFetch();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
  
    // Permitir que el usuario borre todo el texto
    if (value === "") {
      setCity("");
      setError(null);
      return;
    }
  
    // Validar solo si hay texto
    if (!isValidCity(value)) {
      setError("Solo se permiten letras y espacios válidos.");
      return;
    }
  
    setCity(value);
    setError(null);
  };
  
  

  const handleBlur = () => {
    const trimmedCity = city.trim();
    setCity(trimmedCity);
  
    if (trimmedCity === "") {      
      setWeather(null); // 💡 Limpia los resultados cuando se vacía el campo
    }
  };
  
  
  

  const validateAndFetch = () => {
    if (city.trim() === "") {
      setError("El campo no puede estar vacío.");
      return;
    }
    if (!isValidCity(city)) {
      setError("Ingrese una ciudad válida.");
      return;
    }
    setError(null);
    fetchWeather();
  };

  return (
    <Box display="flex" flexDirection="column" gap={1} marginBottom={2} width="100%" maxWidth={450}>
      <Box display="flex" gap={1} alignItems="center">
        <TextField
          variant="outlined"
          placeholder="Ingrese una ciudad"
          value={city}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          sx={{ ...textFieldStyles, flex: 1 }}
          error={!!error}
        />
        <Button
          variant="contained"
          onClick={validateAndFetch}
          sx={buttonStyles}
          startIcon={<SearchIcon />}
          disabled={city.trim() === "" || !!error}
        >
          Buscar
        </Button>
      </Box>

      {error && (
        <Box sx={errorBoxStyles}>
          <ErrorIcon sx={{ marginRight: "5px" }} />
          <Typography variant="body2">{error}</Typography>
        </Box>
      )}
    </Box>
  );
};

export default SearchInputComponent;
