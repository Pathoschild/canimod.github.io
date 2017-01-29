---
layout: default
title: Creating an XNB mod
intro: >
    This page explains how to edit textures and sprites by replacing XNB files.
    <p class="warning">
    This guide is still very new and may have inaccuracies. Use at your discretion, and
    <a href="https://github.com/Pathoschild/canimod.github.io#ways-to-contribute">feel free to contribute</a>
    any corrections and improvements.
    </p>
---

## Intro

### What are XNB mods?
A XNB mod involves altering game content files to either change the behavior of the map or change
the appearance of the map and what is on it. Unlike SMAPI mods, you don't need any coding knowledge
to make a successful mod. Within this guide you're going to learn how to create these mods and keep
them up to date.

### What can these mods do?
Contrary to what most people think, XNB mods can consist of more than just altered content. You can
create entirely new content and add it to the game. After taking your time and looking through the
game files you will notice that most xnb files come with a .yaml file that gives a little extra
detail to what exactly you're editting. When properly done you can change prices of items, seasons
plants grow in, how many items crops yield, or add a new plant entirely.

### What Do I Need?
In order to create a XNB mod you'll need the following:

* **_Starde Valley_**
* **_[XNB Node](http://www.mediafire.com/file/493zng05xjojb5s/XNBNode.zip)_**
* **_[tIDE Map Editor](http://tide.codeplex.com/downloads/get/716669)_** (For moving or altering a
  map/building)
* **_A decent paint software_** ([Paint.Net](http://www.getpaint.net/download.html) recommended as
  a free choice however any software with capabilities to edit and save .png files will suffice)
* **_A text editor_** (Notepad will work)

## Making the mod

### Setup required files
1. Download XNB Node.  
   _Extract all of the contents from the ZIP to your Stardew Valley folder._
2. Download and install tIDE.  
   _You can skip this step if you are only going to be editting the visual aspects of a file._
3. Download and install [Paint.Net](http://www.getpaint.net/download.html).  
   _Paint.Net is recommended however any image editting software will get the job done._
4. Backup your 'Content' folder within Stardew Valley to a safe place.

### Find what you wish to change
Within Stardew Valley's folder is another folder named 'Content'. This is the location of anything
and everything you're ever going to need to change for a xnb mod. Most people have an idea of what
they would like to change before getting to this point so think of what you're looking for and find
it. _If you can't find the item you're looking for then please ask on the discord and you should
receive an answer within a few minutes_

##### After finding what you want to change
1. Copy the files you wish to edit to your clipboard (Hold CTRL while choosing files and you'll be
   able to choose numerous files)
2. Paste these files into the 'Before' folder I included in the Xnb Node zip which should be
   extracted in your Stardew Valley folder.
3. Once pasted the fun begins, go back to the Stardew Valley folder and locate "extract.bat",
   double click to run the batch file and wait for the window to disappear
4. Assuming there was no errors there should be the unpacked files within the "after" folder.  
   _If no files were made then go back and make sure you copy and pasted .xnb files into the
   "before" folder_
5. Make your edits to the files. An unpacked .xnb will include a .png, or .tbin file along with a
   .yaml. For your first mod I'd recommend changing a .png and working up from there. tbin files
   are for tIDE and .yaml files contain sensitive info that if tampered with incorrectly will cause
   the files to be unable to repack.
6. Save your changes once done editting then proceed to use the "pack.bat" file located in the
   Stardew Folder. This will place your editted files into the "complete" folder, however they will
   be repacked into their xnb forms so that Stardew will recognize the content.
7. Copy your new files from the "complete" folder and paste them back into the original location
   you discovered them.  
   _If you lose track of where you obtained a file feel free to reference this document displaying
   the [content folder hierarchy](https://docs.google.com/document/d/1XinJ7vP-SvRZdMJPu8gxvWsSJAjzkcONUZftrH-eJvs/edit)_
8. After placing the newly modified xnb files back into the content folder in the correct place you
   will be able to run the game and see your content in action.  
   _If you are using SMAPI you will be able to see any game errors that might be caused by your new
   mod and address them._

### Where can I get help?
The Stardew Valley modding community is very welcoming. Feel free to
[come chat on Discord](https://discord.gg/kH55QXP) or
[post in the forums](http://community.playstarbound.com/forums/mods.215/).

### Planned
 - Adding Pictures to XNB Guide
 - Fixing up hierarchy doc
 - Advanced .tbin modifications guide
 - TileSheet modification guide
