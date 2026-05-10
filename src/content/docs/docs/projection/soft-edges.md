---
title: Soft edges
description: Blend the seam between overlapping projectors.
sidebar:
  order: 2
---

When two projectors overlap on the same surface, the overlap region
looks brighter than the rest of the image. **Soft-edge blending** ramps
each projector's output down across the overlap so the seam disappears.

## Setting it up

Soft edges are configured per **physical output**. Open the **Outputs**
window, pick an output, and set:

| Setting | What it does |
|---|---|
| **Left blend** | Width (px) of the ramp on the left edge of this output |
| **Right blend** | Width (px) of the ramp on the right edge |
| **Top blend** | Width (px) of the ramp on the top edge |
| **Bottom blend** | Width (px) of the ramp on the bottom edge |
| **Gamma** | Falloff curve. Start at 2.2 |
| **Black level** | Per-output black-offset compensation (used when projectors lift black differently) |

These match conventions used in professional warpers, so calibration
recipes from other systems translate directly.

## Theory in one paragraph

In the overlap region, two projectors' ramped outputs are summing
together. For the overlap to look the same brightness as the
non-overlap, each projector's contribution at any point in the overlap
plus the other projector's contribution at the same point should equal
the full-brightness signal. That sum is 1.0 only if the ramps have the
right shape — that shape is what `gamma` controls.

A 2.2 gamma is correct in the linear-physics case (projectors emit
linear light; eyes see gamma-corrected). 1.0 (linear ramp) is wrong;
visible bands appear. Higher values overshoot the seam.

## Tuning recipe

The fastest way to land a clean blend:

### 1. Test pattern

Project a uniform mid-grey (RGB `128, 128, 128`) across the whole
screen. The overlap is the area you're tuning.

### 2. Start values

| Setting | Starting value |
|---|---|
| Blend width on interior edges | Match the overlap width (e.g. 256 px if the projectors overlap by 256 px) |
| Gamma | 2.2 |
| Black level | 0 |

If you don't know the overlap width exactly: project the test pattern
with both projectors at full, no blend. Measure (or eyeball) the
brightness ramp width on the surface — that's the overlap.

### 3. Look at the seam

You'll see one of three things:

| What you see | What it means | What to do |
|---|---|---|
| **A bright band** in the overlap | Ramps aren't ramping enough — total brightness > 1.0 in the middle of the overlap | Increase blend width on both sides (e.g. 256 → 320) |
| **A dark band** in the overlap | Ramps overshoot — total brightness < 1.0 | Decrease gamma (2.2 → 1.8). If that washes out, increase blend width instead. |
| **A coloured band** (greenish, magenta, etc.) | Projectors have different colour profiles | Set both projectors to the same colour mode in their own menus first. Per-output colour calibration is on entity's roadmap |

### 4. Black level

After the mid-grey blend looks clean, project **full black**. If you
see the overlap region as a noticeably lighter rectangle than the
non-overlap, the projectors have different black-floor brightnesses —
the brighter areas are double-lifted in the overlap.

Lift the **black level** on the *non-overlapping* part of each output
until the overlap and non-overlap match. This costs you a bit of black
depth across the whole image, but it's the trade you make for an
invisible seam.

### 5. Check across the image

Move the test pattern through a few representative content frames — a
bright sky, a dark scene, a high-contrast logo. Sometimes a blend that
looks perfect on grey breaks on actual content; usually that's a sign
gamma is slightly off.

Iterate until you can't see the seam on real content under show
lighting.

## Two-projector horizontal blend (example values)

For two `1920 × 1080` projectors covering a `3584 × 1080` screen with
a 256-pixel overlap:

| Output | Right blend | Left blend | Gamma | Notes |
|---|---|---|---|---|
| Proj-Left | 256 | 0 | 2.2 | only ramp the interior edge |
| Proj-Right | 0 | 256 | 2.2 | mirror |

Adjust gamma per the recipe above. Set black level if needed after.

## Common mistakes

- **Asymmetric blend widths** — left projector's right blend = 256 but
  right projector's left blend = 200. The overlap looks weird because
  one side ramps faster. Always match.
- **Forgetting calibration** — soft edges + un-calibrated off-axis
  projectors gives you a blended-but-warped image. Calibrate first,
  blend second.
- **Black level set on the overlap side** — it should be lifted on
  the *non-overlapping* region, so the math comes out evenly in the
  overlap.

## Roadmap

- Per-output colour calibration
- Per-vertex blend mask (for irregular overlaps on warped surfaces)
- Automated blend tuning from a camera-aided calibration pass
