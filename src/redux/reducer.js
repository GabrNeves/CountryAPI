const initialState = {
  countriesData: null,
  error: null,
  loading: false,
  favoriteCart: [],
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
      const keyword = ''
      const handleSearch = (e) => {keyword(e.target.value)}
      return {
        ...state,
        
      };
    case "ADD_FAVORITE":
        const favorite = action.payload.favorite
        if (state.favoriteCart.find((p) => p.name.common === favorite.name.common)) {
            return state
        };
      return {
        ...state,
        country: {...state.country},
        favoriteCart: [...state.favoriteCart, favorite],
      };
    case "REMOVE_FAVORITE": {
        const favorite = action.payload.favorite
        const index = state.favoriteCart.findIndex((p) => p.name.common === favorite.name.common)
        if (index >= 0) {
            state.favoriteCart.splice(index, 1)
            return {...state, favoriteCart: [...state.favoriteCart]}
        }
        return state
    }
    default:
      return state;
  }
};

export default reducer;
