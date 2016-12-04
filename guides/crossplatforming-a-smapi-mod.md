---
layout: default
title: Crossplatforming a SMAPI mod
intro: >
   This page explains how to make a mod compatible with Linux, Mac, and Windows. This guide
   assumes you're already familiar with SMAPI development; if not, see
   <em><a href="/guides/creating-a-smapi-mod">creating a SMAPI mod</a></em> instead.<br />
---

## What's different between Linux/Mac and Windows?
Stardew Valley uses [MonoGame](http://www.monogame.net/) on Linux/Mac, and [XNA Framework](https://en.wikipedia.org/wiki/Microsoft_XNA)
on Windows. Although MonoGame is highly compatible with XNA Framework, the mapping isn't perfect —
some APIs are slightly different, and their internal implementations are often different. This has
several implications for mods:

* The mod needs to reference the right framework (e.g. a mod that references XNA won't
  work on Linux/Mac).
* In some cases, the mod code needs to use the right method signature (which means it needs
  to be compiled in the target OS).
* Any mod that uses reflection to access private MonoGame/XNA code may need to handle differences
  in their implementation.

In addition, there are differences between Linux, Mac, and Windows themselves which affect mods
(for example, file paths are formatted differently).

## What you need to do
Most mods will work fine no matter which platform they were compiled on. SMAPI uses dark magic to
dynamically rewrite the compiled mods for compatibility with the player's computer, so you often
don't need to worry about it. However, SMAPI only handles the common cases — it doesn't try to handle _every_ possible difference.
Rarely, you may need to adjust your code for compatibility or even compile two different versions
(one for Linux/Mac and one for Windows).

Here's how to maximise compatibility:

1. **Always** use `Path.Combine` to build file paths. Don't hardcode path separators like `\` or `/`,
   since that won't work on all platforms.
2. Use the [crossplatform build config](https://github.com/Pathoschild/Stardew.ModBuildConfig#readme)
   package to automatically set up your project references. This makes crossplatform compatibility
   easier, _and_ makes it easier to compile your code on any platform.
3. Avoid using reflection to access internal MonoGame/XNA code when possible.
4. Ideally, test your mod on both Linux (or Mac) and Windows. (See the next section.)

## Testing a mod on all platforms
If you want to test your mod on all platforms, there's some first-time setup you need to get out of
the way. Essentially you need to test your mod twice: once on Windows, and again on Linux or Mac.
You can do that by testing one version on your computer, and the other in a virtual machine.

### If your main computer is Windows

1. Install [VirtualBox](https://www.virtualbox.org/).
2. Add [this premade Linux virtual machine](https://www.dropbox.com/s/nrq9xsde2afp4ey/StardewValleyLinuxModding.7z)
   (requires a 64-bit computer).  
   _<small>In VirtualBox, click Machine » Add and choose the downloaded `.vbox` file. This is a
   [Manjaro](https://manjaro.org/) virtual machine with Chromium (web browser), Steam, and
   [MonoDevelop](http://www.monodevelop.com/) preinstalled.</small>_
4. Launch the virtual machine, and install Stardew Valley from the Steam client (preinstalled) or GOG website.  
   _<small>Tip: don't change the default install path, or you'll need to customise the mod's build
   configuration.</small>_

### If your main computer is Linux or Mac

1. Install [VirtualBox](https://www.virtualbox.org/).
2. [Create a VM with Windows](http://www.macworld.co.uk/how-to/mac-software/run-windows-10-on-your-mac-using-virtualbox-3621650/).
3. Install [Visual Studio Community](https://www.visualstudio.com/vs/community/) in your VM.
4. Install Stardew Valley in your VM.

## Compiling per-platform packages
**You usually don't need to do this!** Only do this if your mod isn't rewritten correctly by SMAPI.

### Using a virtual machine

1. Compile one version on your main computer.
2. Compile another version in your virtual machine (see previous section).
3. Create three archives with your mod's name, version, and platform. (To reduce confusion, it's
   better to create separate packages for Linux and Mac even though they're identical.)

You should end up with three archive files like this:

```
PineappleMod-1.2-Windows.zip
   PineappleMod/
      PineappleMod.dll
      PineappleMod.pdb
      manifest.json

PineappleMod-1.2-Linux.zip
   PineappleMod/
      PineappleMod.dll
      PineappleMod.mdb
      manifest.json

PineappleMod-1.2-Mac.zip
   PineappleMod/
      PineappleMod.dll
      PineappleMod.mdb
      manifest.json
```

Done! For more information on releasing your mod, see _[creating a SMAPI mod: releasing your mod](creating-a-smapi-mod#releasing-your-mod)_.

### Using experimental cross-compiling
Instead of compiling your packages using a virtual machine, you can cross-compile from the same
machine. This works on any platform, but hasn't been extensively tested. Note that you may still
need a virtual machine to test your mod on both Linux/Mac and Windows.

For more information, see the [SDVCrosscompile project](https://github.com/rumangerst/SDVCrosscompile).
The rest of this section shows one way of using it, but there are other options including
integrated into Visual Studio or MonoDevelop.

#### First-time setup

1. Install [Mono](http://www.mono-project.com/).
2. Install [Python 3](https://www.python.org/). Make sure to enable the option that adds it to your
   path or environment variables.
3. Download [SDVCrosscompile](https://github.com/rumangerst/SDVCrosscompile/releases) into its own
   folder somewhere.
4. In the mod folder, create the compile script:
   * On Linux or Mac, create a `compile-packages.sh` file containing this command:

     ```
     /path/to/xcompile.sh --output "compiled-packages"
     ```

     Don't forget to `chmod +x` the file so it's executable.

   * On Windows, create a `compile-packages.bat` file containing this command:

     ```
     C:\path\to\xcompile.bat --output "compiled-packages"
     ```

#### Preparing a mod release

When you want to compile the mod, just run the `compile-packages` script you created above. This
will create three mod packages in a folder named `compiled-packages`.

For more information and for support, see the [SDVCrosscompile project](https://github.com/rumangerst/SDVCrosscompile).
