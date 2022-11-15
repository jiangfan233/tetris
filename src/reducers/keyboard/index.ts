import { keyboard, } from "../../actions/index"
import produce from "immer"
import { genetateShape, ShapeConfig, ShapeType } from "../../components/ShapeConfig";
import { Mesh as MeshConfig } from "../../config";
import { KeyboardAction } from "../../actions/keyboard";
import { isDecimal } from "../../utils";


const { ArrowDown, ArrowLeft, ArrowRight, ArrowUp } = keyboard;


export type BlockGroupPosition = {
  x: number,
  y: number,
  angle: number,
  shape: ShapeType
}


type GetPosition = () => BlockGroupPosition;

const initPosition: GetPosition = () => {
  // const shapeType: ShapeType = genetateShape();
  const shapeType = "I";
  const { height, width, center } = ShapeConfig[shapeType as ShapeType];

  let x = MeshConfig.width / 2;
  switch(shapeType) {
    case "I":
      break;

    case "T":
      break;

    default:
      x = Math.round(x)
  }
  return {
    x: x,
    // x: 0,
    y: 0 - center!.yOffset,
    angle: 0,
    shape: shapeType,
  }
}


export const keyBoardReducer = (state = initPosition(), action: KeyboardAction) => {

  const { x, y, angle, shape } = state;
  
  let fixX = 0;
  let fixY = 0;

  if(action && action.data) {
    const { width, height } = action.data;

    switch(angle % 2) {
      case 0:
        fixX = isDecimal(width / 2 + x) ? 0.5 : 0;
        fixY = isDecimal(height / 2 + y) ? 0.5 : 0;
        break;

      default:
        fixX = isDecimal(height / 2 + x) ? 0.5 : 0;
        fixY = isDecimal(width / 2 + y) ? 0.5 : 0;
    }
    
  }


  switch (action.type) {
    case ArrowDown:
      return produce(state, draft => {
        draft.y += 1 + fixY;
      })
    case ArrowLeft:
      return produce(state, draft => {
        draft.x -= (1 + fixX);
      })
    case ArrowRight:
      return produce(state, draft => {
        draft.x += (1 + fixX);
        
      })
    case ArrowUp:
      return produce(state, draft => {
        draft.angle = (draft.angle + 1) % 4;
        
      })
    default:
      return state;
  }
}