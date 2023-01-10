/** @format */

import { lookAtBlockTP } from "./functions/lookAtBlockTP";
import { getState, getTickSinceStateChange, setState } from "./state";

const MC = Client.getMinecraft();
const JUMP = new KeyBind(MC.field_71474_y.field_74314_A);
const RIGHTCLICK = MC.getClass().getDeclaredMethod("func_147121_ag");
const WalkForward = new KeyBind(MC.field_71474_y.field_74351_w);
const SHIFT = new KeyBind(MC.field_71474_y.field_74311_E);
RIGHTCLICK.setAccessible(true);

let blockCords;

export function teleport(map, Pos) {
	if (map.size != 0) {
		if (map.size == Pos + 1) {
			blockCords = map.get(0);
		} else {
			blockCords = map.get(Pos + 1);
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

				if (getTickSinceStateChange() <= 70) {
					setState("tickCount");
				} else {
					SHIFT.setState(false);
					setState("armadillo");
				}

				lookAtBlockTP(
					blockCords.getX() + 0.5,
					blockCords.getY(),
					blockCords.getZ() + 0.5
				);

				if (getState() == "tickCount") {
					if (getTickSinceStateChange() == 40) {
						WalkForward.setState(true);
					}

					if (getTickSinceStateChange() == 43) {
						WalkForward.setState(false);
					}

					if (getTickSinceStateChange() == 60) {
						RIGHTCLICK.invoke(MC);
					}
				}
			}
		}
	}
}
