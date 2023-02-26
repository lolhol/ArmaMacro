package com.extra.utils.previous.getUtils;

import com.extra.data.MITconfig;

public class getBPS {
    public static int getBPS() {
        int BPS = MITconfig.cropNukerBPS;

        switch (BPS) {
            case 0:
                BPS = 1;
                break;

            case 1:
                BPS = 2;
                break;

            case 2:
                BPS = 4;
                break;
        }

        return BPS;
    }
}
