
import styled from "styled-components"
import { Mesh as MeshConfig } from "../config"
import { MeshBlocksWrapper } from "./MeshBlocks"
import React, { useCallback, useEffect, useMemo, useRef } from "react"
import ContinueSvg from "/src/static/play-circle.svg";
import RestartSvg from "/src/static/arrow-clockwise.svg";
import { connect } from "react-redux";
import { GameState } from "../reducers/game";
import { game, gameActionCreator, GameStatus } from "../actions/game";
import { getStorageItem, isStorageEmpty, clearStorage } from "../utils";
import { mesh } from "../actions/Mesh";
import { volume } from "../actions/volume";
import { keyboard, Reset } from "../actions/keyboard";
import { rank } from "../actions/rank";
import { score } from "../actions/score";

const { Start, Continue } = game;

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
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  transition: gap ease-in-out 0.5s, width ease-in-out 0.5s, 
              padding ease-in-out .5s, background-color ease-in-out .5s;
  gap: 0rem;

  & p {
    width: 0;
    opacity: 0;
    white-space: nowrap;
    transition: width ease-in-out .5s, opacity ease-in-out .5s;
  }

  & img {
    height: 1.7rem;
    transition: height ease-in-out .5s;
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

  const counter = useRef(0);

  const memoMeshBlocksWrapper = useMemo(() => <MeshBlocksWrapper />, []);

  // 继续游戏
  const handleClickContinue = useCallback(() => {
    const rankData = getStorageItem("rank");
    dispatch!(gameActionCreator(Continue as GameStatus, rankData ? Number(rankData) : undefined));
    clearStorage();
  }, []);

  const handleRestart = useCallback(() => {
    dispatch!(rank.increaseRank(0));
    dispatch!(mesh.resetMesh());
    dispatch!(volume.volumeDo(volume.ResetVolume, 0));
    dispatch!(score.updateScore(0, true))
    dispatch!(keyboard.blocksDo(Reset));
    dispatch!(gameActionCreator(Start as GameStatus));
    clearStorage();
  }, []);

  return (
    <StyledContainer>
      <Mask className={status === Start ? "start" : "stop"}>
        <Button style={{ display: isStorageEmpty() ? "none" : "flex" }} onClick={() => game && game.status === Start ? {} : handleClickContinue()} >
          <img src={ContinueSvg} alt={"Continue"} />
          <p className="text-2xl font-bold whitespace-nowrap">Continue</p>
        </Button>
        <Button onClick={() => game && game.status === Start ? {} : handleRestart()}>
          <img src={RestartSvg} alt={"Restart"}></img>
          <p className="text-2xl font-bold whitespace-nowrap">Restart</p>
        </Button>
      </Mask>
      {children}
      {/* <MeshBlocksWrapper /> */}
      { memoMeshBlocksWrapper }
    </StyledContainer>
  )
}


// game 是引用类型，memo 使用的是浅比较
const MemoContainer = React.memo(Container, (prevProps, nextProps) => {
  return prevProps.game?.status === nextProps.game?.status;
})

export const GlobalContainer = connect((state: any) => ({ game: state.game }))(MemoContainer);