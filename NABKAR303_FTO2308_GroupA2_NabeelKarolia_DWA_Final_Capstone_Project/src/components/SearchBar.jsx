export default function SearchBar() {
  return (
    <div id="search">
      <form action="/action_page.php">
        <input type="text" placeholder="Search.." name="search" id="form" />
        <button type="submit" id="SButton">
          <img src="./images/search.png" alt="Descriptive Text" id="searchButton" />
        </button>
      </form>
    </div>
  );
}
