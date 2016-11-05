---
layout: default
title: Creating a SMAPI mod » advanced config.json
intro: > 
   This page explains advanced ways to use <code>config.json</code>.
   <strong>This section is overkill for the vast majority of mods.
   You can store virtually anything using the recommended approach,
   including dictionaries and complex object graphs. You only need to
   read this page if your mod has very specific needs, like direct
   file I/O or custom serialisation. Otherwise see
   <em><a href="creating-a-smapi-mod-1.0#adding-mod-settings">creating a SMAPI mod</a></em>.
   <p class="warning">
     This guide is for the SMAPI 1.0 beta. If you're using the released version, see the
     <em><a href="creating-a-smapi-mod">creating a SMAPI mod</a></em>.
   </p>
---

<p class="warning">
This page describes an experimental interface. Backwards compatibility in future versions is not
guaranteed.
</p>

## File I/O config wrapper
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

## Custom I/O wrapper
2. In your `ModEntry::Entry` method, add this line to initialise your wrapped settings:

   ```
   ModConfig config = this.Helper.ReadConfig<ModConfig>();
   ```

3. Your `config` will now be wrapped with shortcut IO methods that let you interact with the
   underlying file without using `this.Helper` directly:

   ```
   config.ReloadFromFile(); // reload the settings from the underlying file
   config.SaveToFile(); // save changes to the underlying file
   ```

If that's not enough, you can take control:

1. Create a `ModConfig` class (just like the previous section), but this time implement
   `StardewModdingAPI.Advanced.IConfigFile`:

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

2. Feel free to add new methods or implement the `Reload()` and `Save()` methods however
   you see fit.