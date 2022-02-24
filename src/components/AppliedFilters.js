import React, { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";

import { useGlobalContext } from "../context";

import { v4 as uuid } from "uuid";
import { MdClear } from "react-icons/md";
import { GiMagicBroom } from "react-icons/gi";

export const AppliedFilters = () => {
  const [activeFilters, setActiveFilters] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const { state } = useGlobalContext();

  useEffect(() => {
    let allFilters = [...searchParams];

    allFilters = allFilters.filter((filter) => {
      if (filter.includes("q") || filter.includes("page") || filter.includes("ordering")) return;

      return filter;
    });

    if (allFilters.length === 0) {
      setActiveFilters([]);
      return;
    }

    allFilters = Object.fromEntries(allFilters);
    const appliedFiltersKeys = Object.keys(allFilters);
    const appliedFiltersValues = Object.values(allFilters);

    let valuesArray = appliedFiltersValues.map((value) => value.split(","));

    let newActiveFilters = [];
    for (let i = 0; i < appliedFiltersKeys.length; i++) {
      for (let j = 0; j < valuesArray[i].length; j++) {
        for (let k = 0; k < state[appliedFiltersKeys[i]].items.length; k++) {
          console.log(valuesArray[i][j])

          if (
            valuesArray[i][j] ===
            state[appliedFiltersKeys[i]].items[k].id.toString()
          ) {
            newActiveFilters = [
              ...newActiveFilters,
              {
                filterCategory: appliedFiltersKeys[i],
                filterName: state[appliedFiltersKeys[i]].items[k].name,
                filterId: valuesArray[i][j],
              },
            ];
            console.log(state[appliedFiltersKeys[i]].items[k].name);
          }
        }
      }
    }

    setActiveFilters(newActiveFilters);

  }, [searchParams, state]);

  const deleteFilter = (e) => {
    const targetedFilterCategory =
      e.target.closest(".delete-filter").dataset.filterCategory;
      
    let newValuesArray = searchParams
      .get(targetedFilterCategory)
      .split(",")
      .filter(
        (id) =>
          id.toString() !==
          e.target.closest(".delete-filter").dataset.filterId.toString()
      );

    if (newValuesArray.length > 0) {
      searchParams.set(targetedFilterCategory.toString(), [...newValuesArray]);
    } else if (newValuesArray.length === 0) {
      searchParams.delete(targetedFilterCategory.toString());
    }

    searchParams.set("page", "1");
    setSearchParams(searchParams);
  };

  return (
    <div className="active-filters-wrapper">
      {activeFilters.length > 0 &&
        activeFilters.map((filter) => {
          const uniqueId = uuid();

          return (
            <div key={uniqueId} className="active-filter">
              <span>{filter.filterName}</span>
              <button
                className="delete-filter"
                data-filter-category={filter.filterCategory}
                data-filter-id={filter.filterId}
                onClick={(e) => deleteFilter(e)}
              >
                {" "}
                <MdClear
                  data-filter-category={filter.filterCategory}
                  data-filter-id={filter.filterId}
                />
              </button>
            </div>
          );
        })}
      {activeFilters.length > 0 && (
        <button
          className="clear-filters"
          onClick={() => {
            setSearchParams("");
          }}
        >
          Clear filters <GiMagicBroom />
        </button>
      )}
    </div>
  );
};
