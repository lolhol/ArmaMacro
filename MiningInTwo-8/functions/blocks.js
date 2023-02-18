/** @format */
let xpos1 = [];
let head1 = [];
let block1 = [];
let zpos1 = [];
let routeAssistFilePath =
  "./config/ChatTriggers/modules/MiningInTwo/data/routeAssist.json";

export function addBlock() {
  let block = World.getBlockAt(Player.getX(), Player.getY() - 1, Player.getZ());
  let xpos = block.getX();
  let zpos = block.getZ();
  let ypos = block.getY();

  let xposfinal = xpos - (xpos % 1) + 0.5;
  let zposfinal = zpos - (zpos % 1) + 0.5;
  let yposhead = ypos - (ypos % 1) + 1.6;
  let yposblock = ypos - (ypos % 1) - 0.5;

  xpos1.push(xposfinal);
  head1.push(yposhead);
  block1.push(yposblock);
  zpos1.push(zposfinal);

  FileLib.write(
    routeAssistFilePath,
    JSON.stringify({ xpos1, head1, block1, zpos1 }, undefined, 2),
    true
  );
}

export function clearBlocks() {
  xpos1.splice(0);
  head1.splice(0);
  block1.splice(0);
  zpos1.splice(0);

  FileLib.write(
    routeAssistFilePath,
    JSON.stringify({ xpos1, head1, block1, zpos1 }, undefined, 2),
    true
  );
}
