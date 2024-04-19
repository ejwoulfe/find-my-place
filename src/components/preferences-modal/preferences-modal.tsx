import { FormEvent, useContext } from "react";
import "./preferences-modal.scss";
import { PreferencesContext } from "../../context/PreferencesContext";

export function PreferencesModal() {
  const { preferences, setPreferences } = useContext(PreferencesContext);

  //   function createRadioButtonGroup(numOfButtons: number, dataType: string, currentPreferences: PreferencesInterface) {
  //     const selectedNumber = currentPreferences[dataType as keyof PreferencesInterface];
  //     let arr = [];

  //     for (let i = 1; i <= numOfButtons; i++) {
  //       if (i === selectedNumber) {
  //         arr.push(
  //           <>
  //             {" "}
  //             <label htmlFor={`${dataType}-${i}__radio`}>{i}</label>
  //             <input type="radio" id={`${dataType}-${i}__radio`} name={dataType} value={i} checked />
  //           </>
  //         );
  //       } else {
  //         arr.push(
  //           <>
  //             {" "}
  //             <label htmlFor={`${dataType}-${i}__radio`}>{i}</label>
  //             <input type="radio" id={`${dataType}-${i}__radio`} name={dataType} value={i} />
  //           </>
  //         );
  //       }
  //     }

  //     return arr.map((html) => {
  //       return html;
  //     });
  //   }

  function changePreferences(formData: FormEvent<HTMLFormElement>) {
    // setPreferences({ ...preferences, [property]: value });
    console.log("submitted");

    console.log(formData);
  }

  return (
    <div className="preferences__container">
      <h2>Preferences</h2>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          changePreferences(event);
        }}>
        <fieldset>
          <legend>
            Give each category a number rating, based on importance to you. 1 being lowest priority 5 being of highest
            priority.
          </legend>
          <ul>
            <li>
              <label>Cost of Living</label>
            </li>
            <li>
              <label htmlFor="median-income__radio">Median Income</label>
            </li>
            <li>
              <label htmlFor="median-house-value__radio">Median House Value</label>

              <input type="radio" id="median-house-value__radio" value="house value" />
            </li>
            <li>
              <label htmlFor="median-age__radio">Median Age</label>

              <input type="radio" id="median-age__radio" value="age" />
            </li>
            <li>
              <label htmlFor="population__radio">Larger Population</label>

              <input type="radio" id="population__radio" value="population" />
            </li>
            <li>
              <label htmlFor="education__radio">Highest Education Achieved</label>

              <input type="radio" id="education__radio" value="education" />
            </li>
          </ul>

          <button value="submit" />
        </fieldset>
      </form>
    </div>
  );
}
