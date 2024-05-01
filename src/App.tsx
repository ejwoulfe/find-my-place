import { useState, useEffect } from "react";
import { ThemeContext } from "./context/ThemeContext";
import { HomePage } from "./pages/home/home-page";
import { Navigation } from "./components/navigation/navigation";
import { PreferencesContext } from "./context/PreferencesContext";
import PreferencesInterface from "./interfaces/preferences";
import StateAndCityInterface from "./interfaces/stateAndCity";
import { Routes, Route } from "react-router-dom";
import { ErrorPage } from "./pages/error/error";
import { StatePage } from "./pages/state/state-page";

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
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/states/:state" element={<StatePage />}>
              <Route path=":city" />
            </Route>

            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </PreferencesContext.Provider>
      </ThemeContext.Provider>
    </div>
  );
}

export default App;
