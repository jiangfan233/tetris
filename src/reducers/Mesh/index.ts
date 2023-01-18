import {
  OCCUPY,
  LIBERATE,
  BATCH_OCCUPY,
  BATCH_LIBERATE,
  Point,
  occupy,
  liberate,
  batchOccupy,
  batchLiberate,
  PointAction,
  BATCH_LIBERATE_BOTTOM,
} from "../../actions/Mesh";
import { Mesh as MeshConfig } from "../../config";
import { store } from "../../store";
import { score, ScoreAction } from "../../actions/score";
import produce from "immer";

const initialState = {
  points: Array(MeshConfig.width).fill(Array(MeshConfig.height).fill(0)),
};

export type MeshState = {
  points: number[][];
};

// 网格系统
// 左上角坐标为 （0，0）
export const MeshReducer = (
  state: MeshState = initialState,
  action: PointAction
) => {
  switch (action.type) {
    // 批量占据多个点
    case BATCH_OCCUPY:
      return produce(state, (draft: MeshState) => {
        action.points!.forEach((point) => {
          draft.points[point.x][point.y] = 1;
        });
      });

    // 批量解放多个点
    case BATCH_LIBERATE:
      return produce(state, (draft: MeshState) => {
        action.points!.forEach((point) => {
          draft.points[point.x][point.y] = 0;
        });
      });

    // 批量解放底部
    case BATCH_LIBERATE_BOTTOM:
      return produce(state, (draft: MeshState) => {
        // 最顶层有1，有方块了，游戏结束
        if (!draft.points.every((col) => col[0] === 0)) {
          return;
        }
        let row = MeshConfig.height - 1;
        let count = 0;
        while (row > 0) {
          while (draft.points.every((col) => col[row] === 1)) {
            draft.points.forEach((col) => {
              col.splice(row, 1);
              col.unshift(0);
            });
            count++;
          }
          row--;
        }
        // 更新分数，播放音效
        const fn = score.genUpdateSocreAsync(MeshConfig.width * count, false)
        store.dispatch(fn);
      });

    default:
      return state;
  }
};
