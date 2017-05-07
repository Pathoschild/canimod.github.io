---
layout: default
title: Creating a SMAPI mod » IDE primer
intro: > 
    <div style="border:2px solid #CAA; border-left:1em solid red; padding:1em;">
        This page is has been moved to the wiki. See the latest version at
        <a href="http://stardewvalleywiki.com/Modding:IDE_reference">Modding:IDE reference</a>.
    </div>
    This page is a quick reference for how to use Visual Studio 2017 or MonoDevelop/Xamarin when
    creating or editing a SMAPI mod. See <em><a href="creating-a-smapi-mod">creating a SMAPI mod</a></em>
    for the main guide.
---

## Before you start
* You should install [Visual Studio 2017 Community](https://www.visualstudio.com/vs/community/) (on Windows) or [MonoDevelop](http://www.monodevelop.com/) (on Linux/Mac).
* Reviewing [_C# Fundamentals for Absolute Beginners_](https://mva.microsoft.com/en-us/training-courses/c-fundamentals-for-absolute-beginners-16169)
is strongly recommended if you're new to programming C#.
* Here are some basic terms to remember:

  term     | definition
  -------- | ----------
  IDE      | The program used to edit, run, and compile your code (short for _Integrated Development Environment_). The main IDEs are Visual Studio on Windows, and MonoDevelop/Xamarin on Linux/Mac.
  DLL      | The file with a `.dll` extension which contains your compiled code (short for _Dynamic Link Library_). This is the file that SMAPI reads when loading your mod.
  project  | A collection of source code + configuration + resources (like images) you edit in the IDE. Each project is compiled into its own DLL.
  solution | A collection of projects with some global settings. The solution itself isn't compiled, but it enables some convenient features (like letting projects easily reference each other).

## Create a mod project
<section id="create-project"></section>

Before you can write your mod code, you need to create a solution and project to contain it.

### In Visual Studio 2017

1. Open Visual Studio 2017.
2. Click _File » New » Project_ from the menu bar:  
   ![](images/creating-a-smapi-mod-ide-primer/create-project-vs-1.png)
3. In the 'New Project' window, choose _Visual C# » Class Library (.NET Framework)_:  
   ![](images/creating-a-smapi-mod-ide-primer/create-project-vs-2.png)
4. Enter a descriptive mod name. By convention, the name should be one word with mixed caps (like
   "PineapplesEverywhere"):  
   ![](images/creating-a-smapi-mod-ide-primer/create-project-vs-3.png)
5. Make sure "create directory for solution" is checked, and click _OK_:  
   ![](images/creating-a-smapi-mod-ide-primer/create-project-vs-4.png)

### In MonoDevelop/Xamarin

1. Open MonoDevelop/Xamarin.
2. Click _File » New Solution_ from the menu bar:  
   ![](images/creating-a-smapi-mod-ide-primer/create-project-monodev-1.png)
3. In the 'New Project' window, choose _.NET » Library_ and click _Next_:  
   ![](images/creating-a-smapi-mod-ide-primer/create-project-monodev-2.png)
4. Enter a descriptive mod name. By convention, the name should be one word with mixed caps (like
   "PineapplesEverywhere"):  
   ![](images/creating-a-smapi-mod-ide-primer/create-project-monodev-3.png)
5. Make sure "create a project directory within the solution directory" is checked, and click _Create_:  
   ![](images/creating-a-smapi-mod-ide-primer/create-project-monodev-4.png)

## Set the target framework
<section id="set-target-framework"></section>

The 'target framework' is the version of .NET Framework your code uses, which affects the version
needed to run your mod. The recommended target framework is .NET Framework 4.5, which is the
version SMAPI itself targets.

### In Visual Studio 2017

1. Open the Solution Explorer pane. If it's not visible, click _View » Solution Explorer_
   from the menu:  
   ![](images/creating-a-smapi-mod-ide-primer/show-solution-pane-vs.png)
2. From the Solution Explorer, right-click on the project and choose _Properties_:  
   ![](images/creating-a-smapi-mod-ide-primer/change-target-framework-vs-1.png)
3. On the _Application_ tab, change the _Target Framework_ dropdown to _.NET Framework 4.5_:  
   ![](images/creating-a-smapi-mod-ide-primer/change-target-framework-vs-2.png)
4. A dialogue may appear asking you to confirm the change. Click 'Yes' to confirm:  
   ![](images/creating-a-smapi-mod-ide-primer/change-target-framework-vs-3.png)

### In MonoDevelop/Xamarin

1. Open the Solution pad. If it's not visible, click _View » Pads » Solution_ from the
   menu:  
   ![](images/creating-a-smapi-mod-ide-primer/show-solution-pane-monodev.png)
2. From the Solution pad, right-click on the project and choose _Options_:  
   ![](images/creating-a-smapi-mod-ide-primer/change-target-framework-monodev-1.png)
3. On the _Build » General_ tab, change the _Target Framework_ dropdown to _Mono / .NET 4.5_:  
   ![](images/creating-a-smapi-mod-ide-primer/change-target-framework-monodev-2.png)

## Add a file
<section id="add-file"></section>

### In Visual Studio 2017

1. Open the Solution Explorer pane. If it's not visible, click _View » Solution Explorer_
   from the menu:  
   ![](images/creating-a-smapi-mod-ide-primer/show-solution-pane-vs.png)
2. From the Solution Explorer pane, right-click on the project and choose _Add » New Item_:  
   ![](images/creating-a-smapi-mod-ide-primer/create-file-vs-1.png)
3. From the 'Add New Item' window, choose the file type (usually _Visual C# Item » Class_):  
   ![](images/creating-a-smapi-mod-ide-primer/create-file-vs-2.png)
4. Enter a descriptive file name and click _Add_:  
   ![](images/creating-a-smapi-mod-ide-primer/create-file-vs-3.png)

### In MonoDevelop/Xamarin

1. Open the Solution pad. If it's not visible, click _View » Pads » Solution_ from the
   menu:  
   ![](images/creating-a-smapi-mod-ide-primer/show-solution-pane-monodev.png)
2. From the Solution pad, right-click on the project to delete and choose _Add » New File_:  
   ![](images/creating-a-smapi-mod-ide-primer/create-file-monodev-1.png)
3. From the 'New File' window, choose the file type (usually _General » Empty Class_):  
   ![](images/creating-a-smapi-mod-ide-primer/create-file-monodev-2.png)
4. Enter a descriptive file name and click _New_:  
   ![](images/creating-a-smapi-mod-ide-primer/create-file-monodev-3.png)

## Delete a file
<section id="delete-file"></section>

### In Visual Studio 2017

1. Open the Solution Explorer pane. If it's not visible, click _View » Solution Explorer_
   from the menu:  
   ![](images/creating-a-smapi-mod-ide-primer/show-solution-pane-vs.png)
2. From the Solution Explorer pane, right-click on the file to delete and choose _Delete_:  
   ![](images/creating-a-smapi-mod-ide-primer/delete-file-vs.png)

### In MonoDevelop/Xamarin

1. Open the Solution pad. If it's not visible, click _View » Pads » Solution_ from the
   menu:  
   ![](images/creating-a-smapi-mod-ide-primer/show-solution-pane-monodev.png)
2. From the Solution pad, right-click on the file to delete and choose _Remove_:  
   ![](images/creating-a-smapi-mod-ide-primer/delete-file-monodev.png)

## Add a NuGet package
<section id="add-nuget"></section>

### In Visual Studio 2017

1. Click _Tools » NuGet Package Manager » Manage NuGet Packages for Solution_ from the menu:  
   ![](images/creating-a-smapi-mod-ide-primer/add-nuget-package-vs-1.png)
2. On the _Browse_ tab, search for the package and click on the result to display some options:  
   ![](images/creating-a-smapi-mod-ide-primer/add-nuget-package-vs-2.png)
3. In the options, check the box next to your project and click _Install_:  
   ![](images/creating-a-smapi-mod-ide-primer/add-nuget-package-vs-3.png)
4. If a 'Review Changes' dialogue appears, click _OK_:  
   ![](images/creating-a-smapi-mod-ide-primer/add-nuget-package-vs-4.png)

### In MonoDevelop/Xamarin

1. Click _Project » Add NuGet Packages_ from the menu:  
   ![](images/creating-a-smapi-mod-ide-primer/add-nuget-package-monodev-1.png)
2. Search for the package, click on the result, and click _Add Package_:  
   ![](images/creating-a-smapi-mod-ide-primer/add-nuget-package-monodev-2.png)

## Edit project file (`.csproj`)
<section id="edit-project"></section>

Sometimes you may want to edit the project file directly (mainly to configure build steps). The
project is a `.csproj` file, and can be edited from within the IDE.

### In Visual Studio 2017

1. Open the Solution Explorer pane. If it's not visible, click _View » Solution Explorer_
   from the menu:  
   ![](images/creating-a-smapi-mod-ide-primer/show-solution-pane-vs.png)
2. From the Solution Explorer pane, right-click on the project and choose _Unload_:  
   ![](images/creating-a-smapi-mod-ide-primer/edit-project-file-vs-1.png)
3. Right-click on the project again and choose _Edit &lt;project name&gt;.csproj_:  
   ![](images/creating-a-smapi-mod-ide-primer/edit-project-file-vs-2.png)
4. Make your changes in the editor that appears and save.
5. When you're done, right-click on the project again and choose _Reload Project_:  
   ![](images/creating-a-smapi-mod-ide-primer/edit-project-file-vs-3.png)

### In MonoDevelop/Xamarin

1. Open the Solution pad. If it's not visible, click _View » Pads » Solution_ from the
   menu:  
   ![](images/creating-a-smapi-mod-ide-primer/show-solution-pane-monodev.png)
2. From the Solution pad, right-click on the project and choose _Tools » Edit File_:  
   ![](images/creating-a-smapi-mod-ide-primer/edit-project-file-monodev.png)
3. Make your changes in the editor that appears and save.

## Find compiled files
<section id="build-output"></section>

### In Visual Studio 2017

1. Open the Solution Explorer pane. If it's not visible, click _View » Solution Explorer_
   from the menu:  
   ![](images/creating-a-smapi-mod-ide-primer/show-solution-pane-vs.png)
2. From the Solution Explorer pane, right-click on the project and choose _Open Folder in File Explorer_:  
   ![](images/creating-a-smapi-mod-ide-primer/view-build-output-vs.png)
3. Navigate to the `bin\Debug` (or `bin\Release` if you switched to release build configuration).

### In MonoDevelop/Xamarin

1. Open the Solution pad. If it's not visible, click _View » Pads » Solution_ from the
   menu:  
   ![](images/creating-a-smapi-mod-ide-primer/show-solution-pane-monodev.png)
2. From the Solution pad, right-click on the project and choose _Open Containing Folder_:  
   ![](images/creating-a-smapi-mod-ide-primer/view-build-output-monodev.png)
3. Navigate to the `bin/Debug` (or `bin/Release` if you switched to release build configuration).
