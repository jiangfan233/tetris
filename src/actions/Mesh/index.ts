
// 占据一个点
export const OCCUPY = "OCCUPY";

// 解放一个点（取消占据）
export const LIBERATE = "LIBERATE";

// 批量占据
export const BATCH_OCCUPY = "BATCH_OCCUPY";

// 批量解放
export const BATCH_LIBERATE = "BATCH_LIBERATE";

// 解放底部
export const BATCH_LIBERATE_BOTTOM = "BATCH_LIBERATE_BOTTOM";

export type PointActionType = typeof OCCUPY | typeof LIBERATE | typeof BATCH_OCCUPY | typeof BATCH_LIBERATE |typeof BATCH_LIBERATE_BOTTOM;

export type Point = {
  x: number;
  y: number;
}

export interface PointAction {
  type: PointActionType;
  points?: Point[];
}

export interface PointActionCreator {
  (points: Point[]) : { type: PointActionType }
}

export interface BatchAction extends PointActionCreator {
  (): { type: PointActionType }
}

export const batchLiberateBottom :BatchAction = () => {
  return {
    type: BATCH_LIBERATE_BOTTOM as PointActionType,
  }
}

export const batchOccupy: PointActionCreator = (points: Point[]) => {
  return {
    type: BATCH_OCCUPY as PointActionType,
    points: points,
  }
}

export const batchLiberate: PointActionCreator = (points: Point[]) => {
  return {
    type: BATCH_LIBERATE as PointActionType,
    points: points,
  }
}

// action creators
export const occupy = (point: Point) => {
  return {
    type: OCCUPY as PointActionType,
    payload: point,
  }
}

export const liberate = (point: Point) => {
  return {
    type: LIBERATE as PointActionType,
    payload: point,
  }
}


export const mesh = {
  OCCUPY,
  LIBERATE,
  BATCH_LIBERATE,
  BATCH_OCCUPY,
  occupy,
  batchOccupy,
  liberate,
  batchLiberate,
  BATCH_LIBERATE_BOTTOM,
  batchLiberateBottom,
}