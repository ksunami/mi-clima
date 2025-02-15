"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./store/store";
import { setCity } from "./store/citySlice";
import { Container, Box, CssBaseline } from "@mui/material";
import TitleComponent from "./components/TitleComponent/TitleComponent";
import SearchInputComponent from "./components/SearchInputComponent/SearchInputComponent";
import ErrorMessageComponent from "./components/ErrorMessageComponent/ErrorMessageComponent";
import WeatherResponseComponent from "./components/WeatherResponseComponent/WeatherResponseComponent";
import { fetchWeatherData } from "./services/weatherService"; 
import { useState, useEffect } from "react";

const Home = () => {
  const dispatch = useDispatch();
  const city = useSelector((state: RootState) => state.city.cityName);
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  // 🎯 Resetea el error cuando la ciudad cambia
  useEffect(() => {
    if (city.trim() !== "") {
      setError("");
    }
  }, [city]);

  const fetchWeather = async () => {
    const trimmedCity = city.trim();

    if (!trimmedCity) {
      setWeather(null); // 💡 Borra los resultados ANTES de mostrar el error
      setError("El campo no puede estar vacío.");
      return;
    }

    setError("");

    try {
      const weatherData = await fetchWeatherData(trimmedCity); // 🆕 Usamos el servicio aquí
      setWeather(weatherData);
    } catch (err: any) {
      setWeather(null); // 💡 Elimina los resultados si la ciudad no se encuentra
      setError(err.message); // Muestra el mensaje de error del servicio
    }
  };

  return (
    <Box className="flex flex-col items-center justify-start min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6">
      <CssBaseline />
      <Container maxWidth="md">
        <TitleComponent />
        <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 2, marginTop: 4 }}>
          <SearchInputComponent city={city} setCity={(value) => dispatch(setCity(value))} fetchWeather={fetchWeather} />
        </Box>
        <ErrorMessageComponent error={error} />
        {weather && !error && <WeatherResponseComponent weather={weather} />}
      </Container>
    </Box>
  );
};

export default Home;
