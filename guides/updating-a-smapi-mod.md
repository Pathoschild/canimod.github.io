---
layout: default
title: Updating a SMAPI mod
intro: >
   In rare cases, SMAPI needs to change the interfaces it exposes to mods. (This
   doesn't happen often, because SMAPI strives to expose abstract interfaces that
   aren't tightly coupled to changes in the game.) When an interface does need to
   change, the old interface is
   <a href="https://en.wikipedia.org/wiki/Deprecation">deprecated</a> and supported
   long enough to let mods update at their own pace.
---

## How to update your mod
You don't need to comb through your code; SMAPI can tell you if you're using a deprecated interface:

1. Use the latest [SMAPI for developers](https://github.com/Pathoschild/SMAPI/releases) download.
   This will show all deprecation messages in the console:

   > ![console message for a deprecated interface](images/updating-a-smapi-mod/deprecated-console.png)

2. When you look at the code, you'll see a deprecation warning with a hint of how to fix it:

   > ![intellisense for an obsolete property](images/updating-a-smapi-mod/deprecated-intellisense.png)
   
3. Optionally, you can refer to the following sections on how to replace specific interfaces.

## How deprecated interfaces are phased out
Deprecated interfaces are fully supported until their removal. They'll slowly move through these
phases:

severity          | description
:---------------- | :----------
_notice_          | The interface is deprecated, but mod authors have time to update their mods. Nothing is reported to the console, though deprecation messages are shown in the log file.
_info_            | Mods should no longer use the interface. Debug-level deprecation messages are shown in the console.
_pending removal_ | Mods should no longer use the interface. Warning-level deprecation messages in the console indicate the mod will break soon if it doesn't update.

The interface will then be removed entirely.

## Deprecated interfaces

### Overview
These are currently deprecated:

since  | interfaces                | severity | replacement
:----- | :------------------------ | :------- | :----------
0.39.3 | `SObject` class          | _notice_ | reimplement if needed.
0.39.3 | `Extensions.ToSingular(…)` | ***pending removal*** | use `string.Join`.
1.0    | `Authour` in `manifest.json` | _notice_ | use `Author`.
1.0    | `Config` class            | _notice_ | see _[mod configuration](#mod-configuration)_.
1.0    | `Extensions` class      | _notice_ | reimplement if needed, or use an extensions library.
1.0    | `LogWriter` class | _notice_ | use the main `Log` interface.
1.0    | `Mod.BaseConfigPath`      | _notice_ | see _[mod configuration](#mod-configuration)_.
1.0    | `Mod.PathOnDisk`          | _notice_ | see _[mod configuration](#mod-configuration)_ or use `this.Helper.DirectoryPath`.
1.0    | `Mod.PerSaveConfigFolder` | _notice_ | use [per-save JSON files](/guides/creating-a-smapi-mod-advanced-config) instead.
1.0    | `Mod.PerSaveConfigPath`   | _notice_ | use [per-save JSON files](/guides/creating-a-smapi-mod-advanced-config) instead.
1.0    | `Mod.Entry(object[])`     | _notice_ | see _[mod entry method](#mod-entry-method)_.
1.0    | `Version.VersionString`   | _notice_ | use `Version.ToString()`.

### Migration guides
This section provides more information for some migrations mentioned in the previous section.

#### Mod entry method
_For the latest documentation, see [creating a SMAPI mod: writing your mod code](/guides/creating-a-smapi-mod#writing-your-mod-code)._

Change your mod's entry class from this:

```c#
/// <summary>Initialise the mod.</summary>
public override void Entry(params object[] objects)
{
    // your code
}
```

to this:

```c#
/// <summary>Initialise the mod.</summary>
/// <param name="helper">Provides methods for interacting with the mod directory, such as read/writing a config file or custom JSON files.</param>
public override void Entry(ModHelper helper)
{
    // your code
}
```

#### Mod configuration
_For the latest documentation, see [creating a SMAPI mod: adding mod settings](/guides/creating-a-smapi-mod#adding-mod-settings)._

If you use `config.json`, it's much easier in 1.0.

1. Find your subclass of `StardewModdingAPI.Config`, which probably looks something like this:

   ```c#
   class SampleConfig : StardewModdingAPI.Config
   {
      public bool ExampleBoolean { get; set; }
      public float ExampleFloat { get; set; }

      public override T GenerateDefaultConfig<T>()
      {
         this.ExampleBoolean = true;
         this.ExampleFloat = 0.5;
         return this as T;
      }
   }
   ```

2. Edit this class as follows:
   * Move default values into the constructor or property setters.
   * Remove `StardewModdingAPI.Config`.
   * Remove all `override` methods.

3. Your class should now look something like this:

   ```c#
   class SampleConfig
   {
      public bool ExampleBoolean { get; set; } = true;
      public float ExampleFloat { get; set; } = 0.5;
   }
   ```

   or like this if you used a constructor:

   ```c#
   class SampleConfig
   {
      public bool ExampleBoolean { get; set; }
      public float ExampleFloat { get; set; }

      public SampleConfig()
      {
         this.ExampleBoolean = true;
         this.ExampleFloat = 0.5;
      }
   }
   ```
4. In your `Mod` class, change anything that looks like this:

   ```
   var config = new SampleConfig().InitializeConfig(this.BaseConfigPath);
   ```

   to this:

   ```
   var config = helper.ReadConfig<SampleConfig>();
   ```

5. If you use other methods, here's how to migrate them:

   before 1.0 | after 1.0
   :--------- | :--------
   `new SampleConfig().GenerateDefaultConfig()`<br />`new SampleConfig().Instance()` | `new SampleConfig()`
   `new SampleConfig().InitializeConfig(this.BaseConfigPath)`<br />`config.UpdateConfig()`<br />`config.LoadConfig(this.BaseConfigPath)`<br />`config.ReloadConfig()` | `helper.ReadConfig<SampleConfig>()`
   `config.WriteConfig()`  | `helper.WriteConfig(config)`

For more information, see [creating a SMAPI mod: adding mod settings](/guides/creating-a-smapi-mod#adding-mod-settings).
For help with more advanced configuration (including custom JSON files and per-save configuration),
see [advanced SMAPI mod configuration](/guides/creating-a-smapi-mod-advanced-config).