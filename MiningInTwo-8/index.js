/** @format */
/// <reference types="../CTAutocomplete" />
/// <reference lib="es2015" />

import RenderLib from "../RenderLib/index";
import { renderToolBlock } from "./debug_testing_dont_mind/debug";
import { radiansToDegree } from "./functions/radiansToDegree";
import { lookAtSlowly } from "./functions/lookAtSlowly";
import { lookAt } from "./functions/lookAt";
import { degreeToRadians } from "./functions/degreeToRadians";
import { mainBlockChecks } from "./functions/getNearestBlocks";
import { getAnglePlayerToBlock } from "./functions/getAnglePlayerToBlock";
import "./utils/ESP";
import "./other/routeHelper";
import { routeHelper } from "./other/routeHelper";
import "./other/structureFinder";
import "./debug_testing_dont_mind/debug";
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
import { getBlockUnder } from "./functions/getNearestBlocks";

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
	let lookUnder = true;
	let random = Math.random();
	angle += 7 * random + 25;
	if (angle > 360) {
		angle = 0;
	}

	let block = mainBlockChecks();

	if (block) {
		let y = block.getY() - 0.5;

		let anglePlayerToBlock = getAnglePlayerToBlock(block);

		renderToolBlock(block.getX(), block.getY(), block.getZ());

		let angleTudaSuda = angle;

		if (anglePlayerToBlock !== null) {
			if (angleTudaSuda > 210) {
				angleTudaSuda = 360 - angleTudaSuda;
			}
			angleTudaSuda += anglePlayerToBlock - 90;
		} else {
			lookUnder = false;
			y -= 13;
		}

		//renderToolAngle(angleTudaSuda);

		let radians = degreeToRadians(angleTudaSuda);
		let dx = Math.cos(radians) * 5;
		let dz = Math.sin(radians) * 5;

		let x = block.getX() + dx + 0.5;
		let z = block.getZ() + dz + 0.5;

		//ChatLib.chat(Player.getPlayer().field_70126_B);

		if (lookUnder) {
			if (block.getY() > Player.getY()) {
				new Thread(() => {
					JUMP.setState(true);
					lookAtSlowly(x + 0.25, block.getY(), z + 0.25);
					Thread.sleep(10);
					JUMP.setState(false);
				}).start();
			} else {
				ChatLib.chat(block.getY());
				lookAtSlowly(x + 0.25, block.getY() - 13, z + 0.25);
			}
		} else {
			lookAtSlowly(x + 0.25, y, z + 0.25);
		}
	} else {
		setState("Teleporting");
	}
}

export function getBlockFromAngle(angle, dist) {
	//let angleFinder = Player.getPlayer().field_70126_B;
	let random = Math.random();
	let playerX = Player.getX();
	let playerZ = Player.getZ();

	//angleFinder += 25;

	angleFinder = angle;
	//if (angleFinder == 360) {
	//angleFinder = 0;
	//}

	let dz = dist * Math.sin(degreeToRadians(angleFinder));
	let dx = dist * Math.cos(degreeToRadians(angleFinder));

	//renderToolBlock(playerX + dx, Player.getY() - 2.1125, playerZ + dz);

	if (
		World.getBlockAt(playerX + dx, Player.getY() - 2.1125, playerZ + dz)
			.toString()
			.includes("stained_glass")
	) {
		//ChatLib.chat(angleFinder);
		return World.getBlockAt(playerX + dx, Player.getY() - 2.1125, playerZ + dz);
	}
}

function onStateArmadillo() {
	setState(null);
	new Thread(() => {
		throwRod();
		Player.setHeldItemIndex(getDrillSlot());
		Thread.sleep(200);
		ChatLib.chat("!");
		RIGHTCLICK.invoke(MC);
		setState("spinDrive");
	}).start();
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
	setState(null);
	throwRod();
	helperArmadillo();
}).setName("testH");

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
				throwRod();
				setState(null);
			} else {
				throwRod();
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
				Player.setHeldItemIndex(getDrillSlot());

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
