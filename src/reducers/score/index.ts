import { ScoreAction } from "../../actions/score";

export const scoreReducer = (score = 0, action: ScoreAction) => {
  const { diff, isReset } = action;
  switch(isReset) {
    case false:
      return score + diff;
    default:
      return 0;
  }
}