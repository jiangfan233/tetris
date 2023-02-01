import styled from "styled-components"
import { Keys } from "../../actions/keyboard";

type ButtonSize = "large" | "small";

type StyledButtonProps = {
  size: ButtonSize
}

const StyledButton = styled.button`
  height: ${(props: StyledButtonProps) => props.size === "large" ? "6rem" : "4rem"};
  width: ${(props: StyledButtonProps) => props.size === "large" ? "6rem" : "4rem"};
  rotate: ${(props: StyledButtonProps) => props.size === "small" ? "-45deg" : 0};
  border-radius: 50%;
  background-color: #3d86a3;
  cursor: pointer;
  box-shadow: 0.3rem 0.3rem 0.5rem inset skyblue, 0.2rem 0.2rem 0.3rem black;
  font-weight: bold;

  &:active {
    background-color: #347088;
    box-shadow: 0.3rem 0.3rem 0.5rem inset #58a7c7, 0.4rem 0.4rem 0.8rem black;
  }
`

type ButtonProps = {
  size: ButtonSize,
  children: React.ReactNode,
  type: Keys,
  onClick: Function
}

export const Button = ({ size = "large", children, type, onClick }: ButtonProps) => {

  return (
    <StyledButton onClick={() => { onClick(type) }} size={size}>{children}</StyledButton>
  )
}