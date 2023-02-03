import { VolumeAction, volume } from "../../actions/volume";

const { IncreaseVolume } = volume
 
export const volumnReducer = (volume = 1, action: VolumeAction) => {
  
  const { type, volumeDiff } = action;
  switch(type) {
    case IncreaseVolume:
      return (volume + volumeDiff) % 6;
    default:
      return volume;
  }
}