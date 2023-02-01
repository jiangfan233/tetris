import { requestAudio, AudioCache } from "./sound";
import { WARNING, SUCCESS, FAILURE, type SoundType } from "./types";



export const playSound = (type: SoundType) => {
  return async (dispatch: Function, getState: Function) => {
    // if (!AudioCache[type]) {
    //   console.log("获取资源")
    //   await requestAudio(type);
    // }
    dispatch({ type });
  }
}


export const Sound = {
  playSound,
  WARNING,
  FAILURE,
  SUCCESS,
}