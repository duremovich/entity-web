---
title: Timeline & layers
description: How the timeline, tracks, and layers fit together.
sidebar:
  order: 2
---

The timeline is the show's score. It runs at a fixed **timeline frame
rate** and is divided into **tracks**, with **layers** placed along each
track at specific frame positions.

A layer has a Kind — **Clip** (video / image / PNG sequence), **Object
Animation** (keyframe-drive a screen or prop transform), or
**Generative** (procedural content like Muncher). See
[Concepts → Layers](/docs/concepts/layers/) for the full breakdown. The
rest of this page focuses on the clip kind, which is the most common.

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

Each track stacks bottom-to-top in the composite — higher track numbers
render on top.

Tracks have no fixed type. Any track can host any layer kind: a clip
layer next to an object-animation layer next to a generative layer.
Audio doesn't have a separate track type because entity's primary job
is video playback; audio is on the roadmap.

## Clips

A clip layer is a reference to a media file plus:

- **Start frame** on the timeline
- **Duration** in timeline frames
- **In point** in the source media
- **Opacity**, **transform** (position, scale, rotation), **blend mode**
- **Animated properties** (keyframes for position, scale, rotation,
  opacity)
- **Content routing** — which screens this clip plays on (see
  [Projection → Content routing](/docs/projection/content-routing/))
- **Effect chain** — ordered shader effects (see
  [Concepts → Effects](/docs/concepts/effects/))
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
