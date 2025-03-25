import { render, screen, fireEvent } from "@testing-library/react";
import { UIProvider } from "./context/ui/UIProvider";
import ThemeToggle from "./ThemeToggle";
import { describe, expect, test } from "vitest";
import "@testing-library/jest-dom";
describe("ThemeToggle", () => {
  test("should render and show the light theme initially", () => {
    render(
      <UIProvider>
        <ThemeToggle />
      </UIProvider>
    );

    const button = screen.getByRole("button");
    expect(button).toHaveClass("bg-gray-200");
  });

  test("should toggle to dark theme on click", () => {
    render(
      <UIProvider>
        <ThemeToggle />
      </UIProvider>
    );

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(button).toHaveClass("bg-blue-600");
    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });

  test("should toggle back to light theme on second click", () => {
    render(
      <UIProvider>
        <ThemeToggle />
      </UIProvider>
    );

    const button = screen.getByRole("button");
    fireEvent.click(button);
    fireEvent.click(button);

    expect(button).toHaveClass("bg-gray-200");
    expect(document.documentElement.classList.contains("dark")).toBe(false);
  });
});
