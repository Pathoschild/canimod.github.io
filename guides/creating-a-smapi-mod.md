---
layout: default
title: Creating a SMAPI mod
intro: > 
   Ready to make your own mod? This page will help you create your first mod and document the
   available APIs and events.
---

## Quick start
The rest of this page will help you create a mod. If you're experienced enough to skip the tutorial,
here's a quick summary of what this page will walk you through:

1. Create an empty C# library project.
2. Target .NET Framework 4.5 (for Linux compatibility).
3. Reference the [`Pathoschild.Stardew.ModBuildConfig` NuGet package](https://github.com/Pathoschild/Stardew.ModBuildConfig)
   to automatically add the right references depending on the platform the mod is being compiled on.
4. Create an entry class which subclasses `StardewModdingAPI.Mod`.
5. Override the `Entry` method, and write your code using the [SMAPI events and APIs](#mod-apis).
6. Create a [`manifest.json` file](#creating-your-mod-manifest) which describes your mod for SMAPI.
6. Create [a zip file containing the mod files](#sharing-your-mod) for release.

## Introduction

### What is a SMAPI mod?
A SMAPI mod uses the [SMAPI](https://github.com/cjsu/SMAPI) modding API to extend the game logic.
You can run code when something happens (e.g. mouse clicked or menu opened), or periodically (e.g.
once per game tick).

SMAPI mods are written in C# using the .NET Framework. Stardew Valley also uses XNA (on Windows) or
MonoGame (on Linux and Mac) for the fundamental game logic (drawing to the screen, user input, etc).

### Am I qualified to make a SMAPI mod?
If you're an experienced developer, you should be fine; if you have little or no experience, there
are two general requirements:

* Determination. Even with no development experience, you can learn along the way. You should be
  prepared for a steep learning curve depending on the scope of your mod, and be ready to look
  things up or ask for help sometimes. Many mod developers started with little or no development
  experience. Don't be too ambitious at first; it's better to start with a small mod when you're
  figuring it out. It's easy to become overwhelmed at first and give up. The modding community is
  very welcoming, so don't be afraid to ask questions!
* A good sense of logic or puzzle solving. You may need to read and understand portions of the
  decompiled game code, which can be dense. It's sometimes more difficult to do something in a mod,
  because you also need to work around the game which isn't designed to be extended.

Those requirements aren't absolute — for some simple mods, you might not need to read any game code
at all, for example. If you're not sure how hard something will be, try asking an experienced mod
developer.

Here are some things which are **not** required:

* Development experience in C# or Java. That will make things much easier for you, though — you're
  already familiar with their concepts of object-oriented programming, organising your code, and
  ideally source control. C# and Java are close enough that Java experience transfers well.
* A good grasp of math. You'll mainly use math for positioning when drawing to the screen, and
  that's mostly adding/subtracting offsets or multiplying for pixel zoom.

The next few sections will walk you through creating a very simple mod. If you follow along, you'll
have created a mod! All that will be left is making it do what you want. :)

<span id="help"></span>

### What do I need?
Before you start:

* You should read _[using mods](using-mods)_ to learn the basic concepts and install SMAPI.
* You should install:
  * Stardew Valley;
  * SMAPI;
  * and [Visual Studio Community](https://www.visualstudio.com/vs/community/) (on Windows) or
    [MonoDevelop](http://www.monodevelop.com/) (on Linux/Mac).
* You should familiarise yourself with the code editor (Visual Studio or MonoDevelop), since this
  guide won't cover its basic usage. If you've never used it before, consider following some
  'getting started' tutorials first. You may occasionally need to look things up.


### Where can I get help?
The Stardew Valley modding community is very welcoming. Feel free [come chat on Discord](https://discord.gg/kH55QXP)
or [post in the forums](http://community.playstarbound.com/forums/mods.215/).

## Creating a minimal mod
A SMAPI mod is a compiled library (DLL) with an entry method that gets called by SMAPI, so let's
set that up.

### Creating the project structure

1. Open Visual Studio or MonoDevelop.
2. Create a new solution with a library project.
   * <small>In Visual Studio, choose _Visual C# » Class Library_. (Make sure you choose "Class Library", **not** "Class Library (.NET Core)" or "Class Library (Portable)".)</small>
   * <small>In MonoDevelop, choose _Other » .NET » Library_.</small>
3. Change the target framework to .NET 4.5 (for compatibility with Linux).
   * <small>In Visual Studio: right-click on the project, choose _Properties_, click the
     _Application_ tab, and change the _Target framework_ dropdown to _.NET Framework 4.5_.</small>
   * <small>In MonoDevelop: right-click on the project, choose _Options_, click the _Build »
     General_ tab, and change the _Target framework_ dropdown to _Mono / .NET 4.5_.</small>
3. Delete the `Class1.cs` or `MyClass.cs` file.

### Configuring the build

1. Reference the [`Pathoschild.Stardew.ModBuildConfig` NuGet package](https://github.com/Pathoschild/Stardew.ModBuildConfig).
   This will automatically configure your project to load the right modding dependencies for the
   current platform, so your mod can be built on Linux, Mac, or Windows. It also adds support for
   debugging the mod in-game.
   * <small>In Visual Studio: click _Tools » NuGet Package Manager » Manage NuGet Packages for
     Solution_ and search for `Pathoschild.Stardew.ModBuildConfig`. Select the package named
     _MSBuild config for Stardew Valley mods_, check the box next to your project, and click the
     _Install_ button.</small>
   * <small>In MonoDevelop: click _Project » Add NuGet Packages_ and search for
     `Pathoschild.Stardew.ModBuildConfig`. Select the package named _MSBuild config
     for Stardew Valley mods_ and click _Add Package_.</small>

That's all you need (usually). Try building the project; if you get an error that says "failed to
find the game install path automatically", your game is probably not installed to its default path.
You just need to specify where it is:

1. Open your `*.csproj` file for editing.
2. Right under the `<Project ...>` line, add this (with your install path):
  
   ```xml
   <PropertyGroup>
      <GamePath>your\path\to\Stardew Valley</GamePath>
   </PropertyGroup>
   ```

   That will add the path to the places it checks. It it doesn't exist, it'll fall back to the
   default paths, so your mod will still work on other computers (e.g. if someone else recompiles
   it on a different platform for you).

### Creating your mod manifest
The mod manifest tells SMAPI about your mod.

1. Add a file named `manifest.json` to your project.
2. Paste this code into the file (changing the `<..>` placeholders accordingly):

   ```json
   {
      "Name": "<your project name>",
      "Author": "<your name>",
      "Version": {
         "MajorVersion": 1,
         "MinorVersion": 0,
         "PatchVersion": 0,
         "Build": ""
      },
      "Description": "<One or two sentences about the mod>",
      "UniqueID": "<your project name>",
      "EntryDll": "<your project name>.dll"
   }
   ```
   This will listed in the console output when the game is launching.

### Writing your mod code
Almost done! Now for the code SMAPI will run.

1. Add a C# class file called `ModEntry.cs` to your project.
2. Put this code in the file (replace `<your project name>` with the name of your project):

   ```c#
   using StardewModdingAPI;
   using StardewModdingAPI.Events;
   using StardewValley;
   using Microsoft.Xna.Framework;

   namespace <your project name>
   {
       /// <summary>The mod entry point.</summary>
       public class ModEntry : Mod
       {
           /*********
           ** Public methods
           *********/
           /// <summary>Initialise the mod.</summary>
           /// <param name="helper">Provides methods for interacting with the mod directory, such as read/writing a config file or custom JSON files.</param>
           public override void Entry(IModHelper helper)
           {
               ControlEvents.KeyPressed += this.ReceiveKeyPress;
           }


           /*********
           ** Private methods
           *********/
           /// <summary>The method invoked when the player presses a keyboard button.</summary>
           /// <param name="sender">The event sender.</param>
           /// <param name="e">The event data.</param>
           private void ReceiveKeyPress(object sender, EventArgsKeyPressed e)
           {
               this.Monitor.Log($"Player pressed {e.KeyPressed}.");
           }
       }
   }
   ```

### Trying your mod

1. Build the project.
2. In the game's `Mods` directory, add a folder with your mod's name.
3. Copy your `manifest.json` and compiled files into the folder you created.
4. Run the game through SMAPI.

The mod so far will just send a message to the console window whenever you press a key in the game:

> ![example log output](images/creating-a-smapi-mod/keypress-log.png)

If that didn't work, something went wrong. Try reviewing the above instructions, or
[ask for help](#help). :)

## Mod APIs
Now that you have a basic mod, here are the SMAPI features you can use to do more.

### Events
<span id="available-events"></span>

SMAPI publishes several C# events that tell you when something happens. For example, if you want
to do something after the player loads their save, you can add this to your `Entry` method:

```c#
PlayerEvents.LoadedGame += this.ReceiveLoadedGame;
```

Then declare a method like this. (The `EventArgs e` argument will often provide more details about
what happened, if there are any.)

```c#
/// <summmary>The event handler called after the player loads their save.</summary>
/// <param name="sender">The event sender.</param>
/// <param name="e">The event arguments.</param>
public void ReceiveLoadedGame(object sender, EventArgs e)
{
   this.Monitor.Log("The player loaded their game! This is a good time to do things.");
}
```

Here are the available events:

* <span id="control-events"></span>
  **`ControlEvents`** are raised when the player uses a controller, keyboard, or mouse. They're
  raised before the game handles the input, so it's possible to selectively prevent the game from
  responding to it. (That's beyond the scope of this guide, but it involves overwriting
  `Game1.oldKBState`, `Game1.oldMouseState`, and `Game1.oldPadState`.)

  Most of these events are split into two variants, `XPressed` and `XReleased`. The `Pressed`
  variant is raised when the player presses the button (holding the button down only triggers the
  event once), and the `Released` variant is raised when they release it.

  | event | summary |
  |:----- |:------- |
  | ControllerButtonPressed<br />ControllerButtonReleased | Raised after the player pressed/released a button on a gamepad or controller. These events aren't raised for trigger buttons. |
  | ControllerTriggerPressed<br />ControllerTriggerReleased | Raised after the player pressed/released a trigger button on a gamepad or controller. |
  | KeyPressed<br />KeyReleased | Raised after the player pressed/released a keyboard key. |
  | KeyboardChanged | Raised after the game's `KeyboardState` changed. That happens when the player presses or releases a key. |
  | MouseChanged | Raised after the game's `MouseState` changed. That happens when the player moves the mouse, scrolls the mouse wheel, or presses/releases a button. |

* <span id="game-events"></span>
  **`GameEvents`** are raised when the game changes state.

  | event | summary |
  |:----- |:------- |
  | Initialize | Raised during launch after configuring XNA or MonoGame. The game window hasn't been opened by this point. Called from [XNA's `Game.Initialize` method](https://msdn.microsoft.com/en-us/library/microsoft.xna.framework.game.initialize.aspx). |
  | LoadContent | Raised before XNA loads or reloads graphics resources. Called from [XNA's `Game.LoadContent` method](https://msdn.microsoft.com/en-us/library/microsoft.xna.framework.game.loadcontent.aspx).
  | GameLoaded | Raised when the game is ready and initialised. At this point the game data (like `Game1.objectInformation`) is in memory and ready for use. |
  | UpdateTick | Raised when the game updates its state (≈60 times per second). |
  | SecondUpdateTick | Raised every other tick (≈30 times per second). |
  | FourthUpdateTick | Raised every fourth tick (≈15 times per second). |
  | EighthUpdateTick | Raised every eighth tick (≈8 times per second). |
  | QuarterSecondTick | Raised every 15th tick (≈4 times per second). |
  | HalfSecondTick | Raised every 30th tick (≈twice per second). |
  | OneSecondTick | Raised every 60th tick (≈once per second). |

* <span id="graphics-events"></span>
  **`GraphicsEvents`** are raised during the game's draw loop, when the game is rendering content
  to the window.

  | event | summary |
  |:----- |:------- |
  | OnPreRenderEvent<br />OnPostRenderEvent | Raised before and after drawing everything to the screen during a draw loop.
  | OnPreRenderGuiEvent<br />OnPostRenderGuiEvent | When a menu is open (`Game1.activeClickableMenu != null`), raised before and after drawing that menu to the screen. This includes the game's internal menus like the title screen. |
  | OnPreRenderHudEvent<br />OnPostRenderHudEvent | Raised before and after drawing the HUD (item toolbar, clock, etc) to the screen. The HUD is available at this point, but not necessarily visible. (For example, the event is called even if a menu is open.) |
  | Resize | Raised after the game window is resized. |
  | _other events_ | SMAPI has a few esoteric graphics events which probably shouldn't be used, so they're not documented here. |

* <span id="location-events"></span>
  **`LocationEvents`** are raised when the player transitions between game locations, a location is
  added or removed, or the objects in the current location change.

  | event | summary |
  |:----- |:------- |
  | CurrentLocationChanged | Raised after the player warps to a new location. Handlers are given the previous and new locations as arguments. |
  | LocationObjectsChanged | Raised after the list of objects in the current location changes (e.g. an object is added or removed). Handlers are given the new list of objects as an argument. |
  | LocationsChanged | Raised after a game location is added or removed. Handlers are passed the new list of locations as an argument. |

* <span id="control-events"></span>
  **`MenuEvents`** are raised when a game menu is opened or closed (including internal menus like
  the title screen).

  | event | summary |
  |:----- |:------- |
  | MenuChanged | Raised after a game menu is opened or replaced with another menu. This event is not invoked when a menu is closed. Handlers are given the previous menu (if any) and new menu (if any). |
  | MenuClosed | Raised after a game menu is closed. Handlers are given the previous menu. |

* <span id="mine-events"></span>
  **`MineEvents`** are raised when something happens in [The Mines](http://stardewvalleywiki.com/The_Mines).

  | event | summary |
  |:----- |:------- |
  | MineLevelChanged | Raised after the player warps to a new level of the mine. Handlers are passed the previous and new mine level as arguments. |

* <span id="player-events"></span>
  **`PlayerEvents`** are raised when the player data changes.

  | event | summary |
  |:----- |:------- |
  | LoadedGame | Raised after the player loads a saved game. |
  | FarmerChanged | Raised after the game assigns a new player character. This happens just before the `LoadedGame` event; it's unclear how this would happen any other time. |
  | InventoryChanged | Raised after the player's inventory changes in any way (added or removed item, sorted, etc). |
  | LeveledUp | Raised after the player levels up a skill. This happens as soon as they level up, not when the game notifies the player after their character goes to bed. |

  Notable bug: the `FarmerChanged`, `InventoryChanged`, and `LeveledUp` events are raised at various times
  before the game is loaded, when there's no character yet.

* <span id="time-events"></span>
  **`TimeEvents`** are raised when the in-game date or time changes.

  | event | summary |
  |:----- |:------- |
  | TimeOfDayChanged | Raised after the in-game clock changes. |
  | DayOfMonthChanged | Raised after the day-of-month value changes. Unlike `OnNewDay`, this method is called when loading a save (which starts the day) and when day changes outside the game's control (e.g. through a SMAPI mod). If the player transitions to the same day of month (e.g. fall 15 to winter 15), the event isn't triggered. |
  | SeasonOfYearChanged | Raised after the season changes. |
  | YearOfGameChanged | Raised after the year changes. |
  | OnNewDay | Raised when the player is transitioning to a new day and the game is performing its day update logic. This event is triggered twice: once after the game starts transitioning, and again after it finishes. Event handlers are passed a `newDay` argument which is `true` when the transition is beginning, and `false` when it's ended.<br/>Note: this event is not called after loading a save (which starts the day), nor if the day changes outside the game's control (e.g. through a SMAPI mod). |

### Configuration
You can let users configure your mod through a `config.json` file. SMAPI will automatically create
the file and take care of reading, normalising, and updating it.

Here's the simplest way to use `config.json`:

1. Create your model. This is just a class with properties for the config options you want, and it
   can contain almost anything from a few boolean fields to a complex object graph. (You should try
   to keep it simple for your users, though.)

   You can set defaults directly:

   ```c#
   class ModConfig
   {
      public bool ExampleBoolean { get; set; } = true;
      public float ExampleFloat { get; set; } = 0.5;
   }
   ```

   ...or with a constructor:

   ```c#
   class ModConfig
   {
      public bool ExampleBoolean { get; set; }
      public float ExampleFloat { get; set; }

      public ModConfig()
      {
         this.ExampleBoolean = true;
         this.ExampleFloat = 0.5;
      }
   }
   ```

2. In your `ModEntry::Entry` method, add this line to read the config options:

   ```c#
   ModConfig config = helper.ReadConfig<ModConfig>();
   ```

That's it! When the player launches the game, SMAPI will create the `config.json` file
automatically if it doesn't exist yet, using the default config options you provided in your model.

If you need to edit and save the config, you can use `helper.SaveConfig(config)`. You can access
the helper in other methods using `this.Helper`.

For more advanced config and JSON scenarios, see _[advanced configuration](creating-a-smapi-mod-advanced-config)_
which covers...

* adding custom JSON files;
* adding per-save JSON files;
* using a config wrapper for file I/O;
* overriding JSON serialization.

### Logging
Your mod can write messages to the console window and log file using the monitor. For example,
this code:

```c#
this.Monitor.Log("a trace message", LogLevel.Trace);
this.Monitor.Log("a debug message", LogLevel.Debug);
this.Monitor.Log("an info message", LogLevel.Info);
this.Monitor.Log("a warning message", LogLevel.Warn);
this.Monitor.Log("an error message", LogLevel.Error);
```

will log something like this:

<pre>
<span style="color:#666;">[18:00:00 TRACE Mod Name] a trace message</span>
<span style="color:#666;">[18:00:00 DEBUG Mod Name] a debug message</span>
<span style="color:black;">[18:00:00 INFO  Mod Name] an info message</span>
<span style="color:darkorange;">[18:00:00 WARN  Mod Name] a warning message</span>
<span style="color:red;">[18:00:00 ERROR Mod Name] an error message</span>
</pre>

Note that `LogLevel.Trace` messages won't appear in the console window by default, they'll only
be written to the log file. Trace messages are for troubleshooting details that are useful when
someone sends you their error log, but which the player normally doesn't need to see. (You can see
trace messages in the console if you install the "SMAPI for developers" version.)

### Reflection
<p class="warning">
This API is available in the upcoming SMAPI 1.4 release.
</p>

SMAPI provides an API for robustly accessing the game's private fields or methods. You can use it
from `helper.Reflection` in your entry method, or `this.Helper.Reflection` elsewhere in your
entry class. It consists of three methods:

* `GetPrivateValue<TValue>(...)` returns the value of a private field.
* `GetPrivateField<TValue>(...)` returns an object you can use to get or set a field's value.
* `GetPrivateMethod(...)` returns an object you can use to invoke a method.

Here are a few examples of what this lets you do:

```c#
// did you pet your pet today?
bool wasPet = reflection.GetPrivateValue<bool>(pet, "wasPetToday");

// what is the spirit forecast today?
string forecast = reflection
   .GetPrivateMethod(new TV(), "getFortuneForecast")
   .Invoke<string>();

// randomise the mines
if(Game1.currentLocation is MineShaft)
   reflection.GetPrivateField<Random>(Game1.currentLocation, "mineRandom").SetValue(new Random());
```

This works with static or instance fields/methods, caches the reflection to improve performance, and will
throw useful errors automatically when reflection fails.

If you need to do more, you can also switch to C#'s underlying reflection API:

```c#
FieldInfo field = reflection.GetPrivateField<string>(…).FieldInfo;
MethodInfo method = reflection.GetPrivateMethod(…).MethodInfo;
```

## Releasing your mod
Ready to share your mod with the world?

Let's say you created a mod named _Pineapples Everywhere_ which turns all NPCs into pineapples;
here's how you would release it for others to use.

### Sharing your mod
1. Copy your `manifest.json` and compiled files into a folder matching your mod's name (like
   `PineapplesEverywhere`). A few tips:
   * Only use letters in the folder name (no spaces or symbols) to simplify troubleshooting later.
   * Add your default `config.json` if you have settings, so users can edit it before first run.
   * Include the compiled `*.pdb` file, so error messages include line numbers.
2. Create a zip archive with your mod's name, version, and platform.

Your mod structure should look something like this:

```
PineapplesEverywhere-1.0-Windows.zip
   PineapplesEverywhere/
      PineapplesEverywhere.dll
      PineapplesEverywhere.pdb
      config.json
      manifest.json
```

The best places to share your mod are [Nexus Mods](http://www.nexusmods.com/stardewvalley) and
the [official modding forums](http://community.playstarbound.com/forums/mods.215/).

### Releasing on multiple platforms
Want to share your mod on Linux, Mac, and Windows? See _[crossplatforming a SMAPI mod](crossplatforming-a-smapi-mod)_.

## Decompiling the game code
When you start working on more complex mods, you may need to look at how the game code works.

Here's how to decompile the game code so you can look at it:

1. Open `StardewValley.exe` in [dotPeek](https://www.jetbrains.com/decompiler/).
2. Right-click on _Stardew Valley_ and choose _Export to Project_. Accept the default options to
   create a decompiled project you can open in Visual Studio. (Note that the decompiled code will
   not be functional due to limitations of the decompiler, but you'll be able to read the game code.)

Here's how to unpack the XNB data files:

1. Download the [Easy XNB Pack/UnPack Toolkit](http://community.playstarbound.com/threads/modding-guides-and-general-modding-discussion-redux.109131/page-6#post-2837587).
2. Copy the entire `Stardew Valley\Content` game folder into `XNB-Mod-Toolkit\Packed`.
3. Run `XNB-Mod-Toolkit\UNPACK FILES.bat` to unpack the files into `XNB-Mod-Toolkit\Unpacked`.

## See also
If you read the entire guide, congratulations! If you'd like to read _even more_ documentation,
[go back to the index](/) and look at the 'Advanced topics' list. These cover much more specialised
topics, like how to parse weather data.
