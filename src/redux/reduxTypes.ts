import {
  FETCH_COUNTRIES_SUCCESS,
  FETCH_COUNTRIES_REQUEST,
  FETCH_COUNTRIES_FAILURE,
  FETCH_COUNTRY_SUCCESS,
  SEARCHED_COUNTRY_LIST,
  ADD_FAVORITE,
  REMOVE_FAVORITE,
  } from './constants'
  import { Country } from '../types';


export type ActionTypes = AddFavorite | FetchCountriesFailure | FetchCountriesRequest | FetchCountriesSuccess | FetchCountrySuccess | RemoveFavorite | SearchCountry 

export type FetchCountriesRequest = {
  type: typeof FETCH_COUNTRIES_REQUEST
}

export type FetchCountriesSuccess = {
  type: typeof FETCH_COUNTRIES_SUCCESS,
  payload: {
    response: Country[],
  }
}

export type FetchCountriesFailure = {
  type: typeof FETCH_COUNTRIES_FAILURE,
  payload: {
    error: any,
  }
}

export type FetchCountrySuccess = {
  type: typeof FETCH_COUNTRY_SUCCESS,
  payload: {
    response: Country[],
  }
}

export type SearchCountry = {
  type: typeof SEARCHED_COUNTRY_LIST,
  payload: string,
}

export type AddFavorite = {
  type: typeof ADD_FAVORITE,
  payload: { favorite: Country[] },
  
}

export type RemoveFavorite = {
  type: typeof REMOVE_FAVORITE,
  payload: { favorite: Country[] }
}