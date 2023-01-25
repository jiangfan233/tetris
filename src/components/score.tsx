import styled from "styled-components";
import { connect } from "react-redux";

type Props = {
  dispatch?: Function;
  score: number;
};

const P = styled.p.attrs({
  className: "bg-orange-300"
})`
  font-size: 2rem;
  z-index: 2;
`

export const Score = ({ dispatch, score }: Props) => {
  return <P>score: {score}</P>
}

const mapStateToProps = (state) => {
  return {
    score: state.score
  }
}

export const GlobalScore = connect(mapStateToProps)(Score);