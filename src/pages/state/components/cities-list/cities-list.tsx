import "./cities-list.scss";

export function CitiesList() {
  return (
    <div className="cities-list__container">
      <h3 className="cities-list__title">Cities List</h3>
      <div className="sort-by__container">
        <label className="sort-by__text" htmlFor="sort">
          Sort By:
        </label>
        <select name="sort">
          <option value="preferences">Preferences</option>
          <option value="A-Z">Alphabetical A-Z</option>
          <option value="Z-A">Alphabetical Z-A</option>
        </select>
      </div>
      <ul className="cities-list__ul">
        <li>City 1</li>
        <li>City 2</li>
        <li>City 3</li>
        <li>City 4</li>
        <li>City 5</li>
      </ul>
    </div>
  );
}
