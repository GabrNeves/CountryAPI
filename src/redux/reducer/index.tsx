import { combineReducers } from "redux";

import dataReducer from "./dataReducer";
import favoriteReducer from "./favoriteReducer";

const createRootReducer = () =>
  combineReducers({ dataReducer, favoriteReducer });

export default createRootReducer;
