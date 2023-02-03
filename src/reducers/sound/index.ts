import { Sound } from "../../actions/sound"
import { type SoundType } from "../../actions/sound/types";
import { AudioCache } from "../../actions/sound/sound";

const { WARNING, SUCCESS, FAILURE } = Sound;

const initState = {
  "WARNING": "",
  "SUCCESS": "",
  "FAILURE": "",
};

export const soundReducer = (state = initState, action: { type: SoundType, volumnNum: number }) => {
  // 播放音乐
  const { type, volumnNum } = action;
  switch (action.type) {
    case WARNING:
    case FAILURE:
    case SUCCESS:
      AudioCache[type]!(volumnNum).start()

    default:
      return state;
  }


}