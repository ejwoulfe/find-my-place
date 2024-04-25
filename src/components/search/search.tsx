import magnifyingGlass from "../../assets/navigation-icons/magnifying.svg";
import StateAndCityInterface from "../../interfaces/stateAndCity";
import "./search.scss";

interface SearchBarProps {
  setStateAndCity: React.Dispatch<React.SetStateAction<StateAndCityInterface>>;
}
export function SearchBar(props: SearchBarProps) {
  const { setStateAndCity } = props;
  function searchSubmitted(e: React.SyntheticEvent) {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      search: { value: string };
    };

    const searchTerm = target.search.value;
    console.log(searchTerm);
  }
  return (
    <form className="search__form" method="get" onSubmit={searchSubmitted}>
      <input type="search" id="site-search" name="search" placeholder="Search by State or City Name i.e. City, State" />

      <button type="submit">
        <img src={magnifyingGlass} className="nav__svg" alt="search-button" />
      </button>
    </form>
  );
}
