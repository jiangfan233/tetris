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


// 检测是否可旋转，有bug
export const maybeRotate = (pos: BlockGroupPosition, shapeProperties: ShapeProperties, mesh: MeshState): boolean => {
  const { angle } = pos;
  const { height, width } = shapeProperties;

  let long = Math.max(height!, width!);
  let x = Math.floor(pos.x);
  let y = Math.floor(pos.y);

  switch (angle % 2) {
    case 0:
      for (let i = Math.floor(x - long! / 2); i <= Math.floor(x + long! / 2); i++) {
        if (i < 0 || i >= Mesh.width || mesh.points[i] && mesh.points[i][y] && mesh.points[i][y].val) return true;
        for (let j = Math.floor(y - long! / 2); j <= Math.floor(y + long! / 2); j++) {
          if (j < 0 || j >= Mesh.height || mesh.points[x] && mesh.points[x][j] && mesh.points[x][j].val) return true;
        }
      }
      return false;

    case 1:
      for (let i = Math.floor(x - long! / 2); i <= Math.floor(x + long! / 2); i++) {
        if (i < 0 || i >= Mesh.width || mesh.points[i] && mesh.points[i][y] && mesh.points[i][y].val) return true;
        for (let j = Math.floor(y - long! / 2); j <= Math.floor(y + long! / 2); j++) {
          if (j < 0 || j >= Mesh.height || mesh.points[x] && mesh.points[x][j] && mesh.points[x][j].val) return true;
        }
      }
      return false;
  }

  // 不可旋转
  return true;
}