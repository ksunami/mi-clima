import { Card, CardContent, Typography, Box, Divider } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import AirIcon from "@mui/icons-material/Air";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CloudIcon from "@mui/icons-material/Cloud";
import CircleIcon from "@mui/icons-material/Circle"; 
import { WeatherResponseComponentProps } from "../../interfaces/types";

import {
  weatherCardStyles,
  typographyStyles,
  infoTypographyStyles,
  iconStyles,
  sectionTitleStyles,
  tempInfoTypographyStyles,
  tempIconStyles,
  maxTempIconStyles,
} from "./weatherResponseStyles";

const WeatherResponseComponent: React.FC<WeatherResponseComponentProps> = ({
  weather,
}) => {
  const date = new Date();
  const sunrise = new Date(weather.sys.sunrise * 1000).toLocaleTimeString();
  const sunset = new Date(weather.sys.sunset * 1000).toLocaleTimeString();

  return (
    <Card sx={weatherCardStyles}>
      <CardContent>
        <Typography variant="h6" sx={sectionTitleStyles}>
          Resultados del clima en tu ciudad
        </Typography>

        <Typography variant="h5" sx={typographyStyles}>
          {weather.name}, {weather.sys.country}
        </Typography>

        {/* Información de la ubicación */}
        <Box sx={infoTypographyStyles}>
          <LocationOnIcon sx={iconStyles} />
          <Typography variant="body1">Latitud: {weather.coord.lat}°</Typography>
          <Typography variant="body1">
            Longitud: {weather.coord.lon}°
          </Typography>
        </Box>

        <Divider sx={{ marginY: 2 }} />

        {/* Condición del clima */}
        <Box sx={infoTypographyStyles}>
          <img
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
            alt={weather.weather[0].description}
            width={30}
            height={30}
          />
          <Typography variant="body1">
            {weather.weather[0].description}
          </Typography>
        </Box>

        <Divider sx={{ marginY: 2 }} />

        {/* Temperatura */}
        <Box sx={infoTypographyStyles}>
          <ThermostatIcon sx={tempIconStyles} />
          <Typography variant="body1">
            Temperatura: {weather.main.temp}°C
          </Typography>

          {/* Mínima */}
          <Box sx={tempInfoTypographyStyles}>
            <ArrowDownwardIcon sx={tempIconStyles} />
            <Typography variant="body1">
              Mínima: {weather.main.temp_min}°C
            </Typography>
          </Box>

          {/* Máxima */}
          <Box sx={tempInfoTypographyStyles}>
            <ArrowUpwardIcon sx={maxTempIconStyles} />
            <Typography variant="body1">
              Máxima: {weather.main.temp_max}°C
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ marginY: 2 }} />

        {/* Presión */}
        <Box sx={infoTypographyStyles}>
          <Typography variant="body1">
            Presión: {weather.main.pressure} hPa
          </Typography>
        </Box>

        {/* Humedad */}
        <Box sx={infoTypographyStyles}>
          <WaterDropIcon sx={iconStyles} />
          <Typography variant="body1">
            Humedad: {weather.main.humidity}%
          </Typography>
        </Box>

        <Divider sx={{ marginY: 2 }} />

        {/* Viento */}
        <Box sx={infoTypographyStyles}>
          <AirIcon sx={iconStyles} />
          <Typography variant="body1">
            Viento: {weather.wind.speed} m/s
          </Typography>
          <Typography variant="body1">
            Dirección: {weather.wind.deg}°
          </Typography>
        </Box>

        {/* Visibilidad */}
        <Box sx={infoTypographyStyles}>
          <VisibilityIcon sx={iconStyles} />
          <Typography variant="body1">
            Visibilidad: {weather.visibility / 1000} km
          </Typography>
        </Box>

        <Divider sx={{ marginY: 2 }} />

        {/* Nubes */}
        <Box sx={infoTypographyStyles}>
          <CloudIcon sx={iconStyles} />
          <Typography variant="body1">Nubes: {weather.clouds.all}%</Typography>
        </Box>

        <Divider sx={{ marginY: 2 }} />

        {/* Salida y puesta del sol */}
        <Box sx={infoTypographyStyles}>
          {/* Espacio entre los elementos */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <CircleIcon
              sx={{ marginRight: 1, fontSize: 30, color: "orange" }}
            />
            <Typography variant="body1">Amanecer: {sunrise}</Typography>
            {/* Espacio entre los dos */}
            <Box sx={{ flex: 1 }} /> {/* Esto crea un espacio flexible */}
            <CircleIcon sx={{ marginRight: 1, fontSize: 30, color: "red" }} />
            <Typography variant="body1">Puesta de sol: {sunset}</Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default WeatherResponseComponent;
