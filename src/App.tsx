import React from "react";
import styled from "styled-components";
import GlobalBlockGroup from "./components/BlockGroup";
import { GlobalContainer } from "./components/Container";
import "./control/index"
import { GlobalScore } from "./components/details/score";
import { Decorator } from "./components/decorator"
import { GlobalVolume } from "./components/details/volume";
import { GlobalRank } from "./components/details/rank";
import Icon from "./static/icon.png"

// 仅用于让webpack导入此图片
console.log(Icon);

const StyledApp = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 1rem;
`

const Col = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  height: 100%;
  gap: 1rem;
`


function App() {

  return (
    <StyledApp className="text-xxm xs:text-xs sm:text-sm md:text-base">
      <Decorator>
        <GlobalContainer>
          <GlobalBlockGroup />
        </GlobalContainer>
        <Col>
          <GlobalScore />
          <GlobalVolume />
          <GlobalRank />
        </Col>
      </Decorator>
    </StyledApp>
  )
}

export default App
