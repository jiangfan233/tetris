import { keyboard } from "../../actions/index"
import produce from "immer"
import { genetateShape, ShapeConfig } from "../../components/ShapeConfig";
import { Mesh as MeshConfig } from "../../config";


const { ArrowDown, ArrowLeft, ArrowRight, ArrowUp } = keyboard;



const initialState = {
  x: Math.floor(MeshConfig.width / 2),
  y: 0,
  angle: 0,
  shape: genetateShape(),
  // shape: "L"
}



export const keyBoardReducer = (state = initialState, action: { type: any; }) => {

  switch (action.type) {
    case ArrowDown:
      return produce(state, draft => {
        draft.y += 1
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
        draft.angle = (draft.angle + 1) % 4
      })
    default:
      // console.log("rotate")
      return state;
  }
}