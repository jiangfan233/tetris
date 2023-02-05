

export type VolumeActionType = "IncreaseVolume" | "ResetVolume";
const IncreaseVolume: VolumeActionType = "IncreaseVolume";
const ResetVolume: VolumeActionType = "ResetVolume";

export type VolumeAction = {
  type: VolumeActionType,
  volumeDiff: number
};
type VolumeActionCreator = (type: VolumeActionType, volumnDiff: number) => VolumeAction

const volumeDo: VolumeActionCreator = (type, volumeDiff) => {
  return {
    type,
    volumeDiff
  }
}

export const volume = {
  IncreaseVolume,
  volumeDo,
  ResetVolume,
}