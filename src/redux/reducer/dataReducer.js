const initialState = {
  countriesData: [],
  error: null,
  loading: false,
  filteredCountry: [],
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
    case "FETCH_COUNTRIES_FAILURE":
      return {
        ...state,
        error: action.payload.error,
        loading: false,
      };
    case "SEARCHED_COUNTRY_LIST":
      const filteredCountry = state.countriesData.filter(country => country.name.common.toLowerCase().includes(action.payload.toLowerCase()))
    
      console.log(action.payload, 'payload')
      console.log(state.countriesData, 'countriesData')
      return {
        ...state,
        countriesData: action.countriesData,
        loading: false,
        filteredCountry: filteredCountry,
      };
    default:
      return state;
  }
};

export default reducer;
