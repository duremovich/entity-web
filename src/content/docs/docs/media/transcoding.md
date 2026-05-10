---
title: Transcoding
description: Convert source media to an optimised codec for live playback.
sidebar:
  order: 2
---

If a clip is in a format that isn't ideal for live playback (typically
H.264 / HEVC), transcode it.

## How to transcode

Right-click a clip in the **Media Bin** → **Transcode**. Pick a target
codec (ProRes 4444 if you need alpha, otherwise HAP for many concurrent
layers).

Transcoding runs on a worker thread. The media bin shows progress; the
editor stays responsive.

## What transcoding does

1. Reads the source frame by frame
2. Writes a new file in the chosen format
3. **Replaces the source file at its canonical path**
4. Moves the original into `content/<subfolder>/.archive/`
5. Re-probes the media so metadata updates

After transcoding, the path stored in your project file is still valid —
it now points to the optimised version. The original is one folder away
if you ever want it back.

## When to transcode

- Anything H.264 / HEVC that will be on the show timeline
- Sources from creative tools (After Effects, Cinema 4D, Houdini) that
  exported into a delivery codec instead of a playback codec
- Any file showing stutter or seek lag during scrubbing

## When not to transcode

- ProRes that's already 4444 or 422
- HAP that's already in the right variant
- PNG sequences (transcode to ProRes 4444 if you want alpha + smaller
  footprint, but it's not required)
