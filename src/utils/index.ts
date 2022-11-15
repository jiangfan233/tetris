import { Shape, ShapeProperties } from "../components/ShapeConfig";
import { MeshState } from "../reducers/Mesh";
import { Point } from "../actions/Mesh";
import { Mesh } from "../config";
import { BlockGroupPosition } from "../reducers/keyboard";
import {
  Direction,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
} from "../actions/keyboard";

export const isDecimal = (x: number) => x !== Math.round(x);

export type ScanFnCfg = {
  [key in Direction]:
    | typeof isBottom
    | typeof isLeft
    | typeof isRight
    | typeof isTop;
};

type GenerateScanCfg = (pos: BlockGroupPosition) => ScanFnCfg;

// 不同角度不同方向的检测方法
// angle bottom    left       top       right
// 0     isBottom  isLeft     isTop     isRight
// 1     isRight   isBottom   isleft    isTop
// 2     isTop     isRight    isBottom  isLeft
// 3     isLeft    isTop      isRight   isBottom
const generateScanCfg: GenerateScanCfg = (pos: BlockGroupPosition) => {
  const arr = [isBottom, isLeft, isTop, isRight];
  const dirs = [ArrowDown, ArrowLeft, ArrowUp, ArrowRight];

  const cfg: ScanFnCfg = {
    ArrowDown: isBottom,
    ArrowLeft: isLeft,
    ArrowRight: isRight,
    ArrowUp: isTop,
  };

  return arr
    .slice(arr.length - pos.angle)
    .concat(arr.slice(0, arr.length - pos.angle))
    .reduce(
      (cfg, fn, index) => ({ ...cfg, [dirs[index] as Direction]: fn }),
      cfg
    );
};

export const scan = (
  pos: BlockGroupPosition,
  shape: ShapeProperties,
  mesh: MeshState,
  direction: Direction
) => {
  const scanFnCfg = generateScanCfg(pos);
  const scanFn = scanFnCfg[direction];

  // 偏移量
  const target = { xOffset: 0, yOffset: 0 };
  switch (direction) {
    case ArrowDown:
      target.yOffset = 1;
      break;
    case ArrowLeft:
      target.xOffset = -1;
      break;
    case ArrowRight:
      target.xOffset = 1;
      break;
  }

  const { blocks, height, width } = shape;

  return !scanFn(blocks).every((block) => {
    switch (direction) {
      case ArrowDown:
        const targetY = Math.ceil(
          pos.y +
            (pos.angle % 2 ? width! / 2 : height! / 2) +
            target.yOffset
        );
        if (targetY > Mesh.height) return false;
        return !mesh.points[Math.floor(pos.x + block.xOffset)][targetY];

      case ArrowLeft:
        const targetLeftX = Math.floor(
          pos.x - (pos.angle % 2 ? height! / 2 : width! / 2) + target.xOffset
        );
        if (targetLeftX < 0) return false;
        return !mesh.points[targetLeftX][pos.y + block.yOffset];

      default:
        const targetRightX = Math.ceil(
          pos.x + (pos.angle % 2 ? height! / 2 : width! / 2)
        );
        if (targetRightX >= Mesh.width) return false;
        return !mesh.points[targetRightX][pos.y + block.yOffset];
    }
  });
};

const isBottom = (blocks: Shape[]) => {
  let obj: { [key: string]: number } = {};

  obj = blocks.reduce((prev, block) => {
    return {
      ...prev,
      [block.xOffset]: Math.max(
        block.yOffset,
        prev[block.xOffset] || Number.NEGATIVE_INFINITY
      ),
    };
  }, obj);

  return Object.entries(obj).map((item) => {
    return {
      xOffset: parseInt(item[0]),
      yOffset: item[1],
    };
  });
};

const isTop = (blocks: Shape[]) => {
  let obj: { [key: string]: number } = {};

  obj = blocks.reduce((prev, block) => {
    return {
      ...prev,
      [block.xOffset]: Math.min(
        block.yOffset,
        prev[block.xOffset] || Number.POSITIVE_INFINITY
      ),
    };
  }, obj);

  return Object.entries(obj).map((item) => {
    return {
      xOffset: parseInt(item[0]),
      yOffset: item[1],
    };
  });
};

// 检测方块下方是否有物体
// 如果方块发生旋转，需要更详细的判断逻辑
export const scanBottom = (
  pos: Point,
  mesh: MeshState,
  shape: ShapeProperties
) => {
  if (pos.y + 1 < 0) return false;

  const { blocks, height } = shape;
  if (pos.y + 1 + height! / 2 > Mesh.height) return true;
  return !isBottom(blocks).every((block) => {
    return !mesh.points[Math.floor(pos.x + block.xOffset)][
      pos.y + 1 + block.yOffset
    ];
  });
};

const isLeft = (blocks: Shape[]) => {
  let obj: { [key: string]: number } = {};

  obj = blocks.reduce((prev, block) => {
    return {
      ...prev,
      [block.yOffset]: Math.min(
        block.xOffset,
        prev[block.yOffset] || Number.POSITIVE_INFINITY
      ),
    };
  }, obj);

  return Object.entries(obj).map((item) => {
    return {
      yOffset: parseInt(item[0]),
      xOffset: item[1],
    };
  });
};

// 检测方块左侧是否有物体
// 如果方块发生旋转，需要更详细的判断逻辑
export const scanLeft = (
  pos: Point,
  mesh: MeshState,
  shape: ShapeProperties
) => {
  if (pos.x - 1 < 0) return true;

  const { blocks } = shape;
  return !isLeft(blocks).every((block) => {
    if (pos.x + block.xOffset - 1 < 0) return false;
    return !mesh.points[Math.floor(pos.x + block.xOffset - 1)][
      pos.y + block.yOffset
    ];
  });
};

const isRight = (blocks: Shape[]) => {
  let obj: { [key: string]: number } = {};

  obj = blocks.reduce((prev, block) => {
    return {
      ...prev,
      [block.yOffset]: Math.max(
        block.xOffset,
        prev[block.yOffset] || Number.NEGATIVE_INFINITY
      ),
    };
  }, obj);

  return Object.entries(obj).map((item) => {
    return {
      yOffset: parseInt(item[0]),
      xOffset: item[1],
    };
  });
};

// 检测方块左侧是否有物体
// 如果方块发生旋转，需要更详细的判断逻辑
export const scanRight = (
  pos: Point,
  mesh: MeshState,
  shape: ShapeProperties
) => {
  if (pos.x + 1 > Mesh.height) return true;

  const { blocks } = shape;
  return !isRight(blocks).every((block) => {
    if (Math.floor(pos.x + block.xOffset + 1) >= Mesh.width) return false;
    return !mesh.points[Math.floor(pos.x + block.xOffset + 1)][
      pos.y + block.yOffset
    ];
  });
};
