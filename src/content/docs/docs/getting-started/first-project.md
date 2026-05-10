---
title: Your first project
description: Create a project, learn the folder layout, save your work.
sidebar:
  order: 2
---

entity projects are **folders on disk**, not single files. A project bundles
the show's media, timeline, screen setup, and calibration into one
self-contained tree you can copy to a USB stick, sync to another machine, or
hand to a collaborator.

## Create a new project

From the launcher: **New project**. Pick an empty folder anywhere on disk.
entity will populate it like this:

```
my-show/
├── my-show.entity          ← the project file (timeline, screens, settings)
├── content/                ← media goes here
│   └── .archive/           ← previous versions of transcoded media
├── cache/                  ← decoded frame caches (safe to delete)
└── logs/
```

## The `content/` folder

This is where your media lives. Drop ProRes files, HAP files, PNG sequences,
or whole subfolders here — entity's content scanner picks up changes
automatically, even if you copy files in from Explorer while the editor is
running.

Subfolders are honored as a media-bin hierarchy in the UI. Organise by act,
scene, or content type — whatever fits the show.

### Transcoding overwrites the original

When you transcode a clip to an optimized format, the **transcoded file
replaces the original** at the canonical path. The original is moved into
`content/<subfolder>/.archive/` so you can recover it if needed. This means
the path stored in your project file is always the path you actually want to
play.

### Filename versioning

If you have a clip called `act1_open.mov` and you drop in a new revision
called `act1_open_v2.mov`, entity recognizes them as the same logical media
and auto-rolls to the latest version. The convention is `<base>_v<tag>` —
anything after `_v` is treated as a version tag.

## Save and reopen

`File → Save` writes the project file. You can also use `Ctrl+S`. The next
time you launch the editor, your project appears in the Recent list.

## Next

Now [add some media →](/docs/getting-started/importing-media/)
