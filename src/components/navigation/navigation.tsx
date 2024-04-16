import logo from "../../assets/navigation-icons/logo.svg";
import preferencesIcon from "../../assets/navigation-icons/preferences.svg";
import sun from "../../assets/navigation-icons/sun.svg";
import moon from "../../assets/navigation-icons/moon.svg";
import "./navigation.scss";

export function Navigation() {
  return (
    <nav>
      <div className="logo">
        <img src={logo} alt="website logo" />
        <p>Find My Place</p>
      </div>
      <div className="search"></div>
      <div className="links">
        <ul>
          <li>States</li>
          <li>
            <img src={preferencesIcon} alt="preferences button" />
          </li>
          <li>
            <img src={sun} alt="website theme toggle, currently on dark mode" />
          </li>
        </ul>
      </div>
    </nav>
  );
}
