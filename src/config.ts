export const Mesh = {
  height: 20,
  width: 15,
};

export const BlockColorMap = {
  // 初始颜色
  "0": "rgba(54,83,20,0.4)",
  // 占据颜色
  "1": "black",
  // 闪烁颜色
  "2": "rgb(101 163 13)",
};

export type BlockColor = keyof typeof BlockColorMap;