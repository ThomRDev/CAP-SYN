import { describe, expect, it } from "vitest";
import { UIState } from "../src/context/ui/UIProvider";
import { UIReducer } from "../src/context/ui/UIReducer";

describe("UIReducer", () => {
  it("debe alternar el tema cuando se dispara la acción '[Ui] - toggle Theme'", () => {
    const initialState: UIState = { isDark: false };

    const newState = UIReducer(initialState, { type: "[Ui] - toggle Theme" });

    expect(newState.isDark).toBe(true);
  });

  it("debe retornar el estado actual si la acción no es reconocida", () => {
    const initialState: UIState = { isDark: false };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const newState = UIReducer(initialState, { type: "UNKNOWN_ACTION" as any });

    expect(newState).toEqual(initialState);
  });
});
