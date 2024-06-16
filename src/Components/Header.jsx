import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

export default function Header({ searchQuery, setSearchQuery }) {
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(query);
    setQuery('');
  };

  const comeToHome = () => {
    setSearchQuery('');
    setQuery('');
  };

  return (
    <header className="bg-gray-800  w-full text-white py-2 lg:py-4 sticky top-0 z-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between">
        <div className="flex items-center w-full lg:w-auto">
          <NavLink to="/" className="text-xl lg:text-2xl font-bold mr-4" onClick={comeToHome}>
            Fotoflix
          </NavLink>
          <NavLink
            to="/favourites"
            className="text-xl lg:text-2xl font-bold ml-4 sm:ml-8"
            activeClassName="text-blue-500"
          >
            Favourites
          </NavLink>
        </div>

        <form onSubmit={handleSearch} className="flex w-full lg:max-w-md my-2 lg:my-0">
          <input
            type="text"
            id="search"
            name="search"
            placeholder="Search here..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="text-black px-4 py-2 rounded-l-lg focus:outline-none w-full lg:w-auto flex-grow"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r-lg ml-2"
          >
            Search
          </button>
        </form>
      </div>
    </header>
  );
}
