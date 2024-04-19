import { createContext } from "react";
import PreferencesInterface from "../interfaces/preferences";

export type PreferencesContextType = {
  preferences: PreferencesInterface;
  setPreferences: (p: PreferencesInterface) => void;
};

function setDefault() {
  const storageValue = localStorage.getItem("preferences");
  if (storageValue === null) {
    localStorage.setItem(
      "preferences",
      JSON.stringify({
        costOfLiving: null,
        medianIncome: null,
        medianHouseValue: null,
        medianAge: null,
        largePopulation: null,
        highestEducation: null,
      })
    );
    return {
      costOfLiving: null,
      medianIncome: null,
      medianHouseValue: null,
      medianAge: null,
      largePopulation: null,
      highestEducation: null,
    };
  } else if (storageValue !== null) {
    return JSON.parse(storageValue);
  }
}

export const PreferencesContext = createContext<PreferencesContextType>({
  preferences: setDefault(),
  setPreferences: () => {},
});
