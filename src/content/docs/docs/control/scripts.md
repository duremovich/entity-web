---
title: Script command system
description: Drive entity from a JSON script for automation and repro.
sidebar:
  order: 3
---

entity has a script system used internally for integration tests and
exposed to power users for automation. A script is a JSON file describing
a sequence of commands to fire at the editor.

## Run a script

```powershell
EntityMediaEditor.exe --script my-script.json
```

The editor runs the script headlessly (or visually, depending on the
script's flags) and exits when the script finishes.

## Script structure

```json
{
  "commands": [
    { "type": "OpenProject", "path": "C:/shows/my-show" },
    { "type": "AddTrack" },
    { "type": "Play" },
    { "type": "WaitSeconds", "seconds": 5.0 },
    { "type": "SectionNext" },
    { "type": "WaitSeconds", "seconds": 10.0 },
    { "type": "Stop" }
  ]
}
```

Each entry is a command with a `type` and command-specific arguments.

## Common commands

| Command | Args | Effect |
|---|---|---|
| `OpenProject` | `path` | Load a project from disk |
| `Play` | — | Start playback |
| `Pause` | — | Pause |
| `Stop` | — | Stop |
| `Seek` | `frame` | Seek to a specific timeline frame |
| `SectionNext` | — | Jump to next section |
| `SectionGo` | `number` | Jump to a specific section |
| `AddTrack` | — | Add a new timeline track |
| `WaitSeconds` | `seconds` | Pause script execution |
| `WaitFrames` | `frames` | Pause for N editor frames (rarely what you want) |

:::tip[Wait by wall-clock, not by frames]
Use `WaitSeconds` for anything that asserts wall-clock-driven state.
Headless mode runs at thousands of FPS, so `WaitFrames(300)` is much
shorter than you'd think.
:::

## Why scripts exist

1. **Repro**: capture a buggy sequence as a script, attach it to an
   issue, anyone can replay it.
2. **Tests**: the engine's integration test suite is built on scripts.
3. **Automation**: nightly content runs, kiosk installs, "set up the
   stage at 6pm" scripts.
