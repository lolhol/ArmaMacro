/** @format */

export function getNearestBlock() {
  let radius = 1;
  for (let x = -radius; x <= radius; x++) {
    for (let y = -4; y <= 0; y++) {
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
