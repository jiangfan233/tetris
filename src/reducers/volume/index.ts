import { VolumeAction, volume } from "../../actions/volume";

const { IncreaseVolume, ResetVolume } = volume
 
export const volumnReducer = (volume = 0, action: VolumeAction) => {
  
  const { type, volumeDiff } = action;
  switch(type) {
    case IncreaseVolume:
      return (volume + volumeDiff) % 6;
    case ResetVolume:
      return 0;
    default:
      return volume;
  }
}