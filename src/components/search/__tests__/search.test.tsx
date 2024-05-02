import { fireEvent, render } from "@testing-library/react";
import { SearchBar } from "../search";
import "@testing-library/jest-dom";

describe(SearchBar, () => {
  it("when a user clicks the search bar input and begins to type, the value of the search bar should match their text", () => {
    const { getByPlaceholderText } = render(<SearchBar />);
    const searchBarInputField = getByPlaceholderText("Search by State or by City, State");
    fireEvent.change(searchBarInputField, { target: { value: "Chicago, Illinois" } });
    const target = (searchBarInputField as HTMLInputElement).value;
    expect(target).toBe("Chicago, Illinois");
  });
});
