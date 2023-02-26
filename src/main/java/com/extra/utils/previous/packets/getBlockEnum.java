package com.extra.utils.previous.packets;

import com.extra.utils.random.ids;
import net.minecraft.util.BlockPos;
import net.minecraft.util.EnumFacing;
import net.minecraft.util.MovingObjectPosition;
import net.minecraft.util.Vec3;

public class getBlockEnum {
    public static EnumFacing getEnum(BlockPos block) {
        MovingObjectPosition fake = ids.mc.objectMouseOver;
        fake.hitVec = new Vec3(block);
        EnumFacing enumFacing = fake.sideHit;

        return enumFacing;
    }
}
