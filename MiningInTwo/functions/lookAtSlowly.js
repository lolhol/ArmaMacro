/** @format */

import { radiansToDegree } from "./radiansToDegree";

import Settings from "../data/config/config";

let lookSPEED;

export function lookAtSlowly(x, y, z) {
  let hoekPitch;
  let hoekYaw;

  getSpeed();
  if (x === undefined || y === undefined || z === undefined) {
    ChatLib.chat(" ");
  } else {
    let PlayerAngleYaw = Player.getPlayer().field_70177_z;
    let AngleYaw;
    PlayerAngleYaw %= 360;
    let dX = Player.getX() - x + 0.00001;
    let dZ = Player.getZ() - z + 0.00001;
    let dY = Player.getY() - y + 1.12;
    let dis = Math.sqrt(dX * dX + dZ * dZ);
    if (dX < 0.0 && dZ < 0.0) {
      AngleYaw = radiansToDegree(Math.atan(dZ / dX)) + 180;
    } else if (dZ < 0.0 && dX > 0.0) {
      AngleYaw = radiansToDegree(Math.atan(dZ / dX)) + 360;
    } else if (dZ > 0.0 && dX < 0.0) {
      AngleYaw = radiansToDegree(Math.atan(dZ / dX)) + 180;
    } else if (dZ > 0.0 && dX > 0.0) {
      AngleYaw = radiansToDegree(Math.atan(dZ / dX));
    }
    hoekYaw = AngleYaw - PlayerAngleYaw + 90;
    if (hoekYaw > 180) {
      hoekYaw -= 360;
    }
    if (hoekYaw < -180) {
      hoekYaw += 360;
    }
    Player.getPlayer().field_70177_z += hoekYaw * lookSPEED;
    hoekPitch =
      radiansToDegree(Math.atan(dY / dis)) - Player.getPlayer().field_70125_A;
    Player.getPlayer().field_70125_A += hoekPitch * lookSPEED;
  }
}

function getSpeed() {
  if (Settings.SPEED == 1) {
    lookSPEED = 0.2;
  } else if (Settings.SPEED == 2) {
    lookSPEED = 0.4;
  } else if (Settings.SPEED == 3) {
    lookSPEED = 0.6;
  } else if (Settings.SPEED == 4) {
    lookSPEED = 0.8;
  } else if (Settings.SPEED == 5) {
    lookSPEED = 1;
  }
}
