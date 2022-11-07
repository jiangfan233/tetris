
export interface Shape {
  xOffset: number;
  yOffset: number;
}

export type ShapeType = "T" | "L" | "J" | "I";

type ShapeConfig = {
  [key in ShapeType]: {
    blocks: Shape[],
    center: Shape
  };
};


// 为保证方块旋转后位置不发生错误，需保证 center 旋转中心的位置为整数坐标
export const ShapeConfig :ShapeConfig = {
  "I": {
    blocks:[
      { xOffset: 0, yOffset: 0 },
      { xOffset: 0, yOffset: 1 },
      { xOffset: 0, yOffset: 2 },
      { xOffset: 0, yOffset: 3 },
    ],
    center: { xOffset: 0, yOffset: 2 },
  },
  "L": {
    blocks: [
      { xOffset: 0, yOffset: 0-1 },
      { xOffset: 0, yOffset: 1-1 },
      { xOffset: 0, yOffset: 2-1 },
      { xOffset: 1, yOffset: 2-1 },
    ],
    center: { xOffset: 1, yOffset: 1 },
  },
  J: {
    blocks: [
      { xOffset: 1, yOffset: 0-1 },
      { xOffset: 1, yOffset: 1-1 },
      { xOffset: 1, yOffset: 2-1 },
      { xOffset: 0, yOffset: 2-1 },
    ],
    center: { xOffset: 1, yOffset: 1 }
  },
  T: {
    blocks:[
      { xOffset: 0, yOffset: 0 },
      { xOffset: 1, yOffset: 0 },
      { xOffset: 2, yOffset: 0 },
      { xOffset: 1, yOffset: 1 },
    ],
    center: { xOffset: 1, yOffset: 1 }
  },
}

const shapes = Object.keys(ShapeConfig);
export const genetateShape = () => shapes[Math.floor(parseFloat(Math.random().toFixed(1)) * (shapes.length-1))];