---
layout: default
title: Player's guide to using mods » intro
intro: >
   Welcome to Stardew Valley modding! This guide will help you install mods and
   fix any problems that come up.
permalink: /for-players/intro
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

## How do mods work?
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

## What are SMAPI, Storm, and Farmhand?
You need something that will load the mods and let them change the game. That something is commonly
called the _modding API_ for simplicity. The _de facto_ modding API is [SMAPI](https://github.com/Pathoschild/SMAPI),
which nearly all mods use. It's compatible with the latest versions of the game and decently
powerful. **This is the one you should use.**

When you look for mods, you might see two other names mentioned: _[Farmhand](https://github.com/ClxS/Stardew-Farmhand)_
is a powerful API that will replace SMAPI when it's released. It can run SMAPI mods (with a few
exceptions), but also offers abstraction APIs over the game to simplify mod development. _[Storm](http://community.playstarbound.com/threads/storm-modding-api.108484/)_
is a defunct API that was meant to replace SMAPI, but was never finished and is no longer
maintained.

The rest of this article will focus on SMAPI. You should not use Storm mods, and Farmhand isn't
released yet.

<div class="scroll-box" style="display: inline-block;">
<big><strong>next:</strong> <a href="/for-players/install-smapi">Install SMAPI →</a></big>
</div>