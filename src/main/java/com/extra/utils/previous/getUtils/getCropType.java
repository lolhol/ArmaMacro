package com.extra.utils.previous.getUtils;

import com.extra.data.MITconfig;
import net.minecraft.block.Block;
import net.minecraft.init.Blocks;

public class getCropType {
    public static Block getCropType() {
        int cropType = MITconfig.cropNukerType;
        Block crop = Blocks.wheat;
        if (cropType == 1) {
            crop = Blocks.carrots;
        } else if (cropType == 2) {
            crop = Blocks.potatoes;
        } else if (cropType == 3) {
            crop = Blocks.nether_wart;
        } else if (cropType == 4) {
            crop = Blocks.pumpkin;
        } else if (cropType == 5) {
            crop = Blocks.melon_block;
        } else if (cropType == 6) {
            crop = Blocks.cocoa;
        }

        return crop;
    }
}
