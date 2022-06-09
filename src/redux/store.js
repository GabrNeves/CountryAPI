import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
} from "redux";
import thunk from "redux-thunk";

import createRootReducer from "./reducer/index";

const initState = {
  dataReducer: {
    countriesData: [],
    error: null,
    loading: false,
    country: [],
    filteredCountry: [],
  },
  favoriteReducer: {
    favoriteCart: [],
  },
};

export default function renderStore(initialState = initState) {
  const middlewares = [thunk];
  let composeEnhancers = compose;

  if (process.env.NODE_ENV === "development") {
    if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
      composeEnhancers = window.__REDUX__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
    }
  }

  let favoriteObj = localStorage.getItem("favoriteItem");

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

  if (module.hot) {
    module.hot.accept("./reducer", () => {
      const nextReducer = require("./reducer").default;
      store.replaceReducer(nextReducer);
    });
  }
  return store;
}

// const middlewares = [thunk];
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const store = createStore(
//   createRootReducer(),
//   composeEnhancers(applyMiddleware(...middlewares))
// );

// export default store;
