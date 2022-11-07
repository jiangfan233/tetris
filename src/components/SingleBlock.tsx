import styled from "styled-components";
import React from "react";

type styledBlockProps = {
  x: number;
  y: number;
  angle: number;
};

type BlockProps = {
  dispatch: Function;
  x: number;
  y: number;
  angle: number;
};

const StyledSingleBlock = styled.div`
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

// 可否使用装饰器实现 block-group？？
class SingleBlock extends React.Component {
  dispatch: Function;
  x: number;
  y: number;
  angle: number;

  constructor({ dispatch, x, y, angle }: BlockProps) {
    super({ dispatch, x, y, angle });
    this.dispatch = dispatch;
    this.x = x;
    this.y = y;
    this.angle = angle;
  }

  render(): React.ReactNode {
    return (
      <StyledSingleBlock
        x={this.x}
        y={this.y + 10}
        angle={this.angle * 90}
      ></StyledSingleBlock>
    );
  }
}
