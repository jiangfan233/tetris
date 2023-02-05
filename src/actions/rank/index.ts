import { GameState } from "../../reducers/game";


const IncreaseRank = "IncreaseRank";

export type RankAction = {
  type: typeof IncreaseRank,
  rankDiff: number;
  game?: GameState
}

type RankActionCreator = (rankDiff: number, game?: GameState) => RankAction;

const increaseRank :RankActionCreator = (rankDiff, game) => {
  return {
    type: IncreaseRank,
    rankDiff,
    game
  }
}

export const rank = {
  IncreaseRank,
  increaseRank,
}