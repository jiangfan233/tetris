import { Point } from "../actions/Mesh";
import { ShapeProperties } from "../components/ShapeConfig";
import { Mesh } from "../config";
import { BlockGroupPosition } from "../reducers/keyboard";
import { MeshState } from "../reducers/Mesh";


type GetPoints = (
  pos: BlockGroupPosition,
  shapeProperties: ShapeProperties
) => Point[];

export const getPoints: GetPoints = (
  pos: BlockGroupPosition,
  shapeProperties: ShapeProperties
) => {
  const { blocks } = shapeProperties;
  const { x, y, angle } = pos;

  switch (angle) {
    case 1:
      return blocks.map((block) => ({
        x: block.yOffset * -1 + x - 1,
        y: block.xOffset + y,
      }));

    case 2:
      return blocks.map((block) => ({
        x: block.xOffset * -1 + x - 1,
        y: block.yOffset * -1 + y - 1,
      }));

    case 3:
      return blocks.map((block) => ({
        x: block.yOffset + x,
        y: block.xOffset * -1 + y - 1,
      }));
    default:
      return blocks.map((block) => ({
        x: block.xOffset + x,
        y: block.yOffset + y,
      }));
  }
};

// 检测需要消除的行
export const needLibeate = (mesh: MeshState): number[] => {
  let ans: number[] = [];
  let row = 1;
  while (row < Mesh.height) {
    if (mesh.points.every((col) => col[row].val === 1)) {
      ans.push(row);
    }
    row++;
  }
  return ans;
};
