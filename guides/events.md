---
layout: default
title: Events
intro: This page explains how the game stores and parses event data. This is an advanced guide for mod developers.
---

## Reading the raw data

### Source
Events are stored in `Data\Events\*.xnb` (one file per location), which can be unpacked using
[XNB Extract by Drogean](http://community.playstarbound.com/threads/modding-guides-and-general-modding-discussion-redux.109131/).

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

### Script format
Each event has a value which is the event script. This specifies what happens in the event —
everything from lighting and music to NPC movement and dialogue.

As an example we'll use one of the above mentioned events from the saloon.
```yaml
96/f Gus 1000/f Pam 500/p Gus: "jaunty/10 21/farmer -100 -100 0 Gus 10 21 2 Pam -101 -101 0/skippable/pause 200/emote Gus 28/pause 500/playSound doorClose/warp farmer 14 24/pause 500/faceDirection Gus 1 true/move farmer 0 -3 3/speak Gus \"Oh, Hello there, buddy.^Hi, @.\"/pause 500/faceDirection Gus 2/move farmer -3 0 2/pause 800/faceDirection farmer 3/pause 400/emote farmer 8/pause 700/speak Gus \"*sigh*...I'm just looking over last month's earnings... and It's not looking very good, @.$s#$b#The worst thing... and I hate to say this because she's my friend... is Pam! She hasn't paid off her tab in weeks!$s#$b#...But I can't ask her to do it. I know she'll get defensive, and I don't want to hurt her feelings.$s\"/pause 600/faceDirection Gus 1/speak Gus \"@, you gotta help me!$s\"/stopMusic/pause 500/playSound doorClose/warp Pam 14 24/move Pam 0 -3 3/faceDirection Gus 1 true/faceDirection farmer 1/emote Gus 16/speak Pam \"Hiya!$h#$b#Gus... I'm awful thirsty, if you catch my drift.\"/emote Gus 28/speak Gus \"Er... Well, okay Pam.$s\"/emote Gus 28/pause 700/emote Pam 8/pause 400/speak Pam \"$q 207 null#@, what's going on here?#$r 207 -50 event_credit1#You need to pay your tab right now!#$r 208 15 event_credit2#The saloon isn't doing well, financially\"/pause 400/faceDirection Pam 1/emote Pam 12/speak Pam \"....$u#$b#*sigh* ...Well, I guess I'd better pay off that tab, then.$s\"/move Pam -2 0 0/move Pam 0 -1 3/move Pam -2 0 2/faceDirection Gus 0/faceDirection farmer 3/playSound money/pause 500/speak Gus \"Thanks, Pam!$h\"/pause 500/faceDirection Gus 1/speak Gus \"And thank you, @.$u\"/pause 500/faceDirection Gus 0/speak Gus \"Now, let's get you that drink, Pam.$h\"/friendship Gus 50/end dialogue Gus \"Thanks for your help, @. This cash is going to be a big help to the saloon.\"" #!String
```
Our information starts after the ":" and be contained with in two " symbols.
Every Event in the .xnb file ends with #!String, make sure to never forget adding it or your event will not work!

Every command is contained between two / (forward slash symbols) except for the very first one. The first four commands must be in the specific order that they are listed.

command | what it's used for
---------- | ----------------
jaunty | defines the music that will play during the event. This can be changed during the event with "playMusic (songname)" or "stopMusic". jaunty is an example of a song, this can be any of the songs in the name that you know the title of. A list of names can be found further down the page.
10 21 | these are the coordinates of the tile that the camera(viewport) centers on at the start of the event.
farmer -100 -100 0 Gus 10 21 2 Pam -101 -101 0 | character initialization. syntax is "Character Name" "X" "Y" "Direction²".
skippable | wether or not the event is skippable. If you include this command the event will be skippable, if you don't the event will not be skippable.

<small>² Direction works as follows: 0 is looking up, 1 is looking right, 2 is looking down and 3 is looking left.</small>

After this, the order of the commands no longer matters, because from now on its all about the sequence of things happening during the event.

command | what it's used for
---------- | ---------------
pause x | x is number in milliseconds.
emote (Name) x | emotes work simply by writing the name of the character who you want to show the emote and then the number of a frame of the emote you want to show. Ex: 8 is the "?" emote while 16 is the "!" emote. Check Content\TileSheets\emotes.xnb for all the emotes.
move (name) X Y D | again, you write the name of the character you want to move. Then X amount of tiles to the left(-) or right(+) and Y  amount of tiles up(-) or down(+). D is for the direction the character will be facing AFTER the movement. You can ONLY move on the X or Y axis, not both in the same command, you'll have to have multiple move commands following each other.
speak (name) \" text \" | defines who is speaking and what they are saying. Text formatting will be handeled further down the page, there is a LOT of documentation needed for it.
viewport X Y | this will instantly jump the camera(viewport) to center on the tile at X,Y coordinates. There seems to be the possibility for having "viewport X Y true" however, what the true does is unclear.
viewport move X Y x | moves the camera(viewport) in the same way that the normal move command works, X and Y can be positive or negative and will move in the given direction for the given amount of x milliseconds.
globalFade | makes the map fade to black. However this is only temporary for some reason, if you want a more permanent fade to black use "globalFade/viewport -1000 -1000" to move the camera offscreen after the fade. (Doesn't have to be -1000 -1000!)
warp (name) X Y | instantly warps the named character to the tile with X,Y coordinates. Just like with the viewport, you can use this to warp characters offscreen.
faceDirection (name) D | named character will look in the given direction².
showFrame (name) x | show the specified frame on named characters spritesheet. Check Content\Characters\(name).xnb for spritesheet.
speed (name) x | the next action taken by the named character will happen with the specified speed. 3 is default speed.
playSound (soundname) | plays the specified sound. List of known sounds further down the page.
shake (name) x | shakes the named character for the specified amount of milliseconds.
jump (name) | makes the named character jump. What did you expect?
textAboveHead (name) \" text \" | displays a small textbubble above named characters head with the given text. Text formatting same as the speak command.
addQuest x | adds the quest with the given quest ID.
message \" text \" | shows a message, written in the same text formatting as speak.
animate (name) (true/false) (true/false) x (frames) | animates the named character using the given frames from their spritesheet for x milliseconds per frame. the true/false are slightly unclear, however if both are true it makes the animation loop, both false will make it not loop.
stopAnimation (name) | stops the named characters animation given with the animate command.
mail (mailname) | you'll recieve the specified mail the following morning. Check Content\Data\mail.xnb for mail events.
friendship (name) x | adds x amount of friendship points to the named character. (250 points is one heart.)
playMusic (songname) | starts playing the named song. Song name list further down the page.
stopMusic | stops music currently playing.
specificTemporarySprite (spritename) | shows the specified sprite in your event. Currently unclear where these sprites are defined or how the game knows where to place them.
changeLocations (mapname) | changes the locations where the event is taking place to the specified map mid-event.
changeToTemporaryMap (temporarymapname) | changes the locations where the event is taking place to the specified temporary map mid-event.
ambientLight x x x | creates ambient lighting effects. Currently undocumented as to what the three different numbers do.
positionOffset (name) X Y | offsets named character X (right + or left -) and/or Y (down + or up -) amount of pixels.

Text formatting for speak, textAboveHead and message:

Using question is like having to make a dicision rather than a question someone asks.
question (fork0/fork1) \"question#answer1#answer2\"/fork (forkname)
the way this works is that it forks the current event to a sub event.
Lets look at an example:
    question fork1 \"Share food with Linus?#Share it#Keep it\"/fork noFoodforLinus/(continue current event)
    
In the same event file you would then have an event with the id noFoodforLinus, but you skip the music, viewport and actor positions because these carry over from the main event. Because I chose fork1 we fork the event if you choose the second answer. While fork0 would fork from the first answer. (Currently unknown if you can have more than 2 options.)

$q however is used inside a speak command. So it is a question being asked by the current speaker.
Example:
    speak Lewis \"$q -1 null#What do you think of my role as mayor?#$r -1 0 mayor_role1#You're very important to the town!#$r -1 0 mayor_role2#You're not needed.\"
Depending on your picked answer it will (in this example case) go to Content\Characters\Dialogue\Lewis.xnb and then read the responses listed as mayor_role1 or mayor_role2 which can be something like this:
    mayor_role1: "I'm glad you think that! It means I'm doing my job correctly$h" #!String
    mayor_role2: "Oh... well, if you say so...$s" #!String

Command | What it does.
----------|-----------
$h | uses the speaking characters happy portrait.³
$s | uses the speaking characters sad portrait.³
$u | uses the speaking characters unique portrait.³
$neutral | uses the speaking characters neutral portrait.³
$l | uses the speaking characters love portrait.³
$a | uses the speaking characters angry portrait.³
$e | stands for "dialogueEnd", everything before $e is talking to a character once. everything after $e is talking to a person again after the first.
$b | breaks the text from before the command and after it into different text boxes.
$k | stands for "dialogueKill", currently undocumented what this does.
$c x | stands for "dialogueChance", given a number between 0 and 1 will be the percentage that the given text will be shown.
$d (worldstate) | stands for "dialogueDependingOnWorldState". Only three states seem to be used ingame: bus, Joja (also joja) and cc
$y | stands for "dialogueQuickResponse", it works like $q but within one and the same text line. (Further documentation needed)
$p | stands for "dialoguePrerequisite", currently undocumented what this does.
$1 | stands for "dialogueSingle", currently unsure what this means, but it seems to be a check for if the player is dating (the speaking character?).³
$q | Is used for questions, format is as follows: "$q -1 null#Question#$r -1 0 dialoguename1#Response 1#$r -1 0 dialoguename2#Response 2" the way this works is that it will switch to the given dialoguename inside the speaking characters dialog file. Make sure to add them in Content\Characters\Dialogue\(name).xnb
$r | stands for "dialogueResponse". check $q for more information.
{ | stands for "breakSpecialCharacter", currently undocumented what this does. 
@ | when used in text it is replaced by the players name.
^ | This is a "Gender switch". Before the switch is for male, after is for female. Ex: "Oh, good morning Mr. @!^Oh, good morning Ms. @!"
\* | stands for "quickResponseDelineator", currently undocumented what this does. 
%adj | is replaced by a random adjective.
%noun | is replaced by a random noun.
%place | is replaced by a random place. seems to be unused?
%spouse | if married this (should) return the name of the players spouse. Seems to be unused?
%name | stands for "randomNameSpecialCharacter". Seems to return a random name? 
%firstnameletter | stands for "firstNameLettersSpecialCharacter". Unused?
%time | returns current time.
%band | unused?
%book | unused?
%rival | unused?
%pet | returns pet name.
%farm | returns farm name
%favorite | returns favorite thing? unused?
%fork | Seems to have to do with questions and forks, however is used sparingly in originals game code. seems to be replaced with the actual question command.
%kid1 | returns the name of your first child.
%kid2 | returns the name of your second child.

<small>³ while $h, $s, $u, $neutral, $l and $a on the faces, so do $0 and up. However these have to be at the end of a sentence. if $1 is used at the start of a sentence it is instead used as the "dialogueSingle" command.</small>

Currently undocumented commands:
advancedMove

## Song and Sound title list

## Mail events

TODO: Add list of all known song and sound titles!
TODO2: Add documentation for mail events!

## See also
* [JavaScript to parse an event precondition string](https://gist.github.com/Pathoschild/95efc5ba5a23dc2c4da219ca2ddde679)
