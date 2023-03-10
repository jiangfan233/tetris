import { keyboard } from "../../actions/keyboard";
import produce from "immer";
import {
  genetateShape,
  ShapeConfig,
  ShapeType,
} from "../../components/ShapeConfig";
import { Mesh as MeshConfig } from "../../config";
import { KeyboardAction } from "../../actions/keyboard";
import { isDecimal } from "../../utils/scan";


const { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, Reset, Space, Restore } = keyboard;

export type BlockGroupPosition = {
  x: number;
  y: number;
  angle: number;
  shape: ShapeType;
};

type InitPosition = () => BlockGroupPosition;

const initPosition: InitPosition = () => {
  const shapeType: ShapeType = genetateShape();
  // const shapeType = "L";
  const { center } = ShapeConfig[shapeType as ShapeType];

  let x = MeshConfig.width / 2;
  switch (shapeType) {
    case "I":
      break;

    case "T":
      break;

    default:
      x = Math.round(x);
  }
  return {
    x: x,
    // x: 0,
    y: 0 - center!.yOffset,
    angle: 0,
    shape: shapeType,
  };
};

export const keyBoardReducer = (
  state = initPosition(),
  action: KeyboardAction
) => {
  const { x, y } = state;

  switch (action.type) {
    case Space:
      return produce(state, (draft) => {
        draft.y += 1;
      });
    case ArrowDown:
      return produce(state, (draft) => {
        draft.y += 1;
      });
    case ArrowLeft:
      return produce(state, (draft) => {
        draft.x -= 1;
      });
    case ArrowRight:
      return produce(state, (draft) => {
        draft.x += 1;
      });
    case ArrowUp:
      return produce(state, (draft) => {
        draft.angle = (draft.angle + 1) % 4;
        const { shape } = action.pos!;
        const { width, height } = ShapeConfig[shape];
        // 处理旋转之后的坐标是小数问题
        let fixX = 0;
        let fixY = 0;
        switch(draft.angle) {
          case 0:
            fixX = isDecimal(width! / 2 + x) ? -0.5 : 0;
            fixY = isDecimal(height! / 2 + y) ? -0.5 : 0;
            break;
    
          case 1:
            fixX = isDecimal(height! / 2 + x) ? 0.5 : 0;
            fixY = isDecimal(width! / 2 + y) ? -0.5 : 0;
            break;

          case 2:
            fixX = isDecimal(width! / 2 + x) ? 0.5 : 0;
            fixY = isDecimal(height! / 2 + y) ? 0.5 : 0;
            break;

          case 3:
            fixX = isDecimal(height! / 2 + x) ? -0.5 : 0;
            fixY = isDecimal(width! / 2 + y) ? 0.5 : 0;
            break;
        }
        draft.x += fixX;
        draft.y += fixY;
      });
    case Reset:
      return initPosition();

    case Restore:
      return Object.assign(state, action.pos!);

    default:
      return state;
  }
};

