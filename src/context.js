import React, { useContext, useState, useRef, useEffect, useReducer } from "react";
import reducer from "./reducer";

import API_KEY from "./api_key";

const AppContext = React.createContext();

const initialState = {
  genres: {
    categoryName: "genres",
    items: [],
  },
  parent_platforms: {
    categoryName: "parent_platforms",
    items: [],
  },
  developers: {
    categoryName: "developers",
    items: [],
  },
  tags: {
    categoryName: "tags",
    items: [],
  },
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isFiltersContainerOpen, setIsFiltersContainerOpen] = useState(false);

  const filtersContainer = useRef();

  const getFilterCategories = async (urlEndpoint) => {
    const data = await fetch(
      `https://api.rawg.io/api${urlEndpoint}?key=${API_KEY}`
    );
    const response = await data.json();

    return response.results;
  };

  useEffect(async () => {
    if (!localStorage.getItem("allGenres")) {
      dispatch({
        type: "ALL_GENRES",
        payload: await getFilterCategories("/genres"),
      });

      localStorage.setItem(
        "allGenres",
        JSON.stringify(await getFilterCategories("/genres"))
      );
    } else {
      dispatch({
        type: "ALL_GENRES",
        payload: JSON.parse(localStorage.getItem("allGenres")),
      });
    }
    if (!localStorage.getItem("platforms")) {
      dispatch({
        type: "ALL_PLATFORMS",
        payload: await getFilterCategories("/platforms/lists/parents"),
      });

      localStorage.setItem(
        "platforms",
        JSON.stringify(await getFilterCategories("/platforms/lists/parents"))
      );
    } else {
      dispatch({
        type: "ALL_PLATFORMS",
        payload: JSON.parse(localStorage.getItem("platforms")),
      });
    }
    if (!localStorage.getItem("developers")) {
      dispatch({
        type: "ALL_DEVELOPERS",
        payload: await getFilterCategories("/developers"),
      });

      localStorage.setItem(
        "developers",
        JSON.stringify(await getFilterCategories("/developers"))
      );
    } else {
      dispatch({
        type: "ALL_DEVELOPERS",
        payload: JSON.parse(localStorage.getItem("developers")),
      });
    }
    if (!localStorage.getItem("tags")) {
      dispatch({
        type: "ALL_TAGS",
        payload: await getFilterCategories("/tags"),
      });

      localStorage.setItem(
        "tags",
        JSON.stringify(await getFilterCategories("/tags"))
      );
    } else {
      dispatch({
        type: "ALL_TAGS",
        payload: JSON.parse(localStorage.getItem("tags")),
      });
    }
  }, []);

  return (
    <AppContext.Provider
      value={{
        ...state,
        state,
        isFiltersContainerOpen,
        setIsFiltersContainerOpen,
        filtersContainer
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
