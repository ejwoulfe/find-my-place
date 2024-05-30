import axios from "axios";
import "./cities-list.scss";
import { useQuery } from "react-query";
import CityInterface from "../../../../interfaces/city";
import { Link } from "react-router-dom";

type CitiesListProps = {
  state: string;
};

export function CitiesList(currentState: CitiesListProps) {
  async function getCities() {
    const stateResponse = await axios.get(`http://localhost:8888/states/name/${currentState.state}`);
    const stateId = stateResponse.data.state_id;
    console.log(stateId);
    const citiesResponse = await axios.get(`http://localhost:8888/cities/${stateId}`);
    return citiesResponse.data;
  }

  function columnsBasedOnNumOfCities(citiesList: Array<CityInterface>) {
    const numOfCities = citiesList.length;
    switch (true) {
      case numOfCities <= 100:
        return 3;
      case numOfCities >= 101 && numOfCities <= 200:
        return 4;
      case numOfCities >= 201 && numOfCities <= 300:
        return 5;
      case numOfCities >= 301 && numOfCities <= 400:
        return 6;
      case numOfCities >= 400:
        return 7;
      default:
        return 1;
    }
  }

  function divideList(citiesList: Array<CityInterface>) {
    const numOfColumns = columnsBasedOnNumOfCities(citiesList);
    const citiesPerColumn = Math.floor(citiesList.length / numOfColumns);
    const endingIndexArray: Array<number> = [];
    for (let i = 1; i <= numOfColumns; i++) {
      if (i === numOfColumns) {
        endingIndexArray.push(citiesList.length);
      } else {
        endingIndexArray.push(citiesPerColumn * i);
      }
    }

    const ulElements = endingIndexArray.map((endingIndex, index) => {
      if (index === endingIndexArray.length - 1) {
        const lastDifference = endingIndexArray[index] - endingIndexArray[index - 1];
        return (
          <ul key={"ul-" + index} className="cities-column__ul">
            {createUnorderedListOfCities(citiesList, endingIndex, lastDifference)}
          </ul>
        );
      } else {
        return (
          <ul key={"ul-" + index} className="cities-column__ul">
            {createUnorderedListOfCities(citiesList, endingIndex, citiesPerColumn)}
          </ul>
        );
      }
    });
    return ulElements;
  }

  function createUnorderedListOfCities(cities: Array<CityInterface>, endingIndex: number, citiesPerColumn: number) {
    const startingIndex = endingIndex - citiesPerColumn;
    const listElements = [];
    for (let i = startingIndex; i < endingIndex; i++) {
      listElements.push(
        <li key={"list-item-" + i}>
          <Link to={`city/${cities[i].name}`} state={cities[i]}>
            {cities[i].name}
          </Link>
        </li>
      );
    }

    return listElements;
  }

  const citiesQuery = useQuery({
    queryKey: ["cities"],
    queryFn: getCities,
  });

  if (citiesQuery.isLoading) return <div className="cities-list__loading">Fetching Cities...</div>;
  if (citiesQuery.error)
    return <div className="cities-list__error">An error occurred: {JSON.stringify(citiesQuery.error)}</div>;

  return (
    <div className="cities-list__container">
      <h3 className="cities-list__title">Cities List</h3>
      <div className="sort-by__container">
        <label className="sort-by__text" htmlFor="sort">
          Sort By:
        </label>
        <select name="sort">
          <option value="preferences">Preferences</option>
          <option value="A-Z">Alphabetical A-Z</option>
          <option value="Z-A">Alphabetical Z-A</option>
        </select>
      </div>
      <ul className="cities-list__ul">{divideList(citiesQuery.data.map((city: CityInterface) => city))}</ul>
    </div>
  );
}
