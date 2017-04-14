---
layout: default
title: Events
intro: >
    This page explains how the game stores and parses event data. This is an advanced guide for mod
    developers.
permalink: /for-devs/events
redirect_from:
    - /guides/events
---

## Reading the raw data

### Source
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

### Precondition format
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
103 | `g <gender>` | Player is the specified gender ("male" or "female").
104 | `h <pet>` | Player doesn't have a pet and their preferred pet matches ("cat" or "dog").
105 | `i <item ID>` | Player has specified item in their inventory.
106 | `j <number>` | Player has played **more** than that many days.
107 | `k <event ID>` | Player has **not** seen that event (may contain multiple event IDs).
108 | `l <letter ID>` | Player has **not** received that mail letter. This is often overloaded as a general flag, by specifying an invalid mail letter and marking it read when an arbitrary condition is met.
109 | `m <number>` | Player has earned at least this much money.
110 | `n <letter ID>` | Same as #108, but has received that mail letter.
111 | `o <name>` | Player is **not** married to that NPC.
112 | `p <name>` | Specified character is in the current game location.
113 | `q <dialogue ID>` | Player has answered a dialogue with the specified answer ID.
114 | `r <number>` | % chance (value between 0 and 1).
115 | `s <item ID> <number>` | Player has shipped at least this many of the specified item (may specify multiple item/number pairs).
116 | `t <min time> <max time>` | Current time is between between the specified times.
117 | `u <day of month>` | Current day of month is one of the specified values (may contain multiple days).
118 | `v <name>` | The specified NPC is visible.
119 | `w <weather>` | Current weather matches specified value ("rainy" or "sunny").
120 | `x <event ID> <letter ID>` | Marks the specified ID as seen, adds the specified letter to tomorrow's mail, then returns false.
121 | `y <year>` | If `<year>` is 1, must be in the first year. Otherwise, year must be at least this value.
122 | `z <season>` | Current season is **not** one of the specified values.

<small>¹ For convenience when looking at the decompiled code in `GameLocation::checkEventPrecondition`.</small>

For example, Clint's Saloon heart event preconditions are `97/f Clint 750/t 1900 2300/d Tue Wed Thu
Fri Sat Sun`, which means _event #97, requires 3 hearts with Clint, between 7pm and 11pm on Monday_.

### Script format
Each event has a value which is the event script. This specifies what happens in the event —
everything from lighting and music to NPC movement and dialogue.

command | syntax | description
------- | ------ | -----------
addBigProp | `addBigProp <x> <y> <object ID>` | Adds an object at the specified tile.
addCookingRecipe | `addCookingRecipe <recipe>` | Adds the specified cooking recipe to the player.
addCraftingRecipe | `addCraftingRecipe <recipe>` | Adds the specified crafting recipe to the player.
addFloorPop | `addFloorProp <prop index> <x> <y> [solid width] [solid height] [display height]` | Add a non-solid prop from the current festival texture. Default solid width/height is 1. Default display height is solid height.
addLantern | `addLantern <row in tex.> <x> <y> <light radius>` | Adds a glowing temporary sprite.
addMailReceived | `addMailReceived <letter ID>` | Set a letter as received.
addObject | `addObject <row in tex.> <x> <y>` | Adds a temporary sprite at the specified tile.
addProp | `addProp <prop index> <x> <y> [solid width] [solid height] [display height]` | Add a solid prop from the current festival texture. Default solid width/height is 1. Default display height is solid height.
addQuest | `addQuest <quest ID>` | Add the specified quest to the quest log.
addTemporaryActor | `addTemporaryActor <character> <sprite width> <sprite height> <tile x> <tile y> <facing> [breather] [Character|Animal|Monster] [animal name]` | Add a temporary actor. 'breather' is boolean. The category determines where the texture will be loaded from, default is Character. Animal name only applies to animal.
addToTable | `addToTable <x> <y> <object ID>` | Places on object on the furniture at a position. If the location is FarmHouse, then it will always be placed on the initial table.
addTool | `addTool <Sword|Wand>` | Adds either a Battered Sword or Return Scepter (teleports you to your farm, unobtainable in vanilla) to the player's inventory.
advancedMove | `advancedMove <npc> <loop> <x y>...` | TODO: Explain
ambientLight | `ambientLight <r> <g> <b>` | Set the ambient light level.
animalNaming | `animalNaming` | Show the animal naming menu if no other menu is open. Uses the current location as Coop. Appears to only work for 'hatched' animals.
animate | `animate <actor> <frame duration> <flip> <loop> <frames...>` | Animate an actor. 'flip' and 'loop' are boolean.
attachCharacterToTempSprite | `attachCharacterToTempSprite <actor>` | Attach an actor to the most recent temporary sprite.
awardFestivalPrize | `awardFestivalPrize [pan|sculpture|rod|sword|hero|joja|slimeegg]` | Awards the festival prize to the winner for the easter egg hunt and ice fishing contest. Otherwise, awards the specified item.
bloom | `bloom <threshold> <blur> <bloom intensity> <base intensity> <bloom saturation> <base saturation> [whiteOnly]` | Sets the current bloom settings. If 'whiteOnly' is not empty, then BloomSettings.brightWhiteOnly is true.
catQuestion | `catQuestion` | Trigger question about adopting your pet.
cave | `cave` | Trigger the question for the farm cave type. This will work again later, however changing from bats to mushrooms will not remove the mushroom spawning objects.
changeLocation | `changeLocation <location>` | Move the event to another location.
changeMapTile | `changeMapTile <layer> <x> <y> <tile index>` | Change the specified tile to a particular value.
changePortrait | `changePortrait <npc> <portrait>` | Change the NPC's portrait to be from "Portraits/`<actor>`_<sprite&gt".
changeSprite | `changeSprite <actor> <sprite>` | Change the actor's sprite to be from "Characters/`<actor>`_`<sprite>`".
changeToTemporaryMap | `changeToTemporaryMap <map> [pan]` | Change the location to a temporary one, loaded from a map file. If 'pan' is not specified, the screen will pan to (0, 0).
changeYSourceRectOffset | `changeYSourceRectOffset <npc> <offset>` | Change the NPC's vertical texture offset (?).
characterSelect | `characterSelect` | Seemingly unused. Sets Game1.gameMode to 5 and Game1.menuChoice = 0.
cutscene | `cutscene <cutscene>` | Activate a cutscene. See cutscene list. (TODO: Pull list from my event editor)
doAction | `doAction <x> <y>` | TODO: Explain GameLocation.checkAction(new Location(x,y), viewport, player)
ellioitbooktalk | `elliotbooktalk` | Elliot book talk.
emote | `emote <actor> <emote ID>` | Make an actor do an emote. TODO: Investigate Character.doEmote
end | `end ?` | TODO: Investigate Event.endBehaviors
extendSourceRect | `extendSourceRect <actor> (reset | <horizontal> <vertical> [ignoreUpdates])` | For the reset version, resets the actors sprite. TODO: Explain Character.extendSourceRect
eyes | `eyes <eyes> <blink>` | Change the player's eyes.
faceDirection | `faceDirection <actor> <direction> [continue]` | Make an actor face a direction. If no parameter supplied for [continue], the game will pause.
fade | `fade [fadeOut]` | If 'fadeOut' is not specified, it will fade in. (?)
farmerAnimation | `farmerAnimation <anim>` | Sets the farmer's current animation.
farmerEat | `farmerEat <object ID>` | Make the player eat an object
fork | `fork <name>` or `fork <name> <req>` | Fork to another event. 'req' can be a mail ID or dialogue answer ID. If no 'req' is specified, then it will check `specialEventVariable1` (set by things such as `question`).
friendship | `friendship <npc> <amount>` | Add the given number of friendship points with a given NPC name.
globalFade | `globalFade [speed]` | Fade to black at a particular speed (default 0.007). If no speed is specified, the event will continue immediately; otherwise, it will continue after the fade is finished.
globalFadeToClear | `globalFadeToClear [speed]` | Fade to clear (unfade?) at a particular speed (default 0.007). If no speed is specified, the event will continue immediately; otherwise, it will continue after the fade is finished.
glow | `glow <r> <g> <b> <hold>` | Make the screen glow once. TODO: Explain hold (true/false).
grabObject | `grabObject <object ID>` | Causes the player to hold an object.
grandpaCandles | `grandpaCandles` | Do grandpa candles
grandpaEvaluation | `grandpaEvaluation` | Do grandpa evaluation
grandpaEvaluation2 | `grandpaEvaluation2` | Do grandpa evaluation (manually resummoned)
halt | `halt` | Make everyone stop.
hospitaldeath | `hospitaldeath` |
itemAboveHead | `itemAboveHead [pan|hero|sculpture|joja|slimeEgg|rod|sword|ore]` | Show an item above the player's head. If no item is specified, then they will 'hold' nothing?
jump | `jump <actor> [intensity]` | Make an actor jump. Default intensity of 8.
loadActors | `loadActors <layer>` | Load the actors from a layer in the map file.
mail | `mail <letter ID>` | Queue a letter for tomorrow.
message | `message "<text>"` | Show a dialogue box (no speaker).
minedeath | `minedeath` |
move | `move <actor> <x> <y> <facing> <continue>` | Tell an actor to move to a position and face in a direction. TODO: explain `<continue>`
pause | `pause <duration>` | Pause the game.
pixelZoom | `pixelZoom <zoom>` | Sets the current pixel zoom.
playMusic | `playMusic <track>` | Play the specified music track. If the track is 'samBand', the track played will change depend on certain dialogue answers (76-79).
playSound | `playSound <sound>` | Play a sound from the game sound bank.
playerControl | `playerControl` | Give the player control back.
positionOffset | `positionOffset <actor> <x> <y>` | Offset the position of an actor. Instantaneous, no walking animation.
proceedPosition | `proceedPosition <actor>` | TODO: Explain
question | `question (null|fork<0,1,2...>) "text"` | Give the player a question. The number for fork determines which is the 'correct' answer (ie. which will allow the next `fork` command to trigger.). TODO: Describe format for choices
removeItem | `removeItem <object ID>` | Remove the first of an object from a player's inventory.
removeObject | `removeObject <x> <y>` | Remove the prop at a position.
removeQuest | `removeQuest <quest ID>` | Remove the specified quest from the quest log.
removeSprite | `removeSprite <x> <y>` | Remove the temporary sprite at a position.
removeTemporarySprites | `removeTemporarySprites` | Remove all temporary sprites.
removeTile | `removeTile <x> <y> <layer>` | Remove a tile from the specified layer.
resetVariable | `resetVariable` | Set the first event variable to false.
rustyKey | `rustyKey` | Gives the player the rusty key. (Sewer key)
screenFlash | `screenFlash <alpha>` | Game1.flashAlpha = alpha;
setRunning | `setRunning` | Set the player as running.
shake | `shake <actor> <duration>` | Shake an actor for a duration.
showFrame | `showFrame <actor> <flip|frame number>` | Set an actor's current frame. 'flip' is only valid for farmers. TODO: Behavior with farmer looks strange?
showRivalFrame | `showRivalFrame <frame>` | Set the 'rival' actor's sprite to a specific frame.
skippable | `skippable` | Allow skipping this event.
speak | `speak <character> "<text>"` | Show dialogue text from a given character name.
specificTemporarySprite | `specificTemporarySprite <sprite> [other params]` | See specific temporary sprite list. Parameters change depending on the sprite.
speed | `speed <actor> <speed>` | Sets an actor's speed. (In the case of the farmer, it is a speed modifier.)
splitSpeak | `splitSpeak <actor> "<text>"` | Dialogue, but chosen based on previous answer. ('~' is the separator used.)
startJittering | `startJittering` | Make the player start jittering.
stopAdvancedMoves | `stopAdvancedMoves` | Stop movement from advancedMove.
stopAnimation | `stopAnimation <actor> <end frame>` | Stop the animation of an actor. Note that 'end frame' is only valid for NPCs. It is unused for farmers.
stopGlowing | `stopGlowing` | Make the screen stop glowing.
stopJittering | `stopJittering` | Make the player stop jittering.
stopMusic | `stopMusic` | Stop any currently playing music.
stopRunning | `stopRunning` | Set the player to not running.
stopSwimming | `stopSwimming <actor>` | Make an actor stop swimming.
swimming | `swimming <actor>` | Make an actor start swimming.
switchEvent | `switchEvent <event ID>` | Changes the current event (ie. event commands) to another event in the same location.
taxvote | `taxvote` | Trigger voting for or against a 3% shipping tax. (No effect on game?)
temporarySprite | `temporarySprite <x> <y> <row in texture> <animation length> <animation interval> <flipped> <loop count>` | Create a temporary sprite with the given parameters.
textAboveHead | `textAboveHead <actor> "<text>"` | TODO: Investigate Character.showTextAboveHead
tutorialMenu | `tutorialMenu` | Show the tutorial menu if no other menu is open.
updateMinigame | `updateMinigame <event data>` | Send an event to the current minigame.
viewport | `viewport move <targetX> <targetY> <targetZ>` or `viewport <x> <y> [true [unfreeze]|clamp [true|unfreeze]]` | TODO: Explain
waitForKey | `waitForKey <key> <message on finish>` | TODO: Explain
waitForOtherPlayers | `waitForOtherPlayers` | Wait for other players (vanilla MP).
warp | `warp <actor> <x> <y>` | Warp an actor to a position in the current location.
weddingSprite | `weddingSprite <frame>` | Sets the actor known as 'WeddingOutfits' to a particular frame.

## See also
* [JavaScript to parse an event precondition string](https://gist.github.com/Pathoschild/95efc5ba5a23dc2c4da219ca2ddde679)
