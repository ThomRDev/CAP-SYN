import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, Mock, test, vi } from "vitest";
import { BrowserRouter } from "react-router"; // Necesario para <Link>
import "@testing-library/jest-dom";
import { useAuth } from "../src/features/auth/hooks/useAuth";
import LoginForm from "../src/LoginForm";

vi.mock("../src/features/auth/hooks/useAuth", () => ({
  useAuth: vi.fn(),
}));

describe("LoginForm", () => {
  let mockStartLogin = vi.fn();
  const useAuthMock = useAuth as Mock;
  beforeEach(() => {
    mockStartLogin = vi.fn();
    useAuthMock.mockReturnValue({ startLogin: mockStartLogin });
  });

  const setup = () => {
    render(
      <BrowserRouter>
        <LoginForm />
      </BrowserRouter>
    );
  };

  test("debería renderizar el formulario de inicio de sesión", () => {
    setup();

    expect(
      screen.getByRole("heading", { name: /Iniciar Sesión/i })
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Contraseña/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Iniciar Sesión/i })
    ).toBeInTheDocument();
  });

  test("debería mostrar errores de validación si se envía vacío", async () => {
    setup();

    fireEvent.click(screen.getByRole("button", { name: /Iniciar Sesión/i }));

    await waitFor(() => {
      expect(screen.getByText(/El email es obligatorio/i)).toBeInTheDocument();
      expect(
        screen.getByText(/La contraseña es obligatoria/i)
      ).toBeInTheDocument();
    });
  });

  test("debería llamar a startLogin con credenciales válidas", async () => {
    setup();

    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Contraseña/i), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Iniciar Sesión/i }));

    await waitFor(() => {
      expect(mockStartLogin).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "password123",
      });
    });
  });
});
