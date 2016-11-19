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
or [chatting in Discord](https://discord.gg/KCJHWhX).

See also _[what information should I include in a bug report?](#bug-report)_

<span id="bug-report"></span>

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

<span id="error-log"></span>

### Where is my error log and how do I share it?
SMAPI's error log provides information useful for troubleshooting problems, including any errors
that occurred.

You can find your error log here:

| Platform | Path  |
|:-------- |:----- |
| Windows  | `%appdata%\StardewValley\ErrorLogs\MODDED_ProgramLog.Log_LATEST.txt`<br /><small>(Paste "`%appdata%`" into the address bar, Windows knows where it is.)</small>
| Linux    | `~/.config/StardewValley/ErrorLogs/MODDED_ProgramLog.Log_LATEST.txt`<br /><small>(The folder is hidden by default. From Files, click _Go » Enter Location_ and enter "~/.config".)</small>
| Mac      | `~/.config/StardewValley/ErrorLogs/MODDED_ProgramLog.Log_LATEST.txt`<br /><small>(The folder is hidden by default. From Finder, click _Go » Go to Folder_ and enter "~/.config".)</small>

Don't paste the whole log into your message! Instead attach it as a file, or send a [pastebin](http://pastebin.com/)
link.