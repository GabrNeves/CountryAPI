import {
  FETCH_COUNTRIES_SUCCESS,
  FETCH_COUNTRIES_REQUEST,
  FETCH_COUNTRIES_FAILURE,
  FETCH_COUNTRY_SUCCESS,
  SEARCHED_COUNTRY_LIST,
} from "../constants";
import { ActionTypes } from '../reduxTypes';

import { CountriesInitialState } from '../../types'

const initialState: CountriesInitialState = {
  countriesData: [],
  error: null,
  loading: false,
  country: [],
  filteredCountry: [],
};

const reducer = (state = initialState, action: ActionTypes) => {
  const actionType = action.type;
  switch (actionType) {
    case FETCH_COUNTRIES_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case FETCH_COUNTRIES_SUCCESS:
      return {
        ...state,
        countriesData: action.payload.response,
        filteredCountry: action.payload.response,
        loading: false,
      };

    case FETCH_COUNTRIES_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        loading: false,
      };

    case FETCH_COUNTRY_SUCCESS:
      return {
        ...state,
        country: action.payload.response,
        loading: false,
      };

    case SEARCHED_COUNTRY_LIST:
      const filteredCountry = state.countriesData.filter(
        (country) =>
          country.name.common
            .toLowerCase()
            .includes(action.payload.toLowerCase()) ||
          country.region.toLowerCase().includes(action.payload.toLowerCase())
      );
      return {
        ...state,
        loading: false,
        filteredCountry,
      };

    default:
      return state;
  }
};

export default reducer;
