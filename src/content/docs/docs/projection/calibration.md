---
title: Projector calibration
description: Anchor-point calibration with a lens model.
sidebar:
  order: 1
---

Projector calibration in entity uses **anchor points**: you pick known
points on the projected image, drag them to their real-world positions on
the surface, and entity solves the projector's pose and lens parameters
to make everything line up.

## When to calibrate

Calibrate any time a projector is involved and the projected image isn't
naturally rectangular on the surface. Common cases:

- Mapping onto a non-flat surface (curved wall, set piece, sculpture)
- Off-axis projection (projector mounted at an angle to the surface)
- Multi-projector blending where each projector covers part of a larger
  surface

If you're projecting square-on at a flat screen, you don't need
calibration.

## How to calibrate

1. Open the **Mapping** window.
2. Pick the screen you want to calibrate.
3. entity shows the screen with **anchor points** overlaid — typically
   the four corners plus optional centre / edge points.
4. Drag each anchor point on the projected image until its position
   matches a known reference point on the surface (e.g. a corner of a
   tape mark you've placed there).
5. Save the calibration. It persists in the project file.

## The lens model

entity solves for a small lens model: focal length, principal point, and
the projector's pose (position + orientation) relative to the surface.
This is more accurate than a pure 2D homography because it accounts for
how a projector's image distorts when it's off-axis to its target.

The lens model is captured at five interlocking sites inside the
engine — if you're hacking on calibration code, see ADR-0011 in the
engine repo for the architecture.

## Schema

Calibration data persists in the project file at schema v8 or later.
Anchor positions, lens parameters, and the solved pose are all stored.
Open a project from a different machine and the calibration comes with
it.
