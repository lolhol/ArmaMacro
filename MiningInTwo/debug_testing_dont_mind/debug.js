let lines = [];

register("renderWorld", () => {
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

export function addLine(x1, y1, z1, x2, y2, z2) {
  lines.push([x1, y1, z1, x2, y2, z2]);
}
