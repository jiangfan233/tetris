import styled from "styled-components";
import { ShapeConfig, ShapeType, Shape } from "./ShapeConfig";
import { connect } from "react-redux";

type StyledBlockGroupProps = {
  x: number;
  y: number;
  angle: number;
  center: Shape;
};

type BlockProps = {
  xOffset: number;
  yOffset: number;
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
  left: ${(props: StyledBlockGroupProps) => `${props.x - props.center.xOffset}rem`};
  top: ${(props: StyledBlockGroupProps) => `${props.y - props.center.yOffset * 2}rem`};
  transform-origin: ${ props => `${props.center.xOffset}rem ${props.center.yOffset}rem` };
  transform: ${(props: StyledBlockGroupProps) => `rotate(${props.angle * 90}deg)`};
`;

const StyledBlock = styled.div`
  height: 1rem;
  width: 1rem;
  position: absolute;
  background-color: #52473d;
  border: 2px solid #0e0b08;
  left: ${(props: StyledBlockProps) => `${props.xOffset}rem`};
  top: ${(props: StyledBlockProps) => `${props.yOffset}rem`};
`;

const Block = ({ xOffset, yOffset }: BlockProps) => {
  return <StyledBlock xOffset={xOffset} yOffset={yOffset}></StyledBlock>;
};

export const BlockGroup = ({
  dispatch,
  x,
  y,
  angle,
  shape,
}: BlockGroupProps) => {

  const config = ShapeConfig[shape];
  const { blocks, center } = config;

  return (
    <StyledBlockGroup x={x} y={y} center={center} angle={angle}>
      {blocks.map((block, index) => (
          <Block key={index} xOffset={block.xOffset} yOffset={block.yOffset} />
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