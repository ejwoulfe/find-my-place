import { useContext } from "react";
import logo from "../../assets/navigation-icons/logo.svg";
import preferencesIcon from "../../assets/navigation-icons/preferences.svg";
import sun from "../../assets/navigation-icons/sun.svg";
import moon from "../../assets/navigation-icons/moon.svg";
import { ThemeContext } from "../../context/ThemeContext";

import magnifyingGlass from "../../assets/navigation-icons/magnifying.svg";
import "./navigation.scss";

export function Navigation() {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <nav>
      <div className="logo__container">
        <img src={logo} className="nav__svg" alt="website logo" />
        <p>Find My Place</p>
      </div>
      <div></div>;
      <div className="search__container">
        <input type="search" id="site-search" name="q" />
        <img src={magnifyingGlass} className="nav__svg" alt="search-button" />
      </div>
      <div className="nav-links__container">
        <ul>
          <li>States</li>
          <li>
            <img src={preferencesIcon} className="nav__svg" alt="preferences button" />
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
    </nav>
  );
}
