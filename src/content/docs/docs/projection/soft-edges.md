---
title: Soft edges
description: Blend the seam between overlapping projectors.
sidebar:
  order: 2
---

When two projectors overlap on the same surface, the overlap region looks
brighter than the rest of the image. **Soft-edge blending** ramps each
projector's output down across the overlap so the seam disappears.

## Setting it up

Soft edges are configured per **output**, not per screen. Open the
**Outputs** window, pick a physical output, and set:

- **Left blend** — width in pixels of the left-edge ramp
- **Right blend** — width in pixels of the right-edge ramp
- **Top blend** / **Bottom blend** — same, vertical
- **Gamma** — the falloff curve. 2.2 is a good starting point; tune until
  the overlap disappears

The values match what professional warpers use, so calibration recipes
from other systems translate.

## Tuning

The visible seam is gone when:

1. Each projector's ramped output, summed in the overlap, equals the
   non-overlap brightness
2. Black levels match (projectors lift black differently — set a black
   offset if needed)

Use a uniform grey test pattern across the blended surface. Adjust gamma
until the overlap is invisible.

## Multi-projector arrays

For two-projector horizontal blends: set **Right blend** on the left
projector and **Left blend** on the right projector to the same pixel
width. The screen's image fans out to both with the screen's pixels in
the overlap region appearing on both projectors.

For four-projector 2×2 arrays: blend on all four interior edges.
