import { createContext } from "react";
import PreferencesInterface from "../interfaces/preferences";

export type PreferencesContextType = {
  preferences: PreferencesInterface;
  setPreferences: (p: PreferencesInterface) => void;
};

export const PreferencesContext = createContext<PreferencesContextType>({
  preferences: {
    costOfLiving: null,
    medianIncome: null,
    medianHouseValue: null,
    medianAge: null,
    largePopulation: null,
    highestEducation: null,
  },
  setPreferences: () => {},
});
