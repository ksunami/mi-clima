import { render, screen } from "@testing-library/react";
import TitleComponent from "../../app/components/TitleComponent/TitleComponent";

describe("TitleComponent", () => {
  test("muestra el título correctamente", () => {
    render(<TitleComponent />);
    expect(screen.getByText("¿Cómo está el clima en tu ciudad?")).toBeInTheDocument();
  });
});