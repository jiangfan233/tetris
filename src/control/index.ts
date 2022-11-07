
import { keyboard } from "../actions/index";
import { ShapeConfig, ShapeType } from "../components/ShapeConfig";
import { store } from "../store";
import { scanBottom } from "../utils";

const keyDownHandler = (e: { code: string; }) => {
  const state = store.getState();
  const { keyboard: pos, mesh } = state;
  const blocks = ShapeConfig[pos.shape as ShapeType].blocks;
  console.log(pos)
  // console.log(e);
  switch (e.code) {
    case keyboard.ArrowDown:
      // 如果方块下面有物体（方块、底部）
      if(scanBottom({ x: pos.x, y: pos.y }, mesh!, blocks)) {
        console.log("到底啦！")
      } else {
        store.dispatch(keyboard.moveDown());
      }
      return;
    case keyboard.ArrowLeft:
      store.dispatch(keyboard.moveLeft());
      return;
    case keyboard.ArrowRight:
      store.dispatch(keyboard.moveRight());
      return;
    case keyboard.ArrowUp:
      store.dispatch(keyboard.rotate());
      return;
    case keyboard.Space:
      store.dispatch(keyboard.drop());
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

