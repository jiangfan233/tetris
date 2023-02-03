import { Button, Volume, Rank, type Types } from "."
import { Row, Col } from "../common"
import { keyboard, type Keys } from "../../actions/keyboard";
import { keyDownHandler } from "../../control";
import RightSvg from "/src/static/caret-right-fill.svg";
import LeftSvg from "/src/static/caret-left-fill.svg";
import UpSvg from "/src/static/caret-up-fill.svg"
import DownSvg from "/src/static/caret-down-fill.svg";
import VolumnUp from "/src/static/volume-up.svg";
// import VolumnMute from "/src/static/volume-mute.svg";
import RankUp from "/src/static/muscle-svgrepo-com.svg"
import { store } from "../../store";
import { volume } from "../../actions/volume";
import { rank } from "../../actions/rank";


const { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, Space } = keyboard;


const handleClick = (type: Types) => {
  switch (type) {
    case ArrowDown:
    case ArrowLeft:
    case ArrowRight:
    case ArrowUp:
    case Space:
      return keyDownHandler({ code: type });
    case Volume:
      console.log("button", type)
      return store.dispatch(volume.increaseVolume(1));
    case Rank:
      return store.dispatch(rank.increaseRank(1));
  }
}

export const LeftButtons = ({ isPortrait = false }: { isPortrait?: boolean }) => {
  return <div className={`relative landscape:mr-5 flex items-center ${isPortrait ? "" : "portrait:hidden"}`}>
    <Button size="large" type={Space as Types} onClick={(t: Types) => handleClick(t)}>
      <p style={{ color: "black", fontSize: "1.5rem", fontWeight: "bold" }}>duang!</p>
    </Button>
    <div className="absolute flex gap-4 portrait:-top-14 portrait:-right-20 landscape:flex-col landscape:-right-2 -top-24">
      <Button size="mini" type={Volume} onClick={handleClick}>
        <img className="w-3/5" src={VolumnUp} />
      </Button>
      <Button size="mini" type={Rank} onClick={handleClick}>
        <img className="w-3/5" src={RankUp} />
      </Button>
    </div>
  </div>
}

export const RightButtons = ({ isPortrait = false }: { isPortrait?: boolean }) => {
  return <div className={`flex flex-col items-center gap-6 rotate-45 landscape:ml-10 ${isPortrait ? "" : "portrait:hidden"} `} >
    <Row style={{ alignItems: "center", gap: "1.5rem" }}>
      <Button size="small" type={ArrowUp as Keys} onClick={(t: Keys) => handleClick(t)}>
        <img style={{ width: "1.5rem", }} src={UpSvg}></img>
      </Button>
      <Button size="small" type={ArrowRight as Keys} onClick={(t: Keys) => handleClick(t)}>
        <img style={{ width: "1.5rem" }} src={RightSvg}></img>
      </Button>
    </Row>
    <Row style={{ alignItems: "center", gap: "1.5rem" }}>
      <Button size="small" type={ArrowLeft as Keys} onClick={(t: Keys) => handleClick(t)}>
        <img style={{ width: "1.5rem" }} src={LeftSvg}></img>
      </Button>
      <Button size="small" type={ArrowDown as Keys} onClick={(t: Keys) => handleClick(t)}>
        <img style={{ width: "1.5rem" }} src={DownSvg}></img>
      </Button>
    </Row>
  </div>
}
