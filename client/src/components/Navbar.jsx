import React, { useContext, useState } from "react";
import { NewsContext } from "../../contexts/NewsContext";

function Navbar() {
  const { setSearchQuery, searchQuery } = useContext(NewsContext);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <nav className="flex items-center justify-between flex-wrap bg-gray-800 p-2">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <a
          href="/"
          className="text-xl font-bold cursor-pointer text-white transition-all duration-500 hover:text-blue-500"
        >
          My Website
        </a>
      </div>
      <form className="w-full max-w-sm p-2">
        <div className="flex items-center border-b-2 border-blue-500 py-2">
          <input
            className="appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-1 leading-tight focus:outline-none"
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
      </form>
    </nav>
  );
}

export default Navbar;
