import magnifyingGlass from "../../assets/navigation-icons/magnifying.svg";
import "./search.scss";
import { confirmStateExists } from "../../helpers/confirmStateExists";
import { formatForSearch } from "../../helpers/formatForSearch";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export function SearchBar() {
  const navigate = useNavigate();
  const [searchErrorMessage, setSearchErrorMessage] = useState<string | null>(null);

  function searchSubmitted(e: React.SyntheticEvent) {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      search: { value: string };
    };
    if (target.search.value.length === 0) {
      setSearchErrorMessage("Entered a value of length 0.");
    }

    const searchTerm = target.search.value;
    const splitSearchTerm = formatForSearch(searchTerm);
    if (splitSearchTerm.length === 2) {
      const searchCity = splitSearchTerm[0];
      const searchState = splitSearchTerm[1];
      navigate(`/state/${searchState}/${searchCity}`);
    } else if (splitSearchTerm.length === 1) {
      const searchState = splitSearchTerm[0];
      if (confirmStateExists(searchState)) {
        navigate(`/state/${searchState}`);
      } else {
        setSearchErrorMessage("State not found, please try again");
      }
    } else {
      setSearchErrorMessage("Format unrecognized, please type City, State or just State");
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
