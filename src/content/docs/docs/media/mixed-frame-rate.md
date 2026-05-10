---
title: Mixed frame rate
description: How clips with different native frame rates play on a single timeline.
sidebar:
  order: 4
---

The timeline has a fixed frame rate. Clips have their own native frame
rate. entity plays each clip at its **native rate**, mapped onto the
timeline.

## What this means

Drop a 24fps clip on a 60fps timeline:

- The clip's **duration on the timeline** is calculated as
  `(totalSourceFrames × timelineFps) / sourceFps`. A 240-frame, 24fps
  clip (10 seconds) takes 600 timeline frames at 60fps — also 10 seconds.
- During playback, entity maps each timeline frame to a source frame:
  `sourceFrame = timelineFrameInClip × (sourceFps / timelineFps)`. The
  clip advances by ~0.4 source frames per timeline frame; the same source
  frame is shown across multiple timeline frames.

The result: the clip plays at its **wall-clock speed**, not stretched and
not retimed.

## Why this matters

If you've worked with media servers that 1:1-map frame numbers regardless
of rate, you'll have seen "the video ends early and plays too fast"
issues. entity doesn't do that. A 24fps clip on a 60fps timeline ends
when it should and plays at the speed it should.

## Splitting and duplicating

Clip operations (split, duplicate, trim) all respect the rate ratio.
Split a 240-source-frame 24fps clip at the 5-second mark on a 60fps
timeline:

- Timeline: clip ends at frame 300 of the timeline, second clip starts at
  300, ends at 600
- Source frames: first clip plays source frames 0–119, second plays
  120–239

You stay aligned in wall-clock time.

## Frame blending

A per-clip `frameBlending` field exists in the data model for cases where
visible "stutter" from showing the same source frame across multiple
output frames is unwanted. Renderer support is on the roadmap.
