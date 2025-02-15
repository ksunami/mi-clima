import { render, screen } from "@testing-library/react";
import ErrorMessageComponent from "../../app/components/ErrorMessageComponent/ErrorMessageComponent";

describe("ErrorMessageComponent", () => {
  test("muestra el mensaje de error correctamente", () => {
    render(<ErrorMessageComponent error="Ciudad no encontrada. Intenta nuevamente." />);
    expect(screen.getByText(/ciudad no encontrada/i)).toBeInTheDocument();
  });

  test("no muestra el mensaje si no hay error", () => {
    render(<ErrorMessageComponent error={null} />);
    expect(screen.queryByText(/ciudad no encontrada/i)).not.toBeInTheDocument();
  });

  test("muestra el ícono de error cuando hay un mensaje", () => {
    render(<ErrorMessageComponent error="Error de prueba" />);
    expect(screen.getByTestId("ErrorIcon")).toBeInTheDocument();
  });
});
