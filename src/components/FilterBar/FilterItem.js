import React from "react";
import { useSearchParams } from "react-router-dom";

import { useState, useEffect } from "react";

const FilterItem = ({ item, categoryName }) => {
  const { name, id: filterId } = item;

  const [isFilterActive, setIsFilterActive] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (
      searchParams.get(categoryName) &&
      searchParams
        .get(categoryName)
        .split(",")
        .some((id) => id.toString() === filterId.toString())
    ) {
      setIsFilterActive(true);
    } else {
      setIsFilterActive(false);
    }
  }, [searchParams]);

  const handleFilterQuery = (e) => {
    let filterValues = searchParams?.get(categoryName)?.split(",");

    if (!searchParams.get(categoryName)) {
      searchParams.set(categoryName, filterId);
    } else if (
      filterValues.some((id) => id.toString() === filterId.toString())
    ) {
      if (filterValues.length > 1) {
        filterValues = filterValues.filter(
          (id) => id.toString() !== filterId.toString()
        );
        searchParams.set(categoryName, filterValues);
      } else {
        searchParams.delete(categoryName);
      }
    } else {
      filterValues = [...filterValues, filterId];
      searchParams.set(categoryName, [...filterValues]);
    }

    searchParams.set("page", "1");
    setSearchParams(searchParams);
  };

  return (
    <div
      className="filter-item"
      data-filter-type={categoryName}
      data-filter-id={filterId}
      onClick={(e) => {
        e.preventDefault();
        handleFilterQuery();
      }}
    >
      <input
        className={isFilterActive ? "filter-active" : ""}
        type="checkbox"
        id={`${name}-${filterId}`}
        data-filter-type={categoryName}
        data-filter-id={filterId}
      />
      <label
        className={`filter-item ${isFilterActive ? "filter-active" : ""}`}
        htmlFor={`${name}-${filterId}`}
        data-filter-type={categoryName}
        data-filter-id={filterId}
      >
        {name}
      </label>
    </div>
  );
};

export default FilterItem;
