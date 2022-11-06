import { combineReducers } from "redux";
import { keyBoardReducer } from "./keyboard";




export const KeyBoardReducer = combineReducers({
  keyboard: keyBoardReducer
})