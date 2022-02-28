import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { useGlobalContext } from "../../context";

import { OneColumnDisplaySvg } from "../../svgs/svgComponents/OneColumnDisplaySvg";
import { NormalDisplaySvg } from "../../svgs/svgComponents/NormalDisplaySvg";
//icons
import { BiSortAlt2 } from "react-icons/bi";
import { BsFilter } from "react-icons/bs";

const GamesActionsBar = ({ setGridType }) => {
  return (
    <div className="games-actions-bar">
      <FilterButton />
      <OrderGames />
      <SetDisplayWrapper setGridType={setGridType} />
    </div>
  );
};

const SetDisplayWrapper = ({ setGridType }) => {
  const [backgroundPosition, setBackgroundPosition] = useState("active-left");

  return (
    <div className="set-display-container">
      <h4>Display type:</h4>
      <div className="set-display-wrapper">
        <button
          className="set-display-normal"
          onClick={() => {
            setBackgroundPosition("active-left");
            setGridType("multi-column");
          }}
        >
          <NormalDisplaySvg />
        </button>
        <button
          className="set-display-one-column"
          onClick={() => {
            setBackgroundPosition("active-right");
            setGridType("one-column");
          }}
        >
          <OneColumnDisplaySvg />
        </button>
        <div
          className={`display-button-background ${backgroundPosition}`}
        ></div>
      </div>
    </div>
  );
};

const OrderGames = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const select = useRef();

  useEffect(() => {
    if (searchParams.get("ordering")) {
      select.current.querySelector(
        `[data-name=${searchParams.get("ordering")}]`
      ).selected = "selected";
    }
  }, []);

  const setOrderingQuery = () => {
    searchParams.set(
      "ordering",
      select.current.querySelectorAll("option")[select.current.selectedIndex]
        .dataset.name
    );
    searchParams.set("page", "1");
    setSearchParams(searchParams);
  };

  return (
    <div className="order-games-container">
      <label htmlFor="select-ordering">
        <BiSortAlt2 />
        Sort:
      </label>
      <select
        id="select-ordering"
        ref={select}
        onChange={() => setOrderingQuery()}
      >
        <option data-name="-added">Date added</option>
        <option data-name="-rating">Average Rating</option>
        <option data-name="-metacritic">Metacritic</option>
        <option data-name="-released">Release Date</option>
      </select>
    </div>
  );
};

const FilterButton = () => {
  const { setIsFiltersContainerOpen } = useGlobalContext();
  
  return (
    <button
      className="filter-action-button"
      onClick={() => {
        setIsFiltersContainerOpen(true);
      }}
    >
      <BsFilter />
      Filter
    </button>
  );
};

export default GamesActionsBar;
