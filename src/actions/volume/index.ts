


const IncreaseVolume = "IncreaseVolume";

export type VolumeAction = {
  type: typeof IncreaseVolume,
  volumeDiff: number
};
type VolumeActionCreator = (volumnDiff: number) => VolumeAction

const increaseVolume: VolumeActionCreator = (volumeDiff: number) => {
  return {
    type: IncreaseVolume,
    volumeDiff
  }
}

export const volume = {
  IncreaseVolume,
  increaseVolume,
}