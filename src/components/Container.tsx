
import styled from "styled-components"
import { Mesh as MeshConfig } from "../config"
import { MeshBlocksWrapper } from "./MeshBlocks"
import React from "react"
import Continue from "/src/static/play-circle.svg";
import Restart from "/src/static/arrow-clockwise.svg";
import { connect } from "react-redux";
import { GameState } from "../reducers/game";
import { game, gameActionCreator } from "../actions/game";
import { isStorageEmpty } from "../utils";

const { Start } = game;

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
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  justify-content: center;
  
  &.start {
    height: 0;
    top: 100%;
    & * {
      transition: opacity ease-in-out 1s;
      opacity: 0;
    }
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

const Button = styled.button.attrs({
  className: "text-white rounded-xl w-fit"
})`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  transition: gap ease-in-out 1s, width ease-in-out 1s, 
              padding ease-in-out 1s, background-color ease-in-out 1s;
  gap: 0rem;

  & p {
    width: 0;
    opacity: 0;
    white-space: nowrap;
    transition: width ease-in-out 1s, opacity ease-in-out 1s;
  }

  & img {
    height: 1.7rem;
    transition: height ease-in-out 1s;
  }

  &:hover{
    width: auto;
    gap: 1rem;
    padding: 0.5rem 1rem;
    background-color: #74c5e6;
    & p {
      width: 6rem;
      opacity: 1;
    }
    & img {
      height: 2rem;
    }
  }

`


export const Container = ({ dispatch, game, children }: ContainerProps) => {
  const { status } = game!;
  
  const handleClickContinue = () => {
    // 继续游戏，恢复之前的游戏数据，keyboard、mesh、rank、score
    // dispatch!(gameActionCreator(Continue, ))
  }
  
  return (
    <StyledContainer>
      <Mask className={status === Start ? "start" : "stop"}>
        <Button style={{ display: isStorageEmpty() ? "none" : "block" }} >
          <img src={Continue} alt={"Continue"} />
          <p className="text-2xl font-bold whitespace-nowrap">Continue</p>
        </Button>
        <Button>
          <img src={Restart} alt={"Restart"}></img>
          <p className="text-2xl font-bold whitespace-nowrap">Restart</p>
        </Button>
      </Mask>
      {children}
      <MeshBlocksWrapper />
    </StyledContainer>
  )
}

export const GlobalContainer = connect((state: any) => ({ game: state.game }))(Container);