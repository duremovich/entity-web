---
title: Content folder layout
description: How content/ is organised, what .archive/ is for.
sidebar:
  order: 3
---

`content/` is where your project's media lives. The rules are simple:

## You can organise however you like

Folders inside `content/` become folders in the media bin. Organise by
act, scene, content type, source — anything that helps you find clips
during a long build.

```
content/
├── act1/
│   ├── opener.mov
│   └── lower-thirds.mov
├── act2/
│   ├── interlude.mov
│   └── credits/
│       ├── credits_v1.mov
│       └── credits_v2.mov
└── ambient/
    └── loop-bg.mov
```

## External writes are auto-discovered

Copy a file into `content/` from Explorer while the editor is running —
the content scanner notices and updates the media bin. No restart, no
manual import step.

## Filename versioning

`opener.mov` and `opener_v2.mov` are recognised as the **same logical
media**. entity auto-rolls to the newest version (`_v2` here).

The pattern is `<base>_v<tag>` — anything after `_v` is a version tag,
string-compared. So `opener_v2.mov` beats `opener_v1.mov` and
`opener_va.mov` beats both.

When the editor sees a new version, the timeline updates to play it; the
old version stays on disk in case you need to revert.

## `.archive/` folders

Each `content/<subfolder>/` has a sibling `.archive/`. This is where
**transcode replacements** go. When you transcode a file, the original
moves to `.archive/` and the transcoded version takes its place at the
canonical path.

You can safely delete `.archive/` if you're sure you won't need the
originals. They're not referenced by the project file.

## Cache validity

entity caches decoded frames in `cache/`. Cache validity is keyed on the
**file size** of the source, not modification time — cloud sync and
"Files On-Demand" both touch mtime without changing content, which would
otherwise invalidate the cache every time.

To force a rebuild: delete `cache/`. It regenerates on next play.
