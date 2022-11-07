import { combineReducers } from "redux";
import { keyBoardReducer } from "./keyboard";
import { MeshReducer } from "./Mesh";



export const RootReducer = combineReducers({
  keyboard: keyBoardReducer,
  mesh: MeshReducer,
})