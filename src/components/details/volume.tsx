import styled from "styled-components";
import { connect } from "react-redux";
import { DigitNumberGroup } from "../digitNumber/digitNumber";

type Props = {
  dispatch?: Function;
  volume: number;
};

const P = styled.p.attrs({
})`
  font-size: 1.2rem;
  color: white;
`

export const Volume = ({ dispatch, volume }: Props) => {
  return (<div className="w-full">
    <P>Volume:</P>
    <DigitNumberGroup value={volume}></DigitNumberGroup>
  </div>)
}
// @ts-ignore
const mapStateToProps = (state) => {
  return {
    volume: state.volume
  }
}

export const GlobalVolume = connect(mapStateToProps)(Volume);