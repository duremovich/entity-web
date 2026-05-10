---
title: Sections (break-points)
description: Named break-points on the timeline for cueing and jumps.
sidebar:
  order: 3
---

A **section** is a named break-point on the timeline. Sections are how
shows are structured at the macro scale — typically one section per scene,
act, or cue.

Sections live on the **timeline**, not on clips. A section is a point in
time with metadata; a clip is a span of time with media. Don't confuse the
two.

## Anatomy of a section

```
{
  breakFrame:    24300       (the frame this section starts at)
  name:          "Act II"    (free text, shown in the UI)
  color:         "#ff7a2e"   (visual marker on the timeline)
  fadeSeconds:   0.5         (optional fade duration on jump-in)
}
```

## Creating a section

Right-click on the time ruler at the frame you want the section to begin
and pick **Add section here**. Set the name and (optionally) a colour and
fade duration in the section properties panel.

Sections are visible as coloured tick marks along the ruler.

## Jumping between sections

From the **Section** menu:

- **Next** — jump to the next section after the playhead.
- **Previous** — jump to the previous section.
- **Go to cue {N}** — jump to a specific section by index.

These are also addressable from [OSC](/docs/control/osc/), which is how a
stage manager or show caller will drive them.

## Per-clip section behavior

Each clip has a `sectionBehavior` property that controls what happens to
the clip when a section break is crossed:

- **Normal** (default) — when you jump to a section, the clip plays from
  its in-point relative to the new playhead position. Standard cue
  behavior.
- **Locked** — when you jump to a section, this clip continues from where
  it was. Useful for background elements (ambient loops, lower-thirds)
  that shouldn't restart on a cue jump.

`sectionBehavior` is a per-clip policy, not a reference to a specific
section.

## Continuation phase

When a section break fires with a non-zero fade, the playhead crosses the
break but the outgoing clips fade out over `fadeSeconds`. During this
**continuation phase** the system advances against wall-clock time so the
fade duration is exact regardless of frame rate or load.
