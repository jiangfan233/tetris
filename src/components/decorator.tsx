import styled from "styled-components"
import React from "react"
import { Row } from "./common"
import { LeftButtons, RightButtons } from "./button/buttonGroup"



const Div = styled.div`
  padding: 1rem;
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



const Border = styled.div.attrs({
  className: "bg-orange-300 p-8 px-10 landscape:flex items-center justify-between min-w-fit  landscape:rounded-full  portrait:pb-20 portrait:rounded-2xl"
})`
  color: #ccb07c;
  box-shadow: 0.4rem 0.4rem 1rem black, 0.3rem 0.3rem 0.5rem inset #e6e3df;
`

export const Decorator = ({ children: BlockContainer }: { children: React.ReactNode }) => {
  return (
    <Border>
      <LeftButtons />
      <Div>
        <Row style={{ alignItems: "start" }}>
          {BlockContainer}
        </Row>
        <Row>
          <P>Just like the good old days~</P>
        </Row>
      </Div>
      <RightButtons />

      <div className="flex items-center portrait:gap-x-40 mt-20 landscape:hidden">
        <LeftButtons isPortrait={true} />
        <RightButtons isPortrait={true} />
      </div>
    </Border>
  )
}