---
title: Building a timeline
description: Place clips, scrub, set up sections, send output.
sidebar:
  order: 4
---

The timeline is where clips become a show. It runs at a fixed frame rate
(the **timeline frame rate**), and each clip plays back at its **own
source frame rate** mapped onto that timeline.

## Add a clip

Drag a clip from the **Media Bin** onto a timeline track. It snaps to the
playhead by default. To place it precisely, scrub the playhead first (drag
the time ruler) and then drop.

You can also click an empty timeline cell to insert at that frame.

## Move, split, duplicate

- **Drag** to move a clip along its track or to another track.
- **Right-click → Split** at the playhead to cut a clip in two.
- **Right-click → Duplicate** to copy a clip in place.
- **Alt + mouse wheel** to zoom the timeline (10 → 500 px/sec).

## Scrub and play

- **Click and drag** the time ruler to scrub.
- **Spacebar** to play / pause.
- **Drag the playhead backward, then play** — works without freezing
  (decoder seek is debounced).

## Sections (break-points)

A **section** is a named break-point on the timeline — typically the
boundary between acts, scenes, or cues. Right-click the ruler at the frame
you want and pick **Add section here**. Sections store a name, a colour,
and an optional fade duration.

From the **Section** menu you can:

- **Section → Next** — jump to the next section.
- **Section → Go to cue {N}** — jump to a specific cue number.

Sections are also addressable from [OSC](/docs/control/osc/) and
[Companion](/docs/control/companion/), which is how show callers usually
drive them.

## Send output to a projector

By default the editor renders to its preview pane. To send to a real
display:

1. Open **Window → Outputs**.
2. entity lists the physical displays attached to your machine (identified
   by EDID — they're stable across reboots and re-cabling).
3. Assign a **screen** to a **physical output** and tick **Enabled**.

Screens are logical surfaces ("Stage Left", "Cyc"). Physical outputs are
the actual displays. The same screen can fan out to multiple outputs (with
optional cropping per output), and you can map a screen's pixels onto a
[calibrated projector surface](/docs/projection/calibration/).

## Next

You now have a playing project. From here:

- Understand the building blocks → [Concepts](/docs/concepts/)
- Map a real projector → [Projection](/docs/projection/)
- Wire up show control → [OSC](/docs/control/osc/)
