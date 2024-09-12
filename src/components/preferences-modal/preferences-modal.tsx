import { useContext, useEffect } from "react";
import "./preferences-modal.scss";
import { PreferencesContext } from "../../context/PreferencesContext";

import { useState } from "react";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { SortableItem } from "./sortable-item";

type OptionsObject = {
  name: string;
  key: string;
};

export function PreferencesModal() {
  const { preferences, setPreferences } = useContext(PreferencesContext);
  const [options, setOptions] = useState<Array<OptionsObject> | null>(null);

  const [items, setItems] = useState([1, 2, 3, 4, 5, 6]);

  useEffect(() => {
    function camelCaseToWords(s: string) {
      const result = s.replace(/([A-Z])/g, " $1");
      return result.charAt(0).toUpperCase() + result.slice(1);
    }
    if (preferences.costOfLiving === null) {
      setOptions([
        { name: "Cost of Living", key: "costOfLiving" },
        { name: "Median Income", key: "medianIncome" },
        { name: "Median House Value", key: "medianHouseValue" },
        { name: "Median Age", key: "medianAge" },
        { name: "Larger Population", key: "largerPopulation" },
        { name: "Highest Education", key: "highestEducation" },
      ]);
    } else {
      const tempArray = [];

      for (let i = 1; i <= 6; i++) {
        for (let key in preferences) {
          if (preferences[key] === i) {
            tempArray.push({ name: camelCaseToWords(key), key: key });
          }
        }
      }
      setItems([1, 2, 3, 4, 5, 6]);
      setOptions([...tempArray]);
    }
  }, [preferences]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  function handleDragEnd(event) {
    const { active, over } = event;

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  function submitPreferences() {
    const ulElement = document.getElementById("preferences-list");
    const liElements = ulElement?.getElementsByTagName("li");
    const preferencesTempObj = {
      costOfLiving: null,
      medianIncome: null,
      medianHouseValue: null,
      medianAge: null,
      largerPopulation: null,
      highestEducation: null,
    };
    if (liElements !== undefined) {
      const iterator = liElements[Symbol.iterator]();
      let index = 1;
      for (const li of iterator) {
        for (let i = 0; i < options!.length; i++) {
          if (options![i].name === li.innerHTML) {
            preferencesTempObj[options![i].key] = index;
          }
        }
        index++;
      }
    }

    setPreferences(preferencesTempObj);
  }

  // useEffect(() => {
  //   console.log(options);
  // }, [options]);

  return (
    <div className="modal__container">
      <h2>Preferences Order</h2>
      <p className="modal__description">
        Drag and Drop the order of importance for each. 1 being the most important to 6 being the least important.
      </p>
      {options !== null ? (
        <>
          <div className="modal__list">
            <ul className="list__numbers">
              <li>1</li>
              <li>2</li>
              <li>3</li>
              <li>4</li>
              <li>5</li>
              <li>6</li>
            </ul>

            <ul className="list__preferences" id="preferences-list">
              <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={items} strategy={verticalListSortingStrategy}>
                  {items.map((id) => (
                    <SortableItem key={id} id={id} option={options[id - 1]} />
                  ))}
                </SortableContext>
              </DndContext>
            </ul>
          </div>
          <button
            onClick={() => {
              submitPreferences();
            }}>
            Submit
          </button>
        </>
      ) : null}
    </div>
  );
}
