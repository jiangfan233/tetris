import {
  BATCH_OCCUPY,
  PointAction,
  BATCH_LIBERATE_ROWS,
  SHINE_ROWS,
  RESET,
} from "../../actions/Mesh";
import { Mesh as MeshConfig } from "../../config";
import produce from "immer";

type ColorBlock = {
  // 值
  val: number,
  // 颜色类型
  bgType: string,
  [key: string]: number | string 
};
export type MeshState = {
  points: ColorBlock[][];
};

const initialState: MeshState = {
  points: Array(MeshConfig.width).fill(Array(MeshConfig.height).fill(0).map(item => ({ val: 0, bgType: "0" }))),
};

// 网格系统
export const MeshReducer = (
  state: MeshState = initialState,
  action: PointAction
) => {
  switch (action.type) {
    // 批量占据多个点
    case BATCH_OCCUPY:
      return produce(state, (draft: MeshState) => {
        action.points!.forEach((point) => {
          if(draft.points[point.x] && draft.points[point.x][point.y]) {
            draft.points[point.x][point.y].val = 1;
            draft.points[point.x][point.y].bgType = "1";
          }
        });
      });

    // 批量解放行
    case BATCH_LIBERATE_ROWS:
      return produce(state, (draft: MeshState) => {
        const len = action.rows!.length;
        const start = action.rows![0];
        draft.points.forEach(col => {
          col.splice(start, len);
          col.unshift(...Array(len).fill(0)
            .map((item, index) => ({ posY: index, val: 0, bgType: "0" }))
            .reverse()
          );
        })
      });

    // 行闪烁
    case SHINE_ROWS:
      return produce(state, draft => {
        action.rows!.forEach(row => {
          draft.points.forEach(col => {
            col[row].bgType = action.bgType as string;
          })
        })
      })
    
    case RESET:
      return initialState

    default:
      return state;
  }
};
