import { combineReducers } from "redux";
import { gameReducer } from "./game";
import { keyBoardReducer } from "./keyboard";
import { MeshReducer } from "./Mesh";
import { rankReducer } from "./rank";
import { scoreReducer } from "./score";
import { soundReducer } from "./sound";
import { volumnReducer } from "./volume";



export const RootReducer = combineReducers({
  keyboard: keyBoardReducer,
  mesh: MeshReducer,
  score: scoreReducer,
  sound: soundReducer,
  volume: volumnReducer,
  rank: rankReducer,
  game: gameReducer,
})