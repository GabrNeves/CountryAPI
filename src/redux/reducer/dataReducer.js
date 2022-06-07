const initialState = {
  countriesData: [],
  error: null,
  loading: false,
  country: [],
  filteredCountry: [],
  sortedCountry: [],
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
        filteredCountry: action.payload.response,
        loading: false,
      };

    case "FETCH_COUNTRIES_FAILURE":
      return {
        ...state,
        error: action.payload.error,
        loading: false,
      };

    case "FETCH_COUNTRY_SUCCESS":
      return {
        ...state,
        country: action.payload.response,
        loading: false,
      };

    case "SEARCHED_COUNTRY_LIST":
      const filteredCountry = state.countriesData.filter((country) =>
        country.name.common.toLowerCase().includes(action.payload.toLowerCase())
      );
      return {
        ...state,
        loading: false,
        filteredCountry,
      };
    case "SORT_COUNTRIES":
      const sortBy = action.payload;
      const sortedCountry = state.filteredCountry;
      
      const sortedCountries = sortedCountry.sort((a, b) => {
        if (a.name.common < b.name.common) {
          if (sortBy === 'asc') {
            return -1;
          }
          return 1;
        }
        if (a.name.common > b.name.common) {
          if (sortBy === 'asc') {
            return 1;
          }
          return -1;
        }
        return 0;
      });
      console.log('sortedCountries: ', sortedCountries)
      console.log('sortBy: ', sortBy);
      return {
        ...state,
        sortedCountry: sortedCountries,
      };
      

    default:
      return state;
  }
};

export default reducer;
