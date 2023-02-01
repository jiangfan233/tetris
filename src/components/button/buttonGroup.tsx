import { Button } from "."
import { Row, Col } from "../common"
import { keyboard, type Keys } from "../../actions/keyboard";
import { keyDownHandler } from "../../control";

const { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, Space } = keyboard;


export const ButtonGroup = () => {
  const handleClick = (type: Keys) => {
    keyDownHandler({ code: type })
  }

  return <Row style={{ gap: "10rem", marginTop: "5rem" }}>
    <Button size="large" type={Space as Keys} onClick={(t: Keys) => handleClick(t)}>OK</Button>
    <Col style={{ rotate: "45deg", gap: "1.5rem" }}>
      <Row style={{ alignItems: "center", gap: "1.5rem" }}>
        <Button size="small" type={ArrowUp as Keys} onClick={(t: Keys) => handleClick(t)}>Rank+</Button>
        <Button size="small" type={ArrowRight as Keys} onClick={(t: Keys) => handleClick(t)}>Vol+</Button>
      </Row>
      <Row style={{ alignItems: "center", gap: "1.5rem" }}>
        <Button size="small" type={ArrowLeft as Keys} onClick={(t: Keys) => handleClick(t)}>Vol-</Button>
        <Button size="small" type={ArrowDown as Keys} onClick={(t: Keys) => handleClick(t)}>Rank-</Button>
      </Row>
    </Col>
  </Row>
}