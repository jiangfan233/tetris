import React from "react";
import styled from "styled-components";
import GlobalBlock from "./components/block";
import GlobalBlockGroup from "./components/BlockGroup";
import { Container } from "./components/Container";
import "./control/index"
import { GlobalScore } from "./components/score";



const StyledApp = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5rem;
`


function App() {

  return (
    <StyledApp>
      {/* <GlobalBlock></GlobalBlock> */}
      <GlobalScore />
      <Container>
        <GlobalBlockGroup />
      </Container>
    </StyledApp>
  )
}

export default App
