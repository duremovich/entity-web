---
title: Roadmap
description: What's done, what's queued, what's farther out.
---

A high-level view of where entity is going. The canonical board is the
[Entity Roadmap project](https://github.com/users/duremovich/projects/2)
on GitHub — that's the source of truth. This page is the readable
summary.

## Now (Phase D)

These are landing in current development:

- **OSC receiver** — shipped. Inbound OSC, default namespace, Companion
  pairing. See [OSC docs](/docs/control/osc/).
- **Editor / show thread split** — shipped. Editor stalls no longer
  freeze the projector output for Timeline + DecodeSystem.
- **Tracy profiling** — shipped. Live CPU/GPU profiling, named frame
  contexts, per-system zones.
- **Animation system show-thread fallback** — in progress. Animated
  clip properties still freeze during editor stalls; gap is tracked.
- **Section scheduler show-thread fallback** — in progress. Cues fire
  late after editor stalls clear.

## Next (Phase D continued)

Queued for current phase, not yet started:

- **LTC / SMPTE timecode input** — sync to an external clock source
- **Outbound OSC** — playback state, section enter/leave, error events
- **Audio playback** — basic clip audio support, then per-output routing
- **NDI input** — receive live video into the timeline
- **Preview / program windows** — broadcast-style A/B output preview

## Phase E and beyond

Larger pieces of work that need their own design pass:

- **macOS port** — Metal renderer, currently scaffolded but not built
- **Linux port** — Vulkan renderer, queued after macOS
- **Multi-node sync** — synchronised playback across machines
- **Color management** — per-output ICC profiles, HDR workflows
- **3D stage visualiser** — disguise-style virtual stage view with
  camera controls (partially shipped — see Phase 5 notes)

## Pro plugins

Pro is a future commercial line. **Not for sale yet.** Expected first Pro
plugins, in rough priority order:

- **NDI output** — receive an entity screen as an NDI source
- **SDI output via Decklink** — broadcast-grade output hardware
- **Notch block playback** — render Notch blocks inside an entity
  timeline
- **Multi-node sync** — frame-locked playback across machines
- **Priority support** — for production users

[Pre-register interest](https://github.com/duremovich/Entity/discussions)
on the GitHub Discussions board if you want to be in the early-access
group.

## What's intentionally *not* on the roadmap

A few things people ask about that we've decided against (at least for
v1):

- **Cloud rendering / SaaS playback** — entity is local-first; the show
  runs on metal you control.
- **Visual scripting / node-based comp** — out of scope. We want a
  great media server, not another compositor. Author content in your
  tool of choice; play it back in entity.
- **Long-GOP delivery codecs as first-class formats** — H.264/HEVC are
  playable but always a transcode-recommended path. ProRes / HAP /
  PNG sequence stay primary.

## How priorities change

Roadmap order shifts based on what real users need. If something on
this page is critical for your show and isn't queued, open an issue
or start a discussion — that's the signal that moves priorities.
