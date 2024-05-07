import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { confirmStateExists } from "../../helpers/confirmStateExists";

export function StatePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentState, setCurrentState] = useState<string>();

  useEffect(() => {
    function getStateFromPathName(path: string) {
      const stateParam = decodeURIComponent(path.substring(path.lastIndexOf("/") + 1, path.length)).trim();
      console.log(confirmStateExists(stateParam));

      if (confirmStateExists(stateParam)) {
        setCurrentState(stateParam);
      } else {
        navigate("/not found");
      }
    }
    console.log(location);
    getStateFromPathName(location.pathname);
  }, [location]);

  return (
    <main className="state__container">
      <h1>{currentState}</h1>
    </main>
  );
}
