import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../../context";

import FilterItem from "./FilterItem";

import { BsFilter } from "react-icons/bs";
import { BiChevronDown, BiChevronUp, BiChevronRight } from "react-icons/bi";
import { MdClear } from "react-icons/md";

import { v4 as uuid } from "uuid";

const FiltersContainer = () => {
  const {
    genres,
    parent_platforms,
    developers,
    tags,
    filtersContainer,
    isFiltersContainerOpen,
    setIsFiltersContainerOpen
  } = useGlobalContext();

  const allFilterCategories = [genres, parent_platforms, developers, tags];

  return (
    <div
      className={`filters-container ${isFiltersContainerOpen ? "open" : ""}`}
      ref={filtersContainer}
    >
      <div className="filters-container-nav">
        <h2>
          <BsFilter />
          Filters
        </h2>
        <button onClick={() => setIsFiltersContainerOpen(false)}>
          <MdClear />
        </button>
      </div>
      {allFilterCategories.map((category) => {
        const uniqueId = uuid();
        return <FilterCategory key={uniqueId} category={category} />;
      })}
    </div>
  );
};

const FilterCategory = ({ category }) => {
  const { categoryName, items } = category;
  const [isShowingMore, setIsShowingMore] = useState(false);
  const [isFilterItemsOpen, setIsFilterItemsOpen] = useState(true);
  const [filterItems, setFilterItems] = useState([]);

  useEffect(() => {
    setFilterItems(items.slice(0, 3));
  }, [items]);

  useEffect(() => {
    if (isFilterItemsOpen === false) {
      setFilterItems([]);
    } else if (isFilterItemsOpen && isShowingMore) {

      setFilterItems(items);
    } else if (isFilterItemsOpen && !isShowingMore) {

      setFilterItems(items.slice(0, 3));
    }
  }, [isFilterItemsOpen]);

  const toggleFilterItems = () => {
    setIsShowingMore(!isShowingMore);
    isShowingMore ? setFilterItems(items.slice(0, 3)) : setFilterItems(items);
  };

  const toggleFilterItemsHeight = () => {
    setIsFilterItemsOpen(!isFilterItemsOpen);
  };

  return (
    <div className="filter-category">
      <button
        className="filter-category-name"
        onClick={toggleFilterItemsHeight}
      >
        {categoryName === "parent_platforms" ? "platforms" : categoryName}
        {isFilterItemsOpen ? <BiChevronDown /> : <BiChevronRight />}
      </button>
      {filterItems.length > 0 && (
        <div className="filter-items-wrapper">
          {filterItems.map((item) => {
            const uniqueId = uuid();

            return (
              <FilterItem
                key={uniqueId}
                item={item}
                categoryName={categoryName}
              />
            );
          })}
          <button className="show-more-filters" onClick={toggleFilterItems}>
            {isShowingMore ? "Show Less" : "Show More"}
            {isShowingMore ? <BiChevronUp /> : <BiChevronDown />}
          </button>
        </div>
      )}
    </div>
  );
};

export default FiltersContainer;
