import React from "react";

//components
import FiltersContainer from "../components/FilterBar/FiltersContainer";
import { SearchBar } from "../components/SearchBar";
import { AppliedFilters } from "../components/AppliedFilters";
import AllGames from "../components/AllGames/AllGames";
import Footer from "../components/Footer";

//icons
import { IoGameControllerSharp } from "react-icons/io5";

const Games = () => {
  return (
    <>
      <section id="games-section">
        <h1>
          <IoGameControllerSharp />
          Games
        </h1>
        <div className="games-section-content-wrapper">
          <FiltersContainer />
          <div className="search-and-games">
            <SearchBar />
            <AppliedFilters />
            <AllGames />
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Games;
