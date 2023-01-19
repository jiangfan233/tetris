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

// 不同角度不同方向的检测方法
// angle bottom    left       top       right
// 0     isBottom  isLeft     isTop     isRight
// 1     isRight   isBottom   isleft    isTop
// 2     isTop     isRight    isBottom  isLeft
// 3     isLeft    isTop      isRight   isBottom
type GenerateScanCfg = (angle: number) => ScanFnCfg;
const generateScanCfg: GenerateScanCfg = (angle: number) => {
  const arr = [isBottom, isLeft, isTop, isRight];
  const dirs = [ArrowDown, ArrowLeft, ArrowUp, ArrowRight];

  const cfg: ScanFnCfg = {
    ArrowDown: isBottom,
    ArrowLeft: isLeft,
    ArrowRight: isRight,
    ArrowUp: isTop,
  };

  return arr
    .slice(arr.length - angle)
    .concat(arr.slice(0, arr.length - angle))
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
): boolean => {
  const scanFn = generateScanCfg(pos.angle)[direction];
  return scanFn(shape.blocks, pos, direction, mesh);
};

/**
 * 这里的四个监测函数应该有更好地实现方式
 */

const isBottom = (
  blocks: Shape[],
  pos: BlockGroupPosition,
  direction: Direction,
  mesh: MeshState
): boolean => {
  switch (direction) {
    // angle = 0
    case ArrowDown:
      return !blocks.every((block) => {
        const newY = Math.floor(block.yOffset + pos.y + 1);
        const newX = Math.floor(pos.x + block.xOffset);

        if (
          newX < 0 ||
          newX >= Mesh.width ||
          newY >= Mesh.height ||
          mesh.points[newX][newY] && mesh.points[newX][newY].val > 0
        )
          return false;
        return true;
      });

    // angle = 1
    case ArrowLeft:
      return !blocks.every((block) => {
        const newX = Math.floor(pos.x - block.yOffset - 2);
        const newY = Math.floor(pos.y + block.xOffset);
        if (
          newX < 0 ||
          newX >= Mesh.width ||
          newY >= Mesh.height ||
          mesh.points[newX][newY] && mesh.points[newX][newY].val > 0
        )
          return false;
        return true;
      });

    // angle = 3
    case ArrowRight:
      return !blocks.every((block) => {
        const newX = Math.floor(pos.x + block.yOffset + 1);
        const newY = Math.floor(pos.y - block.xOffset);
        if (
          newX < 0 ||
          newX >= Mesh.width ||
          newY >= Mesh.height ||
          mesh.points[newX][newY] && mesh.points[newX][newY].val > 0
        )
          return false;
        return true;
      });
  }
  return true;
};

const isTop = (
  blocks: Shape[],
  pos: BlockGroupPosition,
  direction: Direction,
  mesh: MeshState
) => {
  switch (direction) {
    // angle = 2
    case ArrowDown:
      return !blocks.every((block) => {
        const newY = Math.floor(pos.y - block.yOffset);
        const newX = Math.floor(pos.x - block.xOffset - 1);
        if (
          newX < 0 ||
          newX >= Mesh.width ||
          newY >= Mesh.height ||
          mesh.points[newX][newY] && mesh.points[newX][newY].val > 0
        )
          return false;
        return true;
      });

    // angle = 3
    case ArrowLeft:
      return !blocks.every((block) => {
        const newX = Math.floor(pos.x + block.yOffset - 1);
        const newY = Math.floor(pos.y - block.xOffset - 1);
        if (
          newX < 0 ||
          newX >= Mesh.width ||
          newY >= Mesh.height ||
          mesh.points[newX][newY] && mesh.points[newX][newY].val > 0
        )
          return false;
        return true;
      });

    // angle = 1
    case ArrowRight:
      return !blocks.every((block) => {
        const newX = Math.floor(pos.x - block.yOffset);
        const newY = Math.floor(pos.y + block.xOffset);
        if (
          newX < 0 ||
          newX >= Mesh.width ||
          newY >= Mesh.height ||
          mesh.points[newX][newY] && mesh.points[newX][newY].val > 0
        )
          return false;
        return true;
      });
  }
  return true;
};

const isLeft = (
  blocks: Shape[],
  pos: BlockGroupPosition,
  direction: Direction,
  mesh: MeshState
): boolean => {
  switch (direction) {
    // angle = 3
    case ArrowDown:
      return !blocks.every((block) => {
        const newY = Math.floor(pos.y - block.xOffset);
        const newX = Math.floor(pos.x + block.yOffset);
        if (
          newX < 0 ||
          newX >= Mesh.width ||
          newY >= Mesh.height ||
          mesh.points[newX][newY] && mesh.points[newX][newY].val > 0
        )
          return false;
        return true;
      });

    // angle = 0
    case ArrowLeft:
      return !blocks.every((block) => {
        const newX = Math.floor(pos.x + block.xOffset - 1);
        const newY = Math.floor(pos.y + block.yOffset);
        if (
          newX < 0 ||
          newX >= Mesh.width ||
          newY >= Mesh.height ||
          mesh.points[newX][newY] && mesh.points[newX][newY].val > 0
        )
          return false;
        return true;
      });

    // angle = 2
    case ArrowRight:
      return !blocks.every((block) => {
        const newX = Math.floor(pos.x - block.yOffset);
        const newY = Math.floor(pos.y - block.xOffset);
        if (
          newX < 0 ||
          newX >= Mesh.width ||
          newY >= Mesh.height ||
          mesh.points[newX][newY] && mesh.points[newX][newY].val > 0
        )
          return false;
        return true;
      });
  }
  return true;
};

const isRight = (
  blocks: Shape[],
  pos: BlockGroupPosition,
  direction: Direction,
  mesh: MeshState
): boolean => {
  switch (direction) {
    // angle = 1
    case ArrowDown:
      return !blocks.every((block) => {
        const newY = Math.floor(pos.y + block.xOffset + 1);
        const newX = Math.floor(pos.x - block.yOffset - 1);
        if (
          newX < 0 ||
          newX >= Mesh.width ||
          newY >= Mesh.height ||
          mesh.points[newX][newY] && mesh.points[newX][newY].val > 0
        )
          return false;
        return true;
      });

    // angle = 2
    case ArrowLeft:
      return !blocks.every((block) => {
        const newX = Math.floor(pos.x - block.yOffset - 1);
        const newY = Math.floor(pos.y - block.xOffset - 1);
        if (
          newX < 0 ||
          newX >= Mesh.width ||
          newY >= Mesh.height ||
          mesh.points[newX][newY] && mesh.points[newX][newY].val > 0
        )
          return false;
        return true;
      });

    // angle = 0
    case ArrowRight:
      return !blocks.every((block) => {
        const newX = Math.floor(pos.x + block.xOffset + 1);
        const newY = Math.floor(pos.y + block.yOffset);
        if (
          newX < 0 ||
          newX >= Mesh.width ||
          newY >= Mesh.height ||
          mesh.points[newX][newY] && mesh.points[newX][newY].val > 0
        )
          return false;
        return true;
      });
  }
  return true;
};
