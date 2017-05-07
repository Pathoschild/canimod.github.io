---
layout: default
title: Events
intro: >
    This page explains how the game stores and parses event data. This is an advanced guide for mod
    developers.
permalink: /for-devs/events
redirect_from:
    - /guides/events
movedToWiki: Modding:Event data
---

## Source
Events are stored in `Data\Events\*.xnb` (one file per location), which can be
[unpacked using XNB Extract](creating-an-xnb-mod#unpacking).

Here's the raw data for saloon events (as of 1.1.1) for reference:

```yaml
xnbData: 
    target: "w"
    compressed: true
    hiDef: true
    readerData: 
        - 
            type: "Microsoft.Xna.Framework.Content.DictionaryReader`2[[System.String, mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089],[System.String, mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089]]"
            version: 0
        - 
            type: "Microsoft.Xna.Framework.Content.StringReader"
            version: 0
    numSharedResources: 0

content:  #!Dictionary<String,String>
    40/f Elliott 1000/p Gus/t 1500 2200: "playful/11 20/farmer 14 24 0 Elliott -30 -30 0 Clint 18 22 2 Marnie 9 22 3 Pam 7 18 1 Lewis 8 22 1 Pierre 4 22 2 Demetrius 3 23 1 Gus 14 18 2 Emily 16 18 3/skippable/move farmer 0 -3 3/faceDirection Pierre 1 true/move farmer -3 0 0/faceDirection Pierre 2 true/move farmer 0 -1 0/faceDirection Marnie 0 true/faceDirection Gus 3/speak Gus \"Hi. I'll take your order in a few moments.\"/faceDirection Gus 2/move Emily 2 0 1/faceDirection Marnie 3 true/pause 800/move Emily -2 0 0/pause 1000/faceDirection Clint 3 true/move Emily 2 0 1/warp Elliott 14 24/playSound doorClose/pause 500/move Elliott 0 -3 3/faceDirection farmer 2 true/move Elliott -2 0 0/move Elliott 0 -1 0/faceDirection farmer 1/faceDirection Elliott 3/speak Elliott \"Hello, @! What a pleasant surprise!#$b#I was just stopping in to relax after an eight hour writing session.$h\"/pause 400/faceDirection Elliott 1/speak Elliott \"Bartender! Two of your finest ales, please!^Bartender! Fetch me your finest ale. And bring some wine for the lady!\"/faceDirection Gus 3/faceDirection farmer 0/speak Gus \"...$u\"/move Gus 3 0 0/move Gus 0 -1 0/faceDirection Emily 2/playSound openBox/pause 400/playSound Milking/move Pam -6 0 0/move Gus 0 1 3/move Gus -5 0 2/faceDirection Elliott 0/pause 500/speak Gus \"There you go, sir.$u\"/pause 500/faceDirection Elliott 3/faceDirection farmer 1/speak Elliott \"$q 28376 null#Wait. I propose a toast! To...#$r 28376 25 event_toast4#To Pelican Town!#$r 28376 50 event_toast2#To our friendship!#$r 28376 -10 event_toast1#To my good health!#$r 28376 -50 event_toast3#To your doom!\"/faceDirection Elliott 2/faceDirection farmer 2/pause 900/showFrame Elliott 16/animate Elliott false false 120 16 17 18 19 19 18 18 19 19 18 18 19 19 18 18 19 19 18 18 17 16/pause 500/farmerEat 346/pause 900/pause 1100/stopAnimation farmer/faceDirection farmer 1/speak Elliott \"*Hic*... Strong stuff...$h\"/pause 800/animate Elliott false false 400 20 21 22 21 20 21 22 21 20 21 22 21 20 21 22 21 16/pause 1000/faceDirection farmer 1/pause 800/faceDirection farmer 2/animate farmer false true 100 102 103/pause 1000/globalFade/viewport -1000 -1000/pause 600/stopAnimation farmer/end warpOut" #!String
    96/f Gus 1000/f Pam 500/p Gus: "jaunty/10 21/farmer -100 -100 0 Gus 10 21 2 Pam -101 -101 0/skippable/pause 200/emote Gus 28/pause 500/playSound doorClose/warp farmer 14 24/pause 500/faceDirection Gus 1 true/move farmer 0 -3 3/speak Gus \"Oh, Hello there, buddy.^Hi, @.\"/pause 500/faceDirection Gus 2/move farmer -3 0 2/pause 800/faceDirection farmer 3/pause 400/emote farmer 8/pause 700/speak Gus \"*sigh*...I'm just looking over last month's earnings... and It's not looking very good, @.$s#$b#The worst thing... and I hate to say this because she's my friend... is Pam! She hasn't paid off her tab in weeks!$s#$b#...But I can't ask her to do it. I know she'll get defensive, and I don't want to hurt her feelings.$s\"/pause 600/faceDirection Gus 1/speak Gus \"@, you gotta help me!$s\"/stopMusic/pause 500/playSound doorClose/warp Pam 14 24/move Pam 0 -3 3/faceDirection Gus 1 true/faceDirection farmer 1/emote Gus 16/speak Pam \"Hiya!$h#$b#Gus... I'm awful thirsty, if you catch my drift.\"/emote Gus 28/speak Gus \"Er... Well, okay Pam.$s\"/emote Gus 28/pause 700/emote Pam 8/pause 400/speak Pam \"$q 207 null#@, what's going on here?#$r 207 -50 event_credit1#You need to pay your tab right now!#$r 208 15 event_credit2#The saloon isn't doing well, financially\"/pause 400/faceDirection Pam 1/emote Pam 12/speak Pam \"....$u#$b#*sigh* ...Well, I guess I'd better pay off that tab, then.$s\"/move Pam -2 0 0/move Pam 0 -1 3/move Pam -2 0 2/faceDirection Gus 0/faceDirection farmer 3/playSound money/pause 500/speak Gus \"Thanks, Pam!$h\"/pause 500/faceDirection Gus 1/speak Gus \"And thank you, @.$u\"/pause 500/faceDirection Gus 0/speak Gus \"Now, let's get you that drink, Pam.$h\"/friendship Gus 50/end dialogue Gus \"Thanks for your help, @. This cash is going to be a big help to the saloon.\"" #!String
    97/f Clint 750/t 1900 2300/d Tue Wed Thu Fri Sat Sun: "none/4 18/farmer 14 24 0 Clint 4 19 2 Emily 10 11 0 Gus 15 18 1 Shane 7 18 1/skippable/move farmer 0 -3 3/emote Clint 28/pause 500/move Clint 0 -1 3/move Clint -3 0 0/pause 500/playSound openBox/pause 150/playSound shiny4/pause 400/playMusic desolate/move Clint 3 0 2/move Clint 0 1 2/move farmer -3 0 0/move farmer 0 -1 3/faceDirection Shane 2 true/move farmer -3 0 3/faceDirection Shane 1 true/move farmer -3 0 3/faceDirection Clint 1/speak Clint \"Hello, @... care to join me?\"/pause 400/faceDirection farmer 0/pause 800/faceDirection farmer 3/faceDirection Clint 2/speak Clint \"Let me just go ahead and tell you what's on my mind.$u#$b#I have terrible luck with women, @...*sigh*$s#$b#I'm a nice guy if you get to know me, I swear!$u\"/pause 500/faceDirection farmer 0/emote farmer 28/pause 500/faceDirection farmer 3/speak Clint \"The girls all seem to like you, @...^You're a girl, @...\"/speak Clint \"$q 211 null#Got any tips?^What advice can you give me?#$r 211 25 event_advice1#Impress women with your strength and charm#$r 211 25 event_advice1#Act crazy, to keep people guessing#$r 211 0 event_advice2#Just act natural... be yourself#$r 211 50 event_advice1#Treat women the same as men\"/speed Emily 4/move Emily -6 0 2/speed Emily 2/move Emily 0 4 2/doAction 4 16/playSound openBox/stopMusic/move Emily 0 3 1/move Emily 1 0 2/move Emily 0 1 3/pause 400/pause 700/speak Emily \"Hi Clint, what can I get for you tonight?$h\"/pause 600/faceDirection Clint 1/pause 200/speak Clint \"Yes!\"/pause 300/speak Clint \"Er.. I mean, I'll have the Big n' Cheesy. With extra sauce, please.$s#$b#...$u\"/faceDirection Clint 3/faceDirection Emily 2/pause 300/faceDirection Clint 2/speak Emily \"Hi @.\"/pause 300/faceDirection farmer 0/faceDirection Clint 1/speak Clint \"Er... *ahem* Th...Thanks, Emily. For... taking my order.#$b#Um, Emily? I was...*gulp*... I was wondering...$h\"/pause 300/faceDirection Emily 3/emote Emily 8/pause 400/speak Emily \"Yes, Clint?$u\"/pause 500/emote Clint 28/pause 1200/speak Clint \"... nevermind.$s\"/faceDirection Clint 0/playMusic sadpiano/pause 300/faceDirection Emily 2/pause 300/faceDirection Emily 3/pause 500/move Emily 0 -1 1/move Emily 1 0 1/faceDirection Shane 3/speak Emily \"Hi, Shane! Here's your beverage.$h\"/pause 300/faceDirection Shane 1/pause 400/addObject 8 17 346/playSound woodyStep/pause 400/faceDirection Shane 3/pause 300/faceDirection Clint 1/speak Shane \"Thanks, Emily!$h#$b#So... How's your shift coming along?\"/speak Emily \"It's fine! Thanks for asking, Shane!$h#$b#Do you have any new chicken stories for me?\"/pause 600/emote Clint 28/pause 500/faceDirection Clint 2/pause 800/speak Clint \"*sigh*$s#$b#I'm doomed...$s\"/end warpOut" #!String
    911526/f Alex 2500/t 1900 2200/n joshMessage: "gusviolin/-1000 -1000/farmer 5 5 1 Gus 10 6 2 Alex 9 5 3 Emily 9 17 2/skippable/showFrame 117/showFrame Alex 39/positionOffset farmer 12 8/positionOffset Alex -12 0/animate Gus false true 723 16 17/viewport 7 4 true/pause 23000/stopAnimation Gus/pause 1000/faceDirection Gus 3/speak Alex \"Thanks, Gus. That was great.\"/move Gus 0 1 1/move Gus 1 0 2/move Gus 0 1 2/doAction 11 9/move Gus 0 3 1/move Gus 12 0 3 true/speak Alex \"This is nice... I've never dined in here before.\"/pause 1000/emote Alex 40/speak Alex \"Um, anyway... I reserved this private room so we could talk...$l\"/warp Emily 11 11 true/playSound woodyStep/move Emily 0 -4 3/move Emily -4 0 0/move Emily 0 -1 0/speak Emily \"I've got a linguini with mushroom cream sauce for Mr. @.^I've got a kale and walnut salad for the lady.#$b#...and a grilled steak for Alex.^And a grilled steak for the gentleman.\"/playSound woodyHit/specificTemporarySprite joshDinner/speak Alex \"Thanks.\"/move Emily 4 0 2/move Emily 0 5 1/move Emily 11 0 1 true/speak Alex \"So, what I wanted to say was...$9\"/playMusic musicboxsong/speak Alex \"*gulp*$s\"/pause 600/speak Alex \"Well... when we first met, I was instantly drawn to you. It was confusing... I'd never felt that way about anyone.$l^When I first met you, I thought you were really cute.$l#$b#I kept telling myself 'You can't have these kinds of feelings for another guy'.$l^Normally, when I have a crush on someone, the feeling goes away pretty quick...$l\"/pause 800/speak Alex \"...But my heart was telling me something else.^...But with you, it kept growing.$l\"/pause 400/emote Alex 40/pause 600/question fork1 \"#I feel the same way.#I'm sorry... I don't feel that way about you.\"/pause 400/fork rejectJosh/speak Alex \"...$l#$b#I can't believe it took this long to say that to each other.$l\"/emote Alex 32/pause 800/animate Alex false false 400 40 41 41 40 41 41 40 41 41 40 41 41 40/pause 800/playSound eat/pause 800/playSound eat/pause 800/playSound eat/pause 800/playSound gulp/pause 400/speak Alex \"Mmm... this steak is outsanding. Can you smell that fragrant sauce?$10\"/eyes 1 -4000/animate Alex false false 400 40 41 41 40 41 41 40/pause 1000/specificTemporarySprite alexDiningDog/playSound dogWhining/pause 1000/globalFade/viewport -1000 -1000/pause 6000/end dialogue Alex \"...$l\"" #!String
    rejectJosh: "pause 100/playMusic none/shake Alex 2000/emote Alex 28/speak Alex \"...Oh...$s#$b#I...I'm sorry if I made you uncomfortable...$s\"/pause 2000/speak Alex \"I'm not hungry anymore...$s\"/viewport move 1 1 5000/globalFade/viewport -1000 -1000/pause 4000/end dialogue Alex \"...$l\"" #!String
```

## Event preconditions
Each event has a key which includes an event ID and any preconditions. Event preconditions include
any number of the following arguments (separated by `/`):

char code¹ | syntax | precondition
---------- | ------ | ------------
97 | `a <x> <y>` | Player is at that tile position.
98 | `b <number>` | Player has reached the mine bottom at least that many times.
99 | `c <number>` | Player has at least that many free inventory slots.
100 | `d <day of week>` | Today is **not** one of the specified days (may specify multiple days).
101 | `e <event ID>` | Player has seen the specified event (may contain multiple event IDs).
102 | `f <name> <number>` | Player has that many friendship points with NPC (may contain multiple name/number pairs). Each heart is 250 points.
103 | `g <gender>` | Player is **not** the specified gender ("male" or "female").
104 | `h <pet>` | Player has the specified pet ("cat" or "dog").
105 | `i <item ID>` | Player has specified item in their inventory.
106 | `j <number>` | Player has played **more** than that many days.
107 | `k <event ID>` | Player has **not** seen that event (may contain multiple event IDs).
108 | `l <letter ID>` | Player has received that mail letter. This is often overloaded as a general flag, by specifying an invalid mail letter and marking it read when an arbitrary condition is met.
109 | `m <number>` | Player has earned at least this much money.
110 | `n <letter ID>` | Same as #108.
111 | `o <name>` | Player is **not** married to that NPC.
112 | `p <name>` | Specified character is in the current game location.
113 | `q <dialogue ID>` | Player has answered the specified dialogue question (may contain multiple dialogue IDs). Unclear whether this is the question ID or answer ID.
114 | `r <number>` | % chance (value between 0 and 1).
115 | `s <item ID> <number>` | Player has shipped at least this many of the specified item (may specify multiple item/number pairs).
116 | `t <min time> <max time>` | Current time is between between the specified times.
117 | `u <day of month>` | Current day of month is one of the specified values (may contain multiple days).
118 | `v <name>` | The specified NPC is visible.
119 | `w <weather>` | Current weather matches specified value ("rainy" or "sunny").
120 | `x <event ID> <letter ID>` | Marks the specified ID as seen, adds the specified letter to tomorrow's mail, then returns false.
121 | `y <year>` | If `<year>` is 1, must be in the first year. Otherwise, year must be at least this value.
122 | `z <season>` | Current season is **not** one of the specified values (may contain multiple seasons).

<small>¹ For convenience when looking at the decompiled code in `GameLocation::checkEventPrecondition`.</small>

For example, Clint's Saloon heart event preconditions are `97/f Clint 750/t 1900 2300/d Tue Wed Thu
Fri Sat Sun`, which means _event #97, requires 3 hearts with Clint, between 7pm and 11pm on Monday_.

## Event scripts
### Basic format
Each event has a value which is the event script. This specifies what happens in the event —
everything from lighting and music to NPC movement and dialogue. The script consists of multiple
commands separated by `/` characters.

Every script must start with three commands in this exact order:

index | syntax         | description
----- | -------------- | -----------
0     | `<music ID>` | The background music to play. Some example values are `jaunty`, `ocean`, and `rain`.
1     | `<x> <y>`     | The tile coordinates the camera should center on at the start of the event.
2     | `<npc ID> <x> <y> <direction>` | Initialises an NPC's starting tile position and [direction](#directions). The NPC ID can be `farmer` or an NPC name like `Abigail`.

Those three commands may be followed by any sequence of the following commands:

command | description
------- | -----------
`addBigProp <x> <y> <object ID>` | Adds an object at the specified tile.
`addCookingRecipe <recipe>` | Adds the specified cooking recipe to the player.
`addCraftingRecipe <recipe>` | Adds the specified crafting recipe to the player.
`addFloorProp <prop index> <x> <y> [solid width] [solid height] [display height]` | Add a non-solid prop from the current festival texture. Default solid width/height is 1. Default display height is solid height.
`addLantern <row in tex.> <x> <y> <light radius>` | Adds a glowing temporary sprite.
`addMailReceived <letter ID>` | Set a letter as received.
`addObject <row in tex.> <x> <y>` | Adds a temporary sprite at the specified tile.
`addProp <prop index> <x> <y> [solid width] [solid height] [display height]` | Add a solid prop from the current festival texture. Default solid width/height is 1. Default display height is solid height.
`addQuest <quest ID>` | Add the specified quest to the quest log.
`addTemporaryActor <character> <sprite width> <sprite height> <tile x> <tile y> <facing> [breather] [Character|Animal|Monster] [animal name]` | Add a temporary actor. 'breather' is boolean. The category determines where the texture will be loaded from, default is Character. Animal name only applies to animal.
`addToTable <x> <y> <object ID>` | Places on object on the furniture at a position. If the location is FarmHouse, then it will always be placed on the initial table.
`addTool <Sword|Wand>` | Adds either a Battered Sword or Return Scepter (teleports you to your farm, unobtainable in vanilla) to the player's inventory.
`advancedMove <npc> <loop> <x y>...` | TODO: Explain
`ambientLight <r> <g> <b>` | Set the ambient light level.
`animalNaming` | Show the animal naming menu if no other menu is open. Uses the current location as Coop. Appears to only work for 'hatched' animals.
`animate <actor> <frame duration> <flip> <loop> <frames...>` | Animate a named actor, using the one or more `<frames>` from their spritesheet, for `<frame duration>` milliseconds per frame. `<flip>` indicates whether to flip the sprites along the Y axis; `<loop>` indicates whether to repeat the animation.
`attachCharacterToTempSprite <actor>` | Attach an actor to the most recent temporary sprite.
`awardFestivalPrize [pan|sculpture|rod|sword|hero|joja|slimeegg]` | Awards the festival prize to the winner for the easter egg hunt and ice fishing contest. Otherwise, awards the specified item.
`bloom <threshold> <blur> <bloom intensity> <base intensity> <bloom saturation> <base saturation> [whiteOnly]` | Sets the current bloom settings. If 'whiteOnly' is not empty, then BloomSettings.brightWhiteOnly is true.
`catQuestion` | Trigger question about adopting your pet.
`cave` | Trigger the question for the farm cave type. This will work again later, however changing from bats to mushrooms will not remove the mushroom spawning objects.
`changeLocation <location>` | Change to another location and run the remaining event script there.
`changeMapTile <layer> <x> <y> <tile index>` | Change the specified tile to a particular value.
`changePortrait <npc> <portrait>` | Change the NPC's portrait to be from "Portraits/`<actor>`_<sprite&gt".
`changeSprite <actor> <sprite>` | Change the actor's sprite to be from "Characters/`<actor>`_`<sprite>`".
`changeToTemporaryMap <map> [pan]` | Change the location to a temporary one loaded from the map file specified by `<map>`. The `pan` argument indicates the tile coordinates to pan to (defaults to `0, 0`).
`changeYSourceRectOffset <npc> <offset>` | Change the NPC's vertical texture offset (?).
`characterSelect` | Seemingly unused. Sets Game1.gameMode to 5 and Game1.menuChoice = 0.
`cutscene <cutscene>` | Activate a cutscene. See cutscene list. (TODO: Pull list from my event editor)
`doAction <x> <y>` | TODO: Explain GameLocation.checkAction(new Location(x,y), viewport, player)
`elliotbooktalk` | Elliot book talk.
`emote <actor> <emote ID>` | Make the given NPC name perform an emote, which is a little icon shown above the NPC's head. Emotes are stored in `Content\TileSheets\emotes.xnb` (see [list of emotes](https://www.reddit.com/r/StardewValley/comments/5s5m9g/help_annoyed_squiggle/ddd33qg/)).
`end ?` | TODO: Investigate Event.endBehaviors
`extendSourceRect <actor> (reset | <horizontal> <vertical> [ignoreUpdates])` | For the reset version, resets the actors sprite. TODO: Explain Character.extendSourceRect
`eyes <eyes> <blink>` | Change the player's eyes.
`faceDirection <actor> <direction> [continue]` | Make a named NPC face a [direction](#directions). If no parameter is supplied for [continue], the game will pause.
`fade [fadeOut]` | If 'fadeOut' is not specified, it will fade in. (?)
`farmerAnimation <anim>` | Sets the farmer's current animation.
`farmerEat <object ID>` | Make the player eat an object
`fork <event ID> [<req>]` | End the current command script and starts a different script with the given ID, but only if the `<req>` condition is met. The `<req>` condition can be a mail ID or dialogue answer ID; if not specified, it checks if the `specialEventVariable1` variable was set (e.g. by a `question` command). The new script should have the same format as a normal event script, but without the mandatory three start fields.
`friendship <npc> <amount>` | Add the given number of friendship points with the named NPC. (There are 250 points per heart.)
`globalFade [speed]` | Fade to black at a particular speed (default 0.007). If no speed is specified, the event will continue immediately; otherwise, it will continue after the fade is finished. The fade effect disappears when this command is done; to avoid that, use the `viewport` command to move the camera off-screen.
`globalFadeToClear [speed]` | Fade to clear (unfade?) at a particular speed (default 0.007). If no speed is specified, the event will continue immediately; otherwise, it will continue after the fade is finished.
`glow <r> <g> <b> <hold>` | Make the screen glow once. TODO: Explain hold (true/false).
`grabObject <object ID>` | Causes the player to hold an object.
`grandpaCandles` | Do grandpa candles
`grandpaEvaluation` | Do grandpa evaluation
`grandpaEvaluation2` | Do grandpa evaluation (manually resummoned)
`halt` | Make everyone stop.
`hospitaldeath` |
`itemAboveHead [pan|hero|sculpture|joja|slimeEgg|rod|sword|ore]` | Show an item above the player's head. If no item is specified, then they will 'hold' nothing?
`jump <actor> [intensity]` | Make a the named NPC jump. The default `intensity` is 8.
`loadActors <layer>` | Load the actors from a layer in the map file.
`mail <letter ID>` | Queue a letter to be received tomorrow (see `Content\Data\mail.xnb` for available mail).
`message "<text>"` | Show a dialogue box (no speaker). See [dialogue format](#dialogue-format) for `text` format.
`minedeath` |
`move <actor> <x> <y> <facing> <continue>` | Make a named NPC move by the given tile offset from their current position (along one axis _only_), and face the given [direction](#directions) when they're done. To move along multiple axes, you must specify multiple `move` commands. TODO: explain `<continue>`
`pause <duration>` | Pause the game for the given number of milliseconds.
`pixelZoom <zoom>` | Sets the current pixel zoom.
`playMusic <track>` | Play the specified music track ID. If the track is 'samBand', the track played will change depend on certain dialogue answers (76-79).
`playSound <sound>` | Play a given sound ID from the game's sound bank.
`playerControl` | Give the player control back.
`positionOffset <actor> <x> <y>` | Offset the position of the named NPC by the given number of pixels. This happens instantly, with no walking animation.
`proceedPosition <actor>` | TODO: Explain
`question null "<question>#<answer1>#<answer2>"` | Show a dialogue box with some answers and an optional question. When the player chooses an answer, the event script continues with no other effect.
`question fork<answer index> "<question>#<answer 0>#<answer 1>#..."` | Show a dialogue with some answers and an optional question. When the player chooses the answer matching the `fork<answer index>` (like `fork0` for the first answer), the `specialEventVariable1` variable is set. Usually followed by a `fork` command.
`removeItem <object ID>` | Remove the first of an object from a player's inventory.
`removeObject <x> <y>` | Remove the prop at a position.
`removeQuest <quest ID>` | Remove the specified quest from the quest log.
`removeSprite <x> <y>` | Remove the temporary sprite at a position.
`removeTemporarySprites` | Remove all temporary sprites.
`removeTile <x> <y> <layer>` | Remove a tile from the specified layer.
`resetVariable` | Set the first event variable to false.
`rustyKey` | Gives the player the rusty key. (Sewer key)
`screenFlash <alpha>` | Game1.flashAlpha = alpha;
`setRunning` | Set the player as running.
`shake <actor> <duration>` | Shake the named NPC for the given number of milliseconds.
`showFrame farmer flip` | Flip the farmer's current sprite along the Y axis. TODO: Behavior with farmer looks strange?
`showFrame <actor> <frame ID>` | Set the named NPC's current frame in their `Content\Characters\*.xnb` spritesheet. TODO: Behavior with farmer looks strange?
`showRivalFrame <frame>` | Set the 'rival' actor's sprite to a specific frame.
`skippable` | Allow skipping this event.
`speak <character> "<text>"` | Show dialogue text from a named NPC; see [dialogue format](#dialogue-format).
`specificTemporarySprite <sprite> [other params]` | Shows the given temporary sprite. Parameters change depending on the sprite.
`speed farmer <modifier>` | Add a speed modifier to the farmer. TODO: for the next action only?
`speed <actor> <speed>` | Sets the named NPC's speed (default speed is 3). Not applicable to the farmer. TODO: for the next action only?
`splitSpeak <actor> "<text>"` | Dialogue, but chosen based on previous answer. ('~' is the separator used.)
`startJittering` | Make the player start jittering.
`stopAdvancedMoves` | Stop movement from advancedMove.
`stopAnimation farmer` | Stop the farmer's current animation.
`stopAnimation <actor> <end frame>` | Stop the named NPC's current animation. Not applicable to the farmer.
`stopGlowing` | Make the screen stop glowing.
`stopJittering` | Make the player stop jittering.
`stopMusic` | Stop any currently playing music.
`stopRunning` | Make the farmer stop running.
`stopSwimming <actor>` | Make an actor stop swimming.
`swimming <actor>` | Make an actor start swimming.
`switchEvent <event ID>` | Changes the current event (ie. event commands) to another event in the same location.
`taxvote` | Trigger voting for or against a 3% shipping tax. (No effect on game?)
`temporarySprite <x> <y> <row in texture> <animation length> <animation interval> <flipped> <loop count>` | Create a temporary sprite with the given parameters.
`textAboveHead <actor> "<text>"` | Show a small text bubble over the named NPC's head with the given text; see [dialogue format](#dialogue-format).
`tutorialMenu` | Show the tutorial menu if no other menu is open.
`updateMinigame <event data>` | Send an event to the current minigame.
`viewport move <x> <y> <duration>` | Pan the the camera for the given duration in milliseconds until it's centered on the given X, Y tile position.
`viewport <x> <y> [true [unfreeze]|clamp [true|unfreeze]]` | Instantly reposition the camera to center on the given X, Y tile position. TODO: explain other parameters.
`waitForKey <key> <message on finish>` | TODO: Explain
`waitForOtherPlayers` | Wait for other players (vanilla MP).
`warp <actor> <x> <y>` | Warp the named NPC to a position to the given X, Y tile coordinate. This can be used to warp characters off-screen.
`weddingSprite <frame>` | Sets the actor known as 'WeddingOutfits' to a particular frame.

### Directions
When event commands refer to a facing direction, they'll use one of these values:

Value | Meaning
----- | -------
0     | looking up
1     | looking right
2     | looking down
3     | looking left

### Dialogue format
Some event commands (like `speak`, `textAboveHead`, and `message`) take a dialogue message which
supports special tokens to control the dialogue box.

Special tokens:

character | description
--------- |-------------
`#`       | Separates two commands in a dialogue string.
`{`       | TODO. Stands for "breakSpecialCharacter".
`^`       | Gender switch character. The text before it is shown for male farmers, the text after it for female farmers.<br />_Example: `Oh, good morning Mr. @!^Oh, good morning Ms. @!`_
`*`       | TODO. Stands for "quickResponseDelineator".

Dialogue commands:

group     | command | description
--------- | ------- |-------------
portraits | `$h` | Switch the speaking character to their happy portrait.
portraits | `$s` | Switch the speaking character to their sad portrait.
portraits | `$u` | Switch the speaking character to their unique portrait.
portraits | `$neutral` | Switch the speaking character to their neutral portrait.
portraits | `$l` | Switch the speaking character to their love portrait.
portraits | `$a` | Switch the speaking character to their angry portrait.
portraits | `$<id>` | Switch the speaking character to the portrait at the given index in their portraits file. NOTE: `$1` can't be used as the first dialogue command (see `$1` below).
dialogue  | `$q <?> <?>#<text>` | TODO. Show a dialogue box containing the given question text.
dialogue  | `$r <?> <?> <response ID>#<answer text>` | TODO. Adds an `<answer text>` option to the question dialogue, which when selected triggers the response indicated by `<response ID>` from the speaker's `Content\Characters\Dialogue\*.xnb` file.
dialogue  | `$e` | End the current dialogue. Everything before `$e` is shown the first time you talk to an NPC; everything after is shown in subsequent conversations.
dialogue  | `$b` | End the current textbox, so the next part of the dialogue is shown in a new box.
dialogue  | `$k` | TODO. Stands for "dialogueKill".
dialogue  | `$c <probability>` | Choose the given text with a `probability` between 0 and 1.
dialogue  | `$d {bus|joja|cc}` | TODO. Stands for "dialogueDependingOnWorldState".
dialogue  | `$y` | TODO. Stands for "dialogueQuickResponse"; works like $q, but within one and the same text line.
dialogue  | `$p` | TODO. Stands for "dialoguePrerequisite".
dialogue  | `$1` | TODO. When used as the first dialogue command, stands for "dialogueSingle". Possibly a check for whether the player is dating (the speaking character?).
dialogue  | `%fork` | TODO. Seems to have to do with questions and forks, however is used sparingly in originals game code. Seems to be replaced with the actual question command.
content   | `@`  | Replaced with the player's name.<br />_Example: `Hi there @!`_
content   | `%adj` | Replaced with a random adjective.
content   | `%noun` | Replaced with a random noun.
content   | `%place` | Replaced with a random place name.
content   | `%spouse` | Replaced with the name of the farmer's spouse.
content   | `%name` | TODO. Stands for "randomNameSpecialCharacter". Seems to return a random name? 
content   | `%firstnameletter` | TODO. Stands for "firstNameLettersSpecialCharacter".
content   | `%time` | Replaced with the current time.
content   | `%band` | TODO.
content   | `%book` | TODO.
content   | `%rival` | TODO.
content   | `%pet` | Replaced with the name of the farmer's pet.
content   | `%farm` | Replaced with the farm name.
content   | `%favorite` | TODO. Returns favorite thing? Unused?
content   | `%kid1` | Replaced with the name of the farmer's first child.
content   | `%kid2` | Replaced with the name of the farmer's second child.

## See also
* [JavaScript to parse an event precondition string](https://gist.github.com/Pathoschild/95efc5ba5a23dc2c4da219ca2ddde679)
