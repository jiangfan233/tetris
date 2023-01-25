
import styled from "styled-components"
import { Mesh as MeshConfig } from "../config"
import { MeshBlocksWrapper } from "./MeshBlocks"

const StyledContainer = styled.div.attrs({})`
  box-sizing: content-box;
  border: 0.5rem solid #d2cfcf;
  border-style: inset;
  height: ${MeshConfig.height}rem;
  width: ${MeshConfig.width}rem;
  background-color: white;
  position: relative;
`


export const Container = ({ children }: { children: JSX.Element }) => {

  return (
    <StyledContainer>
      {children}
      <MeshBlocksWrapper />
    </StyledContainer>
  )
}