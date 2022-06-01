const initialState = {
  countriesData: null,
  error: null,
  loading: false,
};

const reducer = (state = initialState, action) => {
  const actionType = action.type;
  switch (actionType) {
    case "FETCH_COUNTRIES_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "FETCH_COUNTRIES_SUCCESS":
      return {
        ...state,
        countriesData: action.payload.response,
        loading: false,
      };
    case "SEARCHED_COUNTRY_LIST":
      const filteredCountry = state.countryData.filter((country) => {
        return country.name.toLowerCase().includes(action.payload.userInput);
      });
      return {
        ...state,
        search: filteredCountry,
      };
    case "FETCH_COUNTRIES_FAILURE":
      return {
        ...state,
        error: action.payload.error,
        loading: false,
      };
    default:
      return state;
  }
};

export default reducer;
