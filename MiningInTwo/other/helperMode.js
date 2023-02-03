/** @format */

// Basically a mode that isn't fully automatic

import { setState } from "../functions/state";
import { lookAtSlowly } from "../functions/lookAtSlowly";
import { degreeToRadians } from "../functions/degreeToRadians";
import { getRodSlot, getDrillSlot } from "../functions/getInvItems";
import { mainBlockChecks } from "../functions/getNearestBlock";
import { throwRod } from "../functions/throwRod";

const MC = Client.getMinecraft();
const JUMP = new KeyBind(MC.field_71474_y.field_74314_A);
const RIGHTCLICK = MC.getClass().getDeclaredMethod("func_147121_ag");
RIGHTCLICK.setAccessible(true);

let angle = 0;
let rodSlot;
let drillSlot;
let playerYposAfter;

export function helperSpinDrive() {
  let random = Math.random();
  let block = mainBlockChecks();

  let radians = degreeToRadians(angle);
  let dx = Math.cos(radians) * 0.4;
  let dz = Math.sin(radians) * 0.4;

  if (Math.abs(Player.getY() - playerYposAfter) > 0.0001) {
    if (mainBlockChecks() != false) {
      let x = block.getX() + dx + 0.5;
      let z = block.getZ() + dz + 0.5;

      angle += 10 * random + 20;

      if (block.getY() > Player.getY() + 1.1125) {
        new Thread(() => {
          JUMP.setState(true);
          lookAtSlowly(x + 0.25, block.getY() - 0.2, z + 0.25);
          Thread.sleep(50);
          JUMP.setState(false);
        }).start();
      } else {
        if (
          Math.abs(Player.getX() - block.getX()) < 0.00001 &&
          Math.abs(Player.getZ() - block.getZ()) < 0.00001
        ) {
          lookAtSlowly(x + 1, block.getY() - 0.2, z + 0.5);
        } else {
          lookAtSlowly(x + 0.25, block.getY() - 0.2, z + 0.25);
        }
      }
    } else {
      throwRod();
      setState(null);
    }
  } else {
    MC.field_71439_g.field_71174_a.func_147297_a(
      new C09PacketHeldItemChange(getRodSlot())
    );

    RIGHTCLICK.invoke(MC);

    MC.field_71439_g.field_71174_a.func_147297_a(
      new C09PacketHeldItemChange(getDrillSlot())
    );

    MC.field_71439_g.field_71174_a.func_147297_a(
      new C09PacketHeldItemChange(getRodSlot())
    );

    RIGHTCLICK.invoke(MC);

    setState(null);
  }
}

function getBlockUnderPlayer() {
  let radius = 0;
  for (let x = -radius; x <= radius; x++) {
    for (let y = -3; y <= 0; y++) {
      for (let z = -radius; z <= radius; z++) {
        let block = World.getBlockAt(
          Player.getX() + x,
          Player.getY() + y,
          Player.getZ() + z
        );

        if (block.toString().includes("stained_glass")) {
          return block;
        }
      }
    }
  }
}

function getNearestBlockHelper() {
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
          return block;
        }
      }
    }
  }
}

export function helperArmadillo() {
  for (let i = 0; i < 8; i++) {
    if (
      ChatLib.removeFormatting(
        Player.getInventory().getStackInSlot(i)?.getName()
      ).includes("Rod")
    ) {
      rodSlot = i;
    }
  }

  for (let i = 0; i < 8; i++) {
    if (Player.getInventory().getStackInSlot(i) != null) {
      let itemPos = Player.getInventory().getStackInSlot(i).getName();
      let itemLore = Player.getInventory().getStackInSlot(i).getLore();
      for (let j = 0; j < itemLore.length; j++) {
        if (
          itemPos.toString().includes("Drill") ||
          itemPos.toString().includes("Gauntlet")
        ) {
          drillSlot = i;
        }
      }
    }
  }

  for (let i = 0; i < 8; i++) {
    if (Player.getInventory().getStackInSlot(i) != null) {
      let itemPos = Player.getInventory().getStackInSlot(i).getName();
      let itemLore = Player.getInventory().getStackInSlot(i).getLore();
      for (let j = 0; j < itemLore.length; j++) {
        if (
          itemPos.toString().includes("Drill") ||
          itemPos.toString().includes("SkyBlock Menu")
        ) {
          SBMenuSlot = i;
        }
      }
    }
  }

  playerYBeforeARmadillo = Player.getY();
  //Player.setHeldItemIndex(rodSlot);
  RIGHTCLICK.invoke(MC);
  Player.setHeldItemIndex(drillSlot);
  playerYposAfter = Player.getY() - 2;
  setState("helperSpinDrive");
  //registerChat();
}
