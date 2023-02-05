import { game, GameStatus, type GameAction } from "../../actions/game";
import { run, type AfterRun } from "../../control";


const { Start, Stop, Continue, gameActionCreator } = game

export type GameState = { status: GameStatus, afterRun: undefined | AfterRun };

type GameReducer = (state: GameState, action: GameAction) => GameState

const initState: GameState = {
  status: Stop as GameStatus,
  afterRun: undefined,
}

export const gameReducer: GameReducer = (state = initState, action: GameAction) => {
  const { type, rank } = action;
  switch (type) {
    case Start:
      return { status: Start as GameStatus, afterRun: run() };

    case Continue:
      return { status: Start as GameStatus, afterRun: run(rank) };

    case Stop:
      const { afterRun } = state;
      afterRun && afterRun.stop();
      return { status: Stop as GameStatus, afterRun: undefined };

    default:
      return state;
  }
}