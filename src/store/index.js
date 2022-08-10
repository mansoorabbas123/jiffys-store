import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import * as reducers from "../store/reducers";

const rootReducers = combineReducers({
  products: reducers.products,
  userInfo: reducers.userReducer,
  cart: reducers.cartReducer,
  order: reducers.orderReducer,
});

const middlewares = [thunk];

const store = createStore(
  rootReducers,
  composeWithDevTools(applyMiddleware(...middlewares))
);

export default store;
