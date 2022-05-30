import { combineReducers } from "redux";

import dataReducer from './dataReducer';
import favoriteReducer from './favoriteReducer';
import searchReducer from './searchReducer';

const createRootReducer = () =>
combineReducers({  dataReducer, favoriteReducer, searchReducer });

export default createRootReducer;