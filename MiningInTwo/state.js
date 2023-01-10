/** @format */

let state = null;
let tickSinceStateChange = 0;

export function setState(newState) {
	state = newState;
	if (
		newState != "tickCount" &&
		newState != "armadilloTicks" &&
		newState != "armadilloClickTicks"
	) {
		tickSinceStateChange = 0;
	}

	return state;
}

export function getState() {
	return state;
}

export function getTickSinceStateChange() {
	return tickSinceStateChange;
}

register("Tick", () => {
	tickSinceStateChange++;
});
