import {
  getESPColor,
  getESPColorRed,
  getESPColorGreen,
} from "../functions/getESPColor";

import RenderLib from "../../RenderLib/index";
import { addLine } from "../debug_testing_dont_mind/debug";

let blocks = [];
let routeNukerLineFilePath =
  "./config/ChatTriggers/modules/MiningInTwo/data/cobbleCoords.json";

let routeAssistFilePath =
  "./config/ChatTriggers/modules/MiningInTwo/data/routeAssist.json";

let state = false;
let block;

const CYLINDER_RADIUS = 0.5;

export function getBlocksOnLine(x1, y1, z1, x2, y2, z2) {
  //addLine(x1, y1, z1, x2, y2, z2);

  let dx = x2 - x1;
  let dy = y2 - y1;
  let dz = z2 - z1;

  if (Math.abs(dz) < 0.000001) {
    dz = 0.000001;
  }

  let length = Math.sqrt(dx * dx + dy * dy + dz * dz);
  let stepX = dx / length;
  let stepY = dy / length;
  let stepZ = dz / length;

  let planeCoef = x1 * dx + y1 * dy + z1 * dz;

  let xN = 0;
  let yN = 0;
  let zN = planeCoef / dz;
  let dxN = xN - x1;
  let dyN = yN - y1;
  let dzN = zN - z1;
  let lenN = Math.sqrt(dxN * dxN + dyN * dyN + dzN * dzN);
  dxN = dxN / lenN;
  dyN = dyN / lenN;
  dzN = dzN / lenN;

  let dxM = dy * dzN - dz * dyN;
  let dyM = dz * dxN - dx * dzN;
  let dzM = dx * dyN - dy * dxN;
  let cLen = Math.sqrt(dxM * dxM + dyM * dyM + dzM * dzM);
  dxM = dxM / cLen;
  dyM = dyM / cLen;
  dzM = dzM / cLen;

  //addLine(x1, y1, z1, x1 + dxN, y1 + dyN, z1 + dzN);
  //addLine(x1, y1, z1, x1 + dxM, y1 + dyM, z1 + dzM);

  for (let degree = 0; degree < 360; degree += 20) {
    let angle = degree * (Math.PI / 180);
    let dxP = dxN * Math.cos(angle) + dxM * Math.sin(angle);
    let dyP = dyN * Math.cos(angle) + dyM * Math.sin(angle);
    let dzP = dzN * Math.cos(angle) + dzM * Math.sin(angle);
    /*addLine(
      x1,
      y1,
      z1,
      x1 + dxP * CYLINDER_RADIUS,
      y1 + dyP * CYLINDER_RADIUS,
      z1 + dzP * CYLINDER_RADIUS
    );*/

    for (let i = 0; i < length; i++) {
      let newX = stepX * i + x1 + dxP * CYLINDER_RADIUS;
      let newY = stepY * i + y1 + dyP * CYLINDER_RADIUS;
      let newZ = stepZ * i + z1 + dzP * CYLINDER_RADIUS;

      let block = World.getBlockAt(newX, newY, newZ);

      let found = false;
      for (let j = 0; j < blocks.length; j++) {
        if (
          blocks[j].getX() == block.getX() &&
          blocks[j].getY() == block.getY() &&
          blocks[j].getZ() == block.getZ()
        ) {
          found = true;
        }
      }

      if (found == false) {
        blocks.push(block);
      }

      //addLine(newX, newY, newZ, newX + 0.05, newY + 0.05, newZ + 0.05);
    }
  }

  shiftBlocks();
}

function shiftBlocks() {
  block = blocks.shift();
  state = true;
}

export function routeHelper() {
  let cobbleBlocks = JSON.parse(FileLib.read(routeNukerLineFilePath));
  let xPosCobble = cobbleBlocks.xpos1;
  let yPosCobble = cobbleBlocks.ypos1;
  let zPosCobble = cobbleBlocks.zpos1;

  let tpBlocks = JSON.parse(FileLib.read(routeAssistFilePath));
  let xpos1 = tpBlocks.xpos1;
  let block1 = tpBlocks.block1;
  let zpos1 = tpBlocks.zpos1;

  for (let i = 0; i < xpos1.length - 1; i++) {
    let j = i + 1;
    try {
      /*if (
        World.getBlockAt(xpos1[j], block1[j] + 2, zpos1[j])
          .toString()
          .includes("air")
      ) {
        //noting
      } else {
        blocks.push(xpos1[j], block1[j] + 2, zpos1[j]);
      }

      if (
        World.getBlockAt(World.getBlockAt(xpos1[j], block1[j] + 1, zpos1[j]))
          .toString()
          .includes("air")
      ) {
        //noting
      } else {
        blocks.push(World.getBlockAt(xpos1[j], block1[j] + 1, zpos1[j]));
      }*/

      getBlocksOnLine(
        xPosCobble[i],
        yPosCobble[i] + 2.548,
        zPosCobble[i],
        xpos1[j],
        block1[j] + 1.3,
        zpos1[j]
      );
    } catch (e) {}
  }
}

function distanceToPlayer(x, y, z) {
  let dX = Player.getX() - x;
  let dZ = Player.getZ() - z;
  let dY = Player.getY() - y;
  let dis = Math.sqrt(dX * dX + dZ * dZ);
  let dis2 = Math.sqrt(dis * dis + dY * dY);
  return dis2;
}

register("command", (...args) => {
  routeHelper();
}).setName("test");

register("renderWorld", () => {
  if (state == true) {
    if (!World.isLoaded) return;
    if (block) {
      let tpBlocks = JSON.parse(FileLib.read(routeAssistFilePath));
      let xpos1 = tpBlocks.xpos1;
      let block1 = tpBlocks.block1;
      let zpos1 = tpBlocks.zpos1;
      if (
        World.getBlockAt(block.getX(), block.getY(), block.getZ())
          .toString()
          .includes("air") ||
        World.getBlockAt(block.getX(), block.getY(), block.getZ())
          .toString()
          .includes("cobblestone") ||
        World.getBlockAt(block.getX(), block.getY(), block.getZ())
          .toString()
          .includes("stained_glass")
      ) {
        block = blocks.shift();
      } else {
        for (let i = 0; i < xpos1.length; i++) {
          if (
            Math.abs(xpos1[i] - block.getX()) < 0.0001 &&
            Math.abs(block1[i] - block.getY()) < 0.00001 &&
            Math.abs(zpos1[i] - block.getZ()) < 0.00001
          ) {
            ChatLib.chat(".");
            block = blocks.shift();
          }
        }

        RenderLib.drawEspBox(
          block.getX() + 0.5,
          block.getY(),
          block.getZ() + 0.5,
          1,
          1,
          0,
          1,
          0,
          1,
          true
        );

        /*if (blocks[1]) {
          RenderLib.drawEspBox(
            blocks[1].getX() + 0.5,
            blocks[1].getY(),
            blocks[1].getZ() + 0.5,
            1,
            1,
            0,
            1,
            0,
            1,
            true
          );
        }
              */
      }

      /*if (
        World.getBlockAt(blocks[2].getX(), blocks[2].getY(), blocks[2].getZ())
          .toString()
          .includes("air") ||
        World.getBlockAt(blocks[2].getX(), blocks[2].getY(), blocks[2].getZ())
          .toString()
          .includes("cobblestone") ||
        World.getBlockAt(blocks[2].getX(), blocks[2].getY(), blocks[2].getZ())
          .toString()
          .includes("stained_glass")
      ) {
        blocks.slice(2);
      } else {
        if (blocks[2]) {
          RenderLib.drawEspBox(
            blocks[2].getX() + 0.5,
            blocks[2].getY(),
            blocks[2].getZ() + 0.5,
            1,
            1,
            0,
            1,
            0,
            1,
            true
          );
        }
      }*/
    } else {
      ChatLib.chat("&l---------------------------------------------");
      ChatLib.chat(
        "&l[&4&lMi&e&lni&2&lng &d&lIn &5&lTw&b&lo&f&l]" + " &lRoute Cleared!"
      );
      ChatLib.chat("&l---------------------------------------------");
      state = false;
    }
  }
});
