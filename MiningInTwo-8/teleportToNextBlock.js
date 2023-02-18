/** @format */

import { lookAtBlockTP } from "./functions/lookAtBlockTP";
import { getState, getTickSinceStateChange, setState } from "./functions/state";
import { getBlockCoordsAtPlayer, getBlockCoords } from "./utils/blockCoords";
import Settings from "./data/config/config";
import { getAOTVSlot, getRodSlot, getDrillSlot } from "./functions/getInvItems";
import { throwRod } from "./functions/throwRod";
export const mc = Client.getMinecraft();
export const EnumFacing = Java.type("net.minecraft.util.EnumFacing");
export const RightClick = new KeyBind(mc.field_71474_y.field_74313_G);
export const C08PacketPlayerBlockPlacement = Java.type(
	"net.minecraft.network.play.client.C08PacketPlayerBlockPlacement"
);
export const C0APacketAnimation = Java.type(
	"net.minecraft.network.play.client.C0APacketAnimation"
);
export const C09PacketHeldItemChange = Java.type(
	"net.minecraft.network.play.client.C09PacketHeldItemChange"
);
export const BP = Java.type("net.minecraft.util.BlockPos");
export const Jump = new KeyBind(mc.field_71474_y.field_74314_A);
export const Shift = new KeyBind(mc.field_71474_y.field_74311_E);
export const RightClickSingle = mc
	.getClass()
	.getDeclaredMethod("func_147121_ag");
RightClickSingle.setAccessible(true);

const MC = Client.getMinecraft();
const JUMP = new KeyBind(MC.field_71474_y.field_74314_A);
const RIGHTCLICK = MC.getClass().getDeclaredMethod("func_147121_ag");
const WalkForward = new KeyBind(MC.field_71474_y.field_74351_w);
const SHIFT = new KeyBind(MC.field_71474_y.field_74311_E);
RIGHTCLICK.setAccessible(true);

let blockCords;
let runCounter = 0;
let numberOfRuns = 2;
let lookSPEED = 1;

getSpeed();

export function teleport() {
	let blockCoords = getBlockCoords();
	let pos = getBlockCoordsAtPlayer();

	if (getState()) {
		if (blockCoords.length != 0) {
			if (blockCoords.length == pos + 1) {
				blockCords = blockCoords[0];
			} else if (blockCoords.length > pos + 1) {
				blockCords = blockCoords[pos + 1];
			}

			setState(null);

			throwRod();
			SHIFT.setState(true);

			new Thread(() => {
				Thread.sleep(Settings.SPEED);
				lookAtNextBlockSlow();
			}).start();
		}
	}
}

function lookAtNextBlockSlow() {
	if (numberOfRuns >= runCounter) {
		new Thread(() => {
			Thread.sleep(150);
			getSpeed();
			try {
				lookAtBlockTP(blockCords.x, blockCords.y, blockCords.z, lookSPEED);
				lookAtNextBlockSlow();
			} catch (e) {
				ChatLib.chat("&l---------------------------------------------");
				ChatLib.chat(
					"&l[&4&lMi&e&lni&2&lng &d&lIn &5&lTw&b&lo&f&l]" +
						" &lCannot teleport -> standing on wrong block?"
				);
				ChatLib.chat("&l---------------------------------------------");
				SHIFT.setState(false);
			}
		}).start();
	}

	if (numberOfRuns < runCounter) {
		runCounter = 0;
		nextBlock();
	}

	runCounter++;
}

export function nextBlock() {
	//   new Thread(() => {
	//     runCounter = 0;
	//     Thread.sleep(Settings.AOTVdelay);
	//   }).start();

	let currentSlot = Player.getHeldItemIndex();
	mc.field_71439_g.field_71174_a.func_147297_a(
		new C09PacketHeldItemChange(getAOTVSlot())
	);

	mc.field_71439_g.field_71174_a.func_147297_a(
		new C08PacketPlayerBlockPlacement(
			new BP(-1, -1, -1),
			255,
			Player.getInventory().getStackInSlot(getAOTVSlot()).getItemStack(),
			0,
			0,
			0
		)
	);

	MC.field_71439_g.field_71174_a.func_147297_a(
		new C09PacketHeldItemChange(getRodSlot())
	);

	MC.field_71439_g.field_71174_a.func_147297_a(
		new C08PacketPlayerBlockPlacement(
			new BP(-1, -1, -1),
			255,
			Player.getInventory().getStackInSlot(getRodSlot()).getItemStack(),
			0,
			0,
			0
		)
	);

	mc.field_71439_g.field_71174_a.func_147297_a(
		new C09PacketHeldItemChange(currentSlot)
	);

	Shift.setState(false);
	ifOnNextBlock();
}

function getSpeed() {
	if (Settings.SPEED == 1) {
		numberOfRuns = 20;
		lookSPEED = 0.2;
	} else if (Settings.SPEED == 2) {
		numberOfRuns = 10;
		lookSPEED = 0.4;
	} else if (Settings.SPEED == 3) {
		numberOfRuns = 10;
		lookSPEED = 0.6;
	} else if (Settings.SPEED == 4) {
		numberOfRuns = 10;
		lookSPEED = 0.8;
	} else if (Settings.SPEED == 5) {
		numberOfRuns = 10;
		lookSPEED = 1;
	}
}

export function ifOnNextBlock() {
	new Thread(() => {
		Thread.sleep(Settings.AOTVdelay);
		if (
			Math.abs(Player.getX() - blockCords.x) <= 0.000001 &&
			Math.abs(Player.getZ() - blockCords.z) <= 0.000001
		) {
			setState("armadillo");
		} else {
			ChatLib.chat("cannot TP");
		}
	}).start();
}
