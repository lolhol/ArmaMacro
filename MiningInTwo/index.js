/** @format */

import { radiansToDegree } from "./functions/radiansToDegree";
import { lookAtSlowly } from "./functions/lookAtSlowly";
import { lookAt } from "./functions/lookAt";
import { degreeToRadians } from "./functions/degreeToRadians";
import { getNearestBlock } from "./functions/getNearestBlock";
import { getKeyBindFromKey } from "./functions/getKeyBindFromKey";
import { checkBlock } from "./checkLocation";
import { blockList } from "./setBlockCords";
import { teleport } from "./teleportToNextBlock";
import { getState, setState, getTickSinceStateChange } from "./state";

const MC = Client.getMinecraft();
const JUMP = new KeyBind(MC.field_71474_y.field_74314_A);
const RIGHTCLICK = MC.getClass().getDeclaredMethod("func_147121_ag");

let angle = 0;
let pos;
let map;

RIGHTCLICK.setAccessible(true);

function onStateSpinDrive() {
  let block = getNearestBlock();
  let random = Math.random();
  angle += 10 * random + 20;

  if (block) {
    let radians = degreeToRadians(angle);

    let dx = Math.cos(radians) * 0.4;
    let dz = Math.sin(radians) * 0.4;

    let x = block.getX() + dx + 0.5;
    let z = block.getZ() + dz + 0.5;

    ChatLib.chat(block.getY() + " " + Player.getY());

    if (block.getY() > Player.getY()) {
      JUMP.setState(true);
      lookAtSlowly(x, block.getY() - 0.2, z);
      JUMP.setState(false);
    }

    if (block.getY() < Player.getY()) {
    }
    lookAtSlowly(x, block.getY() - 0.2, z);
  } else {
    ChatLib.chat("No Blocks Found. Going To Next Vein.");
    setState("Teleporting");
  }
}

function onStateArmadillo() {
  if (getTickSinceStateChange() == 10) {
    for (let i = 0; i < 8; i++) {
      if (
        ChatLib.removeFormatting(
          Player.getInventory().getStackInSlot(i)?.getName()
        ).includes("Rod")
      ) {
        let rodSlot = i;
        Player.setHeldItemIndex(rodSlot);
        const playerYBefore = Player.getY();
        RIGHTCLICK.invoke(MC);
        ChatLib.chat("?    Click!");

        for (let i = 0; i < 8; i++) {
          if (
            ChatLib.removeFormatting(
              Player.getInventory().getStackInSlot(i)?.getName()
            ).includes("Gauntlet")
          ) {
            const drillSlot = i;
            Player.setHeldItemIndex(drillSlot);
            armadilloStateClick();
          }
        }
      }
    }
  } else {
    ChatLib.chat(getTickSinceStateChange());
    setState("armadilloTicks");
  }
}

function armadilloStateClick() {
  ChatLib.chat(getTickSinceStateChange);
  if (getTickSinceStateChange() == 20) {
    RIGHTCLICK.invoke(MC);
    ChatLib.chat("? CLICK!");
    setState("spinDrive");
  } else {
    setState("armadilloClickTicks");
  }
}

var jKeyBind = getKeyBindFromKey(Keyboard.KEY_J);

register("messageSent", (message, event) => {
  if (message.includes("/block")) {
    ChatLib.chat("Block Set!");
    setState("getBlock");
  }

  if (message.includes("/clear")) {
    ChatLib.chat("Block List Cleared!");
    setState("clearBlockList");
  }
});

register("Tick", () => {
  if (jKeyBind.isPressed()) {
    if (getState()) {
      setState(null);
    } else {
      if (checkBlock("getBlock") == "startMacro") {
        ChatLib.chat("Starting macro...");
        setState("armadillo");
      } else {
        ChatLib.chat("You are not on the right block!");
      }
    }
  }

  if (getState() == "getBlock") {
    blockList("getBlock");
    setState(null);
  }

  if (getState() == "clearBlockList") {
    blockList("clear");
    setState(null);
  }

  if (getState() == "spinDrive") {
    onStateSpinDrive();
  }

  if (getState() == "armadillo") {
    onStateArmadillo();
  }

  if (getState() == "Teleporting") {
    map = blockList("Tp");

    pos = blockList("pos");

    teleport(map, pos);
  }

  if (getState() == "tickCount") {
    teleport(map, pos);
  }

  if (getState() == "armadilloTicks") {
    onStateArmadillo();
  }

  if (getState() == "armadilloClickTicks") {
    armadilloStateClick();
  }
});
