package com.extra.ArmadilloHelper.utils;

import java.util.Random;

public class helperSpinDrive {
    private float angle = 0;
    public helperSpinDrive() {
        boolean lookUnder = true;
        double random = Math.random();

        angle += 7 * random + 25;

        if (angle > 360) {
            angle = 0;
        }


    }
}
