import { Shape } from "../components/ShapeConfig";
import { MeshState } from "../reducers/Mesh";
import { Point } from "../actions/Mesh";
import { Mesh } from "../config";

const isBottm = (blocks: Shape[]) => {
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
export const scanBottom = (pos: Point, mesh: MeshState, blocks: Shape[]) => {
  return isBottm(blocks).every((block) => {
    
    if(pos.y+1 < 0) return false;
    if(pos.y+1 > Mesh.height) return true;
    return !!mesh.points[pos.x + block.xOffset][pos.y+1];
  });
};
