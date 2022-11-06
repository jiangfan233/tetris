
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



export const ShapeConfig :ShapeConfig = {
  "I": {
    blocks:[
      { xOffset: 0, yOffset: 0 },
      { xOffset: 0, yOffset: 1 },
      { xOffset: 0, yOffset: 2 },
      { xOffset: 0, yOffset: 3 },
    ],
    center: { xOffset: 0.5, yOffset: 2 },
  },
  "L": {
    blocks: [
      { xOffset: 0, yOffset: 0 },
      { xOffset: 0, yOffset: 1 },
      { xOffset: 0, yOffset: 2 },
      { xOffset: 1, yOffset: 2 },
    ],
    center: { xOffset: 1, yOffset: 1.5 },
  },
  J: {
    blocks: [
      { xOffset: 0, yOffset: 0 },
      { xOffset: 0, yOffset: 1 },
      { xOffset: 0, yOffset: 2 },
      { xOffset: -1, yOffset: 2 },
    ],
    center: { xOffset: 0, yOffset: 1.5 }
  },
  T: {
    blocks:[
      { xOffset: 0, yOffset: 0 },
      { xOffset: 1, yOffset: 0 },
      { xOffset: 2, yOffset: 0 },
      { xOffset: 1, yOffset: -1 },
    ],
    center: { xOffset: 1.5, yOffset: 0 }
  },
}