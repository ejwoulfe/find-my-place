import { createContext } from "react";
import StateAndCityInterface from "../interfaces/stateAndCity";

export type StateAndCityContextType = {
  stateAndCity: StateAndCityInterface;
  setStateAndCity: (p: StateAndCityInterface) => void;
};

export const StateAndCityContext = createContext<StateAndCityContextType>({
  stateAndCity: { state: null, city: null },
  setStateAndCity: () => {},
});
