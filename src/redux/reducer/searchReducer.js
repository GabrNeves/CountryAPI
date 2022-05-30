const initialState = {
    searchCountry: [],
  };
  
  const reducer = (state = initialState, action) => {
    const actionType = action.type;
    switch (actionType) {
      case "SEARCHED_COUNTRY_LIST":
        const keyword = ''
        const handleSearch = (e) => {keyword(e.target.value)}
        return {
          ...state,
          
        };
      default:
        return state;
    }
  };
  
  export default reducer;