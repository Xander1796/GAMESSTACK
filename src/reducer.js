const reducer = (state, action) => {
  if (action.type === "ALL_GENRES") {
    return {
      ...state,
      genres: { ...state.genres, items: action.payload },
    };
  }

  if (action.type === "ALL_PLATFORMS") {
    return {
      ...state,
      parent_platforms: { ...state.parent_platforms, items: action.payload },
    };
  }

  if (action.type === "ALL_DEVELOPERS") {
    return {
      ...state,
      developers: { ...state.developers, items: action.payload },
    };
  }

  if (action.type === "ALL_TAGS") {
    return {
      ...state,
      tags: { ...state.tags, items: action.payload },
    };
  }

  if (action.type === "SET_APPLIED_FILTERS") {
    return {
      ...state,
      appliedFilters: {
        ...state.appliedFilters,
        [action.payloadType]: [
          ...state.appliedFilters[action.payloadType],
          action.payloadId,
        ],
        filterNames: [...state.appliedFilters.filterNames, action.payloadName],
      },
    };
  }

  if (action.type === "REMOVE_FILTER") {
    console.log(state.appliedFilters.filterNames.filter(
      (filterName) => filterName.toString !== action.payloadName.toString()
    ))
    return {
      ...state,
      appliedFilters: {
        ...state.appliedFilters,
        [action.payloadType]: state.appliedFilters[action.payloadType].filter(
          (filterId) => filterId.toString() !== action.payloadId.toString()
        ),
        filterNames: state.appliedFilters.filterNames.filter(
          (filterName) => filterName.toString() !== action.payloadName.toString()
        ),
      },
    };
  }

};

export default reducer;
