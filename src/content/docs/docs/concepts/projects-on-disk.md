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

When you create a new project, entity builds this tree:

```
my-show/
├── my-show.entity         project file: timeline, screens, settings, calibration
├── content/               media — drop video and image files in here
│   └── .archive/          previous versions kept after a transcode (per-subfolder sibling)
├── presets/               saved configuration presets
├── objects/               imported 3D models for screens and props
├── exports/               rendered output destinations
├── snapshots/             project state snapshots
├── .cache/                machine-local caches (safe to delete; regenerated on demand)
│   └── thumbnails/        media thumbnails for the media bin
└── logs/                  diagnostic logs (created on first crash)
```

Folders are created up-front so you have a predictable place to drop
files, even if a given feature isn't using them yet on day one.

## The project file

`<name>.entity` is a single JSON file that records:

- Timeline frame rate, length, and the layers placed on it
- Sections (break-points), with name / colour / fade duration
- Screens and props, with positions and assigned models
- Output assignments and projector calibration anchor points
- Keyframe animation data
- Content routing library entries
- Per-layer effect chains
- References to media in `content/` and models in `objects/` (by **logical
  path**, not full path)

It does **not** contain the media itself. Move the project folder and
the media moves with it.

## The `content/` folder

`content/` is the only place media lives. Three design choices that
matter for daily use:

### Content folders are watched

A background scanner notices files added, removed, or modified — even
when the editor is running. You can copy a clip into `content/` from
Explorer and it appears in the media bin within a frame or two. No
re-import, no restart.

### Transcoding overwrites the original at the canonical path

When you transcode a clip to an optimised codec (e.g. H.264 to ProRes),
the **transcoded file replaces the source at the canonical path**. The
original is moved into a sibling `.archive/` folder inside the same
content subfolder so you can roll back.

This means the path your project file stores is always the path you
actually want to play — no separate "original vs transcoded"
book-keeping.

### Filename versioning

`opener_v2.mov` and `opener.mov` are recognised as the same **logical
media** — anything after `_v` is a version tag. entity auto-rolls to
the newest version. This is convenient when an editor sends you a
revision mid-show-build: drop the new file in, the timeline updates.

## The other folders

### `objects/`

3D model imports for the stage visualiser — meshes you assign to a
Screen or Prop. Imported via the Model bin, the same way clips arrive
through the Media bin. Sub-folders inside `objects/` are honoured
(mirrors the `content/` model).

### `presets/`

Reserved for saved configuration presets — effect-chain presets,
window-layout presets, output-mapping presets, anywhere the editor
wants to offer "save your settings" surfaces. Scaffolded today so the
location is stable; not every UI surface writes here yet.

### `exports/`

Reserved for rendered output destinations — capture / export flows
land here by default. Currently scaffolded; future render-to-file
features will use it.

### `snapshots/`

Reserved for project state snapshots — point-in-time copies of the
project that survive across edits, for quick rollback or A/B compares.
Currently scaffolded; feature work pending.

### `.cache/`

Machine-local. Always safe to delete; rebuilt on demand. Today it
holds `thumbnails/` for the Media bin; future caches (decoded frames,
HAP atlases, etc.) will land here too. The leading dot keeps it tidy
in Explorer / Finder and signals "don't sync this to other machines."

### `logs/`

Not created by default. Appears the first time the editor encounters
a crash — that's where `CrashLogger` writes a minidump and the
surrounding context.

## What travels in "Save As Bundle"

The **Save As Bundle** flow (`File → Save Project As Bundle…`)
recursively copies the new-project tree minus `.cache/` and `logs/`:

- `<name>.entity`
- `content/` (including `.archive/` sub-folders)
- `presets/`
- `objects/`
- `exports/`
- `snapshots/`

`.cache/` is excluded because it's machine-local — it'll rebuild on
the destination machine. `logs/` is excluded because crash logs from
machine A don't help diagnose problems on machine B.

## What's safe to delete

- `.cache/` — caches, regenerated on demand.
- `logs/` — diagnostic logs. Keep around if you've had an issue,
  otherwise fine to remove.

Don't delete `<name>.entity`, `content/`, `objects/`, or anything
under them.

## Legacy projects

If you have a project from an earlier version that's missing one of
the canonical subfolders, **File → Repair Project Layout** creates
any missing directories without touching existing content.
Idempotent — safe to run on a fully-formed project.
