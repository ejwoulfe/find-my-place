import { fireEvent, render } from "@testing-library/react";
import { Navigation } from "../navigation";
import "@testing-library/jest-dom";

describe(Navigation, () => {
  const setStateAndCity = () => {};

  it("preferences modal appears on screen, when user clicks on the preferences button", () => {
    const { getByAltText } = render(<Navigation setStateAndCity={setStateAndCity} />);
    const prefsButton = getByAltText("preferences button");
    fireEvent.click(prefsButton);
    const preferencesContainer = document.querySelector(".modal__container");
    expect(preferencesContainer).toBeInTheDocument();
  });
});
