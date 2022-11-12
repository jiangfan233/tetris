import { BlockGroupPosition } from "../../reducers/keyboard";

// action types
export const ArrowRight = "ArrowRight";
export const ArrowLeft = "ArrowLeft";
export const ArrowUp = "ArrowUp";
export const ArrowDown = "ArrowDown";
export const Space = "Space";

export type KeyboardAction = {
  type:
    | typeof ArrowRight
    | typeof ArrowLeft
    | typeof ArrowUp
    | typeof ArrowDown
    | typeof Space;

  data?: {
    fixX: number;
    fixY: number;
  };
};

export type KeyboardActionCreator = (
  pos?: BlockGroupPosition
) => KeyboardAction;

// action creators
export const moveRight: KeyboardActionCreator = () => {
  return {
    type: ArrowRight,
  };
};

export const moveLeft: KeyboardActionCreator = () => {
  return {
    type: ArrowLeft,
  };
};

export const moveDown: KeyboardActionCreator = () => {
  return {
    type: ArrowDown,
  };
};

export const rotate: KeyboardActionCreator = (
  pos: BlockGroupPosition | undefined
) => {
  let fixY = 0;
  let fixX = 0;

  // switch(pos?.angle) {
  //   case 0: 
  //     fixY = 0.5;
  //     break;
  //   case 2: 
  //     fixY = 0.5;
  //     break;
  //   default:
  //     fixY = 0;
  // }

  return {
    type: ArrowUp,
    data: {
      fixY,
      fixX,
    },
  };
};

export const drop: KeyboardActionCreator = () => {
  return {
    type: Space,
  };
};
