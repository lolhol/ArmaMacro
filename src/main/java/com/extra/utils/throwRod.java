package com.extra.utils;

import com.extra.utils.previous.random.checkIfItemInInv;
import net.minecraft.client.Minecraft;
import net.minecraft.init.Items;
import net.minecraft.item.Item;

public class throwRod {
    public static Minecraft mc = Minecraft.getMinecraft();
    public static void throwRod() {
        Item rod = Items.fishing_rod;
        //swapToSlot.swapToSlot(rod);

        if (checkIfItemInInv.checkIfItemInInv(rod)) {
            Item currentItem = mc.thePlayer.getCurrentEquippedItem().getItem();
        }
    }
}
