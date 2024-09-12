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
import { InfoPage } from "./pages/information/info-page";

function App() {
  const [theme, setTheme] = useState<string>(localStorage.getItem("theme") as string);
  const [preferences, setPreferences] = useState<PreferencesInterface>(
    JSON.parse(localStorage.getItem("preferences")!)
  );

  useEffect(() => {
    localStorage.setItem("theme", theme);
    if (theme === "dark") {
      document.body.style.backgroundColor = "#2c2c2c";
    } else {
      document.body.style.backgroundColor = "white";
    }
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("preferences", JSON.stringify(preferences));
    console.log(preferences);
  }, [preferences]);

  return (
    <div className="app" data-theme={theme}>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <PreferencesContext.Provider value={{ preferences, setPreferences }}>
          <Navigation />
          <Routes>
            <Route path="/" element={<HomePage />} />

            <Route path="/state">
              <Route index element={<InfoPage />} />
              <Route path=":state" element={<StatePage />} />
              <Route path=":state/city/:city" element={<CityPage />} />
            </Route>

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </PreferencesContext.Provider>
      </ThemeContext.Provider>
    </div>
  );
}

export default App;
