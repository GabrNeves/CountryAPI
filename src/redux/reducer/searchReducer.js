const initialState = {
    searchCountry: [],
  };
  
  const reducer = (state = initialState, action) => {
    const actionType = action.type;
    switch (actionType) {
      case "SEARCHED_COUNTRY_LIST":
        const filteredCountry = state.countryData.filter((country) => {
          return country.name.toLowerCase().includes(action.payload.userInput)
        })
        return {
          ...state,
          search: filteredCountry,
        };
      default:
        return state;
    }
  };
  
  export default reducer;