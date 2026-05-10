---
title: Multi-projector setups
description: Two or more projectors covering one screen, blended at the seams.
sidebar:
  order: 3
---

A common projection-mapping rig has two or more projectors covering
parts of a larger surface, with overlap between them blended into a
seamless image. This page walks through setting that up in entity.

## The mental model

```
┌─────────────────────────────────────────┐
│                                         │
│       SCREEN: "Cyc" (3840 × 1080)       │
│                                         │
└──────────────┬──────────┬───────────────┘
               │          │
               │  overlap │
               │  (256 px)│
               ▼          ▼
        ┌─────────────┐ ┌─────────────┐
        │ Proj-Left   │ │ Proj-Right  │
        │ 1920×1080   │ │ 1920×1080   │
        └─────────────┘ └─────────────┘
```

You design the show against **one wide screen**. entity fans the
screen's pixels out to **two physical outputs**, each cropped to its
half of the screen with an overlap region you'll blend.

## Step 1 — create the screen at the full target resolution

In **Screens**, create a screen at the final resolution you want
covered. For two side-by-side 1920×1080 projectors with a 256px
overlap, the screen is `1920 + 1920 − 256 = 3584` wide × `1080` tall.
For a clean number, use `3840 × 1080` and let the overlap be `> 256`.

Authoring is on this screen. Drop clips at this resolution; map
content to it. The fact that two projectors cover it is a downstream
concern.

## Step 2 — assign the screen to both outputs with input regions

In **Outputs**, for each physical output:

- Enable the output
- Assign it to the screen
- Set the **input region** to the screen rectangle this output covers

For the example above:

| Output | Input region (x, y, w, h) | Notes |
|---|---|---|
| Proj-Left | `(0, 0, 1920, 1080)` | left 1920 of the 3584 |
| Proj-Right | `(1664, 0, 1920, 1080)` | right 1920, overlapping by 256 |

Each output now receives its slice of the screen.

## Step 3 — set soft-edge ramps on the overlap

In **Outputs**, for each output, set the blend width on the **interior**
edge:

| Output | Blend setting | Value |
|---|---|---|
| Proj-Left | Right blend | 256 px (matches the overlap) |
| Proj-Right | Left blend | 256 px |

Gamma defaults to 2.2; tune once you can see the seam.

## Step 4 — calibrate each projector

Open the **Mapping** window. Each projector has its own anchor-point
set. Calibrate each one to its physical surface coverage independently
of the other.

If both projectors are square to the same flat surface, no calibration
is needed beyond the input region setup above. If anything is
off-axis (typical for off-the-floor or rigged installs), calibrate.

## Step 5 — tune the blend

Project a uniform grey test pattern across the screen. The seam should
be invisible. If you see:

- **A bright band** in the overlap → blend ramp is too steep. Increase
  blend width on both sides.
- **A dark band** in the overlap → ramps don't sum to 1.0 in the
  overlap. Adjust gamma; 2.2 is a starting point.
- **A coloured band** → projectors have different colour profiles. Use
  per-output colour calibration (roadmap; for now, set the projectors
  to the same colour mode in their own menus).

See [Soft edges](/docs/projection/soft-edges/) for tuning detail.

## More than two projectors

The pattern extends linearly. For a four-projector 2×2 grid:

- One screen at the combined target resolution
- Four physical outputs with input regions covering their quadrant
- Blends on all four interior edges (right + bottom on top-left
  output; left + bottom on top-right; etc.)
- Calibrate each projector independently

## What to commit before the show

- Output assignments (which physical display is which projector)
- Input region rectangles
- Soft-edge widths and gamma
- Each projector's anchor-point calibration

All of this lives in the project file and travels with the project. If
the venue's rig matches the project's setup, you open and you're done.
If the venue is different, you recalibrate — but the screen-level show
content stays untouched.
