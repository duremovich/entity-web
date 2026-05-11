---
title: Script command reference
description: Full table of every command available in JSON scripts.
sidebar:
  order: 5
---

This page is the complete reference for entity's script command system.
For an overview of how scripts work and when to use them, see
[Script command system](/docs/control/scripts/).

## File shape

```json
{
  "commands": [
    { "type": "OpenProject", "path": "C:/shows/my-show" },
    { "type": "Play" },
    { "type": "WaitSeconds", "seconds": 5.0 },
    { "type": "Stop" }
  ]
}
```

The script is a JSON object with a single `commands` array. Each entry
has a `type` field plus command-specific arguments.

## Project lifecycle

| Type | Args | Effect |
|---|---|---|
| `OpenProject` | `path` (string) | Load a project from disk |
| `SaveProject` | — | Save the current project |
| `CloseProject` | — | Close without saving |

## Playback

| Type | Args | Effect |
|---|---|---|
| `Play` | — | Start playback |
| `Pause` | — | Pause |
| `Stop` | — | Stop and reset to start |
| `Seek` | `frame` (int) | Seek to a specific timeline frame |
| `SeekSeconds` | `seconds` (float) | Seek to wall-clock time |

## Sections

| Type | Args | Effect |
|---|---|---|
| `SectionNext` | — | Jump to next section |
| `SectionPrevious` | — | Jump to previous section |
| `SectionGo` | `number` (int) | Jump to specific cue number |
| `AddSection` | `breakFrame`, `name`, `color?`, `fadeSeconds?` | Add a section at the given frame |
| `RemoveSection` | `number` (int) | Remove section by cue number |

## Timeline editing

| Type | Args | Effect |
|---|---|---|
| `AddTrack` | — | Add a new timeline track |
| `RemoveTrack` | `index` (int) | Remove a track by index |
| `AddClip` | `track`, `mediaPath`, `startFrame`, `durationFrames?` | Place a clip at a specific frame |
| `RemoveClip` | `clipId` (string) | Remove a clip |
| `SplitClip` | `clipId`, `atFrame` (int) | Split a clip at a frame |
| `SetClipProperty` | `clipId`, `property`, `value` | Set a property (opacity, blendMode, …) |
| `SetClipTargetScreen` | `clipId`, `screenName` | Reassign target screen |

## Screens & outputs

| Type | Args | Effect |
|---|---|---|
| `AddScreen` | `name`, `width`, `height` | Create a logical screen |
| `RemoveScreen` | `name` (string) | Remove a screen |
| `AssignScreenToOutput` | `screenName`, `outputName` | Wire a screen to a physical output |
| `EnableOutput` | `outputName` (string) | Enable a physical output |
| `DisableOutput` | `outputName` (string) | Disable a physical output |

## Waits & synchronization

| Type | Args | Effect |
|---|---|---|
| `WaitSeconds` | `seconds` (float) | Pause script for wall-clock duration |
| `WaitFrames` | `frames` (int) | Pause for N editor frames |
| `WaitForPlayhead` | `frame` (int) | Block until playhead reaches the given frame |

:::caution[Prefer WaitSeconds over WaitFrames]
In headless mode the editor runs at thousands of FPS with no media
decode. `WaitFrames(300)` is typically ~75ms — not 5 seconds. Use
`WaitSeconds` for any wall-clock assertion.

Size: `(breakFrame / timelineFps) + 0.5s` margin is a safe formula for
"wait until the playhead reaches a section."
:::

## Diagnostic / assertion

These commands return success or failure and are primarily used in
integration tests. A failing assertion causes the script to exit
non-zero.

| Type | Args | Effect |
|---|---|---|
| `AssertPlayheadAt` | `frame` (int) | Fail if playhead isn't at the given frame |
| `AssertSectionIs` | `name` (string) | Fail if current section name doesn't match |
| `AssertOutputEnabled` | `outputName` (string) | Fail if output is disabled |
| `Log` | `message` (string) | Write a message to the log |
| `Screenshot` | `path` (string) | Capture the editor viewport to a PNG |

## Application lifecycle

| Type | Args | Effect |
|---|---|---|
| `Quit` | — | Exit the editor cleanly. Always the last command in a finite script. |

## Running a script

```powershell
EntityMediaEditor.exe --script my-script.json           # visual
EntityMediaEditor.exe --headless --script my-script.json # CI / automation
```

See [CLI arguments](/docs/reference/cli/).

## Example: capture a show start

```json
{
  "commands": [
    { "type": "OpenProject", "path": "C:/shows/main" },
    { "type": "Play" },
    { "type": "WaitSeconds", "seconds": 2.0 },
    { "type": "Screenshot", "path": "C:/captures/showstart.png" },
    { "type": "AssertPlayheadAt", "frame": 120 },
    { "type": "Stop" },
    { "type": "Quit" }
  ]
}
```
