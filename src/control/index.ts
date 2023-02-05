import { mesh as meshActions } from "../actions/Mesh";
import { ShapeConfig, ShapeType } from "../components/ShapeConfig";
import { store } from "../store";
import { scan } from "../utils/scan";
import { debounce, getPoints, isStorageEmpty, maybeRotate, needLibeate, setStorageItem } from "../utils/index";
import { keyboard } from "../actions/keyboard";
import { score } from "../actions/score";
import { Sound } from "../actions/sound";
import { game, GameStatus } from "../actions/game";
import { reactiveWindow, restoreData } from "./init";

const { FAILURE, SUCCESS, WARNING, playSound } = Sound;
const { gameActionCreator, Stop } = game;
const { ArrowRight, ArrowLeft, ArrowUp, ArrowDown, Space, Reset, blocksDo, } = keyboard;

export type AfterRun = {
  reRunTimer: Function;
  stop: Function;
};

const shineRowsAndUpdateScore = (
  needLiberateRows: number[],
  shineInterval: number,
  shineCount: number
) => {
  // 行闪烁,可使用css实现
  let count = 0;
  store.dispatch(meshActions.shineRows(needLiberateRows, "2"));
  let id = setInterval(() => {
    store.dispatch(
      meshActions.shineRows(needLiberateRows, count % 2 ? "2" : "1")
    );
    count++;
    if (count >= shineCount - 1) clearInterval(id);
  }, shineInterval);

  let id2 = setTimeout(() => {
    // 批量消除行
    store.dispatch(meshActions.batchLiberateRows(needLiberateRows, "0"));
    // 更新分数
    store.dispatch(score.updateScore(needLiberateRows.length, false));
    clearTimeout(id2);
  }, shineCount * shineInterval + 50);
};

export const keyDownHandler = (e: { code: string }) => {
  const state = store.getState();
  const { keyboard: pos, mesh } = state;
  const shapeProperties = ShapeConfig[pos.shape as ShapeType];

  switch (e.code) {
    case ArrowDown:
      // 如果方块下面有物体（方块、底部）
      if (scan(pos, shapeProperties, mesh!, ArrowDown)) {
        // 最顶层有1，有方块了，游戏结束
        if (mesh!.points.some((col) => col[1].val === 1)) {
          console.log("游戏结束");
          // @ts-ignore
          store.dispatch(playSound(FAILURE, state.volume));
          store.dispatch(gameActionCreator(Stop as GameStatus));
        }

        // 批量占据方块
        store.dispatch(
          meshActions.batchOccupy(getPoints(pos, shapeProperties))
        );

        // 上一步（batchOccupy）已经已经产生了新的mesh，因此在这一步获取新的mesh
        // 检测是否需要消除
        const needLiberateRows = needLibeate(store.getState().mesh!);
        if (needLiberateRows.length > 0) {
          shineRowsAndUpdateScore(needLiberateRows, 300, 3);
        }

        // 分配新的方块组
        store.dispatch(blocksDo(Reset));
      } else {
        store.dispatch(blocksDo(ArrowDown));
      }
      return;
    case ArrowLeft:
      // 如果新的方块组未进入视野，不作操作
      if (getPoints(pos, shapeProperties).every((point) => point.y < 0)) return;
      if (scan(pos, shapeProperties, mesh!, ArrowLeft)) {
        console.log("到最左侧了");
        // @ts-ignore
        store.dispatch(playSound(WARNING, state.volume));
      } else {
        store.dispatch(blocksDo(ArrowLeft));
      }
      return;
    case ArrowRight:
      // 如果新的方块组未进入视野，不作操作
      if (getPoints(pos, shapeProperties).every((point) => point.y < 0)) return;
      if (scan(pos, shapeProperties, mesh!, ArrowRight)) {
        console.log("到最右侧了");
        // @ts-ignore
        store.dispatch(playSound(WARNING, state.volume));
      } else {
        store.dispatch(blocksDo(ArrowRight));
      }
      return;
    case ArrowUp:
      // 如果新的方块组未进入视野，不作操作
      if (getPoints(pos, shapeProperties).every((point) => point.y < 0)) return;
      if (maybeRotate(pos, shapeProperties, mesh!)) {
        // 不可旋转
        console.log("不可旋转");
        // @ts-ignore
        store.dispatch(playSound(WARNING, state.volume));
      } else {
        store.dispatch(blocksDo(ArrowUp, pos));
      }
      return;

    case Space:
      let p = pos;
      let sp = shapeProperties;
      let m = mesh;

      while (!scan(p, sp, m!, ArrowDown)) {
        store.dispatch(blocksDo(ArrowDown));
        const state = store.getState();
        p = state.keyboard;
      }
      // 批量占据方块
      store.dispatch(meshActions.batchOccupy(getPoints(p, shapeProperties)));

      // 检测是否需要消除
      const needLiberateRows = needLibeate(store.getState().mesh!);
      if (needLiberateRows.length > 0) {
        // debugger
        shineRowsAndUpdateScore(needLiberateRows, 300, 3);
      }
      // 分配新的方块组
      store.dispatch(blocksDo(Reset));
      return;
    default:
      return;
  }
};

export function runTimer(rank: number) {
  const internal = Math.ceil(1000 / rank);
  let id = window.setInterval(() => {
    keyDownHandler({ code: "ArrowDown" });
  }, internal);

  return {
    id,
    stop() {
      clearInterval(id);
    },
    reRun(rank: number) {
      clearInterval(id);
      id = runTimer(rank).id;
    },
  };
}


const liveWindow = debounce(reactiveWindow, 300);

(function init() {
  window.addEventListener("resize", liveWindow);
  if(!isStorageEmpty()) {
    restoreData();
  }
  window.onbeforeunload = function () {
    Object.entries(store.getState()).filter(entry => !entry[0] || entry[0] !== "game" && entry[0] !== "sound").forEach(([key, value]) => {
      setStorageItem(key, JSON.stringify(value));
    })
    window.onbeforeunload = null;
  }
})()

export function run(rank: number = 1) {
  let lock = false;

  const handleKeyDown = (e: KeyboardEvent) => {
    // 取消按键的默认事件
    // 比如：空格键默认执行上一次鼠标点击事件
    e.preventDefault();
    lock = true;
    keyDownHandler(e);
  };

  const handleKeyUp = (e: KeyboardEvent) => {
    if (lock) {
      lock = false;
    }
  };

  document.addEventListener("keydown", handleKeyDown);
  document.addEventListener("keyup", handleKeyUp);
  const timer = runTimer(rank);

  return {
    reRunTimer: timer.reRun,
    stop() {
      timer.stop();
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("resize", liveWindow);
    },
  };
}