import stateNames from "../data/states.json";

export function confirmStateExists(stateStr: string) {
  if (Object.values(stateNames).indexOf(stateStr) > -1) {
    return true;
  } else {
    return false;
  }
}
