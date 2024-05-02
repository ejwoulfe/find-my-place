import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import "./home-page.scss";
import { Map } from "./components/map/map";

export function HomePage() {
  const { theme } = useContext(ThemeContext);

  return (
    <main className="home__container" data-theme={theme}>
      <div role="banner" className="home__banner"></div>
      <Map />
    </main>
  );
}
