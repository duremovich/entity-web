---
title: Projection
description: Calibration, soft edges, multi-projector setups.
sidebar:
  order: 0
---

When you have to land pixels on a real surface in the real world:

- **[Calibration](/docs/projection/calibration/)** — anchor-point calibration with a lens model
- **[Soft edges](/docs/projection/soft-edges/)** — blending overlap between projectors
- **[Multi-projector setups](/docs/projection/multi-projector/)** — two or more projectors covering one screen

Projection mapping is iterative — expect to recalibrate when a
projector gets bumped, a rigging point shifts, or you move to a new
venue. entity's anchor-point UI is designed for repeated calibration:
the math underneath stays stable, the human pulls the corners.
