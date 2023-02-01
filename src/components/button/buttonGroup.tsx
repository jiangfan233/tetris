import { Button } from "."
import { Row, Col } from "../common"
import { keyboard, type Keys } from "../../actions/keyboard";
import { keyDownHandler } from "../../control";

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
        <img style={{ width: "1.5rem", }} src="/public/static/caret-up-fill.svg"></img>
      </Button>
      <Button size="small" type={ArrowRight as Keys} onClick={(t: Keys) => handleClick(t)}>
        <img style={{ width: "1.5rem" }} src="/public/static/caret-right-fill.svg"></img>
      </Button>
    </Row>
    <Row style={{ alignItems: "center", gap: "1.5rem" }}>
      <Button size="small" type={ArrowLeft as Keys} onClick={(t: Keys) => handleClick(t)}>
        <img style={{ width: "1.5rem" }} src="/public/static/caret-left-fill.svg"></img>
      </Button>
      <Button size="small" type={ArrowDown as Keys} onClick={(t: Keys) => handleClick(t)}>
        <img style={{ width: "1.5rem" }} src="/public/static/caret-down-fill.svg"></img>
      </Button>
    </Row>
  </div>
}
