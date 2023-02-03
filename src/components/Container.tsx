
import styled from "styled-components"
import { Mesh as MeshConfig } from "../config"
import { MeshBlocksWrapper } from "./MeshBlocks"
import React from "react"
import Play from "/src/static/play-circle.svg";
import { connect } from "react-redux";
import { GameState } from "../reducers/game";
import { GameStatus } from "../actions/game";
import { game } from "../actions/game";

const { Start, Stop } = game;

const StyledContainer = styled.div.attrs({})`
  box-sizing: content-box;
  border: 0.5rem inset #d2cfcf;
  height: ${MeshConfig.height}rem;
  width: ${MeshConfig.width}rem;
  background-color: white;
  position: relative;
`

const Mask = styled.div`
  transition: height 1s ease-in, top 1s ease-in, z-index 1s ease-in;
  position: absolute;
  left: 0;
  top: 0;
  background-color: #ecebebcc;
  width: 100%;
  height: 100%;
  z-index: 10;
  display: flex;
  justify-content: center;
  
  &.start {
    height: 0;
    top: 100%;
  }

  &.stop {
    top: 0;
    z-index: 10;
  }
`

type ContainerProps = {
  children: React.ReactNode,
  dispatch?: Function,
  game?: GameState
}

export const Container = ({ dispatch, game, children }: ContainerProps) => {
  const { status } = game!;
  return (
    <StyledContainer>
      <Mask className={ status===Start ? "start" : "stop" }>
        <img className="w-2/5" src={Play}></img>
      </Mask>
      {children}
      <MeshBlocksWrapper />
    </StyledContainer>
  )
}

export const GlobalContainer = connect((state: any) => ({ game: state.game }))(Container);