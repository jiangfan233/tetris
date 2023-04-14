import { connect } from "react-redux";
import { Block } from "./BlockGroup";
import { MeshState } from "../reducers/Mesh";


// 这里优化的方向是缩小 points 的范围，
// 这一优化只涉及到程序执行层面，dom层面由于block 使用 react.mome 并没有涉及到
// 触底的时候 points 为需要占据的方块
// 解放行（行抵消）的时候为 yIndexs 那几行 
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
