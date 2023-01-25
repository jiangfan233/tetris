export const Mesh = {
  height: 20,
  width: 15,
};

export const BlockColorMap = {
  // 初始颜色
  "0": "rgb(209 213 219)",
  // 占据颜色
  "1": "black",
  // 闪烁颜色
  "2": "rgb(101 163 13)",
};

export type BlockColor = keyof typeof BlockColorMap;