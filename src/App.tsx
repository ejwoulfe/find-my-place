import { useState, useEffect } from "react";
import { ThemeContext } from "./context/ThemeContext";
import { HomePage } from "./pages/home/home-page";
import { Navigation } from "./pages/navigation/navigation";
import { PreferencesContext } from "./context/PreferencesContext";
import PreferencesInterface from "./interfaces/preferences";
import { Routes, Route } from "react-router-dom";
import { NotFoundPage } from "./pages/not-found/not-found";
import { StatePage } from "./pages/state/state-page";
import { CityPage } from "./pages/city/city-page";

function App() {
  const [theme, setTheme] = useState<string>(localStorage.getItem("theme") as string);
  const [preferences, setPreferences] = useState<PreferencesInterface>(
    JSON.parse(localStorage.getItem("preferences")!)
  );

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
          <Navigation />
          <Routes>
            <Route path="/" element={<HomePage />} />

            <Route path="/state/:state/" element={<StatePage />}>
              <Route path=":city" element={<CityPage />} />
            </Route>

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </PreferencesContext.Provider>
      </ThemeContext.Provider>
    </div>
  );
}

export default App;
