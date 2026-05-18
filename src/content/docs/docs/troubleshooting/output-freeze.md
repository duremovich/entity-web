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

## Per-system fallback status

Some systems run only on the editor thread, so they stop ticking during
stalls. As of writing:

| System | Status | Behavior during editor stall |
|---|---|---|
| **Timeline** | ✅ Fallback active | Show-thread fallback ticks the playhead. Atomic writes, no registry mutation. |
| **DecodeSystem** | ✅ Fallback active | Show-thread fallback sets decoder target frames. Atomic writes only. |
| **AnimationSystem** | ✅ Snapshot-bake | Keyframe tracks bake into the scene snapshot on the editor thread; the show thread re-evaluates them per render frame. Animation keeps moving during editor stalls. |
| **SectionScheduler** | ⚠️ Partial | A freeze hook for Locked object-animation layers landed, so they hold correctly across breaks. But section break **detection** and **continuation-phase advancement** still stall — section cues fire late after a long editor stall ends. The full show-thread split is the only remaining known editor-stall gap. |

If you're hitting late cues after a long editor stall, you're not crazy
— SectionScheduler's full fallback is on the roadmap.

## Mitigations

- Avoid native modal dialogs (Open / Save) during cued performance. Use
  scripted runs that pre-open the project.
- Keep heavy editor operations (large transcodes, project loads) off
  the show machine — do them on a build workstation.
