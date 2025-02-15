import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import Home from "../../app/page";
import Providers from "../../app/providers"; // Importa Providers
import { mockWeatherData } from "../mocks/weatherDataMock";

jest.mock("axios");
const mockAxios = axios as jest.Mocked<typeof axios>;

describe("Home Page", () => {
  beforeEach(() => {
    mockAxios.get.mockClear();
  });

  test("muestra el título en la página", () => {
    render(
      <Providers>
        <Home />
      </Providers>
    );
    expect(screen.getByText("¿Cómo está el clima en tu ciudad?")).toBeInTheDocument();
  });

  test("muestra los datos del clima correctamente tras una búsqueda exitosa", async () => {
    mockAxios.get.mockResolvedValueOnce({ data: mockWeatherData });

    render(
      <Providers>
        <Home />
      </Providers>
    );

    fireEvent.change(screen.getByPlaceholderText("Ingrese una ciudad"), {
      target: { value: "Ciudad Ejemplo" },
    });

    fireEvent.click(screen.getByRole("button", { name: /buscar/i }));

    await waitFor(() => expect(mockAxios.get).toHaveBeenCalledTimes(1));

    await waitFor(() => {
      expect(screen.getByText(/Ciudad Ejemplo, EX/i)).toBeInTheDocument();
      expect(screen.getByText(/Temperatura: 25°C/i)).toBeInTheDocument();
    });
  });

  test("muestra un mensaje de error cuando la ciudad no es encontrada", async () => {
    mockAxios.get.mockRejectedValueOnce(new Error("Ciudad no encontrada"));

    render(
      <Providers>
        <Home />
      </Providers>
    );

    const input = screen.getByPlaceholderText("Ingrese una ciudad");
    const button = screen.getByRole("button", { name: /buscar/i });

    fireEvent.change(input, { target: { value: "Ciudad Desconocida" } });
    fireEvent.click(button);

    await waitFor(() => expect(mockAxios.get).toHaveBeenCalledTimes(1));

    await waitFor(() => {
      expect(screen.getByText(/ciudad no encontrada/i)).toBeInTheDocument();
    });
  });
});
