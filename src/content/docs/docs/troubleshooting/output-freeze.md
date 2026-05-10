---
title: Output frozen during editor drag
description: Diagnose freezes on projector output when the editor is interacted with.
sidebar:
  order: 1
---

**Symptom:** the projected image freezes on a single frame while you drag
the editor window, resize it, open a file dialog, or wait for a project
to load. The freeze clears the moment the interaction ends, and playback
resumes at a later position (the timeline kept advancing in the
background).

## What's almost certainly not the problem

This is **rarely** a display-layer bug. entity's architecture runs the
GPU compositing and output present on a dedicated **show thread** that
keeps rendering at 60Hz even when the editor thread is stalled by a
modal interaction. The swap chain stays active.

What freezes is the **content** the show thread is rendering, because
some content-pipeline system stopped feeding it new state.

## The marker test

Before chasing any display-layer theory, prove which layer is broken.
Add a per-frame counter quad to the output that's totally independent of
timeline / decode / animation state — e.g. a small rectangle that cycles
through red / green / blue across consecutive frames. Then:

- **Marker keeps cycling during the stall** → swap chain is fine. The
  content pipeline is the broken layer. Something stopped advancing.
- **Marker freezes too** → swap chain is genuinely stuck. Rare on this
  codebase. Use [PresentMon](https://github.com/GameTechDev/PresentMon)
  to confirm.

## Known content-pipeline freezes

Some systems run only on the editor thread, so they stop ticking during
stalls. As of writing:

- **Timeline** — has show-thread fallback. Should not freeze.
- **DecodeSystem** — has show-thread fallback. Should not freeze.
- **AnimationSystem** — does **not** have a fallback yet. Animated
  opacity / transform / rotation / scale will freeze during editor
  stalls.
- **SectionScheduler** — does **not** have a fallback yet. Section cues
  fire late after the stall ends.

If you're hitting an animation freeze or a late cue, you're not crazy —
it's a known gap. Tracked on the roadmap.

## Mitigations

- Avoid native modal dialogs (Open / Save) during cued performance. Use
  scripted runs that pre-open the project.
- Keep heavy editor operations (large transcodes, project loads) off
  the show machine — do them on a build workstation.
