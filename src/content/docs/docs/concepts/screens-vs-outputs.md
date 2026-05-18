---
title: Screens vs physical outputs
description: The difference between a logical screen and a physical display.
sidebar:
  order: 4
---

entity separates **screens** (logical surfaces) from **physical outputs**
(actual displays). This is the same distinction big media servers have
made for years, and it matters for the same reason: shows are designed in
the abstract, then mapped to whatever displays you have on the day.

## Screens

A screen is a **logical surface** in your show. Examples:

- "Stage Left Cyc"
- "Centre Wall"
- "House Right Projector"
- "LED Pixel Map"

Screens have a resolution and an aspect. Clips on the timeline are
assigned to a screen via `targetScreen`. Multiple clips can render to the
same screen and are composited per the timeline's blend modes.

You design and rehearse against screens — they're stable across venues.

## Physical outputs

A physical output is an **actual display** connected to your machine —
HDMI, DisplayPort, or DVI. entity discovers attached displays at startup
and identifies each by **EDID** (the small descriptor block the display
broadcasts).

EDID-based identification matters because:

- It survives reboots
- It survives re-cabling
- It distinguishes between "HDMI 2" today and "HDMI 2" tomorrow when
  you've swapped the cable order

## Mapping screens to outputs

The **Outputs** window lets you assign a screen to a physical output. The
relationship is:

- **One screen → one output** — simplest case. The screen's pixels go to
  that display.
- **One screen → many outputs** — a single screen fans out, with optional
  per-output cropping ("input region"). Use this for a screen that spans
  multiple projectors.
- **Many screens → one output** — possible but unusual; typically you'd
  composite into one screen instead.

## Why the split

Two reasons:

1. **Show portability.** A show authored on a one-projector studio rig can
   run on a six-projector touring rig without rewriting the timeline —
   just remap screens to outputs.
2. **Calibration is per-output, not per-screen.** When you anchor-point a
   projector to a physical surface (see
   [Projection](/docs/projection/calibration/)), the calibration lives
   with the output, not the screen.

## Two planes (the bigger picture)

The screen ↔ output relationship is one half of how content reaches a
projector. The other half is **content routing** — which layer's pixels
end up on which screen. Together they form a two-plane mapping model:

- **Plane A: Content routing** — which logical sources feed which
  screens. Per-layer: "this clip plays on Screen X" or "tile-route this
  content across four LED panels." Authored in the Content Routing
  library. See
  [Projection → Content routing](/docs/projection/content-routing/).
- **Plane B: Feed output** — how a screen's pixels reach physical
  outputs. Warping, soft edges, per-output input regions. Authored in
  the Outputs window — this is what the rest of *this* page is about.

Keeping them separate means the same content can be re-routed without
re-touching projection calibration, and the same projection calibration
can be re-targeted without re-cutting the content.
