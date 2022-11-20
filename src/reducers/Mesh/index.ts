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
} from "../../actions/Mesh";
import { Mesh as MeshConfig } from "../../config";
import produce from "immer";

const initialState = {
  points: Array(MeshConfig.width).fill(Array(MeshConfig.height).fill(0))
};

export type MeshState = {
  points: number[][]
}

// 网格系统
// 左上角坐标为 （0，0）
export const MeshReducer = (state:MeshState = initialState, action: PointAction) => {
  switch (action.type) {
    // 批量占据多个点
    case BATCH_OCCUPY:
      return produce(state, (draft:MeshState) => {
        action.points.forEach(point => {
          draft.points[point.x][point.y] = 1
        })
      })

    // 批量解放多个点
    case BATCH_LIBERATE:
      return produce(state, (draft:MeshState) => {
        action.points.forEach(point => {
          draft.points[point.x][point.y] = 0
        })
      })

    default:
      return state;
  }
};
