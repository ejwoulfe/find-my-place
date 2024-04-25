import { useContext, useEffect, useState } from "react";
import logo from "../../assets/navigation-icons/logo.svg";
import preferencesIcon from "../../assets/navigation-icons/preferences.svg";
import sun from "../../assets/navigation-icons/sun.svg";
import moon from "../../assets/navigation-icons/moon.svg";
import { ThemeContext } from "../../context/ThemeContext";

import "./navigation.scss";

import { PreferencesModal } from "../preferences-modal/preferences-modal";
import { PreferencesContext } from "../../context/PreferencesContext";
import OutsideAlerter from "../../helpers/outsideAlerter";
import { SearchBar } from "../search/search";
import StateAndCityInterface from "../../interfaces/stateAndCity";

interface NavigationProps {
  setStateAndCity: React.Dispatch<React.SetStateAction<StateAndCityInterface>>;
}

export function Navigation(props: NavigationProps) {
  const { theme, setTheme } = useContext(ThemeContext);
  const { preferences } = useContext(PreferencesContext);

  const [modalVisible, setModalVisible] = useState(false);
  const [preferencesFilled, setPreferencesFilled] = useState<boolean>(false);

  useEffect(() => {
    const nullArray = Object.values(preferences);

    if (nullArray.includes(null)) {
      setPreferencesFilled(false);
    } else {
      setPreferencesFilled(true);
    }
  }, [preferences]);

  return (
    <nav data-theme={theme}>
      <div className="logo__container">
        <img src={logo} className="nav__svg" alt="website logo" />
        <p>Find My Place</p>
      </div>

      <div className="search__container">
        <SearchBar setStateAndCity={props.setStateAndCity} />
      </div>

      <div className="nav-links__container">
        <ul>
          <li>
            {preferencesFilled ? (
              <img
                src={preferencesIcon}
                onClick={() => {
                  setModalVisible((prevState) => !prevState);
                }}
                style={{
                  filter: "invert(86%) sepia(53%) saturate(5927%) hue-rotate(65deg) brightness(102%) contrast(80%)",
                }}
                className="nav__svg preferences__button"
                alt="preferences button"
              />
            ) : (
              <img
                src={preferencesIcon}
                onClick={() => {
                  setModalVisible((prevState) => !prevState);
                }}
                style={{
                  filter: "invert(20%) sepia(44%) saturate(7054%) hue-rotate(346deg) brightness(95%) contrast(80%)",
                }}
                className="nav__svg preferences__button"
                alt="preferences button"
              />
            )}
          </li>
          <li>
            {theme === "light" ? (
              <img
                src={moon}
                className="nav__svg"
                id="dark-theme-button"
                onClick={() => {
                  setTheme("dark");
                }}
                alt="website theme toggle, currently on light mode"
              />
            ) : (
              <img
                src={sun}
                className="nav__svg"
                id="light-theme-button"
                onClick={() => {
                  setTheme("light");
                }}
                alt="website theme toggle, currently on dark mode"
              />
            )}
          </li>
        </ul>
      </div>
      {modalVisible ? (
        <OutsideAlerter setter={setModalVisible}>
          <PreferencesModal />
        </OutsideAlerter>
      ) : null}
    </nav>
  );
}
