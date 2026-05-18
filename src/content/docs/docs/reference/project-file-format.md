---
title: Project file format
description: The shape of an .entity project file on disk.
sidebar:
  order: 1
---

The project file (`<name>.entity`) is JSON. It's versioned with a
top-level `schemaVersion` integer; the editor migrates older versions
forward on load.

Current schema version: **20**.

## Top-level keys

```jsonc
{
  "schemaVersion": 20,
  "name": "my-show",
  "timeline": {
    "frameRate": 60,
    "lengthFrames": 36000,
    "tracks": [ /* track entries with layers */ ],
    "sections": [ /* section entries */ ]
  },
  "screens": [ /* screen entries */ ],
  "props": [ /* prop entries (stage geometry) */ ],
  "outputs": [ /* output mappings + calibration */ ],
  "contentRoutingAssets": [ /* Content Routing library entries */ ],
  "settings": { /* project-scoped overrides */ }
}
```

## Tracks and layers

Each track has a `layers` array (renamed from `clips` in v15). Every
layer carries a `kind` discriminator:

```jsonc
{
  "name": "VL1",
  "layers": [
    {
      "kind": "Clip",
      "startFrame": 0,
      "durationFrames": 600,
      /* clip-specific fields below */
    },
    {
      "kind": "ObjectAnimation",
      "startFrame": 600,
      "durationFrames": 240,
      /* OA-specific fields below */
    },
    {
      "kind": "Generative",
      "startFrame": 0,
      "durationFrames": 36000,
      /* generative-specific fields below */
    }
  ]
}
```

### Clip layer

```jsonc
{
  "kind": "Clip",
  "mediaPath": "act1/opener.mov",  // relative to content/
  "startFrame": 0,
  "durationFrames": 600,
  "inPointFrame": 0,
  "opacity": 1.0,
  "blendMode": "normal",
  "transform": { "x": 0, "y": 0, "scaleX": 1, "scaleY": 1, "rotation": 0 },
  "contentRoutingAssetName": "stage-left",  // reference into the routing library
  "sectionBehavior": "normal",              // or "locked"
  "animations": [ /* keyframe tracks */ ],
  "effects": [ /* ordered effect entries */ ]
}
```

`mediaPath` is a **logical reference**, relative to `content/`. The
filename-versioning system means this path may end up resolving to a
later version of the file on disk.

### Object Animation layer

```jsonc
{
  "kind": "ObjectAnimation",
  "target": "stage-left",      // Screen or Prop name
  "startFrame": 600,
  "durationFrames": 240,
  "sectionBehavior": "normal",
  "endBehavior": "hold",       // or "reset"
  "animations": [ /* keyframe tracks for the 9 OA axes */ ]
}
```

### Generative layer

```jsonc
{
  "kind": "Generative",
  "generativeKind": "muncher",
  "startFrame": 0,
  "durationFrames": 36000,
  "contentRoutingAssetName": "screen-2",
  "transform": { "x": 0, "y": 0, "scaleX": 1, "scaleY": 1, "rotation": 0 },
  "effects": [ /* same shape as clip effects */ ]
  /* kind-specific state (e.g. MunchersGameState) lives alongside */
}
```

## Sections

```jsonc
{
  "breakFrame": 6000,
  "name": "Act II",
  "color": "#ff7a2e",
  "fadeSeconds": 0.5
}
```

## Content Routing library

```jsonc
{
  "name": "stage-left",
  "kind": "Direct",                       // "Direct" | "Tiled" | "FeedMap"
  "autoBoundScreen": "Stage Left Cyc",    // non-null for auto-direct entries
  "sourceWidth": 1920,                    // FeedMap only
  "sourceHeight": 1080,                   // FeedMap only
  "targets": [
    { "screen": "Stage Left Cyc", "uvRect": [0,0,1,1], "name": "main" }
  ]
}
```

## Schema version compatibility

Older project files are auto-migrated when opened. Saving rewrites at
the current schema. Recent migrations:

- **v15** — track `clips` → `layers` with `kind` discriminator
- **v16** — per-layer effect chains
- **v17** — Object Animation `endBehavior` field
- **v20** — Content Routing library (replaces inline `targetScreen`)

If you need backward compatibility for distribution, there is no "save
as old schema" — pin a tagged engine release if that's required.
