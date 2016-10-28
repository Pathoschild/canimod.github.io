---
layout: default
title: Crossplatforming a SMAPI mod
intro: This page explains how to take an existing mod and make it compatible with Linux, Mac, and Windows. This guide assumes you're already familiar with SMAPI development; if not, see <em><a href="/guides/creating-a-smapi-mod">creating a SMAPI mod</a></em> instead.
---

## Making a mod crossplatform
_If the mod already uses the crossplatform build configuration (e.g. because you used the _[creating a
SMAPI mod](creating-a-smapi-mod)_ guide to make it), you can skip this section._


Making a mod compile on Linux, Mac, and Windows is pretty straightforward now.

1. Download the mod's source code.  
   <small>_Warning: if you're crossplatforming someone else's mod, get their permission before modifying
   and re-releasing their work._</small>
2. Remove any references to `Microsoft.Xna.*`, Stardew Valley, `StardewModdingAPI`, and `xTile`.
3. Reference the [`Pathoschild.Stardew.ModBuildConfig` NuGet package](https://www.nuget.org/packages/Pathoschild.Stardew.ModBuildConfig)
  (see [details](https://github.com/Pathoschild/Stardew.ModBuildConfig#readme)).

That's it! Most mods will compile fine on Linux, Mac, and Windows with those changes. (A few mods
might need further tweaks if they do unusual things.)

## Releasing a mod on multiple platforms
Packaging a mod for players on Linux, Mac, and Windows is a bit more work. The first-time setup is
tedious, but afterwards preparing mod releases is pretty easy.

Essentially you need to create two versions: one for Windows, and one for Linux and Mac. Each
version needs to be compiled for its target platform. This can be done via two different ways:

* Using a virtual machine and compile it there
* Cross-compilation on your current system with the correct libraries

Both variants still need you to download the Stardew Valley version of the other platform, so creating a virtual machine is unfortunately unavoidable.

## Setting up a virtual machine
We recommend [VirtualBox](https://www.virtualbox.org/) for creating virtual machines on your computer. Here we will show you the basic steps of setting them up. If there are problems, you can find plenty of tutorials or talk with us on Discord.

### Linux virtual machine (Windows users)

1. Install [VirtualBox](https://www.virtualbox.org/).
2. You can install [Ubuntu](https://brb.nci.nih.gov/bdge/installUbuntu.html), although you might run into problems with Steam. You can also use [Manjaro](https://manjaro.org/get-manjaro/), which comes with Steam preinstalled or any other distribution.
3. Install Stardew Valley in your VM.
4. Install [MonoDevelop](http://www.monodevelop.com/) in your VM.

We know that first time using and installing Linux is often overwhelming for most users who only know Windows. But don't worry: We've already prepared some useful shortcuts and tips for you:

* You can [download](https://drive.google.com/file/d/0B3c8rHzBL-BiQlViajdEeFJVMk0/view?usp=sharing) a pre-made Linux virtual machine that is already set up with all tools you need. It already includes Steam, MonoDevelop and other developer tools. Copy it into the [directory](http://superuser.com/questions/857177/where-is-virtualboxs-virtual-hard-disks-repository) where Virtual Box saves all its machines and start it.
* Getting software on Linux is different to Windows: You use the integrated tool (Octopi on the premade machine) to add/remove/update software.
* If some software won't start or just crashes, open a terminal and start the software from within it. This will print all errors. The terminal is *not* necessary to start software.
* The file manager (equivalent to Windows Explorer) supports, tabs, split-view, filtering and more useful functions
* Linux has Chromium, the browser Google modifies a little bit to build Chrome. It comes preinstalled in the premade machine.

### Windows virtual machine (Linux & Mac users)

1. Install [VirtualBox](https://www.virtualbox.org/).
2. [Create a VM with Windows](http://www.macworld.co.uk/how-to/mac-software/run-windows-10-on-your-mac-using-virtualbox-3621650/).
3. Install Stardew Valley in your VM.
4. Install [Visual Studio Community](https://www.visualstudio.com/vs/community/) in your VM.

## Compiling a crossplatform mod via virtual machine
1. Compile one version on your main computer.
2. Compile another version in your virtual machine.
3. Create two archives with your mod's name, version, and platform.

   For example, your mod structure should look something like this (`config.json` will only appear
   if you added settings):

   ```
   PineapplesEverywhere-1.2-Windows.zip
      PineapplesEverywhere/
         PineapplesEverywhere.dll
         PineapplesEverywhere.pdb
         config.json
         manifest.json
   ```

Done! For more information on packaging your mod, see _[creating a SMAPI mod: releasing your mod](creating-a-smapi-mod#releasing-your-mod)_.

## Compiling a crossplatform mod via cross-compiling
The current status of cross-compiling is that we only recently found out that it works. Currently we have a cross-platform tool that works on Linux, but also could work on Mac.

### Cross-compiling on Linux
You can download the [build scripts](https://github.com/rumangerst/StardewValleyMisc/releases/tag/crosscompile-linux-1.0) for cross-compiling on Linux. Then open the README.md file and follow the instructions.

You'll need to gather some files like the XNA runtime (You can use WINE), SMAPI and other libraries. Also do this for Linux. For Mac you can just copy the files for Linux as there's no difference according to current knowledge.

This tool includes support for [SilVerPLuM](https://github.com/rumangerst/SilVerPLuM) if you edit the entries in the Silverplum directory to match with your mod. You also have the option to ignore this.
