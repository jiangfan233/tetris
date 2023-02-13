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
  const element = document.documentElement;
  const html = document.querySelector("html");
  let width = element?.clientWidth;
  if(width < 500) html!.style.fontSize = Math.floor(width! / 30) + "px";
}
