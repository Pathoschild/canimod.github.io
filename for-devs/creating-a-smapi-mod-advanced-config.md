---
layout: default
title: Advanced SMAPI mod configuration
intro: > 
   This page explains more advanced ways to use JSON files through <code>this.Helper</code>.
   This page is overkill for the vast majority of mods; see
   <em><a href="creating-a-smapi-mod#configuration">creating a SMAPI mod</a></em>
   for a simpler approach that is sufficient for most mods.
permalink: /for-devs/creating-a-smapi-mod-advanced-config
redirect_from:
    - /guides/creating-a-smapi-mod-advanced-config
---

<div style="border:2px solid #CAA; border-left:1em solid red; padding:1em;">
This page is has been moved to the wiki. See the latest version at <a href="http://stardewvalleywiki.com/Modding:Creating_a_SMAPI_mod">Modding:Creating a SMAPI mod</a>.
</div>

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
