import { Link, useNavigate } from "react-router-dom";

import SearchIcon from "../../assets/SearchIcon";

const Search = ({ query, setQuery, books }) => {
  const navigate = useNavigate();

  const filterBooks = (books) => {
    return books.filter((book) => {
      if (query === "") {
        return book;
      } else if (book.title.toLowerCase().includes(query.toLowerCase())) {
        return book;
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/books", { state: { books: filterBooks(books) } });
  };

  return (
    <div className="search__container">
      <SearchIcon />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          autoComplete="off"
          id="search"
          onChange={(e) => setQuery(e.target.value)}
          value={query}
        />
      </form>
      <ul className="search-list">
        {filterBooks(books)
          .slice(0, 7)
          .map((book) => (
            <li key={book.id}>
              <Link to={`/books/${book.id}`}>
                <p>{book.title}</p>
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Search;
