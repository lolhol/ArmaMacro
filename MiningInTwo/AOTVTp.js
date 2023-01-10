/** @format */

import { lookAtSlowly } from "./functions/lookAtSlowly";
import { addTick } from "./index";
import { setState } from "./index";

const MC = Client.getMinecraft();
const JUMP = new KeyBind(MC.field_71474_y.field_74314_A);
const RIGHTCLICK = MC.getClass().getDeclaredMethod("func_147121_ag");
const SHIFT = new KeyBind(MC.field_71474_y.func_146272_n);
RIGHTCLICK.setAccessible(true);

let blockCords;

export function teleportToBlock(Map, Pos) {
	if (Map != "undefined") {
		if (Map.get(Pos + 1) == "undefined") {
			blockCords = Map.get(0);
		} else {
			blockCords = Map.get(Pos + 1);
		}

		for (let i = 0; i < 8; i++) {
			if (
				ChatLib.removeFormatting(
					Player.getInventory().getStackInSlot(i)?.getName()
				).includes("Aspect of the Void")
			) {
				let AOTV = i;
				Player.setHeldItemIndex(AOTV);
				SHIFT.setState(true);
				lookAtSlowly(blockCords.getX(), blockCords.getY(), blockCords.getZ());

				if (addTick() == 3) {
					RIGHTCLICK.invoke(MC);
				} else {
					ChatLib.chat(addTick());
				}

				if (addTick() == 6) {
					let a = "abc";
					SHIFT.setState(false);
					setState("armadillo");
				}
			}
		}
	}
	return a;
}
