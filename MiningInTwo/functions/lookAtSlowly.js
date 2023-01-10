import { radiansToDegree } from "./radiansToDegree";

let SPEED = 0.2;

export function lookAtSlowly(x, y, z) {
  let hoekPitch;
  let hoekYaw;
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
    Player.getPlayer().field_70177_z += hoekYaw * SPEED;
    hoekPitch =
      radiansToDegree(Math.atan(dY / dis)) - Player.getPlayer().field_70125_A;
    Player.getPlayer().field_70125_A += hoekPitch * SPEED;
  }
}
