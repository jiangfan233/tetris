import { createStore, applyMiddleware } from "redux";
import { RootReducer } from "../reducers/index";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware));

export const store = createStore(RootReducer, composedEnhancer);
