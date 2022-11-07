
// 占据一个点
export const OCCUPY = "OCCUPY";

// 解放一个点（取消占据）
export const LIBERATE = "LIBERATE";

// 批量占据
export const BATCH_OCCUPY = "BATCH_OCCUPY";

// 批量解放
export const BATCH_LIBERATE = "BATCH_LIBERATE";


export type Point = {
  x: number;
  y: number;
}

export interface PointAction {
  type: typeof OCCUPY | typeof LIBERATE | typeof BATCH_OCCUPY | typeof BATCH_LIBERATE;
  points: Point[];
}

// action creators
export const occupy = (point: Point) => {
  return {
    type: OCCUPY,
    payload: point,
  }
}

export const liberate = (point: Point) => {
  return {
    type: LIBERATE,
    payload: point,
  }
}

export const batchOccupy = (points: Point[]) => {
  return {
    type: BATCH_OCCUPY,
    payload: points,
  }
}

export const batchLiberate = (points: Point[]) => {
  return {
    type: BATCH_LIBERATE,
    payload: points,
  }
}
