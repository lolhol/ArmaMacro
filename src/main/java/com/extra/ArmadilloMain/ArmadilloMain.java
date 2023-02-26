package com.extra.ArmadilloMain;

import com.extra.utils.state.getSetStates;
import net.minecraftforge.fml.common.eventhandler.SubscribeEvent;
import net.minecraftforge.fml.common.gameevent.TickEvent;

import java.util.Objects;

public class ArmadilloMain {
    @SubscribeEvent
    public void onTick(TickEvent.PlayerTickEvent event) {
        if (Objects.equals(getSetStates.state, "helperSpinDrive")) {

        }
    }
}
