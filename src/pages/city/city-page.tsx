import { useLocation } from "react-router-dom";
import CityInterface from "../../interfaces/city";

import { createURLObject } from "../../helpers/createURLObject";
import axios from "axios";
import { CityData } from "./components/city-data/city-data";
import { useEffect, useState } from "react";

export function CityPage() {
  const location = useLocation();
  const [currentCity, setCurrentCity] = useState<CityInterface | null>(null);

  useEffect(() => {
    async function getCity(cityURL: string) {
      const stateAndCity = createURLObject(decodeURIComponent(cityURL));
      const stateResponse = await axios.get(`http://localhost:8888/states/name/${stateAndCity.state}`);
      const stateId = stateResponse.data.state_id;
      const citiesResponse = await axios.get(`http://localhost:8888/cities/city/${stateId}/${stateAndCity.city}`);
      setCurrentCity(citiesResponse.data);
    }
    getCity(location.pathname);
  }, [location]);

  return (
    <main className="city__container">
      {currentCity !== null ? <CityData key={currentCity.name} city={currentCity} /> : <h1>Error</h1>}
    </main>
  );
}
