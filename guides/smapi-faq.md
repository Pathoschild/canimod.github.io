---
layout: default
title: SMAPI FAQ
intro: This page is a quick reference for common questions about SMAPI.
redirect_from:
    - /guides/asking-for-help
---

## General

### How do I use mods and what is SMAPI?
See _[using mods](/guides/using-mods)_ for an introduction.

### How do I create my own mod?
See _[creating a SMAPI mod](/guides/creating-a-smapi-mod)_, which will walk you through creating
your first mod. This also contains references for experienced developers who just want to look up
the available events and features.

## Asking for help

### Where can I ask for help?
For help with a mod, the mod author is the best person to ask. These are the best ways to contact them:

1. the discussion thread linked to on the mod page (if any);
2. the 'bugs' section on the Nexus mod page (if any);
3. otherwise contact the author directly (e.g. use the 'Contact' button on the Nexus mod page).

For help with SMAPI, or if you can't ask the mod author, you can try asking the community by
[posting in this thread](http://community.playstarbound.com/threads/dos-and-donts-of-reporting-issues-with-smapi-mods.125211/)
or [come chat in Discord](https://discord.gg/kH55QXP).

See also _[what information should I include in a bug report?](#bug-report)_

<section class="anchor" id="bug-report"></section>

### What information should I include in a bug report?
Figuring out why something went wrong for someone else can be tough, so it helps if you include
as much information as possible. Here's the most useful information you can give.

1. Describe your problem:
   * Which mod has an issue?
   * What is the problem? Be as descriptive as possible. (Does the game freeze or close? Does the
     screen go black? Does nothing at all happen?)
   * What were you doing when it broke? Did you notice a pattern? For example, maybe it always
     breaks when you do a certain thing.
2. Describe your context:

   * Do you use a mod manager? If so, which one?
   * Do you play on Linux, Mac, or Windows?

3. Cause the problem again (so any details are in the log), then attach a copy of the latest log
   file.  
   (See _[Where is my error log and how can I share it?](#error-log)_)

<section class="anchor" id="error-log"></section>

### Where is my error log and how do I share it?
SMAPI's error log provides information useful for troubleshooting problems, including any errors
that occurred.

You can find your error log here:

Platform | Path
:------- |:-----
 Windows | `%appdata%\StardewValley\ErrorLogs\MODDED_ProgramLog.Log_LATEST.txt`<br /><small>(Paste "`%appdata%`" into the address bar, Windows knows where it is.)</small>
 Linux   | `~/.config/StardewValley/ErrorLogs/MODDED_ProgramLog.Log_LATEST.txt`<br /><small>(The folder is hidden by default. From Files, click _Go » Enter Location_ and enter "~/.config".)</small>
 Mac     | `~/.config/StardewValley/ErrorLogs/MODDED_ProgramLog.Log_LATEST.txt`<br /><small>(The folder is hidden by default. From Finder, click _Go » Go to Folder_ and enter "~/.config".)</small>

Don't paste the whole log into your message! Instead attach it as a file, or send a [pastebin](http://pastebin.com/)
link.

## Other

<section class="anchor" id="game-directory"></section>

### Where is my game directory?
The "game directory" is the directory that contains the `Stardew Valley.exe` or `StardewValley.exe`
file. The default locations are:

Platform | Path
:------- | :----
Windows  | GOG: `C:\Program Files (x86)\GalaxyClient\Games\Stardew Valley`<br />Steam: `C:\Program Files (x86)\Steam\steamapps\common\Stardew Valley`
Linux    | GOG: `~/GOG Games/Stardew Valley/game`<br />Steam: `~/.local/share/Steam/steamapps/common/Stardew Valley`
Mac      | GOG: _unknown_<br />Steam: `~/Library/Application Support/Steam/steamapps/common/Stardew Valley/Contents/MacOS`

If your game isn't in the default location, here's how to find it:

* If you have the GOG version:
  * Open the GOG Galaxy client.
  * In the game sidebar, right-click on _Stardew Valley_.
  * Choose _Manage Installation > Show Folder_ to open the game directory.

* If you have the Steam version:
  * Open the Steam client and go to the library view (the view that lists your games).
  * Right-click on _Stardew Valley_.
  * Click _Properties_.
  * Click the _Local Files_ tab.
  * Click the _Browse Local Files..._ button to open the game directory.

## Troubleshooting

<section class="anchor" id="trojan"></section>

### SMAPI contains a trojan?

* **Why does this happen?**  
  Some antivirus programs may warn you that SMAPI contains a trojan with scary names like
  "Peals.A!cl". Don't worry, SMAPI doesn't actually have a trojan. That warning is based on something
  called a _heuristic detection_ — basically the antivirus looked at the SMAPI code, and saw
  something trojan-like. That's because SMAPI can rewrite your mods so they work on your
  computer (mainly so players can use the same mods on Linux, Mac, or Windows). Rewriting files is
  something trojans also do, so your antivirus got suspicious.

* **How do I know it doesn't _really_ have a trojan?**  
  You can check! SMAPI is all open-source, so you can
  [read the code](https://github.com/Pathoschild/SMAPI) to make sure it's not doing anything shady.
  If you don't trust the download, you can [decompile it](https://www.jetbrains.com/decompiler/)
  and see what code it really contains.

* **How do I fix it?**  
  You just need to tell your antivirus that SMAPI is okay. How you do that depends on which program
  you use. Try searching online for your antivirus name with the words "add exception" to find
  answers.