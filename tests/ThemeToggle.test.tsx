import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import "@testing-library/jest-dom";
import { UIContext } from "../src/context/ui/UIContext";
import ThemeToggle from "../src/ThemeToggle";

describe("ThemeToggle Component", () => {
  it("Se renderiza correctamente con el tema claro", () => {
    render(
      <UIContext.Provider value={{ isDark: false, toggleTheme: vi.fn() }}>
        <ThemeToggle />
      </UIContext.Provider>
    );
    // screen.debug();

    const button = screen.getByRole("button");
    expect(button).toHaveClass("bg-gray-200");
    expect(button).toHaveAttribute("aria-pressed", "false");
  });

  it("Se renderiza correctamente con el tema oscuro", () => {
    render(
      <UIContext.Provider value={{ isDark: true, toggleTheme: vi.fn() }}>
        <ThemeToggle />
      </UIContext.Provider>
    );

    const button = screen.getByRole("button");
    expect(button).toHaveClass("bg-blue-600");
    expect(button).toHaveAttribute("aria-pressed", "true");
  });

  it("Ejecuta toggleTheme al hacer clic", () => {
    const toggleThemeMock = vi.fn();

    render(
      <UIContext.Provider
        value={{ isDark: false, toggleTheme: toggleThemeMock }}
      >
        <ThemeToggle />
      </UIContext.Provider>
    );

    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(toggleThemeMock).toHaveBeenCalledTimes(1);
  });
});
