---
layout: default
title: Player's guide to using mods » intro
intro: >
   Welcome to Stardew Valley modding! This guide will help you install mods and
   fix any problems that come up.
permalink: /for-players/intro
movedToWiki: Modding:Player FAQs
--- 

<div class="scroll-box" style="float: right;">
    <strong>For players</strong>
    <ul>
        <li><strong>Intro</strong></li>
        <li><a href="/for-players/install-smapi">Install SMAPI</a></li>
        <li><a href="/for-players/use-mods">Use mods</a></li>
        <li><a href="/for-players/faqs">Troubleshooting & FAQs</a></li>
    </ul>
</div>

## What are mods?
A _mod_ is just a package of files which changes Stardew Valley in some way. Mods can add features
(like showing NPCs on the map), change game mechanics (like making fences decay more slowly), make
cosmetic changes (like making your house look like a hobbit home), and more.

There are generally two types of mods:

* **SMAPI mods** use SMAPI (a modding API) to run code within the game. These mods are powerful and
  convenient. After installing SMAPI, you can install mods by dropping them into a folder and
  uninstall them by deleting their folder. You can use multiple SMAPI mods, and they'll rarely
  conflict. Ideally you would only use SMAPI mods, but there are a few things they can't do yet.
* **XNB mods** replace the game's data files (which have an `.xnb` extension, thus the name).
  These are harder to manage (you'll need to keep track of which files you overwrote and keep
  backups), and you can't use two mods that change the same files. These are often used to change
  images in the game, which is currently harder with SMAPI.

If you're just starting out, you should avoid XNB mods. It's easier for something to go wrong with
those, and harder to fix when it does. However, you can use XNB and SMAPI mods together.

## What is SMAPI?
[SMAPI](https://github.com/Pathoschild/SMAPI) is a modding API — it launches the game with mod
support and lets mods interact directly with the game code. It's safely installed alongside your
normal game, and you can uninstall it anytime.

## Common questions
### Can I use mods on Linux/Mac/Windows?
Yep. SMAPI is officially compatible with Linux, Mac, and Windows. You can use almost all mods on
any platform, since SMAPI rewrites them for compatibility.

### Are mods safe?
Mods are usually perfectly safe. SMAPI is installed alongside your game and doesn't change any of
the game files, so you can stop using it anytime. Most mods don't affect your save file, so you can
add or remove them at will. It's a good idea to back up your save files even if you don't use mods
(save problems are almost always caused by the game itself).

<div class="scroll-box" style="display: inline-block;">
<big><strong>next:</strong> <a href="/for-players/install-smapi">Install SMAPI →</a></big>
</div>