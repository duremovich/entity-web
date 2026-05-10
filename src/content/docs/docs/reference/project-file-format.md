---
title: Project file format
description: The shape of an .entity project file on disk.
sidebar:
  order: 1
---

The project file (`<name>.entity`) is JSON. It's versioned with a
top-level `schemaVersion` integer; the editor migrates older versions
forward on load.

## Top-level keys

```jsonc
{
  "schemaVersion": 8,
  "name": "my-show",
  "timeline": {
    "frameRate": 60,
    "lengthFrames": 36000,
    "tracks": [ /* track entries */ ],
    "sections": [ /* section entries */ ]
  },
  "screens": [ /* screen entries */ ],
  "outputs": [ /* output mappings + calibration */ ],
  "settings": { /* project-scoped overrides */ }
}
```

## Clips

A clip on a track is roughly:

```jsonc
{
  "mediaPath": "act1/opener.mov",  // relative to content/
  "startFrame": 0,
  "durationFrames": 600,
  "inPointFrame": 0,
  "opacity": 1.0,
  "blendMode": "normal",
  "transform": { "x": 0, "y": 0, "scaleX": 1, "scaleY": 1, "rotation": 0 },
  "targetScreen": "stage-left",
  "sectionBehavior": "normal",  // or "locked"
  "animations": [ /* keyframe tracks */ ]
}
```

`mediaPath` is a **logical reference**, relative to `content/`. The
filename-versioning system means this path may end up resolving to a
later version of the file on disk.

## Sections

```jsonc
{
  "breakFrame": 6000,
  "name": "Act II",
  "color": "#ff7a2e",
  "fadeSeconds": 0.5
}
```

## Schema version compatibility

Older project files are auto-migrated when opened. Saving rewrites at the
current schema. If you need backward compatibility for distribution,
note: there is no "save as old schema" — pin a tagged engine release if
you need that.
