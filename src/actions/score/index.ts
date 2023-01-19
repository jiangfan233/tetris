export const UpdateScore = "UpdateScore";

export type ScoreAction = {
  type: typeof UpdateScore;
  diff: number;
  isReset: boolean;
};

export interface ScoreActionCreator {
  (diff: number, isReset: boolean): ScoreAction;
}

export const updateScore: ScoreActionCreator = (
  diff: number,
  isReset: boolean
) => {
  return {
    type: UpdateScore,
    diff,
    isReset,
  };
};


// trunk-function
// 使用中间件在reducer用异步调用reducer
// 问题：await语句和dispatch需要同步顺序执行,不适合当前的应用场景
// 目前感觉异步dispatch是为真正的IO请求设计的，获取到IO数据之后再dispatch，dispatch始终是同步执行的状态
// export const genUpdateSocreAsync = (diff: number, isReset: false) => {
//   return async (dispatch, getState) => {
//     await Promise.resolve()
//     dispatch({ type: UpdateScore, diff, isReset })
//   }
// }

export const score = {
  UpdateScore,
  updateScore,
};
