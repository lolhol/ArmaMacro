/** @format */

import { getState, setState } from "../functions/state";

const FILE = "./config/ChatTriggers/modules/MiningInTwo/data/routeData.json";

let blockCoords = JSON.parse(FileLib.read(FILE));

export function getBlockCoords() {
  return blockCoords;
}

export function getBlockCoordsAtPlayer() {
  for (let j = 0; j < blockCoords.length; j++) {
    if (Math.abs(blockCoords[j].x - Player.getX()) < 0.00001) {
      if (Math.abs(blockCoords[j].z - Player.getZ()) < 0.001) {
        return j;
      }
    }
  }
}

export function addBlockRoute() {
  blockCoords.push({
    x: Player.getX(),
    y: Player.getY() - 1,
    z: Player.getZ(),
  });

  FileLib.write(FILE, JSON.stringify(blockCoords, undefined, 2), true);
}

export function clearBlockCoords() {
  blockCoords = [];
  FileLib.write(FILE, JSON.stringify(blockCoords, undefined, 2), true);
}
