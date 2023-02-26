package com.extra.ArmadilloHelper.utils;

import com.extra.data.config;
import com.extra.utils.getBlockFromAngle;
import com.extra.utils.getBlocksMain;
import com.extra.utils.getCobbleBlock;
import com.extra.utils.state.getSetStates;
import net.minecraft.client.Minecraft;
import net.minecraft.util.BlockPos;

import java.util.ArrayList;
import java.util.List;

public class mainBlockChecksHelper {
    public static Minecraft mc = Minecraft.getMinecraft();
    public static BlockPos mainBlockChecksHelper() {
        double radius = 0;
        List<BlockPos> blockReturnList = getBlocksMain.getBlocksMain();
        List<Integer> blockMax = new ArrayList<>();
        BlockPos block = null;

        if (config.topToBottom) {
            blockReturnList.sort((a, b) -> {
                return b.getY() < a.getY() ? -1 : b.getY() > a.getY() ? 1 : 0;
            });
        }


        if (blockReturnList.size() > 0) {
            boolean checks = getCobbleBlock.getCobbleBlock();

            getBlockFromAngle.getBlockFromAngle(mc.thePlayer.prevRotationYaw, 1);

            for (int i = 0; i < blockReturnList.size(); i++) {
                if (Math.abs(blockReturnList.get(i).getX() - mc.thePlayer.getPosition().getX()) < 0.0001 && Math.abs(blockReturnList.get(i).getZ() - mc.thePlayer.getPosition().getZ()) < 0.0001) {
                    if (blockReturnList.size() > 1) {
                        blockReturnList.remove(i);
                        i--;
                    } else {
                        getSetStates.setState(null);
                    }
                }
            }

            if (checks) {
                for (int k = 0; k < blockReturnList.size(); k++) {
                    if (blockReturnList.get(k).getY() + 1.3 < mc.thePlayer.posY) {
                        blockReturnList.remove(k);
                        k--;
                    }

                    if (blockReturnList.size() != 0) {
                        block = blockReturnList.get(0);
                        blockReturnList.remove(0);
                    } else {
                        getSetStates.setState(null);
                    }
                }
            } else {
                block = blockReturnList.get(0);
                blockReturnList.remove(0);
            }

            if (block != null) {
                return block;
            } else {
                return null;
            }
        } else {
            return null;
        }
    }
}
