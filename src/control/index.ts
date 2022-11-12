
import { keyboard } from "../actions/index";
import { ShapeConfig, ShapeType } from "../components/ShapeConfig";
import { store } from "../store";
import { scanBottom, scanLeft, scanRight } from "../utils";


const keyDownHandler = (e: { code: string; }) => {
  const state = store.getState();
  const { keyboard: pos, mesh } = state;
  const shape = ShapeConfig[pos.shape as ShapeType];
  
  switch (e.code) {
    case keyboard.ArrowDown:
      // 如果方块下面有物体（方块、底部）
      if(scanBottom({ x: pos.x, y: pos.y }, mesh!, shape)) {
        console.log("到底啦！", pos)
        // 分配新的方块组
        // 检测是否需要消除
      } else {
        store.dispatch(keyboard.moveDown(pos));
      }
      return;
    case keyboard.ArrowLeft:
      if(scanLeft({ x: pos.x, y: pos.y }, mesh!, shape)) {
        console.log("到最左侧了")
      } else {
        store.dispatch(keyboard.moveLeft(pos));
      }
      return;
    case keyboard.ArrowRight:
      if(scanRight({ x: pos.x, y: pos.y }, mesh!, shape)) {
        console.log("到最右侧了")
      } else {
        store.dispatch(keyboard.moveRight(pos));
      }
      return;
    case keyboard.ArrowUp:
      // 不同的形状需要有不同的旋转补正（保持方块的坐标始终是整数）
      store.dispatch(keyboard.rotate(pos));
      return;
    case keyboard.Space:
      store.dispatch(keyboard.drop(pos));
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
document.addEventListener("keyup", (e)=> {
  if(lock) {
    lock = false;
  }
});

