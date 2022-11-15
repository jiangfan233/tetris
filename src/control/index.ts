import { keyboard } from "../actions/index";
import { Direction } from "../actions/keyboard";
import { ShapeConfig, ShapeType } from "../components/ShapeConfig";
import { store } from "../store";
import { scanBottom, scanLeft, scanRight, scan } from "../utils";

const keyDownHandler = (e: { code: string }) => {
  const state = store.getState();
  const { keyboard: pos, mesh } = state;
  const shapeProperties = ShapeConfig[pos.shape as ShapeType];

  switch (e.code) {
    case keyboard.ArrowDown:
      // 如果方块下面有物体（方块、底部）
      if (scan(pos, shapeProperties, mesh!, keyboard.ArrowDown as Direction)) {
        console.log("到底啦！");
        // 分配新的方块组 或者 重置位置
        // 检测是否需要消除
      } else {
        store.dispatch(keyboard.moveDown(shapeProperties));
      }
      return;
    case keyboard.ArrowLeft:
      if (scan(pos, shapeProperties, mesh!, keyboard.ArrowLeft as Direction)) {
        console.log("到最左侧了");
      } else {
        store.dispatch(keyboard.moveLeft(shapeProperties));
      }
      return;
    case keyboard.ArrowRight:
      if (scan(pos, shapeProperties, mesh!, keyboard.ArrowRight as Direction)) {
        console.log("到最右侧了");
      } else {
        store.dispatch(keyboard.moveRight(shapeProperties));
      }
      return;
    case keyboard.ArrowUp:
      if (
        scan(pos, shapeProperties, mesh!, keyboard.ArrowRight as Direction) ||
        scan(pos, shapeProperties, mesh!, keyboard.ArrowLeft as Direction) ||
        scan(pos, shapeProperties, mesh!, keyboard.ArrowDown as Direction)
      ) {
        // 不可旋转
        return;
      } else {
        store.dispatch(keyboard.rotate(shapeProperties));
      }
    case keyboard.Space:
      store.dispatch(keyboard.drop(shapeProperties));
      return;
    default:
      return;
  }
};

let lock = false;
document.addEventListener("keydown", (e) => {
  lock = true;
  keyDownHandler(e);
});
document.addEventListener("keyup", (e) => {
  if (lock) {
    lock = false;
  }
});
