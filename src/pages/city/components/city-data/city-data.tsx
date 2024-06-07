import CityInterface from "../../../../interfaces/city";
import cityBuildings from "../../../../assets/city-buildings.svg";
import people from "../../../../assets/people.svg";
import shakingHands from "../../../../assets/shaking-hands.svg";
import rings from "../../../../assets/rings.svg";
import { Pie, Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import "./city-data.scss";

import { useEffect } from "react";
import RaceInterface from "../../../../interfaces/race";

interface CityDataProps {
  city: CityInterface;
}

export function CityData(cityData: CityDataProps) {
  Chart.register(ArcElement, Tooltip, Legend, ChartDataLabels);
  const { city } = cityData;

  function convertToPercentage(number: number, total: number) {
    return ((number / total) * 100).toFixed(2);
  }
  function randomHexColorCode(races: Array<RaceInterface>) {
    const colors = [];
    for (let i = 0; i < Object.keys(races).length; i++) {
      const color = (Math.random() * 0xfffff * 1000000).toString(16);
      colors.push("#" + color.slice(0, 6));
    }
    return colors;
  }

  useEffect(() => {
    console.log(city);
    getRaceNames(city.races);
  }, [city]);

  function getRaceNames(races: Array<RaceInterface>) {
    return races.map((race: RaceInterface) => {
      return race.ethnicity.replace("alone", "").trim();
    });
  }
  function getRaceNumber(races: Array<RaceInterface>) {
    return races.map((race: RaceInterface) => {
      return race.percentOf;
    });
  }

  return (
    <div className="city-data__container">
      <div role="banner" className="city__banner">
        <h1 className="banner__title">{city.name}</h1>
        <img src={cityBuildings} alt="city buildings" className="banner__svg" />
      </div>
      <div className="city__quick">
        <h2 className="section__title">Quick Facts</h2>
        <div className="quick__container">
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
      </div>
      <div className="city__demographics">
        <h2 className="section__title">Demographics</h2>
        <div className="demographics__container">
          <div className="demographics__age">
            <h4 className="demographics__title">Median Age:</h4>
            <p>{city.median_age}</p>
          </div>
          <div className="demographics__income">
            <h4>House Hold Median Income:</h4>
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
      </div>
      <div className="city__population">
        <h2 className="section__title">Population</h2>
        <div className="population__container">
          <div className="population__graph">
            <Pie
              data={{
                labels: ["Male", "Female"],
                datasets: [
                  {
                    label: "Percentage",
                    hoverBorderColor: "#000000",
                    hoverBorderWidth: 1,
                    data: [city.male_population, city.female_population],
                    backgroundColor: ["#44AEDB", "#DB44A9"],
                    borderColor: ["#000000", "#000000"],
                    borderWidth: 2,
                  },
                ],
              }}
              options={{
                plugins: {
                  tooltip: {
                    enabled: false,
                  },
                  legend: {
                    position: "top",
                    reverse: true,
                    labels: {
                      usePointStyle: true,
                      pointStyle: "circle",
                      padding: 30,
                    },
                  },
                  datalabels: {
                    display: true,
                    anchor: "center",
                    align: "center",
                    formatter: (val) => {
                      if (val === city.male_population) {
                        return "Male: " + val.toLocaleString() + "\n" + convertToPercentage(val, city.population) + "%";
                      } else {
                        return (
                          "Female: " + val.toLocaleString() + "\n" + convertToPercentage(val, city.population) + "%"
                        );
                      }
                    },
                    labels: {
                      value: {
                        color: "black",
                      },
                    },
                  },
                },
              }}
            />
          </div>
          <div className="population__number">
            <img src={people} alt="group of people" />
            <p>{city.population.toLocaleString()}</p>
          </div>
        </div>
      </div>
      <div className="city__race">
        <h2 className="section__title">Race</h2>
        <div className="race__container">
          <div className="race__graph">
            <Doughnut
              data={{
                labels: getRaceNames(city.races),
                datasets: [
                  {
                    label: "Percentage",
                    hoverBorderColor: "#000000",
                    hoverBorderWidth: 1,
                    data: getRaceNumber(city.races),
                    backgroundColor: randomHexColorCode(city.races),
                    borderColor: "#000000",
                    borderWidth: 2,
                  },
                ],
              }}
              options={{
                plugins: {
                  tooltip: {
                    enabled: false,
                  },
                  legend: {
                    position: "top",
                    labels: {
                      usePointStyle: true,
                      pointStyle: "circle",
                      padding: 30,
                    },
                  },
                  datalabels: {
                    display: true,
                    anchor: "center",
                    align: "center",
                    padding: 20,
                    formatter: (val) => val.toLocaleString(),
                    labels: {
                      value: {
                        color: "black",
                      },
                    },
                  },
                },
              }}
            />
          </div>
          <div className="race__image">
            <img src={shakingHands} alt="hand shake of different races" />
          </div>
        </div>
      </div>
      <div className="city__marital">
        <h2 className="section__title">Marital Status</h2>
        <div className="marital__container">
          <div className="marital__graph">
            <h4>Placeholder for graph</h4>
          </div>
          <div className="marital__image">
            <img src={rings} alt="marital rings" />
          </div>
        </div>
      </div>
      <div className="city__crime">
        <h2 className="section__title">Crime</h2>
        <div className="crime__graph">
          <h4>Placeholder for graph</h4>
        </div>
      </div>
    </div>
  );
}
