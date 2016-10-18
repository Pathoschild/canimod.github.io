---
layout: default
title: Creating a SMAPI mod
intro: Ready to make your own mod? This page will guide you from creating an empty project to building a small mod.
---

## Introduction

### What is a SMAPI mod?
A SMAPI mod uses the [SMAPI](https://github.com/cjsu/SMAPI) modding API to extend the game logic.
You can run code when something happens (e.g. mouse clicked or menu opened), or periodically (e.g.
once per game tick).

### What kind of code will I use?
SMAPI mods are written in C# using the .NET Framework. Stardew Valley also uses XNA (on Windows) or
MonoGame (on Linux and Mac) for the fundamental game logic (drawing to the screen, user input, etc).

### Am I qualified to make a SMAPI mod?
If you're an experienced developer, you should be fine; if you have little or no experience, there
are two general requirements:

* Determination. Even with no development experience, you can learn along the way if you're
  determined. You should be prepared for a steep learning curve depending on the scope of your mod,
  and be ready to look things up or ask for help sometimes. Many mod developers started with little
  or no development experience. Don't be too ambitious at first; it's better to start with a small
  mod when you're figuring it out. It's easy to become overwhelmed at first and give up. The
  modding community is very welcoming, so don't be afraid to ask questions!
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

### I don't know if I can do this
The next two sections will walk you through creating a very simple mod. If you follow along, you'll
have created a mod! All that will be left is making it do what you want. :)

<span id="help"></span>

### Where can I get help?
The Stardew Valley modding community is very welcoming. Feel free to ask questions in the
[modding forums](http://community.playstarbound.com/forums/mods.215/) or join the
[Farmhand/SMAPI Discord server](https://discordapp.com/invite/0t3fh2xhHVc6Vdyx).

## Getting started

### Prerequisites
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

### Visual Studio vs MonoDevelop
If you're developing on Windows, Visual Studio is strongly recommended; otherwise MonoDevelop is
your best option. Visual Studio is the official C# editor with built-in compiling and debugging
features, but it's only available on Windows. MonoDevelop is an open-source alternative available
on Linux, Mac, and Windows, but it's less robust and mature.

## Creating a minimal mod
A SMAPI mod is essentially a compiled library (DLL) with an entry method that gets called by SMAPI,
so let's set that up.

### Creating the project structure
1. Open Visual Studio or MonoDevelop.
2. Create a new solution with a library project.
   * <small>In Visual Studio, choose _Class Library_ under _Visual C#_.</small>
   * <small>In MonoDevelop, choose _Library_ under _Other » .NET_.</small>
3. Delete the `Class1.cs` or `MyClass.cs` file.

### Configuring MSBuild
Now you need to edit the project configuration. This will add the mod dependencies: Stardew Valley,
SMAPI, and XNA (Windows) or MonoGame (Linux/Mac). This will also tell your editor how to package
your mod, copy it into the game folder, and launch the game.

This part can be intimidating if you haven't done it before, but hopefully you'll just copy & paste
and it'll work. :)

1. Open your `<project name>.csproj` file for editing.
2. Find the first `<ItemGroup>` line, and replace it with this:
   * For Windows:

     ```xml
     <PropertyGroup>
       <GamePath>C:\Program Files (x86)\GalaxyClient\Games\Stardew Valley</GamePath>
       <GamePath Condition="!Exists('$(GamePath)')">C:\Program Files (x86)\Steam\steamapps\common\Stardew Valley</GamePath>
       <StartAction>Program</StartAction>
       <StartProgram>$(GamePath)\StardewModdingAPI.exe</StartProgram>
       <StartWorkingDirectory>$(GamePath)</StartWorkingDirectory>
      </PropertyGroup>
      <ItemGroup>
        <Reference Include="Microsoft.Xna.Framework, Version=4.0.0.0, Culture=neutral, PublicKeyToken=842cf8be1de50553, processorArchitecture=x86" />
        <Reference Include="Microsoft.Xna.Framework.Game, Version=4.0.0.0, Culture=neutral, PublicKeyToken=842cf8be1de50553, processorArchitecture=x86" />
        <Reference Include="Microsoft.Xna.Framework.Graphics, Version=4.0.0.0, Culture=neutral, PublicKeyToken=842cf8be1de50553, processorArchitecture=x86" />
        <Reference Include="Stardew Valley">
          <HintPath>$(GamePath)\Stardew Valley.exe</HintPath>
        </Reference>
        <Reference Include="StardewModdingAPI">
          <HintPath>$(GamePath)\StardewModdingAPI.exe</HintPath>
        </Reference>
        <Reference Include="xTile">
          <HintPath>$(GamePath)\xTile.dll</HintPath>
        </Reference>
     ```

   * For Linux/Mac: TODO ([you can contribute!](https://github.com/canimod/canimod.github.io#readme))
3. Find the line near the bottom that looks like this:

   ```xml
   <Import Project="$(MSBuildToolsPath)\Microsoft.CSharp.targets" />
   ```

4. Right under that line, paste this:
   * For Windows:

     ```xml
     <PropertyGroup>
       <PostBuildEvent>
         set modDir=$(GamePath)\Mods\$(ProjectName)
         if not exist "%modDir%" (mkdir "%modDir%")
         copy "$(TargetDir)\$(TargetName).dll" "%modDir%\$(TargetName).dll"
         copy "$(TargetDir)\$(TargetName).pdb" "%modDir%\$(TargetName).pdb"
         copy "$(ProjectDir)manifest.json" "%modDir%\manifest.json"
       </PostBuildEvent>
     </PropertyGroup>
     ```

   * For Linux/Mac: TODO ([you can contribute!](https://github.com/canimod/canimod.github.io#readme))

### Creating your mod manifest
The mod manifest tells SMAPI about your mod.

1. Add a file named `manifest.json` to your project.
2. Paste this code into the file (changing the `<..>` placeholders accordingly):

   ```json
   {
      "Name": "<your project name>",
      "Authour": "<your name>",
      "Version": {
         "MajorVersion": 1,
         "MinorVersion": 0,
         "PatchVersion": 0,
         "Build": 0
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

   namespace <your project name>
   {
       /// <summary>The mod entry point.</summary>
       public class ModEntry : Mod
       {
           /*********
           ** Public methods
           *********/
           /// <summary>Initialise the mod.</summary>
           public override void Entry(params object[] objects)
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
               Log.Debug($"Player pressed '{e.KeyPressed}'.");
           }
       }
   }
   ```

### Trying your mod
Launch the project by pressing `F5` in Visual Studio or MonoDevelop. This should compile your mod,
copy it into the game's `Mod` folder, and launch the game. The mod so far will just send a message
to the console window whenever you press a key in the game:

> ![example log output](images/creating-a-smapi-mod/keypress-log.png)

If that didn't work, something went wrong. Try reviewing the above instructions, or
[ask for help](#help). :)

## Available events
The minimal mod we created above reacts when the player presses a key, but it can do much more.
These are the events your mod can subscribe to.

### Control events
`ControlEvents` are raised when the player uses a controller, keyboard, or mouse input. They're
raised before the game handles the input, so it's possible to selectively prevent the game from
responding to it. (That's beyond the scope of this guide, but it involves overwriting
`Game1.oldKBState`,  `Game1.oldMouseState`, and `Game1.oldPadState`.)

Most of these events are split into two variants, `XPressed` and `XReleased`. The `Pressed`
variant is raised when the player presses the button (holding the button down only triggers the
event once), and the `Released` variant is raised when they release it.

| event | summary |
|:----- |:------- |
| `ControllerButtonPressed`<br />`ControllerButtonReleased` | The player pressed/released a button on a gamepad or controller. |
| `ControllerTriggerPressed`<br />`ControllerTriggerReleased` | The player pressed/released a trigger button on a gamepad or controller. |
| `KeyPressed`<br />`KeyReleased` | The player pressed/released a keyboard key. |
| `KeyboardChanged` | The game's `KeyboardState` changed. This represents the current set of held-down keys, so it's triggered when the player presses or releases a key. |
| `MouseChanged` | The game's `MouseState` changed. This represents the cursor's position and each button's up/down state, so it's triggered when the player moves the mouse or presses/releases a button. |

### Game events
`GameEvents` are raised when the game changes state.

| event | summary |
|:----- |:------- |
| `Initialize` | Called during launch after configuring XNA or MonoGame. The game window hasn't been opened by this point. Called from [XNA's `Game.Initialize` method](https://msdn.microsoft.com/en-us/library/microsoft.xna.framework.game.initialize.aspx). |
| `GameLoaded` | Called during launch after configuring Stardew Valley, loading it into memory, and opening the game window. The window is still blank by this point. |
| `LoadContent` | Called before XNA loads or reloads graphics resources. Called from [XNA's `Game.LoadContent` method](https://msdn.microsoft.com/en-us/library/microsoft.xna.framework.game.loadcontent.aspx).
| `UpdateTick` | Called when the game updates its state (≈60 times per second). |
| `SecondUpdateTick` | Called every other tick (≈30 times per second). |
| `FourthUpdateTick` | Called every fourth tick (≈15 times per second). |
| `EighthUpdateTick` | Called every eighth tick (≈8 times per second). |
| `QuarterSecondTick` | Called every 15th tick (≈4 times per second). |
| `HalfSecondTick` | Called every 30th tick (≈twice per second). |
| `OneSecondTick` | Called every 60th tick (≈once per second). |

### Graphics events
`GraphicsEvents` are raised during the game's draw loop, when the game is
rendering content to the window.

| event | summary |
|:----- |:------- |
| `OnPreRenderEvent`<br />`OnPostRenderEvent` | Called before and after drawing everything to the screen during a draw loop.
| `OnPreRenderGuiEvent`<br />`OnPostRenderGuiEvent` | When a menu is open (`Game1.activeClickableMenu != null`), called before and after drawing that menu to the screen. This includes the game's internal menus like the title screen. |
| `OnPreRenderHudEvent`<br />`OnPostRenderHudEvent` | Called before and after drawing the HUD (item toolbar, clock, etc) to the screen. The HUD is available at this point, but not necessarily visible. (For example, the event is called even if a menu is open.) |
| _other events_ | SMAPI has a few esoteric graphics events which probably shouldn't be used, so they're not documented here. |

### Location events
`LocationEvents` are raised when the player transitions between game locations.

| event | summary |
|:----- |:------- |
| `CurrentLocationChanged` | Called after the player after transitions into a new area. Handlers are given the previous and new locations as arguments. |
| `LocationObjectsChanged` | Called after the list of objects in the current location changes (e.g. an object is added or removed). Handlers are given the new list of objects as an argument. |
| `LocationsChanged` | Called after a game location is added or removed. Handlers are passed the new list of locations as an argument. |

### Mine events
`MineEvents` are raised when something happens in [The Mines](http://stardewvalleywiki.com/The_Mines).

| event | summary |
|:----- |:------- |
| `MineLevelChanged` | Called after the player transitions to a new level of the mine. Handlers are passed the previous and new mine level as arguments. |

### Player events
`PlayerEvents` are raised when the player data changes.

| event | summary |
|:----- |:------- |
| `LoadedGame` | Called after the player loads a saved game. |
| `FarmerChanged` | Called after the game changes player character. This happens just before the `LoadedGame` event; it's unclear how this would happen any other time. |
| `InventoryChanged` | Called after the player's inventory changes in any way (added or removed item, sorted, etc). |
| `LeveledUp` | Called after the player levels up a skill. This happens as soon as they level up, not when the game notifies the player after their character goes to bed. |

Notable bug: the `FarmerChanged`, `InventoryChanged`, and `LeveledUp` events are raised at various times
before the game is loaded, when there's no character yet.

### Time events
`TimeEvents` are raised when the in-game time changes.

| event | summary |
|:----- |:------- |
| `TimeOfDayChanged` | Called after the in-game clock changes. |
| `OnNewDay` | Called when the player is transitioning to a new day and the game is performing its day update logic. This event is not called after loading a save (which starts the day), nor if the day changes outside the game's control (e.g. through a SMAPI mod). |
| `DayOfMonthChanged` | Called after the day of month changes. Unlike `OnNewDay`, this method is called when loading a save (which starts the day) and when day changes outside the game's control (e.g. through a SMAPI mod). If the player transitions to the same day of month (e.g. fall 15 to winter 15), the event isn't triggered. |
| `SeasonOfYearChanged` | Called after the season changes. |
| `YearOfGameChanged` | Called after the year changes. |

## Building a more complex mod
If you've been following along, you've created a basic mod and have an idea what events SMAPI
provides. We only have two more building blocks to show you, then the rest will be up to you.

### Adding mod settings
If you want to let users configure your mod, you can use the `StardewModdingAPI.Config` class.
SMAPI will automatically create a `config.json` file and take care of reading, normalising, and
updating it. Here's how to set it up:

1. Add a file named `ModConfig.cs` to your project.
2. Paste this code into the file (inside the `using namespace` block):

   ```c#
   /// <summary>The mod settings.</summary>
   internal class ModConfig : StardewModdingAPI.Config
   {
       /*********
       ** Accessors
       *********/
       /// <summary>An example boolean setting.</summary>
       public bool ExampleBoolean { get; set; }

       /// <summary>An example float setting.</summary>
       public float ExampleFloat { get; set; }


       /*********
       ** Public methods
       *********/
       /// <summary>Construct a default instance.</summary>
       public ModConfig()
       {
           this.ExampleBoolean = true;
           this.ExampleFloat = 0.5;
       }

       /// <summary>Construct the default configuration.</summary>
       /// <typeparam name="T">The expected configuration type.</typeparam>
       public override T GenerateDefaultConfig<T>()
       {
           return new ModConfig() as T;
       }
   }
   ```

3. In your `ModEntry::Entry` method, add this line:

   ```
   ModConfig config = new ExampleConfig().InitializeConfig(BaseConfigPath);
   ```

When the player launches the game, SMAPI will create the `config.json` file automatically if it
doesn't exist yet, using the default settings you provided in your model.

You can now:

* read a setting just by accessing its property (like `if(config.ExampleBoolean) { ... }`);
* reload the settings from the disk using `config.ReloadConfig()`;
* and save the current settings back to disk using `config.WriteConfig()`.

You can replace `ExampleBoolean` and `ExampleFloat` with your own properties. You can add any
settings you want, as long as they're all public non-static properties (like the examples). You can
even use complex types like `IDictionary<T, T>`; SMAPI will use [Json.NET](http://www.newtonsoft.com/json)
to serialise and deserialise them.

As a best practice, the constructor should set the default values and `GenerateDefaultConfig`
should create a new instance.

### Decompiling the game code
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
