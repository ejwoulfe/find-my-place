import axios from "axios";
import "./cities-list.scss";
import CityInterface from "../../../../interfaces/city";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

type CitiesListProps = {
  state: string;
};

export function CitiesList(currentState: CitiesListProps) {
  const [unsortedCitiesList, setUnsortedCitiesList] = useState<Array<CityInterface>>([]);
  const [sortedList, setSortedList] = useState<Array<CityInterface>>([]);
  // useEffect(() => {
  //   const preferences = localStorage.getItem("preferences");
  //   if (preferences !== null) {
  //     console.log(JSON.parse(preferences));
  //     console.log(unsortedCitiesList);
  //   }
  // }, []);

  useEffect(() => {
    async function getCities() {
      const stateResponse = await axios.get(`http://localhost:8888/states/name/${currentState.state}`);
      const stateId = stateResponse.data.state_id;
      const citiesResponse = await axios.get(`http://localhost:8888/cities/${stateId}`);
      setUnsortedCitiesList(citiesResponse.data);
      setSortedList(citiesResponse.data);
    }
    getCities();
  }, [currentState]);

  function sortCitiesList(sortOption: string) {
    const tempArray = [...unsortedCitiesList];
    if (sortOption === "A-Z") {
      setSortedList(tempArray);
    } else if (sortOption === "Z-A") {
      setSortedList(tempArray.sort((a, z) => z.name.localeCompare(a.name)));
    }
  }

  function columnsBasedOnNumOfCities(cities: Array<CityInterface>) {
    const numOfCities = cities.length;
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

  function divideList(cities: Array<CityInterface>) {
    const numOfColumns = columnsBasedOnNumOfCities(cities);
    const citiesPerColumn = Math.floor(cities.length / numOfColumns);
    const endingIndexArray: Array<number> = [];
    for (let i = 1; i <= numOfColumns; i++) {
      if (i === numOfColumns) {
        endingIndexArray.push(cities.length);
      } else {
        endingIndexArray.push(citiesPerColumn * i);
      }
    }

    const ulElements = endingIndexArray.map((endingIndex, index) => {
      if (index === endingIndexArray.length - 1) {
        const lastDifference = endingIndexArray[index] - endingIndexArray[index - 1];
        return (
          <ul key={"ul-" + index} className="cities-column__ul">
            {createUnorderedListOfCities(cities, endingIndex, lastDifference)}
          </ul>
        );
      } else {
        return (
          <ul key={"ul-" + index} className="cities-column__ul">
            {createUnorderedListOfCities(cities, endingIndex, citiesPerColumn)}
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

  return (
    <div className="cities-list__container">
      <h3 className="cities-list__title">Cities List</h3>
      <div className="sort-by__container">
        <label className="sort-by__text" htmlFor="sort">
          Sort By:
        </label>
        <select
          name="sort"
          defaultValue={"A-Z"}
          onChange={(e) => {
            const test = sortCitiesList(e.target.value);
            if (test !== undefined) {
              console.log("called");
              setSortedList(test);
            }
          }}>
          <option value="preferences">Preferences</option>
          <option value="A-Z">Alphabetical A-Z</option>
          <option value="Z-A">Alphabetical Z-A</option>
        </select>
      </div>
      <ul className="cities-list__ul">{divideList(sortedList.map((cityName: CityInterface) => cityName))}</ul>
    </div>
  );
}
