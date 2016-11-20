---
layout: default
title: Advanced SMAPI mod configuration
intro: > 
   This page explains more advanced ways to use JSON files through <code>this.Helper</code>.
   This page is overkill for the vast majority of mods; see
   <em><a href="creating-a-smapi-mod#configuration">creating a SMAPI mod</a></em>
   for a simpler approach that is sufficient for most mods.
---

## Custom JSON files
Sometimes one `config.json` isn't enough, or you need to store data that's not meant to be edited
by the user. This is pretty easy using the `ModHelper`:

1. Create your model (see the main guide for more details):

   ```c#
   class ModData
   {
      public bool ExampleBoolean { get; set; }
      public float ExampleFloat { get; set; }

      public ModData()
      {
         this.ExampleBoolean = true;
         this.ExampleFloat = 0.5;
      }
   }
   ```

2. In your mod code, just use `this.Helper` to read and write to a named file:

   ```c#
   // read file
   var model = this.Helper.ReadJsonFile<ModData>("data.json") ?? new ModData();

   // save file (if needed)
   this.Helper.WriteJsonFile("data.json", model);
   ```
   Note that `ReadJsonFile` will return `null` if the file doesn't exist. The above example will
   create a default instance if that happens; if you don't want to do that, just remove the
   `?? new ModData()` part.

## Per-save JSON files
You can also specify a directory path (relative to your mod directory) instead of just the file
name. The directories will be created automatically if needed. For example, here's how you'd use
per-save config files:

```c#
// read file
var model = this.Helper.ReadJsonFile<ModData>($"{Constants.SaveFolderName}/config.json") ?? new ModData();

// write file (if needed)
this.Helper.WriteJsonFile($"{Constants.SaveFolderName}/config.json", model);
```

## File I/O config wrapper
<p class="warning">
This section describes an experimental interface. Stability and backwards compatibility in future
versions are not guaranteed.
</p>

If your mod often reloads or saves the configuration, you can wrap your config model with file
I/O logic:

1. Create a `ModConfig` class (just like the previous section), but this time extend
   `StardewModdingAPI.Advanced.ConfigFile`:

   ```c#
   class ModConfig : StardewModdingAPI.Advanced.ConfigFile
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

2. In your `ModEntry::Entry` method, add this line to initialise your wrapped configuration:

   ```
   ModConfig config = this.Helper.ReadConfig<ModConfig>();
   ```

3. Your `config` will now be wrapped with shortcut I/O methods that let you interact with the
   underlying file without using `this.Helper` directly:

   ```
   config.ReloadFromFile(); // reload the config from the underlying file
   config.SaveToFile(); // save changes to the underlying file
   ```

If that's not enough, you can take control:

1. Create the same `ModConfig` class, but this time implement `StardewModdingAPI.Advanced.IConfigFile`:

   ```c#
   class ModConfig : StardewModdingAPI.Advanced.IConfigFile
   {
      /*********
      ** Accessors
      *********/
      /// <summary>Provides methods for interacting with the mod directory, including read/writing the config file.</summary>
      public ModHelper ModHelper { get; set; }

      /// <summary>The file path from which the model was loaded, relative to the mod directory.</summary>
      public string FilePath { get; set; }

      public bool ExampleBoolean { get; set; }
      public float ExampleFloat { get; set; }


      /*********
      ** Public methods
      *********/
      /// <summary>Construct an instance.</Summary>
      public ModConfig()
      {
         this.ExampleBoolean = true;
         this.ExampleFloat = 0.5;
      }

      /// <summary>Reparse the underlying file and update this model.</summary>
      public void Reload()
      {
         // implement me
      }

      /// <summary>Save this model to the underlying file.</summary>
      public void Save()
      {
         // implement me
      }
   }
   ```

   SMAPI will inject the `ModHelper` and `FilePath` paths _after_ the constructor is called,
   but before any other methods are called.

2. Feel free to add new methods or implement the `Reload()` and `Save()` methods however you see
   fit.