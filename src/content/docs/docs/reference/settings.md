---
title: Settings reference
description: What each setting in Preferences controls.
sidebar:
  order: 2
---

Settings live in two places:

- **Global** — apply to every project on this machine. Stored in the
  user's app-data directory.
- **Project** — apply only to the current project. Stored inside the
  project file under `settings`.

Project settings override global settings.

## OSC receiver

| Setting | Default | Effect |
|---|---|---|
| `osc.enabled` | `true` | Whether the OSC receiver plugin is loaded |
| `osc.port` | `53000` | UDP port to listen on |

Changes require a restart.

## Display

| Setting | Default | Effect |
|---|---|---|
| `display.previewQuality` | `high` | Preview pane render quality (`low` / `medium` / `high`) |
| `display.fullscreenOnPrimary` | `false` | When enabled, the editor opens fullscreen on the primary display |

## Playback

| Setting | Default | Effect |
|---|---|---|
| `playback.audioEnabled` | `false` | Audio playback (currently unimplemented; flag exists for future) |
| `playback.loopByDefault` | `false` | New clips loop by default |

This list is partial — Preferences in the editor is the source of truth.
