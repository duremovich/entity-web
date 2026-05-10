---
title: Importing media
description: Add video and image files to your project's media bin.
sidebar:
  order: 3
---

There are two ways to get media into entity. Both end up in the same place.

## Drop files into `content/`

The simplest path. Open the project folder in Explorer, paste your media
into `content/` (or any subfolder under it). entity's content scanner
notices and the media bin updates within a frame or two — no restart, no
re-import.

## Import via the media bin

From the **Media Bin** panel, click **Import** and pick files or folders.
entity copies them into `content/` for you, preserving subfolder structure
if you drag a directory.

## Supported formats

| Format | Notes |
|---|---|
| ProRes 4444 | Full alpha support. Hero codec for compositing. |
| ProRes 422 (HQ / LT / Proxy) | Decoded via FFmpeg. |
| HAP / HAP Q / HAP Alpha | GPU-friendly, decodes cheap. |
| PNG sequence | Directory of `.png` files, alphabetically sorted. |
| H.264 / HEVC | Playable but **not recommended** for live show — long GOP, costly seeks. Transcode first. |

If you drop an unsupported format in, the media bin shows it greyed out with
a note. Right-click → **Transcode** to convert it.

## Probing happens in the background

When new media appears, entity probes it for frame rate, resolution, codec,
duration, and alpha presence. The probe runs on a worker thread and doesn't
block the editor. You'll see the metadata fill in within a second or two.

## Mixed frame rates

Drop a 24fps clip on a 60fps timeline and it plays back at **its own native
frame rate** — not stretched, not retimed. See
[Mixed frame rate](/docs/media/mixed-frame-rate/) for the details.

## Next

Now [build a timeline →](/docs/getting-started/building-a-timeline/)
