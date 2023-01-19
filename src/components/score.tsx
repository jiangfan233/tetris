import styled from "styled-components";
import { connect } from "react-redux";

type Props = {
  dispatch?: Function;
  score: number;
};

const P = styled.p`
  font-size: 2rem;
  margin: 0.5rem;
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