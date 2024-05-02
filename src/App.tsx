import { useState, useEffect } from "react";
import { ThemeContext } from "./context/ThemeContext";
import { HomePage } from "./pages/home/home-page";
import { Navigation } from "./components/navigation/navigation";
import { PreferencesContext } from "./context/PreferencesContext";
import PreferencesInterface from "./interfaces/preferences";
import StateAndCityInterface from "./interfaces/stateAndCity";
import { Routes, Route, useNavigate } from "react-router-dom";
import { NotFoundPage } from "./pages/not-found/not-found";
import { StatePage } from "./pages/state/state-page";
import { CityPage } from "./pages/city/city-page";
import { StateAndCityContext } from "./context/StateAndCityContext";

function App() {
  const [theme, setTheme] = useState<string>(localStorage.getItem("theme") as string);
  const [preferences, setPreferences] = useState<PreferencesInterface>(
    JSON.parse(localStorage.getItem("preferences")!)
  );
  const [stateAndCity, setStateAndCity] = useState<StateAndCityInterface>({ state: null, city: null });
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("preferences", JSON.stringify(preferences));
  }, [preferences]);

  useEffect(() => {
    console.log(stateAndCity);
    if (stateAndCity.city === null && stateAndCity.state !== null) {
      navigate(`/state/${stateAndCity.state}`);
    } else if (stateAndCity.city === null && stateAndCity.state === null) {
      console.log("nothing");
    } else {
      console.log("city and state were chosen");
    }
  }, [stateAndCity]);

  return (
    <div className="app" data-theme={theme}>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <PreferencesContext.Provider value={{ preferences, setPreferences }}>
          <StateAndCityContext.Provider value={{ stateAndCity, setStateAndCity }}>
            <Navigation />
            <Routes>
              <Route path="/" element={<HomePage />} />

              <Route path="/state/:state" element={<StatePage />}>
                <Route path=":city" element={<CityPage />} />
              </Route>

              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </StateAndCityContext.Provider>
        </PreferencesContext.Provider>
      </ThemeContext.Provider>
    </div>
  );
}

export default App;
