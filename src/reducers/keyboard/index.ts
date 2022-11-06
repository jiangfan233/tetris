import { keyboard } from "../../actions/index"
import produce from "immer"


const { ArrowDown, ArrowLeft, ArrowRight, ArrowUp } = keyboard;


const initialState = {
  x: 10,
  y: 10,
  angle: 0,
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