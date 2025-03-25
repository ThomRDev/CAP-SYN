import { render, screen, waitFor } from "@testing-library/react";
import { ButtonComponent } from "../src/ButtonComponent";
import { expect, test } from "vitest";
import "@testing-library/jest-dom";
test("cambia el texto después de hacer clic", async () => {
  render(<ButtonComponent />);
  const button = screen.getByRole("button", { name: "Antes del clic" });

  button.click(); // Simula el clic normalmente

  // Espera que el texto del botón cambie
  await waitFor(
    () => {
      expect(
        screen.getByRole("button", { name: "Después del clic" })
      ).toBeInTheDocument();
    },
    { timeout: 2000 } // Asegura que espere lo suficiente
  );
});
