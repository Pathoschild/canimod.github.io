---
layout: default
title: Using mods
intro: >
   Welcome to Stardew Valley modding! This guide will help you install mods and
   troubleshoot problems.
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
SMAPI is the tool which launches the game with mods (which are [downloaded separately](#using-mods)).
It's safely installed alongside your normal game, and you can uninstall it anytime. To update SMAPI,
just install the latest version.

### On Windows
1. Download the [latest version of SMAPI](https://github.com/ClxS/SMAPI/releases).
2. Extract the `.zip` file somewhere (but not in your game folder!).
3. Double-click `install.exe`, and follow the on-screen instructions.  
   _The installer will detect your game and add SMAPI for you._
4. To play with mods, you need to launch the `StardewModdingAPI.exe` that was added to your game folder (not the one in the installer folder).  
   * **Scenario A: you launch the game through Steam:**
     1. In the Steam client, right-click _Stardew Valley_ and choose _Properties_.
     2. Click _Set Launch Options_.
     3. Enter `StardewModdingAPI.exe %command%`
     4. Save your changes.  
        _From now on, launching the game through Steam will run SMAPI. The Steam overlay and
        achievements should work fine._
   * **Scenario B: you launch the game through a shortcut:**
     1. Right-click on the shortcut and choose _Properties_.
     2. In the 'Target' box, change `Stardew Valley.exe` to `StardewModdingAPI.exe`.  
        _From now on, using the shortcut will run SMAPI._

That's it! To remove SMAPI later, just run `install.exe` again and choose _uninstall_. (Don't
forget to undo your step 4 changes.)

### On Linux
1. Download the [latest version of SMAPI](https://github.com/ClxS/SMAPI/releases).
2. Extract the `.zip` file somewhere (but not in your game folder!).
3. Open a terminal in the extracted folder and run `mono install.exe`.  
   _The installer will detect your game and add SMAPI for you. (If you get an error like
   'mono: command not found', you need to install [Mono](http://www.mono-project.com/).)_

That's it! Just launch the game to play with mods. To remove SMAPI later, run `mono install.exe`
again and choose _uninstall_.

### On Mac
1. Download the [latest version of SMAPI](https://github.com/ClxS/SMAPI/releases).
2. Extract the `.zip` file somewhere (but not in your game folder!).
3. Open a terminal in the extracted folder and run `mono install.exe`.  
   _Here's how: (1) open the Terminal app; (2) type `mono` then a space; (3) drag & drop the
   `install.exe` file onto the Terminal window to paste its file path; (4) press enter on your
   keyboard._  
   _(If you get an error like 'mono: command not found', you need to install
   [Mono](http://www.mono-project.com/) first.)_

That's it! Just launch the game to play with mods. To remove SMAPI later, run `mono install.exe`
again and choose _uninstall_.

### Manual install (not recommended)
The installer is the recommended way to install SMAPI, but you can also install it manually.

1. Download the [latest version of SMAPI](https://github.com/ClxS/SMAPI/releases).
2. Unzip the `.zip` file somewhere.
3. Copy the files from the `Mono` folder (if Linux/Mac) or `Windows` folder (if Windows) into
   [your game folder](http://canimod.com/guides/smapi-faq#game-folder). If you did it properly, the
   `StardewModdingAPI.exe` file should be right next to the game's executable.
4. Make sure the game launches with SMAPI.
   * **Scenario A: you play on Windows:**  
     See [step 4 in the Windows instructions](#on-windows).
   * **Scenario B: you play on Linux or Mac:**  
     1. Open the game folder.
     2. Rename the `StardewValley` file (with no extension) to `StardewValley-original`.
     3. Rename the `StardewModdingAPI` file (with no extension) to `StardewValley`.

## Using mods
If you've done everything above, the hard part is done!

### Downloading mods
There are two main places to download mods:

* [Nexus Mods](http://nexusmods.com/stardewvalley/) has a huge repository of mods available.
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

### Adding mods
To install a mod, just unzip it into the `Mods` folder inside
[your game folder](http://canimod.com/guides/smapi-faq#game-folder). Make sure each mod has its own
subdirectory; for example, if you have a `PineapplesEverywhere` mod, you should have a file
structure like this:

```
<game folder>
   Mods/
      PineapplesEverywhere/
         PineapplesEverywhere.dll
         manifest.json
```

### Removing mods
To uninstall a mod, just remove it from the `Mods` directory.

### Configuring mods
Some mods have a `config.json` file in their directory (see [_adding mods_](#adding-mods)). It
might be created the first time you launch the game with that mod. This file lets you customise
the mod settings.

To edit the `config.json` file, just open it in a text editor. Make sure the game isn't running
when you edit it, or your changes might not take effect. See a [basic guide to JSON](http://www.w3schools.com/js/js_json_syntax.asp);
basically make sure your values are surrounded by quotes (like `"value"`). You can use this
[JSON validator](https://jsonformatter.curiousconcept.com/) to make sure the format is correct.

## Troubleshooting
Oh no! Something went wrong with your mods.

1. See _[troubleshooting in the SMAPI FAQ](/guides/smapi-faq#troubleshooting)_ for solutions to
   common issues.
2. If that didn't work, see _[asking for help](/guides/asking-for-help)._
