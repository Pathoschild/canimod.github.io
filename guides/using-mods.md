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
is a powerful API that will replace SMAPI when it's released. It can run SMAPI mods (with a few
exceptions), but also offers abstraction APIs over the game to simplify mod development. _[Storm](http://community.playstarbound.com/threads/storm-modding-api.108484/)_
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
   | GOG      | `C:\Program Files (x86)\GalaxyClient\Games\Stardew Valley` |
   | Steam    | `C:\Program Files (x86)\Steam\steamapps\common\StardewValley` |

That's it. Just launch `StardewModdingAPI.exe` instead of the default executable to use the game
with mods.

If you play the game through Steam, you can configure Steam to launch SMAPI directly:

1. In the Steam client, right-click Stardew Valley and choose _Properties_.
2. Click _Set Launch Options_.
3. Enter the following command, including the quotes. (Correct the path if needed.)

   ```
   "C:\Program Files (x86)\Steam\steamapps\common\Stardew Valley\StardewModdingAPI.exe" %command%
   ```

### On Linux
<p class="warning">
Linux support is experimental. If you run into any problems or need help, come <a href="https://discord.gg/KCJHWhX">ask us on Discord</a>. :)
</p>

1. Make sure you're running the latest version of the the game.
2. Find your game directory (which has the `StardewValley.exe` file). Typical locations:

   | Platform | Path  |
   |:-------- |:----- |
   | GOG      | `~/GOG Games/Stardew Valley/game` |
   | Steam    | `~/.local/share/Steam/steamapps/common/Stardew Valley` |

3. Rename `StardewValley` in your game directory to `StardewValley.unmodded`.
4. Unzip the [latest version of SMAPI for Linux](https://github.com/vizv/SMAPI/releases) (unofficial) into your game directory.

That's it. Just launch Stardew Valley normally to use the game with mods. You can stop using mods
anytime by running `StardewValley.unmodded` instead.

### On Mac
<p class="warning">
Mac support is experimental. If you run into any problems or need help, come <a href="https://discord.gg/KCJHWhX">ask us on Discord</a>. :)
</p>

1. Make sure you're running the latest version of the the game.
2. Find your game directory (which has the `StardewValley.exe` file). Typical locations:

   | Platform | Path  |
   |:-------- |:----- |
   | GOG      | _unknown_ (let us know!) |
   | Steam    | `~/Library/Application Support/Steam/steamapps/common/Stardew Valley/Contents/MacOS` |

3. Rename `StardewValley` in your game directory to `StardewValley.unmodded`.
4. Unzip the [latest version of SMAPI for Mac](https://github.com/MacLeek/SMAPI/releases) (unofficial) into a temporary directory.
4. Open the `SMAPIMAC` directory (so you see `StardewModdingAPI.exe` and other files).
5. Copy all the files in that directory into your game directory.

That's it. Just launch Stardew Valley normally to use the game with mods. You can stop using mods
anytime by running `StardewValley.unmodded` instead.

## Downloading & installing mods
If you've done everything above, the hard part is done! To install a mod, just unzip it into the
game's `Mods` folder. To uninstall a mod, just delete it from the `Mods` folder.

<p class="warning">
<strong>Note:</strong> if you're playing on Linux or Mac, make sure the mod has a Linux/Mac version
or specifies Linux/Mac compatibility. SMAPI mods need to be compiled specifically for Linux and Mac.
Most mods are still Windows-only since Linux/Mac modding is new.
</p>

There are two main places to download mods:

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

## What to do when something breaks
Oh no! Something went wrong with your mods. Let's try to fix it yourself, then we'll ask the mod
developer if we can't.

### Fixing it yourself
Let's run through a quick checklist:

1. Are you running the latest Stardew Valley and SMAPI? Your current versions are listed at the top
   of the console window:

   > ![](images/using-mods/smapi-versions.png)
   
   Make sure "SDV Version" matches the [latest version of Stardew Valley](http://stardewvalleywiki.com/Version_History),
   and "SMAPI Version" matches the [latest version of SMAPI](https://github.com/cjsu/SMAPI/releases).
   If not, update them and try again.

2. Are you using a Stardew Valley mod manager? Those are still experimental, so they can cause
   problems. Try manually downloading the mod.

3. Are your mods in two places? (Some mod managers do that.) Make sure all your mods are in
   `<game install path>\Mods`; delete anything in `%appdata%\StardewValley\Mods` and try again.

### Asking for help
Couldn't fix it yourself? Most mod developers are happy to help, but they'll need some information
to figure it out.

1. Cause the problem again. (This makes sure any details are in the latest log.)
2. Choose how you'll contact the mod developer. Use any support forums, discussion threads, or the
   'bugs' section on Nexus Mods if possible. Otherwise try contacting the author directly (use the
   'Contact' button on the Nexus Mods page). If you can't contact the author (or they never respond),
   [post in this thread](http://community.playstarbound.com/threads/dos-and-donts-of-reporting-issues-with-smapi-mods.125211/)
   and someone else will help if they can.
3. Send them a message with the following information:
   * ❑ A copy of the log file at `%appdata%\StardewValley\ErrorLogs\MODDED_ProgramLog.Log_LATEST.txt`.
   * ❑ Which mod is failing?
   * ❑ How exactly does it fail? (Does the game close? Does the screen go black? Does nothing at
        all happen?)
   * ❑ What were you doing when it broke? Did you notice a pattern (e.g. it always breaks when you
        do X)?