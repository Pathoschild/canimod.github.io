---
layout: default
title: Player's guide to using mods » use mods
intro: >
   Welcome to Stardew Valley modding! This guide will help you install mods and
   fix any problems that come up.
permalink: /for-players/use-mods
---

<div class="scroll-box" style="float: right;">
    <strong>For players</strong>
    <ul>
        <li><a href="/for-players/intro">Intro</a></li>
        <li><a href="/for-players/install-smapi">Install SMAPI</a></li>
        <li><strong>Use mods</strong></li>
        <li><a href="/for-players/faqs">Troubleshooting & FAQs</a></li>
    </ul>
</div>

If you've followed the guide so far, you already [installed SMAPI](/for-players/install-smapi). The
hard part is done!

## Download mods
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

## Add or remove mods
To install a mod, just unzip it into the `Mods` folder inside
[your game folder](http://canimod.com/for-players/faqs#game-folder). Make sure each mod has its own
subdirectory; for example, if you have a `PineapplesEverywhere` mod, you should have a file
structure like this:

```
<game folder>
   Mods/
      PineapplesEverywhere/
         PineapplesEverywhere.dll
         manifest.json
```

To uninstall a mod, just remove it from the `Mods` directory.

## Configure mods
Some mods have a `config.json` file in their directory (see [_adding mods_](#adding-mods)). It
might be created the first time you launch the game with that mod. This file lets you customise
the mod settings.

To edit the `config.json` file, just open it in a text editor. Make sure the game isn't running
when you edit it, or your changes might not take effect. See a [basic guide to JSON](http://www.w3schools.com/js/js_json_syntax.asp);
basically make sure your values are surrounded by quotes (like `"value"`). You can use this
[JSON validator](https://jsonformatter.curiousconcept.com/) to make sure the format is correct.

<div class="scroll-box" style="display: inline-block;">
<big><strong>next:</strong> <a href="/for-players/use-mods">Troubleshooting & FAQs →</a></big>
</div>