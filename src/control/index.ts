import { keyboard, mesh as meshActions } from "../actions/index";
import { Direction } from "../actions/keyboard";
import { ShapeConfig, ShapeType } from "../components/ShapeConfig";
import { store } from "../store";
import { scan } from "../utils/scan";
import { getPoints } from "../utils/index";


const keyDownHandler = (e: { code: string }) => {
  const state = store.getState();
  const { keyboard: pos, mesh } = state;
  const shapeProperties = ShapeConfig[pos.shape as ShapeType];

  switch (e.code) {
    case keyboard.ArrowDown:
      // 如果方块下面有物体（方块、底部）
      if (scan(pos, shapeProperties, mesh!, keyboard.ArrowDown as Direction)) {
        drop = false;
        // 分配新的方块组 或者 重置位置
        // 检测是否需要消除

        console.log("到底啦！");
        store.dispatch(keyboard.reset(shapeProperties));
        store.dispatch(
          meshActions.batchOccupy(getPoints(pos, shapeProperties))
        );
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
      // store.dispatch(keyboard.rotate(shapeProperties));
    default:
      return;
  }
};

let lock = false;
let drop = false;
document.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    drop = true;
    while (drop) {
      keyDownHandler({ code: "ArrowDown" });
    }
  } else {
    lock = true;
    keyDownHandler(e);
  }
});
document.addEventListener("keyup", (e) => {
  if (lock) {
    lock = false;
  }
});
// setInterval(() => {
//   keyDownHandler({ code: "ArrowDown" });
// }, 1000)
