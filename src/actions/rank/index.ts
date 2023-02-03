

const IncreaseRank = "IncreaseRank";

export type RankAction = {
  type: typeof IncreaseRank,
  rankDiff: number;
}

type RankActionCreator = (rankDiff: number) => RankAction;

const increaseRank :RankActionCreator = (rankDiff) => {
  return {
    type: IncreaseRank,
    rankDiff,
  }
}

export const rank = {
  IncreaseRank,
  increaseRank,
}