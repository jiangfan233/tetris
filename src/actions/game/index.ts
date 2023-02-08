
const Start = "Start";
const Stop = "Stop";
const Continue = "Continue";

export type GameStatus = typeof Start | typeof Stop | typeof Continue;

export type GameAction = {
  type: GameStatus,
  rank?: number
}

type GameActionCreator = (type: GameStatus, rank?: number) => GameAction;

export const gameActionCreator: GameActionCreator = (type, rank) => {
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