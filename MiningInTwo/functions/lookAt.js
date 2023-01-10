export function lookAt(rotationYaw, rotationPitch) {
    if (rotationYaw === undefined || rotationPitch === undefined) {
      ChatLib.chat(prefix + "Put in cords");
    } else {
      Player.getPlayer().field_70177_z = rotationYaw;
      Player.getPlayer().field_70125_A = rotationPitch;
    }
  }