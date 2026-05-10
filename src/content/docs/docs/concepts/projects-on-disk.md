---
title: Projects on disk
description: How an entity project is laid out as a folder tree.
sidebar:
  order: 1
---

An entity project is a **folder**, not a single file. This is deliberate —
projects bundle media, settings, and caches together, so copying a project
to another machine, a USB stick, or a backup is just copying a folder.

## Anatomy

```
my-show/
├── my-show.entity         project file: timeline, screens, settings, calibration
├── content/               your media — drop files in here
│   ├── act1/
│   │   ├── opener.mov
│   │   ├── opener_v2.mov  newer version, auto-discovered
│   │   └── .archive/      previous versions, kept for safety
│   └── act2/
├── cache/                 decoded frame caches (safe to delete; rebuilds on next play)
└── logs/                  diagnostic logs from the editor
```

## The project file

`<name>.entity` is a single JSON file that records:

- Timeline frame rate, length, and the clips placed on it
- Sections (break-points), with name / colour / fade duration
- Screens and their assigned physical outputs
- Projector calibration anchor points
- Keyframe animation data
- References to media in `content/` (by **logical path**, not full path)

It does **not** contain the media itself. Move the project folder and the
media moves with it.

## The `content/` folder

`content/` is the only place media lives. Two design choices that matter
for daily use:

### 1. Content folders are watched

A background scanner notices files added, removed, or modified — even when
the editor is running. You can copy a clip into `content/` from Explorer
and it appears in the media bin within a frame or two. No re-import, no
restart.

### 2. Transcoding overwrites the original at the canonical path

When you transcode a clip to an optimised codec (e.g. H.264 to ProRes), the
**transcoded file replaces the source at the canonical path**. The
original is moved into a sibling `.archive/` folder so you can roll back.

This means the path your project file stores is always the path you
actually want to play — no separate "original vs transcoded" book-keeping.

### 3. Filename versioning

`opener_v2.mov` and `opener.mov` are recognised as the same **logical
media** — anything after `_v` is a version tag. entity auto-rolls to the
newest version. This is convenient when an editor sends you a revision
mid-show-build: drop the new file in, the timeline updates.

## What's safe to delete

- `cache/` — frame caches. Deleted on demand; rebuilt on next play.
- `logs/` — diagnostic logs. Keep around if you've had an issue, otherwise
  fine to remove.

Don't delete `<name>.entity` or `content/`.
