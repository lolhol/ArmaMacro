package com.extra.utils;

import net.minecraft.block.state.IBlockState;
import net.minecraft.client.Minecraft;
import net.minecraft.init.Blocks;
import net.minecraft.util.BlockPos;

import java.util.ArrayList;
import java.util.List;

public class getBlocksMain {
    public static Minecraft mc = Minecraft.getMinecraft();

    private List<BlockPos> getChestsInRange() {
        List<BlockPos> chests = new ArrayList<>();
        int radius = 1;
        int x = (int) mc.thePlayer.posX;
        int y = (int) mc.thePlayer.posY;
        int z = (int) mc.thePlayer.posZ;
        for (int i = x - radius; i <= x + radius; i++) {
            for (int j = y - radius; j <= y + radius; j++) {
                for (int k = z - radius; k <= z + radius; k++) {
                    BlockPos pos = new BlockPos(i, j, k);
                    IBlockState block = mc.theWorld.getBlockState(pos);
                    if (block.getBlock() == Blocks.stained_glass |) {
                        chests.add((TileEntityChest) tileEntity);
                    }
                }
            }
        }
        return chests;
    }
}
