---
layout: default
title: Using mods
intro: Welcome to Stardew Valley modding! This guide will help you install mods and troubleshoot problems.
---

## Some background

### What are mods?
A _mod_ is just a package of files which changes Stardew Valley in some way. Mods can add features
(like showing NPCs on the map), change game mechanics (like making fences decay more slowly), make
cosmetic changes (like making your house look like a hobbit home), and more.

### How do mods work?
In general, mods can be grouped into two types:

* **API mods** use a modding API to hook into the game. These mods are powerful and convenient.
  After some one-time setup, you install mods by dropping them into a folder and uninstall them by
  deleting their folder. You can use multiple API mods, and they'll rarely conflict. Ideally you
  would only use API mods, but there are a few things they can't do yet. Which leads us to...
* **File overwrite mods** replace core game files. These are difficult to uninstall (you'll need to
  recover the original game files), and you can't use two mods that change the same files. These
  are typically used to change images in the game, which is hard to do with the current modding
  APIs.

If you're just starting out, you should avoid file overwrite mods. It's easier for something to go
wrong with those, and harder to fix when it does. The rest of this page is about using API mods.

### What are SMAPI, Storm, and Farmhand?
You need something that will load the mods and let them change the game. That something is commonly
called the _modding API_ for simplicity. The _de facto_ modding API is [SMAPI](https://github.com/cjsu/SMAPI),
which nearly all mods use. It's compatible with the latest versions of the game and decently
powerful. **This is the one you should use.**

When you look for mods, you might see two other names mentioned: _[Farmhand](https://github.com/ClxS/Stardew-Farmhand)_
is a powerful API that will replace SMAPI when it's released. It can run SMAPI mods, but also
offers abstraction APIs over the game to simplify mod development. _[Storm](http://community.playstarbound.com/threads/storm-modding-api.108484/)_
is a defunct API that was meant to replace SMAPI, but was never finished and is no longer
maintained.

The rest of this article will focus on SMAPI. You should not use Storm mods, and Farmhand isn't
released yet.

## Installing SMAPI
SMAPI is the modding API which runs the game with mods. It's safely installed alongside your normal
game, and you can stop using mods anytime by just not running its launcher.

### On Windows
1. Make sure you're running the latest version of the game.
2. Download the [latest version of SMAPI](https://github.com/cjsu/SMAPI/releases).
3. Unzip the files into your game directory. Typical location:

   | Platform | Path  |
   |:-------- |:----- |
   | Steam    | `C:\Program Files (x86)\Steam\steamapps\common\StardewValley` |
   | GOG      | `C:\Program Files (x86)\GalaxyClient\Games\Stardew Valley` |

That's it. Just launch `StardewModdingAPI.exe` instead of the default executable to use the game
with mods. If you play the game through Steam, you can configure Steam to launch the modding API
directly:

1. In the Steam client, right-click Stardew Valley and choose 'Properties'.
2. Click 'Set Launch Options'.
3. Enter the following command, including the quotes. (Correct the path if needed.)

   ```
   "C:\Program Files (x86)\Steam\steamapps\common\Stardew Valley\StardewModdingAPI.exe" %command%
   ```

### On Linux or Mac
Mods aren't really supported on Linux/Mac yet (mainly due to the game's crossplatform differences).
There's some very promising developments on this front, and you may see mods becoming available
over the coming months. :)

## Downloading & installing mods
If you've done everything above, the hard part is done! To install a mod, just unzip it into the
game's `Mods` folder. To uninstall a mod, just delete it from the `Mods` folder.

There two main places to download mods:

* [Nexus Mods](https://nexusmods.com/stardewvalley) has a huge repository of mods available.
* [The official Stardew Valley forums](http://community.playstarbound.com/forums/mods.215/)
  is a good place to ask questions, and some mods are available there. It's a bit more ad hoc, but
  feel free to ask for help.
* Stardewvalleymods.net **is not recommended**. The site operates by stealing mods without
  permission and profiting from the ad revenue. To be fair, their site can be convenient: they
  repackage mods from many authors into one place, and you can search by game version to filter out
  abandoned mods. However, there's no guarantee they're hosting the latest version and there's very
  little oversight to prevent abuse. (Also, letting a company profit by stealing free work from
  volunteers is morally nebulous at best.)

A few tips for downloading mods:

1. Try one mod at a time. That way if the game crashes, you know which one is broken.
2. Make sure the mod still works with the latest version of the game. Many mods are abandoned after
   their authors lose interest. There are a few ways to find out:
   * Does the mod description say which game versions it's compatible with?
   * When you look at the latest comments for that mod, are several people saying it doesn't
     work anymore? If so, it probably won't work for you either.
   * Ask! The next player will thank you. If the author never responds, the mod is probably
     abandoned.

## Troubleshooting mods
*TODO*
