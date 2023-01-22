import { mesh as meshActions } from "../actions/Mesh";
import { Direction } from "../actions/keyboard";
import { ShapeConfig, ShapeType } from "../components/ShapeConfig";
import { store } from "../store";
import { scan } from "../utils/scan";
import { getPoints, needLibeate } from "../utils/index";
import { keyboard } from "../actions/keyboard";
import { score } from "../actions/score";
import { Mesh as MeshConfig } from "../config";
import { Sound, SoundType } from "../actions/sound";


const { FAILURE, SUCCESS, WARNING, playSound } = Sound;

const keyDownHandler = (e: { code: string }) => {
  const state = store.getState();
  const { keyboard: pos, mesh } = state;
  const shapeProperties = ShapeConfig[pos.shape as ShapeType];

  switch (e.code) {
    case keyboard.ArrowDown:
      // 如果方块下面有物体（方块、底部）
      if (scan(pos, shapeProperties, mesh!, keyboard.ArrowDown as Direction)) {
        drop = false;

        // 最顶层有1，有方块了，游戏结束
        if (mesh.points.some((col) => col[1].val === 1)) {
          console.log("游戏结束");
          const fn = playSound(FAILURE);
          store.dispatch(fn);
          return;
        }

        // 批量占据方块
        store.dispatch(
          meshActions.batchOccupy(getPoints(pos, shapeProperties))
        );

        // 上一步（batchOccupy）已经已经产生了新的mesh，因此在这一步获取新的mesh
        // 检测是否需要消除
        const needLiberateRows = needLibeate(store.getState().mesh);
        if (needLiberateRows.length > 0) {
          // 行闪烁,可使用css实现
          let count = 0;
          store.dispatch(meshActions.shineRows(needLiberateRows, "2"));
          let id = setInterval(() => {
            store.dispatch(meshActions.shineRows(needLiberateRows, count % 2 ? "2" : "1"));
            count++;
            if (count >= 2) clearInterval(id);
          }, 300);

          let id2 = setTimeout(() => {
            // 批量消除行
            store.dispatch(meshActions.batchLiberateRows(needLiberateRows, "0"));
            // 更新分数
            store.dispatch(
              score.updateScore(
                needLiberateRows.length * MeshConfig.width,
                false
              )
            );
            clearTimeout(id2);
          }, 900);
        }

        // 分配新的方块组
        store.dispatch(keyboard.reset(shapeProperties));
      } else {
        store.dispatch(keyboard.moveDown(shapeProperties));
      }
      return;
    case keyboard.ArrowLeft:
      if (scan(pos, shapeProperties, mesh!, keyboard.ArrowLeft as Direction)) {
        console.log("到最左侧了");
        const fn = playSound(WARNING as SoundType);
        store.dispatch(fn);
      } else {
        store.dispatch(keyboard.moveLeft(shapeProperties));
      }
      return;
    case keyboard.ArrowRight:
      if (scan(pos, shapeProperties, mesh!, keyboard.ArrowRight as Direction)) {
        console.log("到最右侧了");
        const fn = playSound(WARNING as SoundType);
        store.dispatch(fn);
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
        console.log("不可旋转");
        const fn = playSound(WARNING as SoundType);
        store.dispatch(fn);
        return;
      } else {
        store.dispatch(keyboard.rotate(shapeProperties));
      }
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
setInterval(() => {
  keyDownHandler({ code: "ArrowDown" });
}, 1000);
