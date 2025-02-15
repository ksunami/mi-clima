import { render, screen } from "@testing-library/react";
import WeatherResponseComponent from "../../app/components/WeatherResponseComponent/WeatherResponseComponent";
import { mockWeatherData } from "../mocks/weatherDataMock";

describe("WeatherResponseComponent", () => {
  test("muestra el nombre de la ciudad y el país", () => {
    render(<WeatherResponseComponent weather={mockWeatherData} />);
    expect(screen.getByText("Ciudad Ejemplo, EX")).toBeInTheDocument();
  });

  test("muestra la temperatura", () => {
    render(<WeatherResponseComponent weather={mockWeatherData} />);
    expect(screen.getByText("Temperatura: 25°C")).toBeInTheDocument();
  });

  // 🆕 Nueva prueba para verificar que muestra la presión atmosférica
  test("muestra la presión atmosférica", () => {
    render(<WeatherResponseComponent weather={mockWeatherData} />);
    expect(screen.getByText("Presión: 1012 hPa")).toBeInTheDocument();
  });

  // 🆕 Nueva prueba para verificar el ícono del clima
  test("muestra el ícono del clima correctamente", () => {
    render(<WeatherResponseComponent weather={mockWeatherData} />);
    const weatherIcon = screen.getByAltText(mockWeatherData.weather[0].description);
    expect(weatherIcon).toBeInTheDocument();
  });
  
});
