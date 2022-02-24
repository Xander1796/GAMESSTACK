import React, { useRef, useEffect } from "react";

import { useSearchParams } from "react-router-dom";

import { AiOutlineSearch } from "react-icons/ai";

export const SearchBar = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const searchInput = useRef();

  useEffect(() => {
    if (searchParams.get("q")) {
      searchInput.current.value = searchParams.get("q");
    }
  }, [searchParams]);

  const handleSearch = (e) => {
    e.preventDefault();

    if (searchInput.current.value.trim().length > 0) {
      searchParams.set("q", searchInput.current.value.trim());
    } else if (searchInput.current.value.trim().length === 0) {
      searchParams.delete("q");
    }

    searchParams.set("page", "1");
    setSearchParams(searchParams);
  };

  return (
    <form className="search-form">
      <input
        ref={searchInput}
        type="search"
        placeholder="Search over 670.000 games"
      ></input>
      <button onClick={handleSearch}>
        <AiOutlineSearch />
      </button>
    </form>
  );
};
