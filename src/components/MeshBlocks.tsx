import { connect } from "react-redux";
import { Block } from "./BlockGroup";
import { MeshState } from "../reducers/Mesh";

export const MeshBlocks = ({ mesh }: { mesh: MeshState }) => {
  return (
    <>
      {mesh.points.map((col, xIndex) => {
        return col.map((point, yIndex) => {
          return point.val ? <Block key={xIndex + yIndex} xOffset={xIndex} yOffset={yIndex} bgType = {point.bgType} /> : null;
        });
      })}
    </>
  );
};

const cfg = (store) => ({
  mesh: store.mesh,
});

export const MeshBlocksWrapper = connect(cfg)(MeshBlocks);
