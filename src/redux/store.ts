import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
} from "redux";
import thunk from "redux-thunk";
import { AppState } from "../types";

import createRootReducer from "./reducer/index";

const initState: AppState = {
  dataReducer: {
    countriesData: [],
    error: null,
    loading: false,
    country: [],
    filteredCountry: [],
  },
  favoriteReducer: {
    favoriteCart: [],
    country: []
  },
};

export default function renderStore(initialState = initState) {
  const middlewares = [thunk];
  let composeEnhancers = compose;

  if (process.env.NODE_ENV === "development") {
    if ((window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
      composeEnhancers = (window as any).__REDUX__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
    }
    composeEnhancers = compose;
  }

  let favoriteObj = localStorage.getItem("favoriteItem");
  console.log('favoriteObj:', favoriteObj)

  let finalState;
  if (favoriteObj) {
    let stored = JSON.parse(favoriteObj);
    initState.favoriteReducer.favoriteCart = stored;
    finalState = initState;
  } else {
    finalState = initState;
  }

  const store = createStore(
    createRootReducer(),
    finalState,
    composeEnhancers(applyMiddleware(...middlewares))
  );

  store.subscribe(() => {
    const state = store.getState();
    localStorage.setItem(
      "favoriteItem",
      JSON.stringify(state.favoriteReducer.favoriteCart)
    );
  });

  if ((module as any).hot) {
    (module as any).hot.accept("./reducer", () => {
      const nextReducer = require("./reducer").default;
      store.replaceReducer(nextReducer);
    });
  }
  return store;
}
