import React from "react";
import styled from "styled-components";
import GlobalBlockGroup from "./components/BlockGroup";
import { Container } from "./components/Container";
import "./control/index"
import { GlobalScore } from "./components/score";



const StyledApp = styled.div.attrs(
  // 背景颜色默认黑色，屏幕宽度大于sm时，背景颜色变为白色
  props => ({
    className: "overflow-hidden bg-orange-300"
  })
)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
`


function App() {

  return (
    <StyledApp>
      <GlobalScore />
      <Container>
        <GlobalBlockGroup />
      </Container>
    </StyledApp>
  )
}

export default App
