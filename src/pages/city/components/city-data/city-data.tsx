import CityInterface from "../../../../interfaces/city";
import cityBuildings from "../../../../assets/city-buildings.svg";
import people from "../../../../assets/people.svg";
import shakingHands from "../../../../assets/shaking-hands.svg";
import rings from "../../../../assets/rings.svg";
import "./city-data.scss";
import { useEffect } from "react";

interface CityDataProps {
  city: CityInterface;
}

export function CityData(cityData: CityDataProps) {
  const { city } = cityData;

  useEffect(() => {
    console.log(city);
  }, [city]);

  return (
    <div className="city-data__container">
      <div role="banner" className="city__banner">
        <h1>{city.name}</h1>
        <img src={cityBuildings} alt="city buildings" className="banner__svg" />
      </div>
      <div className="city__quick">
        <h2>Quick Facts</h2>
        <div className="quick__index">
          <h4 className="quick__title">Cost Index:</h4>
          <p>{city.cost_index}</p>
        </div>
        <div className="quick__house">
          <h4 className="quick__title">Median House Value:</h4>
          <p>{city.median_house_value.toLocaleString()}</p>
        </div>
        <div className="quick__commute">
          <h4 className="quick__title">Average Commute Time:</h4>
          <p>{city.commute_time}</p>
        </div>
      </div>
      <div className="city__demographics">
        <h2>Demographics</h2>
        <div className="demographics__age">
          <h4 className="demographics__title">Median Age:</h4>
          <p>{city.median_age}</p>
        </div>
        <div className="demographics__income">
          <h4 className="demographics__title">House Hold Median Income:</h4>
          <p>{city.household_median_income.toLocaleString()}</p>
        </div>
        <div className="demographics__education">
          <h4 className="demographics__title">Highest Education:</h4>
          <ul>
            <li>High School: {city.education.highSchool}%</li>
            <li>Bachelors Degree: {city.education.bachelorsDegree}%</li>
            <li>Graduate Degree: {city.education.graduateDegree}%</li>
          </ul>
        </div>
      </div>
      <div className="city__population">
        <h2>Population</h2>
        <div className="population__graph"></div>
        <div className="population__number">
          <img src={people} alt="group of people" />
          <p>{city.population.toLocaleString()}</p>
        </div>
      </div>
      <div className="city__race">
        <h2>Race</h2>
        <div className="race__graph"></div>
        <div className="race__image">
          <img src={shakingHands} alt="hand shake of different races" />
        </div>
      </div>
      <div className="city__marital">
        <h2>Marital Status</h2>
        <div className="marital__graph"></div>
        <div className="marital__image">
          <img src={rings} alt="marital rings" />
        </div>
      </div>
      <div className="city__crime">
        <h2>Crime</h2>
        <div className="crime__graph"></div>
      </div>
    </div>
  );
}
