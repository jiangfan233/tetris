import React from "react";
import styled from "styled-components";
import GlobalBlockGroup from "./components/BlockGroup";
import { Container } from "./components/Container";
import "./control/index"
import { GlobalScore } from "./components/details/score";
import { Decorator } from "./components/decorator"


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
`


function App() {

  return (
    <StyledApp className="text-xxm xs:text-xs sm:text-sm md:text-base">
      <div className="m-6 font-bold" style={{fontSize: "20px"}}>建议调低音量；此项目仍在开发中，存在不少bug。。。</div>
      <Decorator>
        <Container>
          <GlobalBlockGroup />
        </Container>
        <Col>
          <GlobalScore />
        </Col>
      </Decorator>
    </StyledApp>
  )
}

export default App
