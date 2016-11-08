---
layout: default
title: Updating a SMAPI mod
intro: >
   <strong>Most mods written for older versions of SMAPI will work just fine in newer
   versions.</strong> However, migrating to 1.0 will simplify your code, prevent
   deprecation warnings from being shown in the log, and make sure your mod doesn't
   break in a future version.<br />
   <p class="warning">
     This guide is for the SMAPI 1.0 beta. You shouldn't update your mods before 1.0 is
     released, to avoid breaking your mods for users who don't have the beta.
   </p>
---

## What changed in 1.0
SMAPI 1.0 is the first 'stable' release, meaning it shouldn't change in breaking ways without
advance warning. Some methods and properties are obsolete but still supported; these are now marked
deprecated, so using them will show a deprecation warning in the console and log. See the
[release notes](https://github.com/ClxS/SMAPI/blob/master/release-notes.md#1x) for a list of
changes.

The rest of this section describes how to update deprecated methods from earlier versions.

<strong>Note:</strong> your mod probably isn't affected by most of these; the easiest way to update
is to just play with your mod, see what deprecation warnings are shown, and check this page for
those.

### Crossplatform support (optional)
To make your mod compatible with all platforms (Linux, Mac, and Windows), see _[crossplatforming a
SMAPI mod](/guides/crossplatforming-a-smapi-mod)_. This is optional.

### Mod entry method
_For the latest documentation, see [creating a SMAPI mod: writing your mod code](/guides/creating-a-smapi-mod-1.0#writing-your-mod-code)._

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

### Mod configuration
_For the latest documentation, see [creating a SMAPI mod: adding mod settings](/guides/creating-a-smapi-mod-1.0#adding-mod-settings)._

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

For more information, see [creating a SMAPI mod: adding mod settings](/guides/creating-a-smapi-mod-1.0#adding-mod-settings).
For help with more advanced configuration (including custom JSON files and per-save configuration),
see [advanced SMAPI mod configuration](/guides/creating-a-smapi-mod-advanced-config).

### Mod properties
The mod base class properties have mostly been replaced by the new `ModHelper`, which is passed in to your
mod's `Entry()` method and available as `this.Helper`.

code | replacement
:--- | :----------
`this.PathOnDisk` | use `this.Helper.DirectoryPath`.
`this.BaseConfigPath` | use `helper.ReadConfig<T>()` and `helper.WriteConfig(…)` instead.
`this.PerSaveConfigFolder` | use [per-save JSON files](/guides/creating-a-smapi-mod-advanced-config) instead.
`this.PerSaveConfigPath` | use [per-save JSON files](/guides/creating-a-smapi-mod-advanced-config) instead.

### Internal extensions
All extensions are deprecated in 1.0, since they're meant for internal use. There are many
libraries that provide a more robust set of extensions if you like these.

code | replacement
:--- | :----------
`Extensions.Random` | use `new Random()`.
`Extensions.RandomColour()` | use `new Random()` and construct a color with random RGB values.
`key.IsKeyDown()` | use `Keyboard.GetState().IsKeyDown`.
`list.GetHash()` | reimplement if needed.
`list.ToSingular(…)` | use `string.Join`.
`str.IsInt32()` | use `int.TryParse`.
`str.AsInt32()` | use `int.TryParse` or `int.Parse`.
`str.IsBool()` | use `bool.TryParse`.
`str.AsBool()` | use `bool.TryParse` or `bool.Parse`.
`str.RemoveNumerics()` | use `new string(str.Where(char.IsLetterOrDigit).ToArray())`<br />(it didn't actually remove numerics).
`obj.Cast<T>()` | use `obj as T`.
`obj.GetPrivateFields()` | reimplement if needed.
`obj.GetBaseFieldValue<T>(…)` | reimplement if needed.
`obj.SetBaseFieldValue<T>(…)` | reimplement if needed.

### Various internals
Various properties and methods that are only meant to be used by SMAPI are deprecated, and will be
hidden in a future version.

code | replacement
:--- | :----------
`version.VersionString` | use `version.ToString()`