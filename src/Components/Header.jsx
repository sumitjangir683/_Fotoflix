import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

export default function Header({ searchQuery, setSearchQuery }) {
   const [query,setquery]= useState('')
    const handleSearch = (e) => {
        e.preventDefault();
        setSearchQuery(query);
       setquery("")
    };
   const comeTohome = () => {
    setSearchQuery('');
    setquery("")
   }
    return (
        <header className="bg-gray-800 text-white py-4 sticky top-0 z-10">
            <nav className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                <div className="mr-4">
                    <NavLink to="/" className="text-xl font-bold">
                       <button onClick={comeTohome}>Fotoflix</button>
                    </NavLink>
                </div>
                <form action="" onSubmit={handleSearch} className="flex items-center flex-1">
                    <input
                        type="text"
                        id="search"
                        name="search"
                        placeholder="Search here..."
                        value={query}
                        onChange={(e) => setquery(e.target.value)}
                        className="text-black px-4 py-2 rounded-l-lg focus:outline-none w-full"
                    />
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r-lg ml-2"
                    >
                        Search
                    </button>
                </form>
                <div className="ml-4">
                    <NavLink to="/favourites" className="text-xl font-bold">
                        Favourites
                    </NavLink>
                </div>
            </nav>
        </header>
    );
}
