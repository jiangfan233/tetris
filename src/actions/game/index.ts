import { BlockGroupPosition } from "../../reducers/keyboard";
import { MeshState } from "../../reducers/Mesh";

const Start = "Start";
const Stop = "Stop";
const Continue = "Continue";

export type GameStatus = typeof Start | typeof Stop | typeof Continue;

export type GameAction = {
  type: GameStatus,
  rank?: number
}

type GameActionCreator = (type: GameStatus, rank?: number) => GameAction;

export const gameActionCreator: GameActionCreator = (type, rank, volume?: number, mesh?: MeshState, keyboard?: BlockGroupPosition) => {
  return {
    type,
    rank,
  }
}

export const game = {
  Start,
  Stop,
  Continue,
  gameActionCreator
} 