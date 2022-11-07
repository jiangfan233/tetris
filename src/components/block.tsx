import styled from "styled-components";
import { connect } from "react-redux";
import React from "react";

type styledBlockProps = {
  x: number;
  y: number;
  angle: number;
};

const StyledBlock = styled.div`
  height: 1rem;
  width: 1rem;
  position: absolute;
  /* background-color: #52473d; */
  background-image: linear-gradient(red, white);
  border: 2px solid #0e0b08;
  left: ${(props: styledBlockProps) => `${props.x}rem`};
  top: ${(props: styledBlockProps) => `${props.y}rem`};
  transform: ${(props: styledBlockProps) => `rotate(${props.angle}deg)`};
`;

type BlockProps = {
  dispatch: Function;
  x: number;
  y: number;
  angle: number;
};

export const Block = ({ dispatch, x, y, angle }: BlockProps) => {

  return <StyledBlock x={x} y={y} angle={angle * 90}></StyledBlock>;
};

const mapStateToProps = (state) => {
  return {
    x: state.keyboard.x,
    y: state.keyboard.y,
    angle: state.keyboard.angle,
  };
};

const GlobalBlock = connect(mapStateToProps)(Block);

export default GlobalBlock;
