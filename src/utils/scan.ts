import { Shape, ShapeProperties } from "../components/ShapeConfig";
import { MeshState } from "../reducers/Mesh";
import { Mesh } from "../config";
import { BlockGroupPosition } from "../reducers/keyboard";
import { getPoints } from ".";
import {
  Direction,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
} from "../actions/keyboard";

export const isDecimal = (x: number) => x !== Math.round(x);

// 检测该方向下是否有方块，或已到达边界
export const scan = (
  pos: BlockGroupPosition,
  shape: ShapeProperties,
  mesh: MeshState,
  direction: Direction
): boolean => {
  let xOffset: number = 0;
  let yOffset: number = 0;
  switch (direction) {
    case ArrowDown:
      yOffset = 1;
      break;
    case ArrowLeft:
      xOffset = -1;
      break;
    case ArrowRight:
      xOffset = 1;
      break;
    default:
      break;
  }

  return getPoints(pos, shape).some((point) => {
    const newY = Math.floor(point.y + yOffset);
    const newX = Math.floor(point.x + xOffset);
    if(newY < 0) return false;
    if (
      newX < 0 ||
      newX >= Mesh.width ||
      newY >= Mesh.height ||
      mesh.points[newX][newY] && mesh.points[newX][newY].val > 0
    )
      return true;
    return false;
  })

};