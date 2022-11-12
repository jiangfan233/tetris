import { keyboard, } from "../../actions/index"
import produce from "immer"
import { genetateShape, ShapeConfig, ShapeType } from "../../components/ShapeConfig";
import { Mesh as MeshConfig } from "../../config";
import { KeyboardAction } from "../../actions/keyboard";


const { ArrowDown, ArrowLeft, ArrowRight, ArrowUp } = keyboard;


export type BlockGroupPosition = {
  x: number,
  y: number,
  angle: number,
  shape: ShapeType
}


type GetPosition = () => BlockGroupPosition;

const initPosition: GetPosition = () => {
  const shapeType: ShapeType = genetateShape();
  // const shapeType = "J";
  const { height, width, center } = ShapeConfig[shapeType as ShapeType];
  return {
    x: Math.floor(MeshConfig.width / 2),
    // x: 0,
    y: 0 - center!.yOffset,
    angle: 0,
    shape: shapeType,
  }
}



export const keyBoardReducer = (state = initPosition(), action: KeyboardAction) => {

  switch (action.type) {
    case ArrowDown:
      return produce(state, draft => {
        if(Number(draft.y) !== Math.round(draft.y)) {
          draft.y += 1.5;
        } else {
          draft.y += 1;
        }
      })
    case ArrowLeft:
      return produce(state, draft => {
        draft.x -= 1
      })
    case ArrowRight:
      return produce(state, draft => {
        draft.x += 1
      })
    case ArrowUp:
      return produce(state, draft => {
        
        // const shape = ShapeConfig[draft.shape];
        // console.log(shape)
        // const centerX = draft.x + shape.center!.xOffset;
        // const centerY = draft.y + shape.center!.yOffset;

        // console.log(draft.x, draft.y, centerX, centerY, shape.height, shape.width)


        draft.angle = (draft.angle + 1) % 4;
        // draft.y = draft.angle % 2 ? centerY - shape.width! / 2 : draft.y;
        // draft.x = draft.angle % 2 ? centerX - shape.height! / 2 : draft.x;
        // draft.x = -0.5
        

      })
    default:
      // console.log("rotate")
      return state;
  }
}