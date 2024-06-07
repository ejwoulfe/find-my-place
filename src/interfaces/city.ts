import RaceInterface from "./race";

export default interface CityInterface {
  city_id: number;
  state_id: number;
  name: string;
  cost_index: number;
  household_median_income: number;
  population: number;
  male_population: number;
  female_population: number;
  median_house_value: number;
  median_age: number;
  races: Array<RaceInterface>;
  unemployment: number;
  marital_status: JSON;
  education: { highSchool: string; bachelorsDegree: string; graduateDegree: string };
  commute_time: number;
  crime: JSON | null;
}
