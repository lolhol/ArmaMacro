/** @format */

import { addBlockRoute } from "../utils/blockCoords";
import { setState } from "./state";
import { radiansToDegree } from "./radiansToDegree";

export function getNearestBlock() {
  let blockReturnList = [];
  let radius = 1;
  for (let x = -radius; x <= radius; x++) {
    for (let y = -3; y <= 2; y++) {
      for (let z = -radius; z <= radius; z++) {
        let block = World.getBlockAt(
          Player.getX() + x,
          Player.getY() + y,
          Player.getZ() + z
        );

        if (block.toString().includes("stained_glass")) {
          blockReturnList.push(block);
        }
      }
    }
  }

  for (let i = 0; i < blockReturnList.length; i++) {
    if (
      Math.abs(blockReturnList[i].getX() - Player.getX()) < 0.00001 &&
      Math.abs(blockReturnList[i].getZ() - Player.getZ()) < 0.00001
    ) {
      blockReturnList.splice(i);
    }
  }

  return blockReturnList;
}

export function getBlockUnder() {
  let radius = 1;

  for (let x = -radius; x <= radius; x++) {
    for (let y = -7; y <= 0; y++) {
      for (let z = -radius; z <= radius; z++) {
        let cobbleBlock = World.getBlockAt(
          Player.getX() + x,
          Player.getY() + y,
          Player.getZ() + z
        );

        if (cobbleBlock.toString().includes("cobblestone")) {
          return cobbleBlock;
        }
      }
    }
  }
}

export function sendYofBlock(y) {
  return y;
}

export function mainBlockChecks() {
  let checks = false;
  let radius = 1;
  let block = getNearestBlock().shift();
  let blockReturnList = getNearestBlock();
  if (block) {
    for (let x = -radius; x <= radius; x++) {
      for (let y = -1.1125; y <= 0; y++) {
        for (let z = -radius; z <= radius; z++) {
          let cobbleBlock = World.getBlockAt(
            Player.getX() + x,
            Player.getY() + y,
            Player.getZ() + z
          );

          if (cobbleBlock.toString().includes("cobblestone")) {
            checks = true;
          }
        }
      }
    }

    if (checks == true) {
      for (let i = 0; i < blockReturnList.length; i++) {
        if (block.getY() < Player.getY()) {
          if (block) {
            mainBlockChecks();
          } else {
            setState("Teleporting");
          }
        }
      }
    }
    return block;
  } else {
    return false;
  }
}
