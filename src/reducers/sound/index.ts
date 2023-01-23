import produce from "immer"
import { Sound, type SoundType } from "../../actions/sound"


const { WARNING, SUCCESS, FAILURE } = Sound;

const initState = {
  "WARNING": "",
  "SUCCESS": "",
  "FAILURE": "",
};

export const soundReducer = (state = initState, action: { type: SoundType, sound: string }) => {
  // 播放音乐
  switch (action.type) {
    case WARNING:
    case FAILURE:
    case SUCCESS:
      return produce(state, draft => {
        let audio = state[action.type as SoundType];
        if (!audio) {
          // audio = new Audio("data:audio/x-mpeg;base64," + action.sound);
          audio = "data:audio/x-mpeg;base64," + action.sound;
          draft[action.type] = audio;
        }
        // new Audio 是否对dom影响很大？？
        const audioEl = new Audio(audio);
        audioEl.play();

      })

    default:
      return state;
  }


}