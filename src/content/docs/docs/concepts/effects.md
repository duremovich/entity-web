---
title: Effects
description: Per-layer shader effects — engine effects, the stack and node-graph editors, and HLSL effect packs.
---

Every layer in the timeline carries an ordered **effect chain** — a
sequence of shader passes applied to the layer's pixels before it's
composited onto its target screen. Effects work uniformly on clip
layers and generative layers; the compositor doesn't care which kind
produced the pixels.

## Engine effects

Nine effects ship today, registered by the engine and available on
every project:

| Category | Effect | Parameters |
|---|---|---|
| Colour | Brightness / Contrast | brightness, contrast |
| Colour | Hue / Saturation / Lightness | hue, saturation, lightness |
| Colour | Invert | amount |
| Stylize | Gaussian Blur | radius |
| Stylize | Sharpen | amount, radius |
| Stylize | Vignette | radius, softness, intensity |
| Stylize | Pixelate | pixel size |
| Stylize | Chromatic Aberration | amount |
| Stylize | Edge Detect | threshold, thickness |

All effect parameters are animatable — drop keyframes on a slider and
the value tracks the timeline like any other animated property.

## Two editors

There's one underlying data model (an ordered list of effect entities
per layer) with two views into it:

- **Stack editor** — lives in the Property panel. Linear chain, drag
  to reorder, click to expand and tweak parameters. The right tool for
  a quick "blur + tint" on a single layer.
- **Node graph editor** (Effect Graph window) — the same chain laid out
  as a node graph with explicit signal flow. The right tool when the
  chain gets long enough that linear order is no longer obvious.

Both editors edit the same chain. Switching views never loses data.

## HLSL effect packs

The nine engine effects are the floor, not the ceiling. **Effect packs**
are user-authored HLSL shaders that the editor hot-reloads. Drop a
shader pack into the project's effects folder, the editor picks it up
within a frame, and any layer can use it from the same Add Effect menu
as the engine effects.

Pack format and authoring details live in the engine repo
(`plugins/effects/`); the format is stable enough to ship sample packs
alongside projects, but isn't yet a supported third-party SDK with
ABI guarantees.

## Where effects render in the pipeline

For the curious: per-layer effects run between content production and
final composite. A clip layer's decoded frame (or a generative layer's
procedural texture) is fed through the effect chain via two ping-pong
render targets; the final result is what the compositor reads when it
draws the layer onto its target screen.

This means an effect can be expensive without paying for it on every
screen the layer ends up on — the chain runs once per layer, regardless
of how many screens the layer routes to.

## See also

- [Concepts → Layers](/docs/concepts/layers/) — the three layer kinds
  effects apply to
- [Projection → Content routing](/docs/projection/content-routing/) —
  how a layer's post-effect pixels reach its target screens
