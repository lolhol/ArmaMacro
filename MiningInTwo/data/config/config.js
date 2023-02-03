import {
    @ButtonProperty,
    @CheckboxProperty,
    Color,
    @ColorProperty,
    @PercentSliderProperty,
    @SelectorProperty,
    @SwitchProperty,
    @TextProperty,
    @SliderProperty,
    @Vigilant,
} from 'Vigilance/index';


@Vigilant('MiningInTwo', 'MiningInTwo', {
    getCategoryComparator: () => (a, b) => {
        const categories = ["Main", "Helper-Mode", "Fail-Safes", "Fun" ];
        return categories.indexOf(a.name) - categories.indexOf(b.name);
    } 
})

class Settings {

    @CheckboxProperty({
        name: 'PlayerESP',
        description: 'Player ESP',
        category: 'Fail-Safes'
    })
    ShowNearPlayers = true;

    
    @SwitchProperty({
        name: 'Player Failsafe',
        description: 'If player approaches, stand still (pretend to be afk)',
        category: 'Fail-Safes',
    })
    playerFailsafe = true;

    @SliderProperty({
        name: 'Distance',
        description: 'Customise how far away a player has to be for the failsafe to trigger (blocks)',
        category: 'Fail-Safes',
        min: 0,
        max: 500
    })
    distToPlayer = 50;


    @SwitchProperty({
        name: 'Player ESP',
        description: 'Highlights a players within x blocks of you',
        category: 'Fail-Safes',
    })
    ShowNearPlayers = false;

    @SliderProperty({
        name: 'Player ESP Distance ',
        description: 'How far Player ESP should detect players (too high might affect performance & might not work as render distance cap) ',
        category: 'Fail-Safes',
        min: 0,
        max: 500,
    })
    espplayerdistance = 15;

    //FUN :)

    @SliderProperty({
        name: 'Block ESP color Blue',
        description: 'Add blue color to block ESP',
        category: 'Fun',
        min: 0,
        max: 10,
    })
    ESPBlueColor = 0;

    @SliderProperty({
        name: 'Block ESP color Red',
        description: 'Add blue color to block ESP',
        category: 'Fun',
        min: 0,
        max: 10,
    })
    ESPRedColor = 0;

    @SliderProperty({
        name: 'Block ESP color Green',
        description: 'Add green color to block ESP',
        category: 'Fun',
        min: 0,
        max: 10,
    })
    ESPGreenColor = 0;

    //Helper-Mode

    @SwitchProperty({
        name: 'Turn on Helper',
        description: 'Turn on Helper-Mode',
        category: 'Helper-Mode',
    })
    helperMode = false;

    //Main

    @SwitchProperty({
        name: 'Menu KeyBind',
        description: 'Turn on/off open Menu with a Keybind',
        category: 'Main',
    })
    menuKeybind = false;
      
    @SwitchProperty({
        name: 'Structure Finder',
        description: 'Enable/Desable (idk how fast dis is but eh',
        category: 'Main',
    })
    findStructure = false;

    /*@SwitchProperty({
        name: 'Dismount/Mount',
        description: 'Basically dismounts/mounts if u go like 2 blocks down',
        category: 'Main',
    })
    mountDismount = false;

    @SliderProperty({
        name: 'Dismount Blocks',
        description: 'How many blocks you have to go down for the macoro to dismount/mount',
        category: 'Main',
        min: 1,
        max: 4
    })
    dismountAfter = 2;*/

    @SwitchProperty({
        name: 'Add Block To List Keybind',
        description: 'Turn on/off to add block to list using a keybind (in controls)',
        category: 'Main',
    })
    setBlockCoordsKeybind = false;

    @SliderProperty({
        name: 'Smoothlook',
        description: 'Customize how smooth the macro looks at shit (1 is lowest, 5 is highest (instant))',
        category: 'Main',
        min: 1,
        max: 5
    })
    SPEED = 3;

    @SliderProperty({
        name: 'AOTV teleport time',
        description: 'Customise how long the macro will wait before starting when aotving (ps: if u set it to too low, i dont garantee that the macro will work)',
        category: 'Main',
        min: 50,
        max: 3000
    })
    AOTVdelay = 1000;

    @SelectorProperty({
        name: 'Macro spot',
        description: 'Select a default spot to macro... (comming soon)',
        category: 'Main',
        options: ["Custom1", "Custom2"],
    })
    macroSpot = false;

    @SwitchProperty({
        name: 'Block On Route ESP',
        description: 'Display block ESP',
        category: 'Main',
    })
    render = false;

    /*@SwitchProperty({
        name: 'Render PathBreak Helper',
        description: 'Renders lines that if u break with pickaxe, the macro will be able to tp. (kinda meh but works)',
        category: 'Main',
    })*/
    pathBreakHelper = false;



    //--------------------------------------------------------------------------//
    //                                                                          //
    //                                Path Nuker                                //
    //                                                                          //
    //--------------------------------------------------------------------------//

    /*@SwitchProperty({
        name: 'Mine extra blocks around your gemstones',
        description: 'Path nuker mines extra blocks around your gemstones (usally a 3 block range or so)',
        category: 'Path Nuker',
    })
    nukermineextra = true;

    @SelectorProperty({
        name: 'Macro Spot Gemstone',
        description: 'Says in What spot you Macro',
        category: 'Path Nuker',
        options: ["Full Nuker", "Semi-Nuker"],
    })
    nukertype = 0; 
/*
    @SwitchProperty({
        name: 'Attempt to auto place cobble blocks',
        description: 'If possible, will place cobble blocks',
        category: 'Path Nuker',
    })
    placecobble = true;
*/

    //--------------------------------------------------------------------------//
    //                                                                          //
    //                           Macro Spot & Blocks                            //
    //                                                                          //
    //--------------------------------------------------------------------------//

    /*@SelectorProperty({
        name: 'Macro Spot Gemstone',
        description: 'Says in What spot you Macro',
        category: 'Macro Spot & Blocks',
        subcategory: 'Macro Cords',
        options: ["Near Nucleus, Goblin Holdout (class j, Ruby)", "Edge of the Map, Precursor Remnants (class m, Ruby)", "Edge of the Map, Goblin Holdout (class d, Amber)", "Middle of the map Goblin Holdout (class c, Ruby)", "Custom cords #1", "Custom cords #2", "Custom cords #3"],
    })
    currentMacroSpot = 0; 

    @CheckboxProperty({
        name: 'Mithril',
        description: 'Mines mithril with custom cords',
        category: 'Macro Spot & Blocks',
        subcategory: 'Macro Type',
    })
    mithril = false;

    @CheckboxProperty({
        name: 'Amethyst',
        description: 'Mines amethyst with custom cords',
        category: 'Macro Spot & Blocks',
        subcategory: 'Macro Type',
    })
    amethyst = false;

    @CheckboxProperty({
        name: 'Amber',
        description: 'Mines amber with custom cords',
        category: 'Macro Spot & Blocks',
        subcategory: 'Macro Type',
    })
    amber = false;

    @CheckboxProperty({
        name: 'Ruby',
        description: 'Mines ruby with custom cords',
        category: 'Macro Spot & Blocks',
        subcategory: 'Macro Type',
    })
    ruby = false;*/
    
    constructor() {
        this.initialize(this);
        //this.registerListener('textInput', newText => {
        //console.log(Text changed to ${newText});
        //});
    }
}

export default new Settings;