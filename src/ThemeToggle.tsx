import { useContext } from "react";
import { UIContext } from "./context/ui/UIContext";

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useContext(UIContext);

  return (
    <div className="flex items-center justify-center p-8">
      <button
        onClick={toggleTheme}
        className={`relative inline-flex h-6 w-12 items-center rounded-full transition-colors duration-300 ${
          isDark ? "bg-blue-600" : "bg-gray-200"
        }`}
        aria-pressed={isDark}
      >
        <span
          className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform duration-300 ${
            isDark ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );
};

export default ThemeToggle;
