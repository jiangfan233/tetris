import { Button } from "."
import { Row, Col } from "../common"
import { keyboard, type Keys } from "../../actions/keyboard";
import { keyDownHandler } from "../../control";
import RightSvg from "../../../public/static/caret-right-fill.svg";
import LeftSvg from "../../../public/static/caret-left-fill.svg";
import UpSvg from "../../../public/static/caret-up-fill.svg"
import DownSvg from "../../../public/static/caret-down-fill.svg";


const { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, Space } = keyboard;


const handleClick = (type: Keys) => {
  keyDownHandler({ code: type })
}

export const LeftButtons = ({ isPortrait = false }: { isPortrait?: boolean }) => {
  return <div className={`landscape:mr-5 flex items-center ${isPortrait ? "" : "portrait:hidden"}`}>
    <Button size="large" type={Space as Keys} onClick={(t: Keys) => handleClick(t)}>
      <p style={{ color: "black", fontSize: "1.5rem", fontWeight: "bold" }}>duang!</p>
    </Button>
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
