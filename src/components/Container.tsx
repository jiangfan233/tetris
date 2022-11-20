
import styled from "styled-components"
import { Mesh as MeshConfig } from "../config"
import { MeshBlocksWrapper } from "./MeshBlocks"

const StyledContainer = styled.div`
  box-sizing: content-box;
  border: 1px solid black;
  border-top: 0;
  height: ${MeshConfig.height}rem;
  width: ${MeshConfig.width}rem;
  background-color: #bec8d1;
  position: relative;
`


export const Container = ({ children } : {children: JSX.Element}) => {

  return (
    <StyledContainer>
      { children }
      <MeshBlocksWrapper />
    </StyledContainer>
  )
}