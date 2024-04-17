import { createContext } from "react";

export type ThemeContextType = {
  theme: string;
  setTheme: (s: string) => void;
};

function setDefault() {
  if (localStorage.getItem("theme") === null) {
    localStorage.setItem("theme", "light");
    return "light";
  } else {
    return localStorage.getItem("theme") as string;
  }
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: setDefault(),
  setTheme: () => {},
});
