// action types
export const ArrowRight = "ArrowRight";
export const ArrowLeft = "ArrowLeft";
export const ArrowUp = "ArrowUp";
export const ArrowDown = "ArrowDown";
export const Space = "Space";

// action creators
export const moveRight = () => {
  return {
    type: ArrowRight,
  };
};

export const moveLeft = () => {
  return {
    type: ArrowLeft,
  };
};

export const moveDown = () => {
  return {
    type: ArrowDown,
  };
};

export const rotate = () => {
  return {
    type: ArrowUp,
  };
};

export const drop = () => {
  return {
    type: Space,
  };
};
