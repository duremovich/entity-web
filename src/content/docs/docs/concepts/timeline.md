---
title: Timeline & clips
description: How the timeline, tracks, and clips fit together.
sidebar:
  order: 2
---

The timeline is the show's score. It runs at a fixed **timeline frame
rate** and is divided into **tracks**, with **clips** placed along each
track at specific frame positions.

## Frame rate

The timeline frame rate is set when you create a project. It doesn't
change when you import media — a 24fps clip on a 60fps timeline plays at
its own native frame rate. See
[Mixed frame rate](/docs/media/mixed-frame-rate/) for the full story.

Common choices:

- **60 fps** — projectors, LED walls, smooth-feeling installations
- **30 fps** — broadcast, web
- **24 fps** — film festivals, cinema

## Tracks

Each track is a layer in the composite. Higher track numbers render on
top. Each clip on a track has its own opacity, blend mode, and transform.

Tracks have no fixed type — any track can host any clip. There are no
"video tracks" vs "audio tracks" because entity's primary job is video
playback; audio comes from the clip itself (when present).

## Clips

A clip is a reference to a media file plus:

- **Start frame** on the timeline
- **Duration** in timeline frames
- **In point** in the source media
- **Opacity**, **transform** (position, scale, rotation), **blend mode**
- **Animated properties** (keyframes for position, scale, rotation,
  opacity)
- **Target screen** — which logical screen this clip renders to
- **Section behavior** — how this clip interacts with section break-points

Clips are pure data. Move, split, duplicate, retime — none of that
changes the underlying media file.

## Operations

- **Split** at the playhead. The clip becomes two clips that abut. Both
  inherit the original's properties.
- **Duplicate** in place. The copy lands on the next track up (or you can
  drag it).
- **Trim** by dragging the clip's leading or trailing edge.
- **Animate** any of opacity, position, scale, rotation by adding
  keyframes from the **Properties** panel.

## Scrubbing

Scrubbing is a first-class operation. The decoder is aware that you're
scrubbing and avoids thrashing — it skips intermediate seeks during the
drag and does one final seek on release.
