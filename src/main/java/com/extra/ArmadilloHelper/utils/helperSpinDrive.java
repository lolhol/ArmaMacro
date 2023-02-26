package com.extra.ArmadilloHelper.utils;

import com.extra.utils.degreeToRad;
import com.extra.utils.getAnglePlayerToBlock;
import com.extra.utils.lookAtSlowly;
import net.minecraft.client.Minecraft;
import net.minecraft.client.settings.KeyBinding;
import net.minecraft.util.BlockPos;

public class helperSpinDrive {
    public static Minecraft mc = Minecraft.getMinecraft();
    private final KeyBinding jump = Minecraft.getMinecraft().gameSettings.keyBindJump;
    private float angle = 0;
    public helperSpinDrive() {
        boolean lookUnder = true;
        double random = Math.random();

        angle += 7 * random + 25;

        if (angle > 360) {
            angle = 0;
        }

        BlockPos block = mainBlockChecksHelper.mainBlockChecksHelper();

        if (block != null) {
            int y = block.getY();
            double anglePlayerToBlock = getAnglePlayerToBlock.getAnglePlayerToBlock(block);

            float angleTudaSuda = angle;

            if (anglePlayerToBlock != 0.124465) {
                if (angleTudaSuda > 210) {
                    angleTudaSuda = 360 - angleTudaSuda;
                }
                angleTudaSuda += anglePlayerToBlock - 90;
            } else {
                lookUnder = false;
                y -= 13;
            }

            double radians = degreeToRad.degreeToRad(angleTudaSuda);
            double dx = Math.sin(radians * 5);
            double dz = Math.cos(radians * 5);

            double x = block.getX() + dx + 0.5;
            double z = block.getZ() + dz + 0.5;

            if (lookUnder) {
                if (block.getY() > mc.thePlayer.posY) {
                    new Thread(() -> {
                            KeyBinding.setKeyBindState(jump.getKeyCode(), true);
                            lookAtSlowly.lookAtSlowly(x + 0.25, block.getY(), z + 0.25);
                            Thread.sleep(10);
                            KeyBinding.setKeyBindState(jump.getKeyCode(), false);
                    }).start();
                } else {
                    lookAtSlowly.lookAtSlowly(x + 0.25, block.getY() - 13, z + 0.25);
                }
            } else {
                lookAtSlowly.lookAtSlowly(x + 0.25, y, z + 0.25);
            }
        } else {

        }

    }
}
