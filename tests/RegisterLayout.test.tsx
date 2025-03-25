import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import "@testing-library/jest-dom";
import { RegisterLayout } from "../src/components/templates/AuthLayout/RegisterLayout";
describe("RegisterLayout", () => {
  it("renderiza correctamente los children", () => {
    render(
      <RegisterLayout>
        <p>Contenido de prueba</p>
      </RegisterLayout>
    );

    expect(screen.getByText("Contenido de prueba")).toBeInTheDocument();
  });
});
