import { BlockGroupPosition } from "../../reducers/keyboard";
import { MeshState } from "../../reducers/Mesh";

const Start = "Start";
const Stop = "Stop";
const Continue = "Continue";

export type GameStatus = typeof Start | typeof Stop | typeof Continue;

export type GameAction = {
  type: GameStatus,
}

type GameActionCreator = (type: GameStatus, rank?: number, volume?: number, mesh?: MeshState, keyboard?: BlockGroupPosition) => { type: GameStatus };

export const gameActionCreator: GameActionCreator = (type, rank, volume?: number, mesh?: MeshState, keyboard?: BlockGroupPosition) => {
  return {
    type,
    rank,
    volume,
    mesh,
    keyboard,
  }
}

export const game = {
  Start,
  Stop,
  Continue,
  gameActionCreator
} 