import { Button, Volume, Rank, type Types } from "."
import { Row } from "../common"
import { keyboard, type Keys } from "../../actions/keyboard";
import { keyDownHandler } from "../../control";
import RightSvg from "/src/static/caret-right-fill.svg";
import LeftSvg from "/src/static/caret-left-fill.svg";
import UpSvg from "/src/static/caret-up-fill.svg"
import DownSvg from "/src/static/caret-down-fill.svg";
import VolumnUp from "/src/static/volume-up.svg";
import VolumnMute from "/src/static/volume-mute.svg";
import RankUp from "/src/static/muscle-svgrepo-com.svg"
import { volume as volumeAction } from "../../actions/volume";
import { rank as rankAction } from "../../actions/rank";
import { connect } from "react-redux";
import { GameState } from "../../reducers/game";
import { game as gameAction, GameStatus } from "../../actions/game";
import { mesh } from "../../actions/Mesh";
import { score } from "../../actions/score";


const { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, Space } = keyboard;

type ButtonGroupProps = {
  isPortrait?: boolean,
  dispatch?: Function,
  game?: GameState,
  rank?: number,
  volume?: number
}

export const LeftButtons = ({ isPortrait = false, dispatch, game, rank, volume }: ButtonGroupProps) => {
  const { status } = game!;
  const { Start, Stop, Continue, gameActionCreator } = gameAction;

  const handleClick = (type: Types) => {
    switch (type) {
      case ArrowDown:
      case ArrowLeft:
      case ArrowRight:
      case ArrowUp:
        return keyDownHandler({ code: type });

      case Space:
        switch (status) {
          case Start:
            return keyDownHandler({ code: type });
          case Stop:
            dispatch!(mesh.resetMesh());
            dispatch!(score.updateScore(0, true));
            return dispatch!(gameActionCreator(Start as GameStatus, rank));
          case Continue:
            return dispatch!(gameActionCreator(Continue as GameStatus));
        }
        return;

      case Volume:
        return dispatch!(volumeAction.increaseVolume(1));
      case Rank:
        // const { game } = store.getState()
        return dispatch!(rankAction.increaseRank(1, game!));
    }
  }


  return <div className={`relative landscape:mr-5 flex items-center ${isPortrait ? "" : "portrait:hidden"}`}>
    <Button size="large" type={Space as Types} onClick={handleClick}>
      <p style={{ color: "black", fontSize: "1.5rem", fontWeight: "bold" }}>{status === Stop ? "Start" : "duang!"}</p>
    </Button>
    <div className="absolute flex gap-4 portrait:-top-14 portrait:-right-20 landscape:flex-col landscape:-right-2 -top-24">
      <Button size="mini" type={Volume} onClick={handleClick}>
        <img className="w-3/5" src={volume! > 0 ? VolumnUp : VolumnMute} />
      </Button>
      <Button size="mini" type={Rank} onClick={handleClick}>
        <img className="w-3/5" src={RankUp} />
      </Button>
    </div>
  </div>
}

export const GlobalLeftButtons = connect((state: any) => ({ game: state.game, volume: state.volume }))(LeftButtons);

export const RightButtons = ({ isPortrait = false }: { isPortrait?: boolean }) => {
  return <div className={`flex flex-col items-center gap-6 rotate-45 landscape:ml-10 ${isPortrait ? "" : "portrait:hidden"} `} >
    <Row style={{ alignItems: "center", gap: "1.5rem" }}>
      <Button size="small" type={ArrowUp as Keys} onClick={(t: Keys) => keyDownHandler({ code: t })}>
        <img style={{ width: "1.5rem", }} src={UpSvg}></img>
      </Button>
      <Button size="small" type={ArrowRight as Keys} onClick={(t: Keys) => keyDownHandler({ code: t })}>
        <img style={{ width: "1.5rem" }} src={RightSvg}></img>
      </Button>
    </Row>
    <Row style={{ alignItems: "center", gap: "1.5rem" }}>
      <Button size="small" type={ArrowLeft as Keys} onClick={(t: Keys) => keyDownHandler({ code: t })}>
        <img style={{ width: "1.5rem" }} src={LeftSvg}></img>
      </Button>
      <Button size="small" type={ArrowDown as Keys} onClick={(t: Keys) => keyDownHandler({ code: t })}>
        <img style={{ width: "1.5rem" }} src={DownSvg}></img>
      </Button>
    </Row>
  </div>
}
