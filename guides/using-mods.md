---
layout: default
title: Using mods
---

Welcome to Stardew Valley modding! Mods can be very rewarding, but they're also pretty anarchic.
This guide will help you install the prerequisities, download mods, and troubleshoot problems.

## Types of mods
There are generally two types of mods:

* **Asset mods** simply overwrite your game files. They work on any platform, but they're difficult
  to uninstall (since you'd need to restore the original game files), and two asset mods that
  change the same file can't be used at the same time.
* **SMAPI mods** use the SMAPI mod loader to interact with your game. These are very easy to
  install once SMAPI is set up (just drop them into the `Mods` folder), very easy to uninstall
  (just remove them), and there are rarely conflicts between different mods. Unfortunately these
  are limited to Windows players, though progress is being made towards Linux/Mac mods.

## Asset mods
Asset mods can be fragile — you shouldn't use them unless you're aware of the risks. If all else
fails, you may need to reinstall your game to restore the original game files. However, some things
just aren't possible without overwriting game files. If you want to use an asset mod, follow the
instructions from the mod page.

## SMAPI mods

### Install SMAPI
SMAPI mods use the [SMAPI](https://github.com/cjsu/SMAPI) ("Stardew Modding API") mod loader. It
extends Stardew Valley to let mods respond to events without actually changing the game code, so
you can stop using mods at any time.

Here's how to install it:

1. Make sure you're running the latest version of the game.
2. Download the [latest version of SMAPI](https://github.com/cjsu/SMAPI/releases).
3. Unzip the files into your game directory. Typical location:

   | Platform         | Path  |
   | ---------------- | ----- |
   | Steam on Windows | `C:\Program Files (x86)\Steam\steamapps\common\StardewValley` |
   | GOG on Windows   | `C:\Program Files (x86)\GalaxyClient\Games\Stardew Valley` |

4. Make sure to run `StardewModdingAPI.exe` instead of the default executable when you want to use
   mods.

### Downloading mods
Once you have SMAPI, [Nexus Mods](https://nexusmods.com/stardewvalley) is one of the best places to find
mods. You can also [discuss mods and modding in the official Stardew Valley forums](http://community.playstarbound.com/forums/mods.215/), where you can also download other mods.

(It is __strongly__ recommended you never use sites such as stardewvalleymods.net)

A few tips for downloading mods:

1. Make sure the mod still works with the latest version of the game. Many mods are abandoned after
   their authors stop playing. You can check by reading the latest messages (if on the forums) or
   checking the bugs/discussions/comments sections (if on Nexus Mods). If the author has stopped
   answering questions on the forums, that typically means the mod has been abandoned. If the mod
   wasn't updated after the last Stardew Valley update, it probably doesn't work anymore.
2. Try one mod at a time. That way if the game crashes, you know which one is broken.

### Using SMAPI on Steam

You can configure Steam to load the StardewValleyAPI directly. To do so, follow these steps

1. Go to Steam, and right click Stardew Valley. Click on Properties
2. Click 'Set Launch Options'
3. If you have it installed in the default location, your command will be: ```"C:\Program Files (x86)\Steam\steamapps\common\Stardew Valley\StardewModdingAPI.exe" %command%``` (replace the file path wherever your stardew valley is installed.)

### Having trouble?
*TODO*
