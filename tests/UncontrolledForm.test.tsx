import { render, screen, fireEvent } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import { UncontrolledForm } from "../src/features/auth/components/RegisterForm/uncontrolled";

test("Debería capturar y mostrar los valores del formulario", () => {
  const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});

  render(<UncontrolledForm />);

  const nameInput = screen.getByLabelText(/nombre/i) as HTMLInputElement;
  const emailInput = screen.getByLabelText(/email/i) as HTMLInputElement;
  const submitButton = screen.getByRole("button", { name: /enviar/i });

  nameInput.setAttribute("value", "Juan");
  emailInput.setAttribute("value", "juan@example.com");

  fireEvent.submit(submitButton);

  expect(consoleSpy).toHaveBeenCalledWith("Nombre:", "Juan");
  expect(consoleSpy).toHaveBeenCalledWith("Email:", "juan@example.com");

  consoleSpy.mockRestore();
});
