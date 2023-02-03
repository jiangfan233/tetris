import { connect } from "react-redux";
import { Block } from "./BlockGroup";
import { MeshState } from "../reducers/Mesh";

export const MeshBlocks = ({ mesh }: { mesh: MeshState }) => {
  return (
    <>
      {mesh.points.map((col, xIndex) => {
        return col.map((point, yIndex) => {
          return <Block posY={yIndex} key={xIndex + "" + yIndex} xOffset={xIndex} yOffset={yIndex} bgType = {point.bgType} value={point.val} />
        });
      })}
    </>
  );
};

// @ts-ignore
const cfg = (store) => ({
  mesh: store.mesh,
});

export const MeshBlocksWrapper = connect(cfg)(MeshBlocks);
