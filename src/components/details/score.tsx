import styled from "styled-components";
import { connect } from "react-redux";
import { DigitNumberGroup } from "../digitNumber/digitNumber";

type Props = {
  dispatch?: Function;
  score: number;
};

const P = styled.p.attrs({
})`
  font-size: 1.2rem;
  color: white;
`

export const Score = ({ dispatch, score }: Props) => {
  return (<div className="w-full">
    <P>Score:</P>
    <DigitNumberGroup value={score}></DigitNumberGroup>
  </div>)
}
// @ts-ignore
const mapStateToProps = (state) => {
  return {
    score: state.score
  }
}

export const GlobalScore = connect(mapStateToProps)(Score); 