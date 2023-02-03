import { rank, RankAction } from "../../actions/rank";
import { reRunTimer } from "../../control";

const { IncreaseRank } = rank;


export const rankReducer = (rank = 1, action: RankAction) => {
  const { type, rankDiff } = action;
  switch(type) {
    case IncreaseRank:
      const newRank = rank + rankDiff > 5 ? 1 : rank + rankDiff;
      reRunTimer(newRank);
      return newRank;
    default:
      return rank;
  }
}