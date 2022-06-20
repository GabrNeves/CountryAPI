import { Dispatch } from 'redux';
import { Country } from '../types';
import {
FETCH_COUNTRIES_SUCCESS,
FETCH_COUNTRIES_REQUEST,
FETCH_COUNTRIES_FAILURE,
FETCH_COUNTRY_SUCCESS,
SEARCHED_COUNTRY_LIST,
ADD_FAVORITE,
REMOVE_FAVORITE,
} from './constants'
import { AddFavorite, FetchCountriesFailure, FetchCountriesRequest, FetchCountriesSuccess, FetchCountrySuccess, RemoveFavorite, SearchCountry } from './reduxTypes';


export const fetchCountriesRequest = (): FetchCountriesRequest => {
  return { type: FETCH_COUNTRIES_REQUEST };
};

export const fetchCountriesSuccess = (response: Country[]): FetchCountriesSuccess => {
  return { type: FETCH_COUNTRIES_SUCCESS, payload: { response } };
};

export const fetchCountriesFailure = (error: any): FetchCountriesFailure => {
  return { type: FETCH_COUNTRIES_FAILURE, payload: { error } };
};

export const fetchCountrySuccess = (response: Country[]): FetchCountrySuccess => {
  return { type: FETCH_COUNTRY_SUCCESS, payload: { response } }
}

export const searchCountry = (value: string): SearchCountry => {
  return { type: SEARCHED_COUNTRY_LIST, payload: value };
};

export const addFavorite = (favorite: Country[]): AddFavorite => {
  return { type: ADD_FAVORITE, payload: { favorite } };
};

export const removeFavorite = (favorite: Country[]):RemoveFavorite => {
  return { type: REMOVE_FAVORITE, payload: { favorite } };
};

export const fetchCountries = () => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(fetchCountriesRequest());
      const response: Country[] = await fetch("https://restcountries.com/v3.1/all").then(
        (response) => response.json()
      );
      console.log(response, "RESPONSE FROM THUNK");
      dispatch(fetchCountriesSuccess(response));
    } catch (error) {
      dispatch(fetchCountriesFailure(error));
    }
  };
};

export const fetchCountry = (name: string) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(fetchCountriesRequest());
      const response: Country[] = await fetch(
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
