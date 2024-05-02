import { useContext } from "react";
import magnifyingGlass from "../../assets/navigation-icons/magnifying.svg";
import "./search.scss";
import { StateAndCityContext } from "../../context/StateAndCityContext";
import { confirmStateExists } from "../../helpers/confirmStateExists";
import { capitalizeFirstLetter } from "../../helpers/capitalizeFirstLetter";

export function SearchBar() {
  const { setStateAndCity } = useContext(StateAndCityContext);

  function searchSubmitted(e: React.SyntheticEvent) {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      search: { value: string };
    };

    const searchTerm = target.search.value;
    const splitSearchTerm = searchTerm.split(",");
    if (splitSearchTerm.length > 1) {
      const searchCity = capitalizeFirstLetter(splitSearchTerm[0].trim());
      const searchState = capitalizeFirstLetter(splitSearchTerm[1].trim());
      setStateAndCity({ state: searchState, city: searchCity });
    } else if (splitSearchTerm.length === 1) {
      const searchState = capitalizeFirstLetter(splitSearchTerm[0].trim());
      if (confirmStateExists(searchState)) {
        setStateAndCity({ state: searchState, city: null });
      }
    }
  }
  return (
    <form className="search__form" method="get" onSubmit={searchSubmitted}>
      <input type="search" id="site-search" name="search" placeholder="Search by State or by City, State" />

      <button type="submit">
        <img src={magnifyingGlass} className="nav__svg" alt="search-button" />
      </button>
    </form>
  );
}
