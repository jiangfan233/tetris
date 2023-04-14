import React from "react";
import styled from "styled-components"
import { Keys } from "../../actions/keyboard";

export const Volume = "Volume";
export const Rank = "Rank";
export type Types = Keys | typeof Volume | typeof Rank;

type ButtonSize = "large" | "small" | "mini";

type StyledButtonProps = {
  size: ButtonSize
}

const ButtonSizeMap = {
  large: "6rem",
  small: "4rem",
  mini: "2rem",
}

const StyledButton = styled.button`
  height: ${(props: StyledButtonProps) => ButtonSizeMap[props.size]};
  width: ${(props: StyledButtonProps) => ButtonSizeMap[props.size]};
  transform: ${(props: StyledButtonProps) => props.size === "small" ? `rotate(-45deg);` : 0};
  border-radius: 50%;
  background-color: #4d9cbb;
  cursor: pointer;
  box-shadow: 0.3rem 0.3rem 0.5rem inset skyblue, 0.2rem 0.2rem 0.3rem black;
  display: flex;
  align-items: center;
  justify-content: center;

  &:active {
    background-color: #347088;
    box-shadow: 0.3rem 0.3rem 0.5rem inset #58a7c7, 0.2rem 0.2rem 0.4rem black;
  }
`

type ButtonProps = {
  size: ButtonSize,
  children: React.ReactNode,
  type: Types,
  onClick: Function
}

export const Button = React.memo(({ size = "large", children, type, onClick }: ButtonProps) => {

  return (
    <StyledButton onClick={() => { onClick(type) }} size={size}>
      {children}

    </StyledButton>
  )
})