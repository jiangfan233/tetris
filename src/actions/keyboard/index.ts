
import { ShapeProperties } from "../../components/ShapeConfig";

// action types
export const ArrowRight = "ArrowRight";
export const ArrowLeft = "ArrowLeft";
export const ArrowUp = "ArrowUp";
export const ArrowDown = "ArrowDown";
export const Space = "Space";

export type Direction =
  | typeof ArrowRight
  | typeof ArrowLeft
  | typeof ArrowUp
  | typeof ArrowDown;

export type KeyboardAction = {
  type:
    | typeof ArrowRight
    | typeof ArrowLeft
    | typeof ArrowUp
    | typeof ArrowDown
    | typeof Space;

  data: {
    width: number;
    height: number;
  };
};

export type KeyboardActionCreator = (
  shapeProperties: ShapeProperties
) => KeyboardAction;

// action creators
export const moveRight: KeyboardActionCreator = (
  shapeProperties: ShapeProperties
) => {
  return {
    type: ArrowRight,
    data: {
      width: shapeProperties.width!,
      height: shapeProperties.height!
    }
  };
};

export const moveLeft: KeyboardActionCreator = (
  shapeProperties: ShapeProperties
) => {
  return {
    type: ArrowLeft,
    data: {
      width: shapeProperties.width!,
      height: shapeProperties.height!
    }
  };
};

export const moveDown: KeyboardActionCreator = (
  shapeProperties: ShapeProperties
) => {
  return {
    type: ArrowDown,
    data: {
      width: shapeProperties.width!,
      height: shapeProperties.height!
    }
  };
};

export const rotate: KeyboardActionCreator = (
  shapeProperties: ShapeProperties
) => {
  return {
    type: ArrowUp,
    data: {
      width: shapeProperties.width!,
      height: shapeProperties.height!
    }
  };
};

export const drop: KeyboardActionCreator = (
  shapeProperties: ShapeProperties
) => {
  return {
    type: Space,
    data: {
      width: shapeProperties.width!,
      height: shapeProperties.height!
    }
  };
};
