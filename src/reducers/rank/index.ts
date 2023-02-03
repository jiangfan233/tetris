import { rank, RankAction } from "../../actions/rank";

const { IncreaseRank } = rank;


export const rankReducer = (rank = 1, action: RankAction) => {
  const { type, rankDiff, game } = action;
  switch(type) {
    case IncreaseRank:
      const newRank = rank + rankDiff > 5 ? 1 : rank + rankDiff;
      game.afterRun?.reRunTimer(newRank);
      return newRank;
    default:
      return rank;
  }
}