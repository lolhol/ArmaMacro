import RenderLib from "../../RenderLib/";
import { degreeToRadians } from "../functions/degreeToRadians";

let lines = [];
let x1 = null;
let y1 = null;
let z1 = null;
let angle1 = null;

export function addLine(x1, y1, z1, x2, y2, z2) {
  lines.push([x1, y1, z1, x2, y2, z2]);
}

export function renderToolBlock(x, y, z) {
  x1 = x;
  y1 = y;
  z1 = z;
}

export function renderToolAngle(angle) {
  angle1 = angle;
}

register("renderWorld", () => {
  if (!World.isLoaded) return;

  if (x1 !== null) {
    RenderLib.drawEspBox(x1 + 0.5, y1, z1 + 0.5, 1, 1, 0, 1, 0, 1, true);
  }

  if (angle1 !== null) {
    Tessellator.disableTexture2D();
    Tessellator.begin(GL11.GL_LINES, false);

    let radians = degreeToRadians(angle1);
    let dx = Math.cos(radians);
    let dz = Math.sin(radians);
    let length = 5;

    try {
      Tessellator.pos(Player.getX(), Player.getY(), Player.getZ()).pos(
        Player.getX() + dx * length,
        Player.getY(),
        Player.getZ() + dz * length
      );
    } catch (e) {
      ChatLib.chat("e");
    }

    Tessellator.draw();
    Tessellator.enableTexture2D();
  }

  for (i = 0; i < lines.length; i++) {
    Tessellator.disableTexture2D();
    Tessellator.begin(GL11.GL_LINES, false);

    let line = lines[i];
    try {
      Tessellator.pos(line[0], line[1], line[2]).pos(line[3], line[4], line[5]);
    } catch (e) {
      ChatLib.chat("e");
    }

    Tessellator.draw();
    Tessellator.enableTexture2D();
  }
});
