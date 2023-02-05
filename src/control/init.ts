import { keyboard } from "../actions/keyboard";
import { mesh } from "../actions/Mesh";
import { rank } from "../actions/rank";
import { score } from "../actions/score";
import { volume } from "../actions/volume";
import { store } from "../store";
import { getStorageItem } from "../utils";

// 检查是否有已存储的游戏数据
export function restoreData() {
  const rankData = getStorageItem("rank");
  const { dispatch } = store;
  dispatch!(rank.increaseRank(rankData - 1));
  const meshData = getStorageItem("mesh");
  dispatch!(meshData ? mesh.restoreMesh(meshData) : mesh.resetMesh());

  const volumeData = getStorageItem("volume");
  const { volumeDo, IncreaseVolume, ResetVolume: ResetVolume } = volume;
  dispatch!(volumeDo(volumeData !== undefined ? IncreaseVolume : ResetVolume, volumeData));
  
  const scoreData = getStorageItem("score");
  dispatch!(score.updateScore(scoreData, !scoreData))
  
  const pos = getStorageItem("keyboard");
  const { blocksDo, Reset, Restore } = keyboard;
  dispatch!(blocksDo(pos ? Restore : Reset, pos));
}


// 简易移动端适配
export function reactiveWindow() {
  let width = window.screen.width;
  let height = window.screen.height;

  const html = document.querySelector("html");

  if (width !== undefined && height !== undefined) {
    const small = Math.min(width, height);
    if (small < 750) html!.style.fontSize = Math.floor(small / 500 * 16) + "px";
  }
}
