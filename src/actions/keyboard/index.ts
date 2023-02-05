
import { BlockGroupPosition } from "../../reducers/keyboard";

export type KeyboardActionType = "ArrowRight" | "ArrowLeft" | "ArrowUp" | "ArrowDown" | "Space" | "Reset" | "Restore";

// action types
export const ArrowRight: KeyboardActionType = "ArrowRight";
export const ArrowLeft: KeyboardActionType = "ArrowLeft";
export const ArrowUp: KeyboardActionType = "ArrowUp";
export const ArrowDown: KeyboardActionType = "ArrowDown";
export const Space: KeyboardActionType = "Space";
export const Reset: KeyboardActionType = "Reset";
export const Restore: KeyboardActionType = "Restore";

export type Direction = "ArrowRight" | "ArrowLeft" | "ArrowUp" | "ArrowDown";

export type Keys = Direction | "Space";

export type KeyboardAction = {
  type: KeyboardActionType,
  pos?: BlockGroupPosition
};

export type KeyboardActionCreator = (type: KeyboardActionType, pos?: BlockGroupPosition) => KeyboardAction;

export const blocksDo: KeyboardActionCreator = (type, pos?) => {
  return {
    type,
    pos
  }
}


export const keyboard = {
  ArrowRight,
  ArrowLeft,
  ArrowUp,
  ArrowDown,
  Space,
  Reset,
  Restore,
  blocksDo,
}
