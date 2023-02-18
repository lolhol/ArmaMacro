import { checkentity } from "../functions/checkEnti";
import Settings from "../data/config/config";
import RenderLib from "../../RenderLib/index";

let renderPoints = [];

register("renderworld", () => {
  if (!World.isLoaded) return;
  if (Settings.ShowNearPlayers) {
    let points = getRenderPoints();
    for (let player = 0; player < points.length; player++) {
      RenderLib.drawEspBox(
        points[player].x,
        points[player].y,
        points[player].z,
        0.6,
        1.8,
        1,
        0.4,
        0.4,
        1,
        true
      );
    }
  }
});

register("renderworld", () => {
  if (!World.isLoaded) return;
  renderPoints = [];
  var Players = World.getAllPlayers();
  for (let i = 0; i < Players.length; i++) {
    let currentPlayer = Players[i];
    if (
      distanceToPlayer(
        currentPlayer.getX(),
        currentPlayer.getY(),
        currentPlayer.getZ()
      ) <
        Settings.espplayerdistance + 1 &&
      distanceToPlayerFlat(
        currentPlayer.getX(),
        currentPlayer.getY(),
        currentPlayer.getZ()
      ) > 2 &&
      currentPlayer.toString().includes(Player.getName()) === false
    ) {
      if (checkentity(currentPlayer) == false) {
        addPlayerToList(
          currentPlayer.getRenderX(),
          currentPlayer.getRenderY(),
          currentPlayer.getRenderZ(),
          currentPlayer.getName()
        );
      }
    }
  }
});

function getRenderPoints() {
  return renderPoints;
}

function addPlayerToList(x, y, z, name) {
  if (
    !renderPoints.some((player) => {
      player.x === x &&
        player.y === y &&
        player.z === z &&
        player.name === name;
    })
  ) {
    renderPoints.push({ x: x, y: y, z: z, name: name });
  }
}

function distanceToPlayer(x, y, z) {
  let dX = Player.getX() - x;
  let dZ = Player.getZ() - z;
  let dY = Player.getY() - y;
  let dis = Math.sqrt(dX * dX + dZ * dZ);
  let dis2 = Math.sqrt(dis * dis + dY * dY);
  return dis2;
}

function distanceToPlayerFlat(x, z) {
  let dX = Player.getX() - x;
  let dZ = Player.getZ() - z;
  let dis = Math.sqrt(dX * dX + dZ * dZ);
  return dis;
}
