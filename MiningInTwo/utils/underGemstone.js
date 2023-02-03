xpos1 = [];
ypos1 = [];
zpos1 = [];

let routeNukerLineFilePath =
  "./config/ChatTriggers/modules/MiningInTwo/data/cobbleCoords.json";

export function writeCobbleCoords() {
  let block = getCobbleBlockCoords();

  if (block) {
    xpos1.push(block.getX() + 0.5);
    ypos1.push(block.getY());
    zpos1.push(block.getZ() + 0.5);

    FileLib.write(
      routeNukerLineFilePath,
      JSON.stringify({ xpos1, ypos1, zpos1 }, undefined, 2),
      true
    );

    return true;
  } else {
    return false;
  }
}

export function getCobbleBlockCoords() {
  let radius = 0;
  for (let x = -radius; x <= radius; x++) {
    for (let y = -7; y <= 0; y++) {
      for (let z = -radius; z <= radius; z++) {
        let block = World.getBlockAt(
          Player.getX() + x,
          Player.getY() + y,
          Player.getZ() + z
        );

        if (block.toString().includes("cobblestone")) {
          return block;
        }
      }
    }
  }
}

export function clearCobbleBlockCoords() {
  xpos1 = [];
  ypos1 = [];
  zpos1 = [];

  FileLib.write(
    routeNukerLineFilePath,
    JSON.stringify({ xpos1, ypos1, zpos1 }, undefined, 2),
    true
  );
}
