import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { confirmStateExists } from "../../helpers/confirmStateExists";
import { formatForSearch } from "../../helpers/formatForSearch";
import "./state-page.scss";
import { CitiesList } from "./components/cities-list/cities-list";

export function StatePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentState, setCurrentState] = useState<string>();

  useEffect(() => {
    function getStateFromPathName(path: string) {
      const stateParam = decodeURIComponent(path.substring(path.lastIndexOf("/") + 1, path.length)).trim();
      const state = formatForSearch(stateParam)[0];

      if (confirmStateExists(state)) {
        setCurrentState(state);
      } else {
        navigate("/not found");
      }
    }
    if (!location.pathname.includes("city/")) {
      getStateFromPathName(location.pathname);
    }
  }, [location]);

  return (
    <main className="state__container">
      {currentState !== undefined && currentState !== null ? (
        <div
          role="banner"
          className="state__banner"
          style={{
            backgroundImage: `url(/src/assets/city-banners/${currentState?.toLowerCase().replace(" ", "-")}.jpg`,
          }}>
          <div className="banner__overlay">
            <h1 className="state__title">{currentState}</h1>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}

      {currentState !== undefined && currentState !== null ? (
        <CitiesList state={currentState} />
      ) : (
        <span>Loading Cities...</span>
      )}
    </main>
  );
}
