import { request } from "../../../api/index"

const WARNING = "WARNING";
const FAILURE = "FAILURE";
const SUCCESS = "SUCCESS";

export type SoundType = typeof WARNING | typeof FAILURE | typeof SUCCESS;


export const playSound = (type: SoundType) => {
  return async (dispatch: Function, getState: Function) => {
    let sound = getState().sound[type];
    if (!sound) {
      console.log("获取资源")
      sound = await request.post("/sound", { type });
    }
    dispatch({ type, sound });
  }
}


export const Sound = {
  playSound,
  WARNING,
  FAILURE,
  SUCCESS,
}