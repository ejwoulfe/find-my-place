import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import "./home.scss";

export function HomePage() {
  const { theme } = useContext(ThemeContext);

  return (
    <main className="home__container" data-theme={theme}>
      <div role="banner" className="home__banner">
        {" "}
        CONTENT
      </div>
    </main>
  );
}
