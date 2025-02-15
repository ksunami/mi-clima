import { renderWithRedux } from "../utils/test-utils";
import { screen, fireEvent, waitFor } from "@testing-library/react";
import Home from "../../app/page";
import mockAxios from "../mocks/axiosMock";
import { mockWeatherData } from "../mocks/weatherDataMock";

jest.mock("axios");

describe("Search Functionality", () => {
  test("muestra los datos del clima tras una búsqueda exitosa", async () => {
    mockAxios.get.mockResolvedValueOnce({ data: mockWeatherData });
    const initialState = { city: { cityName: "Ciudad Ejemplo" } };

    renderWithRedux(<Home />, { initialState });

    fireEvent.change(screen.getByPlaceholderText("Ingrese una ciudad"), {
      target: { value: "Ciudad Ejemplo" },
    });
    fireEvent.click(screen.getByText("Buscar"));

    await waitFor(() => {
      expect(screen.getByText(/Ciudad Ejemplo, EX/i)).toBeInTheDocument();
      expect(screen.getByText(/Temperatura: 25°C/i)).toBeInTheDocument();
    });
  });

  test("muestra mensaje de error cuando la ciudad no es encontrada", async () => {
    mockAxios.get.mockRejectedValueOnce(new Error("Ciudad no encontrada"));
    renderWithRedux(<Home />);

    fireEvent.change(screen.getByPlaceholderText("Ingrese una ciudad"), {
      target: { value: "Ciudad Error" },
    });   
  });

  test("maneja error de red correctamente", async () => {
    mockAxios.get.mockRejectedValueOnce(new Error("Error de red"));
    renderWithRedux(<Home />);

    fireEvent.change(screen.getByPlaceholderText("Ingrese una ciudad"), {
      target: { value: "Ciudad Desconocida" },
    });  
  });
});
