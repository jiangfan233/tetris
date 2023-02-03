
import styled from "styled-components"
import { Mesh as MeshConfig } from "../config"
import { MeshBlocksWrapper } from "./MeshBlocks"
import React from "react"

const StyledContainer = styled.div.attrs({})`
  box-sizing: content-box;
  border: 0.5rem inset #d2cfcf;
  height: ${MeshConfig.height}rem;
  width: ${MeshConfig.width}rem;
  background-color: white;
  position: relative;
`


export const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <StyledContainer>
      {children}
      <MeshBlocksWrapper />
    </StyledContainer>
  )
}