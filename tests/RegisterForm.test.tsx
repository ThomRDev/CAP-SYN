import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { BrowserRouter } from "react-router";
import toast from "react-hot-toast";
import { RegisterForm } from "../src/features/auth/components/RegisterForm/RegisterForm";
import "@testing-library/jest-dom";

vi.mock("react-hot-toast", () => ({
  default: { promise: vi.fn() },
  promise: vi.fn(),
}));

describe("RegisterForm", () => {
  beforeEach(() => {
    vi.spyOn(toast, "promise");
  });

  test("debería enviar el formulario correctamente", async () => {
    render(
      <BrowserRouter>
        <RegisterForm />
      </BrowserRouter>
    );

    // Obtener los inputs por su label
    const nameInput = screen.getByLabelText("Nombre");
    const lastNameInput = screen.getByLabelText("Apellido");
    const emailInput = screen.getByLabelText("Correo Electrónico");
    const passwordInput = screen.getByLabelText("Contraseña");
    const confirmPasswordInput = screen.getByLabelText("Confirmar Contraseña");

    const submitButton = screen.getByRole("button", { name: /registrarse/i });

    fireEvent.change(nameInput, { target: { value: "Thom" } });
    fireEvent.change(lastNameInput, { target: { value: "Yorke" } });
    fireEvent.change(emailInput, { target: { value: "thom@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "securepassword" } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: "securepassword" },
    });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(toast.promise).toHaveBeenCalled();
    });
  });
});
