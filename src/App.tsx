import "./App.css";
import { useState, useEffect } from "react";
import { ThemeContext } from "./context/ThemeContext";
import { Navigation } from "./components/navigation/navigation";

function App() {
  const [theme, setTheme] = useState<string>(localStorage.getItem("theme") as string);

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <Navigation />
      </ThemeContext.Provider>
    </>
  );
}

export default App;
