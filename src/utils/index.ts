import { Point } from "../actions/Mesh";
import { ShapeProperties } from "../components/ShapeConfig";
import { BlockGroupPosition } from "../reducers/keyboard";

type GetPoints = (pos: BlockGroupPosition,
  shapeProperties: ShapeProperties) => Point[]

export const getPoints: GetPoints = (
  pos: BlockGroupPosition,
  shapeProperties: ShapeProperties
) => {
  const { blocks } = shapeProperties;
  const { x, y, angle } = pos;

  switch (angle) {
    case 1:
      return blocks.map((block) => ({
        x: block.yOffset * (-1) + x - 1,
        y: block.xOffset + y,
      }));

    case 2:
      return blocks.map((block) => ({
        x: block.xOffset * (-1) + x - 1,
        y: block.yOffset * (-1) + y - 1,
      }));

    case 3:
      return blocks.map((block) => ({
        x: block.yOffset + x,
        y: block.xOffset * (-1) + y - 1,
      }));
    default:
      return blocks.map((block) => ({
        x: block.xOffset + x,
        y: block.yOffset + y,
      }));
  }
};
