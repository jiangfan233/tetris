import { WARNING, SUCCESS, FAILURE, type SoundType } from "./types";
import warningMp3 from "../../../public/static/warning.mp3";
import failureMp3 from "../../../public/static/failure.mp3";
import successMp3 from "../../../public/static/success.mp3"

// 使用 Web Audio API
const AudioContext = window.AudioContext;

export const hasWebAudioAPI = {
  data: !!AudioContext && location.protocol.indexOf('http') !== -1,
};

const Map = {
  [WARNING]: warningMp3,
  [FAILURE]: failureMp3,
  [SUCCESS]: successMp3,
}

type AudioCache = {
  [key in SoundType]: undefined | Function;
};

export const AudioCache: AudioCache = {
  WARNING: undefined,
  FAILURE: undefined,
  SUCCESS: undefined,
}

export const requestAudio = async (type: SoundType) => {

  const req = new XMLHttpRequest();
  const url = Map[type];

  req.open('GET', url, true);
  req.responseType = 'arraybuffer';
  req.send();
  req.onerror = (e) => {
    console.error(e);
  }
  req.onload = () => {
    const context = new AudioContext();
    context.decodeAudioData(req.response, buf => {
      AudioCache[type] = () => {
        const source = context.createBufferSource();
        source.buffer = buf;
        source.connect(context.destination);
        return source;
      };
    })
  }
}

[WARNING, SUCCESS, FAILURE].forEach((item) => requestAudio(item as SoundType));