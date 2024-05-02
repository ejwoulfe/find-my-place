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
import { Link } from "react-router-dom";

export function Navigation() {
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
      <Link to="/" className="logo__container">
        <img src={logo} className="nav__svg" alt="website logo" />
        <p>Find My Place</p>
      </Link>

      <div className="search__container">
        <SearchBar />
      </div>

      <div className="nav-links__container">
        <button
          onClick={() => {
            setModalVisible((prevState) => !prevState);
          }}
          className="preferences__button">
          {preferencesFilled ? (
            <img
              src={preferencesIcon}
              style={{
                filter: "invert(86%) sepia(53%) saturate(5927%) hue-rotate(65deg) brightness(102%) contrast(80%)",
              }}
              className="nav__svg button__svg"
              alt="preferences button"
            />
          ) : (
            <img
              src={preferencesIcon}
              style={{
                filter: "invert(20%) sepia(44%) saturate(7054%) hue-rotate(346deg) brightness(95%) contrast(80%)",
              }}
              className="nav__svg button__svg"
              alt="preferences button"
            />
          )}
        </button>

        <button
          className="toggle__button"
          data-testid="toggle-theme-button"
          onClick={() => {
            if (theme === "dark") {
              setTheme("light");
            } else if (theme === "light") {
              setTheme("dark");
            }
          }}>
          {theme === "light" ? (
            <img src={moon} className="nav__svg" alt="switch to dark theme" />
          ) : (
            <img src={sun} className="nav__svg" alt="switch to light theme" />
          )}
        </button>
      </div>
      {modalVisible ? (
        <OutsideAlerter setter={setModalVisible}>
          <PreferencesModal />
        </OutsideAlerter>
      ) : null}
    </nav>
  );
}
