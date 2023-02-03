import { BlockColor } from "../../config";

// 占据一个点
export const OCCUPY = "OCCUPY";

// 解放一个点（取消占据）
export const LIBERATE = "LIBERATE";

// 批量占据
export const BATCH_OCCUPY = "BATCH_OCCUPY";

// 批量解放
export const BATCH_LIBERATE = "BATCH_LIBERATE";

// 解放底部
export const BATCH_LIBERATE_ROWS = "BATCH_LIBERATE_ROWS";

// 行闪烁
export const SHINE_ROWS = "SHINE_ROWS";

// 重置
export const RESET = "RESET";

export type PointActionType =
  | typeof OCCUPY
  | typeof LIBERATE
  | typeof BATCH_OCCUPY
  | typeof BATCH_LIBERATE
  | typeof BATCH_LIBERATE_ROWS
  | typeof SHINE_ROWS
  | typeof RESET;

export type Point = {
  x: number;
  y: number;
};

export interface PointAction {
  type: PointActionType;
  points?: Point[];
  rows?: number[];
  bgType?: BlockColor
}

type PointActionCreator = (points?: Point[]) => PointAction;
type RowActionCreator = (rows: number[], bgType: BlockColor) => PointAction;

export type MeshActionCreator = PointActionCreator | RowActionCreator;

// 批量解放行
export const batchLiberateRows: RowActionCreator = (rows: number[]) => {
  return {
    type: BATCH_LIBERATE_ROWS,
    rows,
  };
};

// 行闪烁
export const shineRows: RowActionCreator = (rows: number[], bgType: BlockColor) => {
  return {
    type: SHINE_ROWS,
    rows,
    bgType,
  };
};

// 批量占据
export const batchOccupy: PointActionCreator = (points) => {
  return {
    type: BATCH_OCCUPY,
    points: points,
  };
};

// 批量解放
export const batchLiberate: PointActionCreator = (points) => {
  return {
    type: BATCH_LIBERATE,
    points: points,
  };
};

export const resetMesh : PointActionCreator = () => {
  return {
    type: RESET,
  }

}


export const mesh = {
  BATCH_LIBERATE,
  BATCH_OCCUPY,
  batchOccupy,
  batchLiberate,
  BATCH_LIBERATE_ROWS,
  batchLiberateRows,
  SHINE_ROWS,
  shineRows,
  resetMesh,
  RESET
};
