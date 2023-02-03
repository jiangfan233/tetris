import styled from "styled-components";
import { connect } from "react-redux";
import { DigitNumberGroup } from "../digitNumber/digitNumber";

type Props = {
  dispatch?: Function;
  rank: number;
};

const P = styled.p.attrs({
})`
  font-size: 1.2rem;
  color: white;
`

export const Rank = ({ dispatch, rank }: Props) => {
  return (<div className="w-full">
    <P>Rank:</P>
    <DigitNumberGroup value={rank}></DigitNumberGroup>
  </div>)
}
// @ts-ignore
const mapStateToProps = (state) => {
  return {
    rank: state.rank
  }
}

export const GlobalRank = connect(mapStateToProps)(Rank);