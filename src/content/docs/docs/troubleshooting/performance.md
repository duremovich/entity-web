---
title: Performance — what to check
description: When playback stutters or frame rate drops below target.
sidebar:
  order: 4
---

If playback stutters, drops frames, or feels uneven:

## Are you running multi-layer?

A single ProRes 4444 1080p clip at 60fps is the baseline — anything
should handle that. Multi-layer concurrent decode + composite is where
performance differentiates.

Stress profile is **3 × ProRes 1080p layers** at 60fps with two
outputs. If you're below that on recommended-spec hardware, something
is misconfigured. Above that, hardware matters.

## Profile with Tracy

entity builds with [Tracy](https://github.com/wolfpld/tracy) profiling
support by default (`ENTITY_ENABLE_TRACY=ON`). Tracy attaches
on-demand — overhead is near zero when no profiler is connected.

1. Download `Tracy.exe` v0.13.1 from the Tracy GitHub releases page
2. Run `EntityMediaEditor.exe`
3. Run `Tracy.exe` and click **Connect**
4. Two named frame contexts are visible: `Editor` and `Show`
5. Look for the longest zones in `Show` frames — that's your bottleneck

## Common bottlenecks

| Symptom | Likely cause |
|---|---|
| Decode queue depth keeps growing | Disk too slow, or too many concurrent decode workers competing for the same disk |
| GPU zone dominates show frame | Too many layers / blend mode cost / 4K compositing on entry GPU |
| Frame cache hit rate low | Backing storage is slow; consider adding more RAM for cache |
| Editor frame budget over but show smooth | The editor is doing too much per-tick; show output is fine |

## Disk speed matters

Live multi-layer playback eats sequential read. Spinning disks won't
keep up with more than one or two ProRes streams. SATA SSDs handle a
few. NVMe handles many.

If you're stuttering on multi-layer playback, **check disk read
performance first** — `WinSAT disk -drive <letter>` gives a quick read
number.
