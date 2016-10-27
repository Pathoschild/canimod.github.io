---
layout: default
title: Asking for help
intro: This page explains how to ask for help when something goes wrong with a mod.
---

## Where to report a problem
These are the best ways to contact the mod author:

1. the discussion thread linked to on the mod page (if any);
2. the 'bugs' section on the Nexus mod page (if any);
3. otherwise contact the author directly (e.g. use the 'Contact' button on the Nexus mod page).

If you can't contact the author or they never respond, you can try asking the community by
[posting in this thread](http://community.playstarbound.com/threads/dos-and-donts-of-reporting-issues-with-smapi-mods.125211/)
or [chatting in Discord](https://discord.gg/KCJHWhX).

## Information to include
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

3. Cause the problem again (so any details are in the log), then attach copy of the latest log file.
   Here's where you can find it:

     | Platform | Path  |
     |:-------- |:----- |
     | Windows  | `%appdata%\StardewValley\ErrorLogs\MODDED_ProgramLog.Log_LATEST.txt`<br /><small>(Paste "`%appdata%`" into the address bar, Windows knows where it is.)</small>
     | Linux    | `~/.config/StardewValley/ErrorLogs/MODDED_ProgramLog.Log_LATEST.txt`<br /><small>(The folder is hidden by default. From Files, click _Go » Enter Location_ and enter "~/.config".)</small>
     | Mac      | `~/.config/StardewValley/ErrorLogs/MODDED_ProgramLog.Log_LATEST.txt`<br /><small>(The folder is hidden by default. From Finder, click _Go » Go to Folder_ and enter "~/.config".)</small>
