import { Country, FavoriteCartInitialState } from '../../types';
import {ADD_FAVORITE, REMOVE_FAVORITE} from '../constants'
import { ActionTypes } from '../reduxTypes';

const initialState: FavoriteCartInitialState = {
    favoriteCart: [],
    country: []
  };
  
  const reducer = (state = initialState, action: ActionTypes) => {
    const actionType = action.type;
    switch (actionType) {
      case ADD_FAVORITE:
          const favorite = action.payload.favorite
          console.log(favorite)
          if (state.favoriteCart.find((p: Country) => p.name.common === favorite.name.common)) {
              return state
          };
        return {
          ...state,
          country: {...state.country}, //is this used for something??
          favoriteCart: [...state.favoriteCart, favorite],
        };
      case REMOVE_FAVORITE: {
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