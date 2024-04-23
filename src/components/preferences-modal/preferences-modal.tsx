import { ChangeEvent, useContext } from "react";
import "./preferences-modal.scss";
import { PreferencesContext } from "../../context/PreferencesContext";
import PreferencesInterface from "../../interfaces/preferences";

export function PreferencesModal() {
  const { preferences, setPreferences } = useContext(PreferencesContext);

  function createRadioButtonGroup(numOfButtons: number, dataType: string, currentPreferences: PreferencesInterface) {
    const selectedNumber = currentPreferences[dataType as keyof PreferencesInterface];
    const radioButtonGroupJSX = [];

    for (let i = 1; i <= numOfButtons; i++) {
      if (i == selectedNumber) {
        radioButtonGroupJSX.push(
          <li className="radio__list-item" key={dataType + "-button-" + i}>
            <label htmlFor={`${dataType}-${i}__radio`}>{i}</label>
            <input
              type="radio"
              id={`${dataType}-${i}__radio`}
              name={dataType}
              key={i}
              onChange={(event) => {
                setPreferences({ ...preferences, [event.target.name]: event.target.value });
              }}
              value={i}
              checked
            />
          </li>
        );
      } else {
        radioButtonGroupJSX.push(
          <li className="radio__list-item" key={dataType + "-button-" + i}>
            <label htmlFor={`${dataType}-${i}__radio`}>{i}</label>
            <input
              type="radio"
              id={`${dataType}-${i}__radio`}
              name={dataType}
              onChange={(event) => {
                setPreferences({ ...preferences, [event.target.name]: event.target.value });
              }}
              value={i}
            />
          </li>
        );
      }
    }

    return radioButtonGroupJSX.map((radioButton) => {
      return radioButton;
    });
  }

  return (
    <div className="modal__container">
      <h2>Preferences</h2>
      <p className="modal__description">
        Give each category a number rating, based on importance to you. 1 being lowest priority 5 being of highest
        priority.
      </p>
      <div className="preferences__container">
        <span className="preference">
          <p className="preference__name">Cost of Living</p>
          <ul className="buttons__list">{createRadioButtonGroup(5, "costOfLiving", preferences)}</ul>
        </span>
        <span className="preference">
          <p className="preference__name">Median Income</p>
          <ul className="buttons__list">{createRadioButtonGroup(5, "medianIncome", preferences)}</ul>
        </span>
        <span className="preference">
          <p className="preference__name">Median House Value</p>
          <ul className="buttons__list">{createRadioButtonGroup(5, "medianHouseValue", preferences)}</ul>
        </span>
        <span className="preference">
          <p className="preference__name">Median Age</p>
          <ul className="buttons__list">{createRadioButtonGroup(5, "medianAge", preferences)}</ul>
        </span>
        <span className="preference">
          <p className="preference__name">Larger Population</p>
          <ul className="buttons__list">{createRadioButtonGroup(5, "largePopulation", preferences)}</ul>
        </span>
        <span className="preference">
          <p className="preference__name">Highest Education Achieved</p>
          <ul className="buttons__list">{createRadioButtonGroup(5, "highestEducation", preferences)}</ul>
        </span>
      </div>
    </div>
  );
}
