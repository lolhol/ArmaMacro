/** @format */

import { addBlockRoute, getBlockCoords } from "./blockCoords";

let state = null;

export function checkBlock(posState) {
  let i;

  if (posState == "getBlock") {
    let blockCoords = getBlockCoords();
    if (blockCoords.length > 0) {
      for (i = 0; i < blockCoords.length; i++) {
        if (
          Math.abs(blockCoords[i].z - Player.getZ()) < 0.0001 &&
          Math.abs(blockCoords[i].x - Player.getX()) < 0.0001
        ) {
          state = "startMacro";
          return state;
        }
      }
    } else {
      state = null;
      return state;
    }
  }
}
