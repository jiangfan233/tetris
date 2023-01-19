import { ScoreAction } from "../../actions/score";


export const scoreReducer = (score = 0, action: ScoreAction) => {
  const { diff, isReset } = action;
  switch(isReset) {
    case false:
      return score + diff;
    case true:
      return 0;

    // reducer中switch语句的default必须有，需要保持数据一致
    default:
      return score;
  }
}