package com.extra.utils.previous.chatUtils;

import net.minecraft.client.Minecraft;
import net.minecraft.util.ChatComponentText;
import net.minecraft.util.IChatComponent;

import com.extra.utils.random.prefix;

public class sendCommandInChat {
    private static final Minecraft mc = Minecraft.getMinecraft();

    public static void chat(String msg) {
        mc.thePlayer.addChatMessage((IChatComponent)new ChatComponentText(prefix.prefix + msg));
    }
}
