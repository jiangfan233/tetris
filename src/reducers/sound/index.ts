import produce from "immer"
import { Sound, type SoundType } from "../../actions/sound"


const { WARNING, SUCCESS, FAILURE } = Sound;

const initState = {
  "WARNING": "",
  "SUCCESS": "",
  "FAILURE": "",
};

export const soundReducer = (state = initState, action) => {
  // 播放音乐
  switch (action.type) {
    case WARNING:
      return produce(state, draft => {
        let audio = state[action.type as SoundType];
        if (!audio) {
          // audio = new Audio("data:audio/x-mpeg;base64," + action.sound);
          audio = "data:audio/x-mpeg;base64," + action.sound;
          draft[action.type] = audio;
        }
        // new Audio 是否对dom影响很大？？
        const audioEl = new Audio(audio);

        // 如果使用保留的HTMLAudioElement实例进行播放，不灵敏，有误差
        // why???
        // audio.play();
      })

    case FAILURE:
      return produce(state, draft => {
        draft[action.type] = action.sound;
      })

    case SUCCESS:
      return produce(state, draft => {
        console.log(action);
        draft[action.type] = action.sound;
      })
    default:
      return state;
  }


}