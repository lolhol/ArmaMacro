/** @format */

import { blockList } from "./setBlockCords";

let state = null;

export function checkBlock(posState) {
	let i;

	if (posState == "getBlock") {
		if (blockList("Tp") != "undefined") {
			for (i = 0; i <= blockList("Tp").size; i++) {
				if (
					Math.abs(blockList("Tp").get(i).getY()) - Player.getY() - 1 <
					0.0001
				) {
					state = "startMacro";
					return state;
				} else {
					if (state == null) {
						state = null;
						return state;
					} else {
					}
				}
			}
		} else {
			ChatLib.chat("null");
			state = null;
			return state;
		}
	}
}
