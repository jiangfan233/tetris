export const Mesh = {
  height: 20,
  width: 15,
};

export const BlockColorMap = {
  // 初始颜色
  "0": "#f8f6f67e",
  // 占据颜色
  "1": "#52473d",
  // 闪烁颜色
  "2": "green",
};

export type BlockColor = keyof typeof BlockColorMap;