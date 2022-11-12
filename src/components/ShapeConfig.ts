
export interface Shape {
  xOffset: number;
  yOffset: number;
}

export type ShapeType = "T" | "L" | "J" | "I";

export type ShapeProperties = {
  blocks: Shape[],
  center?: Shape,
  width?: number,
  height?: number,
};

export type ShapeConfigType = {
  [key in ShapeType]: ShapeProperties
};


// 为保证方块旋转后位置不发生错误，需保证 center 旋转中心的位置为整数坐标
export const ShapeConfig :ShapeConfigType = {
  "I": {
    blocks:[
      { xOffset: -0.5, yOffset: -2 },
      { xOffset: -0.5, yOffset: -1 },
      { xOffset: -0.5, yOffset: 0 },
      { xOffset: -0.5, yOffset: 1 },
    ],
    
  },
  "L": {
    blocks: [
      { xOffset: -1, yOffset: -1.5 },
      { xOffset: -1, yOffset: -0.5 },
      { xOffset: -1, yOffset: 0.5 },
      { xOffset: 0, yOffset: 0.5 },
    ],
    
  },
  "J": {
    blocks: [
      { xOffset: 0, yOffset: -1.5 },
      { xOffset: 0, yOffset: -0.5 },
      { xOffset: 0, yOffset: 0.5 },
      { xOffset: -1, yOffset: 0.5 },
    ],
    
  },
  "T": {
    blocks:[
      { xOffset: -1.5, yOffset: -1 },
      { xOffset: -0.5, yOffset: -1 },
      { xOffset: 0.5, yOffset: -1 },
      { xOffset: -0.5, yOffset: 0 },
    ],
    
  },
}


const generateInfoForShape = (ShapeConfig: ShapeConfigType) => {
  Object.keys(ShapeConfig).forEach((shapeType) => {
    const info = ShapeConfig[shapeType as ShapeType];
    const xSet = new Set();
    const ySet = new Set();
    info.blocks.forEach(block => {
      xSet.add(block.xOffset);
      ySet.add(block.yOffset);
    })
    info.height = ySet.size;
    info.width = xSet.size;
    info.center = { 
      // xOffset: Math.floor(info.width / 2), 
      // yOffset: Math.floor(info.height / 2),
      xOffset: info.width / 2, 
      yOffset: info.height / 2,
    }
  })
  return ShapeConfig;
}


const shapes = Object.keys(generateInfoForShape(ShapeConfig));
export const genetateShape = () => shapes[Math.floor(Math.random() * (shapes.length-1))] as ShapeType;