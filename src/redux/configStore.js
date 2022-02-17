import { createStore, combineReducers, applyMiddleware } from "redux";
import { createBrowserHistory } from "history";
import dictionary from "./modules/dictionary";
import thunk from "redux-thunk";

export const history = createBrowserHistory();

const middlewares = [thunk];

const enhancer = applyMiddleware(...middlewares);

const rootReducer = combineReducers({ dictionary });

const store = createStore(rootReducer, enhancer);

export default store;
