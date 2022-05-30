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