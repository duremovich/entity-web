---
title: Black screen / no output
description: What to check when an output stays black.
sidebar:
  order: 2
---

If a physical output shows black, work through the chain from source to
display.

## Is a clip actually playing?

Check the editor preview pane. If the preview is black too, the issue is
upstream of output routing — check that a clip is on the timeline and
the playhead is over it.

## Is a screen assigned to the output?

Open **Outputs**. Verify:

- The output is **enabled**
- A **screen** is assigned to it
- The screen has a non-zero resolution

A common gotcha is creating a screen but forgetting to wire it to any
output.

## Is the clip targeting that screen?

Each clip has a `targetScreen`. If the clip is targeting "Stage Left"
and your output is routed to "Stage Right", the output stays black.

Check the clip's properties panel. Reassign if needed.

## Did GPU device-lost fire?

Severe driver issues can trigger a device-lost recovery path. The editor
logs `DXGI_ERROR_DEVICE_REMOVED` and posts a `DeviceLost` bus message.
Recovery is partial right now — the device-lost handler logs the reason
and the editor exits cleanly. Full live recovery is on the roadmap.

If this happens repeatedly, update your GPU drivers and check Windows
Event Viewer for driver crashes.

## Is the display itself working?

Sanity check: unplug the cable, replug it, switch displays. Sometimes the
problem is a flaky HDMI handshake, not entity.
