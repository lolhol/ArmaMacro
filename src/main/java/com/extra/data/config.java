package com.extra.data;

import gg.essential.vigilance.Vigilant;
import gg.essential.vigilance.data.Property;
import gg.essential.vigilance.data.PropertyType;

import java.io.File;

public class config extends Vigilant {
    @Property(
            type = PropertyType.SWITCH, name = "Top-To-Bottom", description = "Mine Gems form top to bottom (turn on if u want money!)", category = "Main", max = 5
    )
    public static boolean topToBottom = false;

    /*@Property(
            type = PropertyType.SLIDER, name = "Nuker Range", description = "Customise how far away the nuker breaks blocks (best is probably like 3 or 2) this also works for crop nuker.", category = "Nuker", max = 5
    )
    public static int nukerRange = 4;

    @Property(
            type = PropertyType.SELECTOR, name = "Nuker Crop Type", description = "Customise what crops the crop nuker will nuke. (only crop)", category = "Nuker", options = {"Wheat", "Carrot", "Potato", "Warts", "Pumpkin", "Melon", "Cocoa"})
    public static int cropNukerType = 0;

    @Property(
            type = PropertyType.SELECTOR, name = "Crop Nuker Blocks/Second", description = "Customise how fast the nuker breaks blocks. (Ps: yes, ik this is slow but i still dono how to make it faster.) This is only for crop nuker !", category = "Nuker", options = {"(NEW!) 20 BPS", "10 BPS", "5 BPS"}
    )
    public static int cropNukerBPS = 1;

    @Property(
            type = PropertyType.SWITCH, name = "Coal ping-less(ish) mode", description = "!!WARNING!! USE ONLY IF U CAN 100% INSTABREAK COAL IF U CANT, THIS FEATURE IS USELESS!", category = "Nuker")
    public static boolean coalVroomVroomMode = false;

    //----------------------------------------------------------------
    //                              ESP
    //----------------------------------------------------------------

    @Property(
            type = PropertyType.SWITCH, name = "Turn on/off ESP", description = "Basically ESP (choose what block u want). I DO NOT KNOW how to make an optimised ESP so this might drop ur fps!", category = "ESP")
    public static boolean ESPState = false;

    @Property(
            type = PropertyType.SELECTOR, name = "Select ESP type.", description = "Choose what block you want to ESP. Again, I DO NOT KNOW how to make an optimised ESP so this might drop ur fps!", options = {"No ESP", "Coal", "Garden"}, category = "ESP")
    public static int ESPType = 0;

    @Property(
            type = PropertyType.SLIDER, name = "ESP Distance", description = "Customise how far ull be able to see ESP.", category = "ESP", max = 50
    )
    public static int ESPDist = 10;

    @Property(
            type = PropertyType.SWITCH, name = "Turn on/off current block ESP", description = "Turn on/off the nuker displaying the currently nuked block (mainly for debuging but it looks cool 2)", category = "ESP")
    public static boolean currentNukedBlockESPSwitch = false;

    //----------------------------------------------------------------
    //                              OTHER
    //----------------------------------------------------------------

    @Property(
            type = PropertyType.SWITCH, name = "upadatar", description = "Turn on/off auto-updatr", category = "OTHER")
    public static boolean autoUpdatr = false;*/

    public static config INSTANCE = new config();

    public config() {
        super(new File("./config/MiningInTwoConf.toml"));
        initialize();
    }

}
