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
version needs to be compiled on its target platform; for example, the Linux/Mac version must be
compiled on a Linux or Mac. We can do that by compiling one version on your computer, and the other
in a virtual machine.

### First-time setup
If your main computer is Windows, create a Linux virtual machine (VM):

1. Install [VirtualBox](https://www.virtualbox.org/).
2. [Create a VM with Ubuntu](https://brb.nci.nih.gov/bdge/installUbuntu.html).
3. Install Stardew Valley in your VM.
4. Install [MonoDevelop](http://www.monodevelop.com/) in your VM.

If your main computer is Mac or Linux, create a Windows virtual machine (VM):

1. Install [VirtualBox](https://www.virtualbox.org/).
2. [Create a VM with Windows](http://www.macworld.co.uk/how-to/mac-software/run-windows-10-on-your-mac-using-virtualbox-3621650/).
3. Install Stardew Valley in your VM.
4. Install [Visual Studio Community](https://www.visualstudio.com/vs/community/) in your VM.

### Compiling a crossplatform mod
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
