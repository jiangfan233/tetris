import produce from "immer"
import { Sound } from "../../actions/sound"
import { type SoundType } from "../../actions/sound/types";
import { AudioCache } from "../../actions/sound/sound";

const { WARNING, SUCCESS, FAILURE } = Sound;

const initState = {
  "WARNING": "",
  "SUCCESS": "",
  "FAILURE": "",
};

export const soundReducer = (state = initState, action: { type: SoundType }) => {
  // 播放音乐
  const { type } = action;
  switch (action.type) {
    case WARNING:
    case FAILURE:
    case SUCCESS:
      AudioCache[type]!().start()

    default:
      return state;
  }


}