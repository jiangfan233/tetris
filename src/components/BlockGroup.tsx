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
  left: ${(props: StyledBlockGroupProps) => `${props.x}rem`};
  top: ${(props: StyledBlockGroupProps) => `${props.y}rem`};
  transform-origin: 0 0;
  transform: ${(props: StyledBlockGroupProps) => `rotate(${props.angle * 90}deg)`};
`;

const StyledBlock = styled.div`
  height: 1rem;
  width: 1rem;
  position: absolute;
  z-index: 10;
  border: 1px solid #0e0b08;
  background-color: ${(props: StyledBlockProps) => `${BlockColorMap[props.bgType as BlockColor]}`};
  left: ${(props: StyledBlockProps) => `${props.xOffset}rem`};
  top: ${(props: StyledBlockProps) => `${props.yOffset}rem`};
`;

export const Block = ({ xOffset, yOffset, bgType }: BlockProps) => {
  return <StyledBlock xOffset={xOffset} yOffset={yOffset} bgType={bgType}></StyledBlock>;
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