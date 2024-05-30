import { useLocation } from "react-router-dom";
import CityInterface from "../../interfaces/city";

import { useQuery } from "react-query";
import { createURLObject } from "../../helpers/createURLObject";
import axios from "axios";
import { CityData } from "./components/city-data/city-data";

export function CityPage() {
  const location = useLocation();

  async function getCity() {
    const stateAndCity = createURLObject(decodeURIComponent(location.pathname));
    const stateResponse = await axios.get(`http://localhost:8888/states/name/${stateAndCity.state}`);
    const stateId = stateResponse.data.state_id;
    const citiesResponse = await axios.get(`http://localhost:8888/cities/city/${stateId}/${stateAndCity.city}`);
    return [citiesResponse.data];
  }

  const cityQuery = useQuery({
    queryKey: ["city"],
    queryFn: getCity,
  });

  if (cityQuery.isLoading) return <div className="city__loading">Fetching Cities...</div>;
  if (cityQuery.error) return <div className="city__error">An error occurred: {JSON.stringify(cityQuery.error)}</div>;

  return (
    <main className="city__container">
      {location.state === null ? (
        cityQuery.data.map((city: CityInterface) => {
          return <CityData city={city} />;
        })
      ) : (
        <CityData city={location.state} />
      )}
    </main>
  );
}
