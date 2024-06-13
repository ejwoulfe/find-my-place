import CityInterface from "../../../../interfaces/city";
import cityBuildings from "../../../../assets/city-buildings.svg";
import people from "../../../../assets/people.svg";
import shakingHands from "../../../../assets/shaking-hands.svg";
import rings from "../../../../assets/rings.svg";
import { Pie, Doughnut, Line } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import moneySymbol from "../../../../assets/city-page/money.svg";
import house from "../../../../assets/city-page/house.svg";
import vehicle from "../../../../assets/city-page/car.svg";
import person from "../../../../assets/city-page/person.svg";
import moneyBag from "../../../../assets/city-page/money-bag.svg";
import graduationCap from "../../../../assets/city-page/graduation-cap.svg";
import "./city-data.scss";

import { useContext, useEffect } from "react";
import RaceInterface from "../../../../interfaces/race";
import { ThemeContext } from "../../../../context/ThemeContext";

interface CityDataProps {
  city: CityInterface;
}

export function CityData(cityData: CityDataProps) {
  Chart.register(ArcElement, Tooltip, Legend, ChartDataLabels, CategoryScale, LinearScale, PointElement, LineElement);
  const { city } = cityData;
  const { theme } = useContext(ThemeContext);

  function convertToPercentage(number: number, total: number) {
    return ((number / total) * 100).toFixed(2);
  }
  function formatStatusLabels(labels: Array<string>) {
    return labels.map((status) => {
      const result = status.replace(/([A-Z])/g, " $1");
      return result.charAt(0).toUpperCase() + result.slice(1);
    });
  }

  useEffect(() => {
    console.log(city);
  }, [city]);

  function getRaceLabels(races: Array<RaceInterface>) {
    return races.map((race: RaceInterface) => {
      return race.ethnicity.replace("alone", "").trim();
    });
  }
  function getRaceNumber(races: Array<RaceInterface>) {
    return races.map((race: RaceInterface) => {
      return race.percentOf;
    });
  }
  function createSecondaryChart(races: Array<RaceInterface>, colorsArray: Array<string>) {
    return races.map((value: RaceInterface, index) => {
      return (
        <li>
          <span className="list__box" style={{ backgroundColor: `${colorsArray[index]}` }}></span>
          <p>{value.percentOf}</p>
          <p>
            {value.ethnicity.replace("alone", "").replace("Native Hawaiian and Other Pacific Islander", "Hawaiian")}
          </p>
        </li>
      );
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
          <div className="quick__card">
            <img className="quick__svg" alt="money" src={moneySymbol} />
            <span className="quick__title-and-tooltip">
              <p className="quick__title">Cost Index: </p>
              <span className="tooltip__container">
                <span className="tooltip__hover">Average Cost Index is 100</span>
                <span className="tooltip__icon">?</span>
              </span>
            </span>
            <span>
              {city.cost_index - 100 > 0 ? (
                <p style={{ color: "#d92121", fontWeight: "bold" }}>{city.cost_index}</p>
              ) : (
                <p style={{ color: "#56ed45" }}>{city.cost_index}</p>
              )}
            </span>
          </div>
          <div className="quick__card">
            <img className="quick__svg" alt="house" src={house} />

            <p className="quick__title">Median House Value:</p>
            <p>${city.median_house_value.toLocaleString()}</p>
          </div>
          <div className="quick__card">
            <img className="quick__svg" alt="vehicle" src={vehicle} />

            <p className="quick__title">Average Commute Time:</p>
            {city.commute_time < 60 ? <p>{city.commute_time} minutes</p> : <p>{city.commute_time}</p>}
          </div>

          <div className="quick__card">
            <img className="quick__svg" alt="person" src={person} />

            <p className="quick__title">Median Age:</p>
            <p>{city.median_age}</p>
          </div>
          <div className="quick__card">
            <img className="quick__svg" alt="bag of money" src={moneyBag} />

            <p className="quick__title">House Hold Median Income:</p>
            <p>${city.household_median_income.toLocaleString()}</p>
          </div>
          <div className="quick__card">
            <img className="quick__svg" alt="graduation cap" src={graduationCap} />

            <p className="quick__title">Highest Education:</p>
            <ul className="quick__education-list">
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
                aspectRatio: 2,
                color: function () {
                  if (theme === "dark") {
                    return "white";
                  } else {
                    return "black";
                  }
                },
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
            <p className="number__text">{city.population.toLocaleString()}</p>
          </div>
        </div>
      </div>
      <div className="city__race">
        <h2 className="section__title">Race</h2>
        <div className="race__container">
          <div className="race__graph">
            <span className="secondary__data">
              <ul>
                {createSecondaryChart(city.races, [
                  "#32e6a3",
                  "#2e7ffb",
                  "#fbdb3c",
                  "#8861ad",
                  "#b8ccc4",
                  "#bafa29",
                  "#f24e73",
                  "#1eedb9",
                  "#7b9abb",
                  "#ff5e15",
                ])}
              </ul>
            </span>
            <Doughnut
              data={{
                labels: getRaceLabels(city.races),
                datasets: [
                  {
                    hoverBorderColor: "#000000",
                    hoverBorderWidth: 1,
                    data: getRaceNumber(city.races),
                    backgroundColor: [
                      "#f57b42",
                      "#2e7ffb",
                      "#fbdb3c",
                      "#8861ad",
                      "#b8ccc4",
                      "#bafa29",
                      "#f24e73",
                      "#1eedb9",
                      "#7b9abb",
                      "#ff5e15",
                    ],
                    borderColor: "#000000",
                    borderWidth: 2,
                  },
                ],
              }}
              options={{
                aspectRatio: 2,
                color: function () {
                  if (theme === "dark") {
                    return "white";
                  } else {
                    return "black";
                  }
                },
                plugins: {
                  tooltip: {
                    enabled: true,
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
                    formatter: function (val) {
                      const ethnicityArr: Array<string> = [];
                      for (let i = 0; i < Object.keys(city.races).length; i++) {
                        const currentObject = city.races[i];
                        if (currentObject.percentOf === val && !ethnicityArr.includes(currentObject.ethnicity)) {
                          ethnicityArr.push(currentObject.ethnicity);
                          return currentObject.percentOf + "%" + "\n" + currentObject.numOfRace;
                        }
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
          <div className="race__image">
            <img src={shakingHands} alt="hand shake of different races" />
          </div>
        </div>
      </div>
      <div className="city__marital">
        <h2 className="section__title">Marital Status</h2>
        <div className="marital__container">
          <div className="marital__graph">
            <Pie
              data={{
                labels: formatStatusLabels(Object.getOwnPropertyNames(city.marital_status)),
                datasets: [
                  {
                    label: "",
                    hoverBorderColor: "#000000",
                    hoverBorderWidth: 1,
                    data: Object.values(city.marital_status),
                    backgroundColor: ["#e3dc72", "#fe7461", "#83ebcb", "#8669df", "#98a4d3"],
                    borderColor: "#000000",
                    borderWidth: 2,
                  },
                ],
              }}
              options={{
                aspectRatio: 2,
                color: function () {
                  if (theme === "dark") {
                    return "white";
                  } else {
                    return "black";
                  }
                },
                plugins: {
                  tooltip: {
                    enabled: true,
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
                    font: {
                      weight: "bold",
                      size: 16,
                    },
                    formatter: (val) => {
                      return val;
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
          <div className="marital__image">
            <img src={rings} alt="marital rings" />
          </div>
        </div>
      </div>
      <div className="city__crime">
        <h2 className="section__title">Crime</h2>
        {city.crime !== null ? (
          <div className="crime__graph">
            <Line
              data={{
                labels: Object.getOwnPropertyNames(city.crime),
                datasets: [
                  {
                    label: "Crime Index",
                    hoverBorderColor: "#000000",
                    hoverBorderWidth: 1,
                    data: Object.values(city.crime),
                    backgroundColor: "#000000",
                  },
                ],
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  tooltip: {
                    enabled: true,
                  },
                  legend: {
                    display: false,
                  },
                  datalabels: {
                    display: true,
                    anchor: "start",
                    align: "top",
                    formatter: (val) => {
                      return val;
                    },
                  },
                },
              }}
            />
          </div>
        ) : (
          <p>No Crime Data</p>
        )}
      </div>
    </div>
  );
}
