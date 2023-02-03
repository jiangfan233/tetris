import { mesh as meshActions } from "../actions/Mesh";
import { Direction } from "../actions/keyboard";
import { ShapeConfig, ShapeType } from "../components/ShapeConfig";
import { store } from "../store";
import { scan } from "../utils/scan";
import { getPoints, maybeRotate, needLibeate } from "../utils/index";
import { keyboard } from "../actions/keyboard";
import { score } from "../actions/score";
import { Sound } from "../actions/sound";


const { FAILURE, SUCCESS, WARNING, playSound } = Sound;

const shineRowsAndUpdateScore = (needLiberateRows: number[], shineInterval: number, shineCount: number) => {
  // 行闪烁,可使用css实现
  let count = 0;
  store.dispatch(meshActions.shineRows(needLiberateRows, "2"));
  let id = setInterval(() => {
    store.dispatch(meshActions.shineRows(needLiberateRows, count % 2 ? "2" : "1"));
    count++;
    if (count >= shineCount - 1) clearInterval(id);
  }, shineInterval);

  let id2 = setTimeout(() => {
    // 批量消除行
    store.dispatch(meshActions.batchLiberateRows(needLiberateRows, "0"));
    // 更新分数
    store.dispatch(
      score.updateScore(
        needLiberateRows.length,
        false
      )
    );
    clearTimeout(id2);
  }, shineCount * shineInterval + 50);
}

export const keyDownHandler = (e: { code: string }) => {
  const state = store.getState();
  const { keyboard: pos, mesh } = state;
  const shapeProperties = ShapeConfig[pos.shape as ShapeType];

  switch (e.code) {
    case keyboard.ArrowDown:
      // 如果方块下面有物体（方块、底部）
      if (scan(pos, shapeProperties, mesh!, keyboard.ArrowDown as Direction)) {
        // 最顶层有1，有方块了，游戏结束
        if (mesh.points.some((col) => col[1].val === 1)) {
          console.log("游戏结束");
          stop();
          // @ts-ignore
          return store.dispatch(playSound(FAILURE, state.volume));
        }

        // 批量占据方块
        store.dispatch(
          meshActions.batchOccupy(getPoints(pos, shapeProperties))
        );

        // 上一步（batchOccupy）已经已经产生了新的mesh，因此在这一步获取新的mesh
        // 检测是否需要消除
        const needLiberateRows = needLibeate(store.getState().mesh);
        if (needLiberateRows.length > 0) {
          shineRowsAndUpdateScore(needLiberateRows, 300, 3);
        }

        // 分配新的方块组
        store.dispatch(keyboard.reset(shapeProperties));
      } else {
        store.dispatch(keyboard.moveDown(shapeProperties));
      }
      return;
    case keyboard.ArrowLeft:
      // 如果新的方块组未进入视野，不作操作
      if (getPoints(pos, shapeProperties).every(point => point.y < 0)) return;
      if (scan(pos, shapeProperties, mesh!, keyboard.ArrowLeft as Direction)) {
        console.log("到最左侧了");
        // @ts-ignore
        store.dispatch(playSound(WARNING, state.volume));
      } else {
        store.dispatch(keyboard.moveLeft(shapeProperties));
      }
      return;
    case keyboard.ArrowRight:
      // 如果新的方块组未进入视野，不作操作
      if (getPoints(pos, shapeProperties).every(point => point.y < 0)) return;
      if (scan(pos, shapeProperties, mesh!, keyboard.ArrowRight as Direction)) {
        console.log("到最右侧了");
        // @ts-ignore
        store.dispatch(playSound(WARNING, state.volume));
      } else {
        store.dispatch(keyboard.moveRight(shapeProperties));
      }
      return;
    case keyboard.ArrowUp:
      // 如果新的方块组未进入视野，不作操作
      if (getPoints(pos, shapeProperties).every(point => point.y < 0)) return;
      if (
        maybeRotate(pos, shapeProperties, mesh)
      ) {
        // 不可旋转
        console.log("不可旋转");
        // @ts-ignore
        store.dispatch(playSound(WARNING, state.volume));
      } else {
        store.dispatch(keyboard.rotate(shapeProperties));
      }
      return;

    case keyboard.Space:
      let p = pos;
      let sp = shapeProperties;
      let m = mesh;

      while (!scan(p, sp, m!, keyboard.ArrowDown as Direction)) {
        store.dispatch(keyboard.moveDown(sp));
        const state = store.getState();
        p = state.keyboard;
      }
      // 批量占据方块
      store.dispatch(
        meshActions.batchOccupy(getPoints(p, shapeProperties))
      );

      // 检测是否需要消除
      const needLiberateRows = needLibeate(store.getState().mesh);
      if (needLiberateRows.length > 0) {
        // debugger
        shineRowsAndUpdateScore(needLiberateRows, 300, 3);
      }
      // 分配新的方块组
      store.dispatch(keyboard.reset(shapeProperties));
      return;
    default:
      return;
  }
};

function debounce(fn: Function, duration: number) {
  let id: number | null = null;
  return function () {
    if (id) {
      return;
    } else {
      fn()
      id = window.setTimeout(() => {
        clearTimeout(id!);
        id = null;
      }, duration)
    }
  }
}

// 简易移动端适配
function init() {
  let width = document.body.clientWidth;
  const html = document.querySelector("html");

  if (!width) return;
  if (width < 750) {
    html!.style.fontSize = Math.floor(width / 500 * 16) + "px";
  }
}

export function runTimer(rank: number) {
  const internal = Math.ceil(1000 / rank)
  let id = window.setInterval(() => {
    keyDownHandler({ code: "ArrowDown" });
  }, internal);

  return {
    id,
    stop() { clearInterval(id) },
    reRun(rank: number) {
      clearInterval(id);
      id = runTimer(rank).id;
    },
  }
}

export function run() {
  init()
  const fn = debounce(init, 300);
  window.addEventListener("resize", () => fn());

  let lock = false;

  const handleKeyDown = (e: KeyboardEvent) => {
    lock = true;
    keyDownHandler(e);
  }

  const handleKeyUp = (e: KeyboardEvent) => {
    if (lock) {
      lock = false;
    }
  }

  document.addEventListener("keydown", handleKeyDown);
  document.addEventListener("keyup", handleKeyUp);
  const timer = runTimer(store.getState().rank);

  return {
    reRunTimer: timer.reRun,
    stop() {
      timer.stop();
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("resize", init);
    },
  }
}


export const { stop, reRunTimer } = run();