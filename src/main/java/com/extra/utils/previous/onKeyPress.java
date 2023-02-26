package com.extra.utils.previous;

import com.extra.MITExtras;
import com.extra.commands.farming.cropNukerCommand;
import com.extra.commands.mining.coalNukerCommand;
import com.extra.data.MITconfig;
import com.extra.utils.previous.chatUtils.SendChat;
import com.extra.utils.previous.getUtils.checkIfItemInInv;
import com.extra.utils.previous.getUtils.getBPS;
import com.extra.utils.previous.getUtils.getCropType;
import net.minecraft.init.Blocks;
import net.minecraft.init.Items;
import net.minecraftforge.fml.common.eventhandler.SubscribeEvent;
import net.minecraftforge.fml.common.gameevent.InputEvent;

import static com.extra.MITExtras.NukerEnabled;
import static com.extra.MITExtras.cropNuker;

public class onKeyPress {
    @SubscribeEvent
    public void keyPress(InputEvent.KeyInputEvent event) {
        if (MITExtras.keybinds.get(0).isPressed()) {
            String str = null;
            boolean vroomVroom = coalNukerCommand.coalVroomVroom;
            boolean vroomVroomCheck = MITconfig.coalVroomVroomMode;
            boolean normal = coalNukerCommand.coalNukerIsOn;

            if (!vroomVroomCheck) {

                coalNukerCommand.coalNukerIsOn = !coalNukerCommand.coalNukerIsOn;
                str = normal ? "Coal Nuker Disabled!" : "Coal Nuker Enabled!";

            } else {
                coalNukerCommand.coalVroomVroom = !coalNukerCommand.coalVroomVroom;
                str = vroomVroom ? "Coal Vroom Vroom Nuker Disabled!" : "Coal Vroom Vroom Nuker Enabled!";
            }

            SendChat.chat("§l§4[MINING IN TWO]§r " + str);
        }

        if (MITExtras.keybinds.get(1).isPressed()) {
            boolean sendStopChat = true;

            NukerEnabled = !NukerEnabled;

            if (NukerEnabled) {
                boolean goldAxeInInv = checkIfItemInInv.checkIfItemInInv(Items.golden_axe);
                boolean diamondHoeInInv = checkIfItemInInv.checkIfItemInInv(Items.iron_hoe);
                boolean woodHoeInInv = checkIfItemInInv.checkIfItemInInv(Items.wooden_hoe);

                if (goldAxeInInv && (diamondHoeInInv || woodHoeInInv)) {
                    SendChat.chat("§l§4[MINING IN TWO]§r Found all items in inventory! Nuker is enabled!");
                    NukerEnabled = true;
                } else {
                    sendStopChat = false;
                    SendChat.chat("§l§4[MINING IN TWO]§r Some items are not in ur inventory! You need -> 1) golden axe, 2) diamond or wooden hoe! (run /continueNuker to start anyway)");
                    NukerEnabled = false;
                }
            }

            if (!NukerEnabled && sendStopChat) {
                SendChat.chat("§l§4[MINING IN TWO]§r Stopping nuker!");
            }
        }

        if (MITExtras.keybinds.get(2).isPressed()) {
            cropNukerCommand.cropType = Blocks.wheat;

            cropNuker = !cropNuker;

            cropNukerCommand.cropType = getCropType.getCropType();
            cropNukerCommand.BPS = getBPS.getBPS();

            String str = cropNuker ? "Crop Nuker Enabled!" : "Crop Nuker Disabled!";
            SendChat.chat("§l§4[MINING IN TWO]§r " + str);
        }
    }
}
