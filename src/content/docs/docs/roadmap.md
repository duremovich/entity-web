---
title: Roadmap
description: What's done, what's queued, what's farther out.
---

A high-level view of where entity is going. The canonical board is the
[Entity Roadmap project](https://github.com/users/duremovich/projects/2)
on GitHub — that's the source of truth. This page is the readable
summary.

## Recently shipped

- **OSC receiver** — inbound OSC over UDP, default namespace, Companion
  pairing. See [OSC docs](/docs/control/osc/).
- **Editor / show thread split** — editor stalls no longer freeze the
  projector output for the timeline + decode pipeline.
- **Tracy profiling** — live CPU / GPU profiling, named frame contexts,
  per-system zones.

## Now (in active development)

- **Animation show-thread fallback** — animated clip properties freeze
  during editor stalls today; gap is being closed.
- **Section scheduler show-thread fallback** — section cues fire late
  after editor stalls clear; same fix shape.

## Next (queued)

- **LTC / SMPTE timecode input** — sync to an external clock source
- **Outbound OSC** — playback state, section enter/leave, error events
- **Audio playback** — basic clip audio first, then per-output routing
- **NDI input** — receive live video into the timeline
- **Preview / program windows** — broadcast-style A/B output preview

## Later

Larger pieces of work that need their own design pass:

- **macOS port** — Metal renderer, currently scaffolded
- **Linux port** — Vulkan renderer, queued after macOS
- **Color management** — per-output ICC profiles, HDR workflows
- **3D stage visualiser** — virtual stage view with camera controls
  (partially shipped)
- **User extension SDK** — a supported way for third parties to extend
  entity. The internal architecture is in place; the public SDK isn't
  designed yet and isn't an initial-launch concern.

## Pro edition

A paid **Pro** edition with production-hardware integration is in
design. Not for sale yet. First Pro features, in rough priority order:

- **NDI output** — publish an entity screen as an NDI source
- **SDI output (Decklink)** — broadcast-grade output hardware
- **Notch block playback** — render Notch blocks inside the timeline
- **Multi-node sync** — frame-locked playback across machines
- **Priority support** — for production users

[Pre-register interest](https://github.com/duremovich/Entity/discussions)
on GitHub Discussions to be in the early-access group.

## What's intentionally *not* on the roadmap

- **Cloud rendering / SaaS playback** — entity is local-first; the show
  runs on metal you control.
- **Visual scripting / node-based comp** — out of scope. Author content
  in your tool of choice; play it back in entity.
- **Long-GOP delivery codecs as first-class formats** — H.264 / HEVC
  are playable but always a transcode-recommended path. ProRes / HAP /
  PNG sequence stay primary.

## How priorities change

Roadmap order shifts based on what real users need. If something on
this page is critical for your show and isn't queued, open an issue
or start a discussion — that's the signal that moves priorities.
