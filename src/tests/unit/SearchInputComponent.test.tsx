import { render, screen, fireEvent } from "@testing-library/react";
import SearchInputComponent from "../../app/components/SearchInputComponent/SearchInputComponent";

describe("SearchInputComponent", () => {
  let setCityMock: jest.Mock;
  let fetchWeatherMock: jest.Mock;

  beforeEach(() => {
    setCityMock = jest.fn();
    fetchWeatherMock = jest.fn();
  });

  test("permite escribir en el campo de entrada", () => {
    render(<SearchInputComponent city="" setCity={setCityMock} fetchWeather={fetchWeatherMock} />);
    
    const input = screen.getByPlaceholderText("Ingrese una ciudad");
    fireEvent.change(input, { target: { value: "Madrid" } });

    expect(setCityMock).toHaveBeenCalledWith("Madrid");
  });

  test("no permite caracteres especiales en la entrada", () => {
    render(<SearchInputComponent city="" setCity={setCityMock} fetchWeather={fetchWeatherMock} />);

    const input = screen.getByPlaceholderText("Ingrese una ciudad");
    fireEvent.change(input, { target: { value: "Madrid!@#$" } });

    expect(setCityMock).not.toHaveBeenCalled();
    expect(screen.getByText("Solo se permiten letras y espacios válidos.")).toBeInTheDocument();
  });

  test("trim elimina espacios en blanco al inicio y final", () => {
    render(<SearchInputComponent city="  Madrid  " setCity={setCityMock} fetchWeather={fetchWeatherMock} />);
    
    const input = screen.getByPlaceholderText("Ingrese una ciudad");
    fireEvent.blur(input); 

    expect(setCityMock).toHaveBeenCalledWith("Madrid");
  });

  test("evita múltiples espacios consecutivos", () => {
    render(<SearchInputComponent city="" setCity={setCityMock} fetchWeather={fetchWeatherMock} />);

    const input = screen.getByPlaceholderText("Ingrese una ciudad");
    fireEvent.change(input, { target: { value: "Nueva   York" } });

    expect(setCityMock).not.toHaveBeenCalled();
    expect(screen.getByText("Solo se permiten letras y espacios válidos.")).toBeInTheDocument();
  });

  test("ejecuta la búsqueda cuando se presiona Enter", () => {
    render(<SearchInputComponent city="Madrid" setCity={setCityMock} fetchWeather={fetchWeatherMock} />);

    fireEvent.keyDown(screen.getByPlaceholderText("Ingrese una ciudad"), { key: "Enter", code: "Enter" });

    expect(fetchWeatherMock).toHaveBeenCalled();
  });

  test("deshabilita el botón si la ciudad está vacía", () => {
    render(<SearchInputComponent city="" setCity={setCityMock} fetchWeather={fetchWeatherMock} />);
    
    const button = screen.getByRole("button", { name: /buscar/i });
    expect(button).toBeDisabled();
  });

  test("evita la búsqueda si solo se ingresan espacios en blanco", () => {
    render(<SearchInputComponent city="   " setCity={setCityMock} fetchWeather={fetchWeatherMock} />);
  
    const button = screen.getByRole("button", { name: /buscar/i });
    fireEvent.click(button);
  
    expect(fetchWeatherMock).not.toHaveBeenCalled();
  });

  test("evita la búsqueda si se ingresan caracteres especiales", () => {
    render(<SearchInputComponent city="!@#$%^&*" setCity={setCityMock} fetchWeather={fetchWeatherMock} />);
  
    const button = screen.getByRole("button", { name: /buscar/i });
    fireEvent.click(button);
  
    expect(fetchWeatherMock).not.toHaveBeenCalled();
  });

  test("muestra un mensaje de error si la entrada es inválida", () => {
    render(<SearchInputComponent city="@@@@" setCity={setCityMock} fetchWeather={fetchWeatherMock} />);
  
    fireEvent.change(screen.getByPlaceholderText("Ingrese una ciudad"), { target: { value: "@@@" } });

    expect(screen.getByText("Solo se permiten letras y espacios válidos.")).toBeInTheDocument();
  });

  test("habilita el botón de búsqueda cuando la entrada es válida", () => {
    render(<SearchInputComponent city="Madrid" setCity={setCityMock} fetchWeather={fetchWeatherMock} />);
    
    const button = screen.getByRole("button", { name: /buscar/i });
    expect(button).not.toBeDisabled();
  });

  test("no llama a fetchWeather si hay errores en la entrada", () => {
    render(<SearchInputComponent city="123" setCity={setCityMock} fetchWeather={fetchWeatherMock} />);
    
    const button = screen.getByRole("button", { name: /buscar/i });
    fireEvent.click(button);

    expect(fetchWeatherMock).not.toHaveBeenCalled();
  });

  test("llama a fetchWeather si la entrada es válida", () => {
    render(<SearchInputComponent city="Madrid" setCity={setCityMock} fetchWeather={fetchWeatherMock} />);
    
    const button = screen.getByRole("button", { name: /buscar/i });
    fireEvent.click(button);

    expect(fetchWeatherMock).toHaveBeenCalled();
  });

  test("muestra mensaje de error si la entrada es inválida", () => {
    render(<SearchInputComponent city="1234" setCity={setCityMock} fetchWeather={fetchWeatherMock} />);
    
    const button = screen.getByRole("button", { name: /buscar/i });
    fireEvent.click(button);
  
    expect(screen.getByText("Ingrese una ciudad válida.")).toBeInTheDocument();
    expect(fetchWeatherMock).not.toHaveBeenCalled();
  });

  test("corrige el error cuando se introduce una entrada válida", () => {
    render(<SearchInputComponent city="123" setCity={setCityMock} fetchWeather={fetchWeatherMock} />);

    const input = screen.getByPlaceholderText("Ingrese una ciudad");
    fireEvent.change(input, { target: { value: "Madrid" } });

    expect(screen.queryByText("Ingrese una ciudad válida.")).not.toBeInTheDocument();
  });

  test("ejecuta la búsqueda correctamente si la entrada es válida", () => {
    render(<SearchInputComponent city="Madrid" setCity={setCityMock} fetchWeather={fetchWeatherMock} />);
    
    const button = screen.getByRole("button", { name: /buscar/i });
    fireEvent.click(button);
  
    expect(fetchWeatherMock).toHaveBeenCalled();
    expect(screen.queryByText("Ingrese una ciudad válida.")).not.toBeInTheDocument();
  });

  test("evita la búsqueda si se presiona una tecla inválida", () => {
    render(<SearchInputComponent city="Madrid" setCity={setCityMock} fetchWeather={fetchWeatherMock} />);

    const input = screen.getByPlaceholderText("Ingrese una ciudad");
    fireEvent.keyDown(input, { key: "Escape", code: "Escape" });

    expect(fetchWeatherMock).not.toHaveBeenCalled();
  });

  // Ajuste: ya no se espera mensaje de error tras el blur para entrada vacía
  test("no muestra mensaje de error si la entrada está vacía después de blur", () => {
    render(<SearchInputComponent city="" setCity={setCityMock} fetchWeather={fetchWeatherMock} />);
    
    const input = screen.getByPlaceholderText("Ingrese una ciudad");
    fireEvent.blur(input);

    // Ahora se espera que no aparezca ningún mensaje de error
    expect(screen.queryByText("El campo no puede estar vacío.")).not.toBeInTheDocument();
  });
});
