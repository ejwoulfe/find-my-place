import { useState, useEffect } from "react";
import { ThemeContext } from "./context/ThemeContext";
import { HomePage } from "./pages/home/home";
import { Navigation } from "./components/navigation/navigation";
import { PreferencesContext } from "./context/PreferencesContext";
import PreferencesInterface from "./interfaces/preferences";
import StateAndCityInterface from "./interfaces/stateAndCity";

function App() {
  const [theme, setTheme] = useState<string>(localStorage.getItem("theme") as string);
  const [preferences, setPreferences] = useState<PreferencesInterface>(
    JSON.parse(localStorage.getItem("preferences")!)
  );
  const [stateAndCity, setStateAndCity] = useState<StateAndCityInterface>({ state: null, city: null });

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("preferences", JSON.stringify(preferences));
  }, [preferences]);

  return (
    <div className="app" data-theme={theme}>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <PreferencesContext.Provider value={{ preferences, setPreferences }}>
          <Navigation setStateAndCity={setStateAndCity} />
          <HomePage />
        </PreferencesContext.Provider>
      </ThemeContext.Provider>
    </div>
  );
}

export default App;
