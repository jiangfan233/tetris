import styled from "styled-components";
import { ShapeConfig, ShapeType } from "./ShapeConfig";
import { BlockColor, BlockColorMap } from "../config";
import { connect } from "react-redux";

type StyledBlockGroupProps = {
  x: number;
  y: number;
  angle: number;
};

type BlockProps = {
  xOffset: number;
  yOffset: number;
  bgType: string,
  value?: number
};

type StyledBlockProps = BlockProps;

type BlockGroupProps = {
  dispatch: Function;
  x: number;
  y: number;
  angle: number;
  shape: ShapeType;
};

const StyledBlockGroup = styled.div`
  position: absolute;
  z-index: 1;
  left: ${(props: StyledBlockGroupProps) => `${props.x}rem`};
  top: ${(props: StyledBlockGroupProps) => `${props.y}rem`};
  transform-origin: 0 0;
  transform: ${(props: StyledBlockGroupProps) => `rotate(${props.angle * 90}deg)`};
`;

const StyledBlock = styled.div`
  height: 1rem;
  width: 1rem;
  position: absolute;
  z-index: ${(props: StyledBlockProps) => props.value};
  border: ${(props: StyledBlockProps) => `0.15rem solid ${BlockColorMap[props.bgType as BlockColor]}`};
  left: ${(props: StyledBlockProps) => `${props.xOffset}rem`};
  top: ${(props: StyledBlockProps) => `${props.yOffset}rem`};

  &::after{
    content: "";
    position: absolute;
    height: 0.6rem;
    width: 0.6rem;
    top: calc(50%  - 0.3rem);
    left: calc(50%  - 0.3rem);
    background-color: ${(props: StyledBlockProps) => `${BlockColorMap[props.bgType as BlockColor]}`};
  }
`;

export const Block = ({ xOffset, yOffset, bgType, value }: BlockProps) => {
  return <StyledBlock xOffset={xOffset} yOffset={yOffset} bgType={bgType} value={value}></StyledBlock>;
};

export const BlockGroup = ({
  dispatch,
  x,
  y,
  angle,
  shape,
}: BlockGroupProps) => {

  const config = ShapeConfig[shape];
  const { blocks, bgType } = config;

  return (
    <StyledBlockGroup x={x} y={y} angle={angle}>
      {blocks.map((block, index) => (
        <Block key={index} xOffset={block.xOffset} yOffset={block.yOffset} bgType={bgType as string} />
      ))}
    </StyledBlockGroup>
  );
};

// @ts-ignore
const mapStateToProps = (state) => {
  return {
    x: state.keyboard.x,
    y: state.keyboard.y,
    angle: state.keyboard.angle,
    shape: state.keyboard.shape,
  };
};

const GlobalBlockGroup = connect(mapStateToProps)(BlockGroup);

export default GlobalBlockGroup;