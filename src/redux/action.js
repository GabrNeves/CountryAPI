export const fetchCountriesRequest = () => {
  return { type: "FETCH_COUNTRIES_REQUEST" };
};

export const fetchCountriesSuccess = (response) => {
  return { type: "FETCH_COUNTRIES_SUCCESS", payload: { response } };
};

export const fetchCountriesFailure = (error) => {
  return { type: "FETCH_COUNTRIES_FAILURE", payload: { error } };
};

export const fetchCountrySuccess = (response) => {
  return { type: "FETCH_COUNTRY_SUCCESS", payload: { response } }
}

export const searchCountry = (value) => {
  return { type: "SEARCHED_COUNTRY_LIST", payload: value };
};

export const addFavorite = (favorite) => {
  return { type: "ADD_FAVORITE", payload: { favorite } };
};

export const removeFavorite = (favorite) => {
  return { type: "REMOVE_FAVORITE", payload: { favorite } };
};

export const fetchCountries = () => {
  return async (dispatch) => {
    try {
      dispatch(fetchCountriesRequest);
      const response = await fetch("https://restcountries.com/v3.1/all").then(
        (response) => response.json()
      );
      console.log(response, "RESPONSE FROM THUNK");
      dispatch(fetchCountriesSuccess(response));
    } catch (error) {
      dispatch(fetchCountriesFailure(error));
    }
  };
};

export const fetchCountry = (name) => {
  return async (dispatch) => {
    try {
      dispatch(fetchCountriesRequest);
      const response = await fetch(
        `https://restcountries.com/v3.1/name/${name}`
      ).then((response) => response.json());
      dispatch(fetchCountrySuccess(response));
    } catch (error) {
      dispatch(fetchCountriesFailure(error));
    }
  };
};

// export const sortCountries = (sortBy) => {
//   return {
//     type: 'SORT_COUNTRIES',
//     payload: sortBy,
//   }
// }
