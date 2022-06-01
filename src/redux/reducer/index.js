import { combineReducers } from "redux";

import dataReducer from './dataReducer';
import favoriteReducer from './favoriteReducer';
import searchReducer from './searchReducer';
import darkModeReducer from './searchReducer';

const createRootReducer = () =>
combineReducers({  dataReducer, favoriteReducer, searchReducer, darkModeReducer });

export default createRootReducer;