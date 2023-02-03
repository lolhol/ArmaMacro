/** @format */
/// <reference types="../CTAutocomplete" />
/// <reference lib="es2015" />

/*"Mining in two, a hypixel macro true,
A tool so great, it's simply too cool.
With speed and precision, you'll never lose,
Your blocks mined fast, it's a game changing move.

No longer do you need to break one at a time,
This macro does it all, it's truly divine.
Efficiency at its finest, no more delay,
Just watch as your resources grow day by day.

The accuracy is unmatched, the speed unrivaled,
Your friends will be amazed, their minds unraveled.
You'll have more time for fun, more time to play,
Thanks to the hypixel skyblock mining macro, Mining in two, they say.

So get it today and see the results,
Your mining skills will improve, without any convulsions.
Effortless mining, it's just what you need,
With Mining in two, you'll succeed."

- []me24345#7751
*/

import RenderLib from "../RenderLib/index";
import { radiansToDegree } from "./functions/radiansToDegree";
import { lookAtSlowly } from "./functions/lookAtSlowly";
import { lookAt } from "./functions/lookAt";
import { degreeToRadians } from "./functions/degreeToRadians";
import { mainBlockChecks } from "./functions/getNearestBlock";
import "./utils/ESP";
import "./other/routeHelper";
import { routeHelper } from "./other/routeHelper";
import "./other/structureFinder";
import {
  getESPColor,
  getESPColorRed,
  getESPColorGreen,
} from "./functions/getESPColor";
import {
  getKeyBindFromKey,
  getKeyBindFromKeyHelper,
} from "./functions/getKeyBindFromKey";
import { checkBlock } from "./utils/checkLocation";
import {
  addBlockRoute,
  clearBlockCoords,
  getBlockCoords,
  getBlockCoordsAtPlayer,
} from "./utils/blockCoords";
import {
  clearCobbleBlockCoords,
  writeCobbleCoords,
} from "./utils/underGemstone";
import "./utils/playerFailsafe";
import { teleport, ifOnNextBlock, Shift } from "./teleportToNextBlock";
import { getState, setState, getTickSinceStateChange } from "./functions/state";
//import { routeAssist } from "./functions/routeAssist";
import { getBlockUnder } from "./functions/getNearestBlock";

import Settings from "./data/config/config";

//HelperMode
import { helperArmadillo, helperSpinDrive } from "./other/helperMode";
import { addBlock, clearBlocks } from "./functions/blocks";
import { getDrillSlot, getRodSlot } from "./functions/getInvItems";
import { throwRod } from "./functions/throwRod";

export const C09PacketHeldItemChange = Java.type(
  "net.minecraft.network.play.client.C09PacketHeldItemChange"
);

const MC = Client.getMinecraft();
const JUMP = new KeyBind(MC.field_71474_y.field_74314_A);
const RIGHTCLICK = MC.getClass().getDeclaredMethod("func_147121_ag");

let angle = 0;
let render = false;
let renderPathOne;
let firstRun = false;
let playerYposAfter = null;
let routeNukerLineFilePath =
  "./config/ChatTriggers/modules/MiningInTwo/data/cobbleCoords.json";

let routeAssistFilePath =
  "./config/ChatTriggers/modules/MiningInTwo/data/routeAssist.json";

let playerPosition;

let routeHelperBind = new KeyBind(
  "Turn on Route Helper",
  Keyboard.KEY_NONE,
  "MiningInTwo"
);

RIGHTCLICK.setAccessible(true);

export function checkentity(entityname) {
  entityping = World.getPlayerByName(entityname.name).getPing();
  if (entityping == 1.0) {
    return false;
  } else {
    return true;
  }
}

function onStateSpinDrive() {
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
      setState("Teleporting");
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

    setState("armadillo");
  }
}

function onStateArmadillo() {
  if (getState() == "armadillo") {
    playerYposAfter = Player.getY() - 2;

    RIGHTCLICK.invoke(MC);

    MC.field_71439_g.field_71174_a.func_147297_a(
      new C09PacketHeldItemChange(getDrillSlot())
    );

    setState("spinDrive");
  }
}

register("chat", (event) => {
  if (getState() != "helperSpinDrive") {
    ChatLib.chat("&l---------------------------------------");
    ChatLib.chat(
      "&l[&4&lMi&e&lni&2&lng &d&lIn &5&lTw&b&lo&f&l]" +
        " &lYour Armadillo ran out of energy!"
    );
    ChatLib.chat("&l---------------------------------------");

    setState("noEnergy");
  } else {
    setState(null);
    ChatLib.chat("&l---------------------------------------");
    ChatLib.chat(
      "&l[&4&lMi&e&lni&2&lng &d&lIn &5&lTw&b&lo&f&l]" +
        " &lHelper mode is enabled and armadillo ran out of energy!"
    );
    ChatLib.chat("&l---------------------------------------");
  }
}).setCriteria(/Your Armadillo ran out of energy!/);
/*\[Lvl \d+\] \w+! VIEW RULE*/

register("chat", (event) => {
  if (getState() == "noEnergy") {
    ChatLib.chat("&l---------------------------------------");
    ChatLib.chat(
      "&l[&4&lMi&e&lni&2&lng &d&lIn &5&lTw&b&lo&f&l]" +
        " &lYour Armadillo is full of energy!"
    );
    ChatLib.chat("&l---------------------------------------");

    setState("armadillo");
  } else {
    //notin
  }
}).setCriteria(/Your Armadillo is full of energy!/);

let jKeyBind = new KeyBind(
  "Start Automatic Maco",
  Keyboard.KEY_NONE,
  "MiningInTwo"
);

register("command", (...args) => {
  if (writeCobbleCoords() != false) {
    addBlockRoute();
    addBlock();

    ChatLib.chat("&l---------------------------------------");
    ChatLib.chat(
      "&l[&4&lMi&e&lni&2&lng &d&lIn &5&lTw&b&lo&f&l]" + " &lBlock Set!"
    );
    ChatLib.chat("&l---------------------------------------");
  } else {
    ChatLib.chat("&l---------------------------------------");
    ChatLib.chat(
      "&l[&4&lMi&e&lni&2&lng &d&lIn &5&lTw&b&lo&f&l]" +
        " &lCould not find cobble block under vein! Place it and run /block again!"
    );
    ChatLib.chat("&l---------------------------------------");
  }
}).setName("block");

register("command", (...args) => {
  ChatLib.chat("&l---------------------------------------");
  ChatLib.chat(
    "&l[&4&lMi&e&lni&2&lng &d&lIn &5&lTw&b&lo&f&l]" + " &lRoute Cleared!"
  );
  ChatLib.chat("&l---------------------------------------");

  clearBlockCoords();
  clearBlocks();
  clearCobbleBlockCoords();
}).setName("clear");

register("command", (...args) => {
  if (args[0] == "on") {
    render = true;
    ChatLib.chat("&l---------------------------------------");
    ChatLib.chat(
      "&l[&4&lMi&e&lni&2&lng &d&lIn &5&lTw&b&lo&f&l]" +
        " &lDisplaying blocks on route...!"
    );
    ChatLib.chat("&l---------------------------------------");
  } else if (args[0] == "off") {
    render = false;
    ChatLib.chat("&l---------------------------------------");
    ChatLib.chat(
      "&l[&4&lMi&e&lni&2&lng &d&lIn &5&lTw&b&lo&f&l]" +
        " &lStopped displaying...!"
    );
    ChatLib.chat("&l---------------------------------------");
  } else {
    ChatLib.chat("&l---------------------------------------------");
    ChatLib.chat(
      "&l[&4&lMi&e&lni&2&lng &d&lIn &5&lTw&b&lo&f&l]" +
        " &lNot that is not correct! use on/off"
    );
    ChatLib.chat("&l---------------------------------------------");
  }
}).setName("render");

register("command", (...args) => {
  Settings.openGUI();
}).setName("mit");

register("command", (...args) => {
  Settings.openGUI();
}).setName("MiningInTwo");

register("command", (...args) => {
  Settings.openGUI();
}).setName("miningintwo");

register("Tick", () => {
  if (getState() == "helperSpinDrive") {
    helperSpinDrive();
  }

  if (getState == "noEnergy") {
    new Thread(() => {
      Thread.sleep(500);
      Player.setHeldItemIndex(getRodSlot());
      RIGHTCLICK.invoke(MC);
      Player.setHeldItemIndex(getDrillSlot());
      Thread.sleep(500);
      Player.setHeldItemIndex(getRodSlot());
      RIGHTCLICK.invoke(MC);
      Player.setHeldItemIndex(getDrillSlot());
    });
  }

  if (Settings.menuKeybind == true) {
    let menuKeybind = new KeyBind(
      "Open MiningInTwo Menu",
      Keyboard.KEY_NONE,
      "MiningInTwo"
    );

    if (menuKeybind.isPressed() == true) {
      Settings.openGUI();
    }
  }

  if (Settings.helperMode == true) {
    let helperKeybind = new KeyBind(
      "Helper Mode Trigger",
      Keyboard.KEY_NONE,
      "MiningInTwo"
    );

    if (helperKeybind.isPressed() == true) {
      if (getState()) {
        setState(null);
      } else {
        helperArmadillo();
      }
    }
  }

  if (Settings.setBlockCoordsKeybind == true) {
    let AddBlockKeyBind = new KeyBind(
      "Add Block To Route",
      Keyboard.KEY_NONE,
      "MiningInTwo"
    );

    if (AddBlockKeyBind.isPressed() == true) {
      addBlockRoute();
      addBlock();

      ChatLib.chat("&l---------------------------------------");
      ChatLib.chat(
        "&l[&4&lMi&e&lni&2&lng &d&lIn &5&lTw&b&lo&f&l]" + " &lBlock Set!"
      );
      ChatLib.chat("&l---------------------------------------");
    }
  }

  if (routeHelperBind.isPressed() == true) {
    routeHelper();
  }

  if (jKeyBind.isPressed()) {
    if (getState()) {
      setState(null);
    } else {
      if (Settings.macroSpot == 0) {
        playerPosition = Player.getY();
        try {
          setHeldItemIndex(getDrillSlot);
        } catch (e) {
          ChatLib.chat("Could not find ur drill in the hotbar!");
        }

        if (checkBlock("getBlock") == "startMacro") {
          ChatLib.chat("&l---------------------------------------------");
          ChatLib.chat(
            "&l[&4&lMi&e&lni&2&lng &d&lIn &5&lTw&b&lo&f&l]" +
              " &lStarting macro!"
          );
          ChatLib.chat("&l---------------------------------------------");
          setState("armadillo");
        } else {
          ChatLib.chat("&l---------------------------------------------");
          ChatLib.chat(
            "&l[&4&lMi&e&lni&2&lng &d&lIn &5&lTw&b&lo&f&l]" +
              " &lYou are not on the right block!"
          );
          ChatLib.chat("&l---------------------------------------------");
        }
      } else {
        renderPathOne = true;
      }
    }
  }

  if (getState() == "spinDrive") {
    onStateSpinDrive();
  }

  if (getState() == "armadillo") {
    onStateArmadillo();
  }

  if (getState() == "Teleporting") {
    teleport();
  }
});

if (getState == "ifOnNextBlock") {
  ifOnNextBlock();
  if (ifOnNextBlock() == true) {
    setState("armadillo");
  } else {
    ifOnNextBlock();
  }
}

register("renderWorld", () => {
  if (render == true || Settings.render == true) {
    let xpos1 = [];
    let block1 = [];
    let zpos1 = [];

    let routeAssistFilePath =
      "./config/ChatTriggers/modules/MiningInTwo/data/routeAssist.json";

    xpos1 = JSON.parse(FileLib.read(routeAssistFilePath)).xpos1;
    head1 = JSON.parse(FileLib.read(routeAssistFilePath)).xpos1;
    block1 = JSON.parse(FileLib.read(routeAssistFilePath)).block1;
    zpos1 = JSON.parse(FileLib.read(routeAssistFilePath)).zpos1;

    if (xpos1 != undefined) {
      if (!World.isLoaded) return;

      if (Settings.pathBreakHelper == true) {
        xPosCobble = JSON.parse(FileLib.read(routeNukerLineFilePath)).xpos1;
        yPosCobble = JSON.parse(FileLib.read(routeNukerLineFilePath)).ypos1;
        zPosCobble = JSON.parse(FileLib.read(routeNukerLineFilePath)).zpos1;

        Tessellator.disableTexture2D();
        Tessellator.begin(GL11.GL_LINES, false);

        for (let i = 0; i < xpos1.length; i++) {
          let j = i + 1;
          try {
            if (i + 1 == xpos1.length) {
              j = 0;
            }

            Tessellator.pos(
              xPosCobble[j] + 0.5,
              yPosCobble[j] + 3.7,
              zPosCobble[j] + 0.5
            ).pos(xpos1[i], block1[i], zpos1[i]);
          } catch (e) {
            ChatLib.chat("E");
          }
        }

        Tessellator.draw();
        Tessellator.enableTexture2D();
      }

      for (let i = 0; i < xpos1.length; i++) {
        try {
          Tessellator.drawString(i + 1, xpos1[i], block1[i] + 1, zpos1[i]);

          RenderLib.drawEspBox(
            xpos1[i],
            block1[i] + 0.5,
            zpos1[i],
            1,
            1,
            getESPColorRed(),
            getESPColorGreen(),
            getESPColor(),
            1,
            true
          );
        } catch (e) {
          ChatLib.chat("b");
        }
      }
    } else {
      ChatLib.chat("Add blocks to the Route before running this command!");
      ChatLib.chat(
        "Use /clear to clear previous route, and use /block to add a block to the new Route"
      );
      ChatLib.chat(" ");

      render = false;
    }
  }
});
