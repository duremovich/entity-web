---
title: Layers
description: The three layer kinds — clip, object animation, and generative — that live on a timeline track.
---

A timeline track holds **layers**. Every layer has a start frame,
duration, label, colour, and a **Kind** that determines what kind of
thing it does. Three Kinds ship today.

## Clip layers

The original meaning of "clip" — a video, image, or PNG sequence with
a position on the timeline. Clip layers render through the GPU
compositor with opacity, blend mode, transform, and per-layer effects.

Their target is a **Screen** (or "all visible screens" by default).
Routing is configured via the Content Routing library — see
[Projection → Content routing](/docs/projection/content-routing/).

## Object Animation layers

Object Animation (OA) layers don't render pixels — they **keyframe-drive
a target's transform**. Pick a target Screen or Prop, drop keyframes
along the timeline for any of nine animatable axes (position X/Y/Z,
rotation X/Y/Z, scale X/Y/Z), and the target moves through 3D space
as the playhead advances.

Two policy fields on each OA layer:

- **End behaviour** — `Hold` (default) keeps the last evaluated
  transform applied past the layer's end. `Reset` releases the
  override and lets the target fall back to its Stage-configured base
  position.
- **Section behaviour** — `Normal` (default) keeps evaluating across
  section breaks. `Locked` freezes the transform at the value it
  carried into the break, until the next section's GO releases it.

Multiple OA layers can target the same screen; their effects fold in
order (last-write-wins per channel, ordered by track index).

## Generative layers

Generative layers render **procedural content** instead of decoded
video — populated by a system that ticks each frame and writes into
the layer's compose target. The first one shipping is **Muncher**, a
Pac-Man-style playfield with gamepad / OSC controls.

A generative layer is otherwise just another layer in the timeline —
it composites through the same path as a clip, accepts per-layer
effects, has its own target screen, and serializes into the project
file like any other layer.

The architecture supports adding more generative kinds; Muncher proves
the pipeline end-to-end (input bus, snapshot bake for show-thread
rendering, effects chain, OSC routing).

## Why this matters

Before the Layer abstraction, "clip" was the only concept the timeline
knew about. Now the timeline is content-neutral — anything that needs
a start frame and a duration can ride on a track:

- Video on screen 1 (Clip layer)
- A keyframed move of screen 1 from stage-left to stage-right (Object
  Animation layer)
- A reactive Muncher game on screen 2 driven by a gamepad (Generative
  layer)

…all on the same timeline, sequenced from sections, composited through
one path.
