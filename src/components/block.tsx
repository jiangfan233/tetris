import styled from "styled-components";
import { connect } from "react-redux";

type styledBlockProps = {
  x: number;
  y: number;
  angle: number;
};

const StyledBlock = styled.div`
  height: 1rem;
  width: 1rem;
  position: absolute;
  background-color: #f8f6f67e;
  border: 1px solid #0e0b08;
  left: ${(props: styledBlockProps) => `${props.x}rem`};
  top: ${(props: styledBlockProps) => `${props.y}rem`};
  transform: ${(props: styledBlockProps) => `rotate(${props.angle}deg)`};
`;

type BlockProps = {
  dispatch?: Function;
  x: number;
  y: number;
  angle?: number;
};

export const Block = ({ dispatch, x, y, angle=0 }: BlockProps) => {

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
