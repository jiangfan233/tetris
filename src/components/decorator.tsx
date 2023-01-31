import styled from "styled-components"
import React from "react"
import { Button } from "./button"



const Div = styled.div`
  padding: 1rem;
  min-width: 20rem;
  border-radius: 1rem;
  background-color: #161515;
`

const P = styled.p`
  font-size: 1.5rem;
  width: 100%;
  text-align: center;
  margin-top: 1.5rem;
  font-family: cursive;

  /* 可能存在兼容性问题 */
  background-image: -webkit-linear-gradient(bottom right, red, #fd8403, yellow); 
  -webkit-background-clip: text; 
  -webkit-text-fill-color: transparent; 
  background-clip: text;
  
`

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`
const Col = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
`

const Border = styled.div.attrs({
  className: "bg-orange-300"
})`
  padding: 2rem;
  padding-bottom: 5rem;
  border-radius: 2rem;
  color: #ccb07c;
  box-shadow: 0.4rem 0.4rem 1rem black, 0.3rem 0.3rem 0.5rem inset #e6e3df;
`

export const Decorator = ({ children: BlockContainer }: { children: React.ReactNode }) => {
  return (
    <Border>
      <Div>
        <Row style={{ alignItems: "start" }}>
          {BlockContainer}
        </Row>
        <Row>
          <P>Just like the old good days~</P>
        </Row>
      </Div>

      <Row style={{ gap: "10rem", marginTop: "5rem" }}>
        <Button size="large">OK</Button>
        <Col style={{ rotate: "45deg", gap: "1.5rem" }}>
          <Row style={{ alignItems: "center", gap: "1.5rem" }}>
            <Button size="small">Rank+</Button>
            <Button size="small">Vol+</Button>
          </Row>
          <Row style={{ alignItems: "center", gap: "1.5rem" }}>
            <Button size="small">Vol-</Button>
            <Button size="small">Rank-</Button>
          </Row>
        </Col>
      </Row>
    </Border>
  )
}