import { WARNING, SUCCESS, FAILURE, type SoundType } from "./types";



export const playSound = (type: SoundType, volumnNum: number) => {
  return { type, volumnNum };
}


export const Sound = {
  playSound,
  WARNING,
  FAILURE,
  SUCCESS,
}