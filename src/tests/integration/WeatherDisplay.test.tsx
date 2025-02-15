import { render, screen } from "@testing-library/react";
import WeatherResponseComponent from "../../app/components/WeatherResponseComponent/WeatherResponseComponent";
import { mockWeatherData } from "../mocks/weatherDataMock";

describe("Weather Display", () => {
  test("muestra los datos del clima correctamente", () => {
    render(<WeatherResponseComponent weather={mockWeatherData} />);

    expect(screen.getByText("Ciudad Ejemplo, EX")).toBeInTheDocument();
    expect(screen.getByText("Temperatura: 25°C")).toBeInTheDocument();
    expect(screen.getByText("Humedad: 60%")).toBeInTheDocument();
  });
});
