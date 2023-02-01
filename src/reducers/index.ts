import { combineReducers } from "redux";
import { keyBoardReducer } from "./keyboard";
import { MeshReducer } from "./Mesh";
import { scoreReducer } from "./score";
import { soundReducer } from "./sound";



export const RootReducer = combineReducers({
  keyboard: keyBoardReducer,
  mesh: MeshReducer,
  score: scoreReducer,
  sound: soundReducer,
})