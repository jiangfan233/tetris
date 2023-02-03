import { WARNING, SUCCESS, FAILURE, type SoundType } from "./types";
import warningMp3 from "/src/static/warning.mp3";
import failureMp3 from "/src/static/failure.mp3";
import successMp3 from "/src/static/success.mp3"

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
    const audioContext = new AudioContext();
    audioContext.decodeAudioData(req.response, buf => {
      AudioCache[type] = (volumeNum: number) => {
        
        const sourceNode = audioContext.createBufferSource();
        sourceNode.buffer = buf;
        const gainNode = audioContext.createGain();
        sourceNode.connect(gainNode);
        gainNode.connect(audioContext.destination);
    
        gainNode.gain.value = volumeNum * 0.2;
        return sourceNode;
      };
    })
  }
}

[WARNING, SUCCESS, FAILURE].forEach((item) => requestAudio(item as SoundType));