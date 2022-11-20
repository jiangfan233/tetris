import { connect } from "react-redux";
import { Block } from "./BlockGroup";
import { Block as FakeBlock } from "./block";
import { MeshState } from "../reducers/Mesh";

export const MeshBlocks = ({ mesh }: { mesh: MeshState }) => {
  return (
    <>
      {mesh.points.map((row, xIndex) => {
        return row.map((val, yIndex) => {
          return val ? (
            <Block key={xIndex + yIndex} xOffset={xIndex} yOffset={yIndex} />
          ) : <FakeBlock key={xIndex + yIndex} x={xIndex} y = {yIndex} />;
        });
      })}
    </>
  );
};

const cfg = (store) => ({
  mesh: store.mesh,
});

export const MeshBlocksWrapper = connect(cfg)(MeshBlocks);
