import { Shape, ShapeProperties } from "../components/ShapeConfig";
import { MeshState } from "../reducers/Mesh";
import { Point } from "../actions/Mesh";
import { Mesh } from "../config";

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

// 检测方块下方是否有物体
// 如果方块发生旋转，需要更详细的判断逻辑
export const scanBottom = (pos: Point, mesh: MeshState, shape: ShapeProperties) => {
  if (pos.y + 1 < 0) return false;

  const { blocks, height } = shape;
  if (pos.y + 1 + height! > Mesh.height) return true;
  return !isBottom(blocks).every((block) => {
    return !mesh.points[pos.x + block.xOffset][pos.y + 1 + block.yOffset];
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
export const scanLeft = (pos: Point, mesh: MeshState, shape: ShapeProperties) => {
  if (pos.x - 1 < 0) return true;

  const { blocks } = shape;
  return !isLeft(blocks).every((block) => {
    if(pos.x + block.xOffset - 1 < 0) return false;
    return !mesh.points[pos.x + block.xOffset - 1][pos.y + block.yOffset];
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
export const scanRight = (pos: Point, mesh: MeshState, shape: ShapeProperties) => {
  if (pos.x + 1 > Mesh.height) return true;

  const { blocks } = shape;
  return !isRight(blocks).every((block) => {
    if(pos.x + block.xOffset + 1 >= Mesh.width) return false;
    return !mesh.points[pos.x + block.xOffset + 1][pos.y + block.yOffset];
  });
};