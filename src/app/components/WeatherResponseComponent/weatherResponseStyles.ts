import { SxProps, Theme } from "@mui/material";

export const weatherCardStyles: SxProps<Theme> = {
  marginTop: 3,
  padding: 2,
  backgroundColor: "white",
  borderRadius: 2,
};

export const typographyStyles: SxProps<Theme> = {
  fontWeight: "bold",
  fontSize: "1.5rem",
  marginBottom: 2,
};

export const infoTypographyStyles: SxProps<Theme> = {
  display: "flex",
  alignItems: "center",
  marginBottom: 1,
};

export const sectionTitleStyles: SxProps<Theme> = {
  fontWeight: "bold",
  marginBottom: 2,
  color: "#0077cc",
};

export const iconStyles: SxProps<Theme> = {
  fontSize: 24,
  marginRight: 1,
};

// Estilos para la sección de información del clima (temperatura, sensación térmica, etc.)
export const tempInfoTypographyStyles: SxProps<Theme> = {
    display: "flex",
    flexDirection: "row", // Mantener los elementos en una fila
    alignItems: "center",
    gap: 2, // Aumento de separación horizontal entre los elementos
    flexWrap: "wrap", // Asegura que los elementos no se sobrepongan si el contenedor es pequeño
  };
  
  // Estilos para la sección que contiene la información de la temperatura
  export const tempInfoBoxStyles: SxProps<Theme> = {
    display: "flex",
    flexDirection: "column",
    gap: 1, // Separación entre los elementos de la temperatura
  };
  
  // Estilos para los íconos
  export const tempIconStyles: SxProps<Theme> = {
    fontSize: 20,
    color: "#3f51b5", // Color azul para la mínima
  };

  // Estilo adicional para los iconos de máxima
export const maxTempIconStyles: SxProps<Theme> = {
    fontSize: 20,
    color: "#e57373", // Color rojo para la máxima
  };