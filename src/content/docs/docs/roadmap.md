---
title: Roadmap
description: What's done, what's queued, what's farther out.
---

A high-level view of where entity is going. The canonical board is the
[Entity Roadmap project](https://github.com/users/duremovich/projects/2)
on GitHub — that's the source of truth. This page is the readable
summary.

## Recently shipped

A lot of substantial work landed in late April and May 2026. Highlights:

- **Content Routing library + Feed Maps** — named, reusable routing
  assets (Direct / Tiled / Feed Map kinds), per-screen auto-direct
  entries, and a dedicated editor window with SVG template export.
  See [Projection → Content routing](/docs/projection/content-routing/).
- **Two-tier mapping** — Plane A (content routing: which logical
  content goes to which screen) and Plane B (feed output: how a
  screen's pixels reach physical outputs) are now separately authored
  concepts.
- **Per-layer effects** — ordered shader chain on every layer with nine
  engine effects shipped (blur, sharpen, vignette, pixelate, chromatic
  aberration, edge detect, brightness/contrast, hue/saturation,
  invert) plus a node-graph editor and **HLSL effect packs** for user-
  authored effects. See
  [Concepts → Effects](/docs/concepts/effects/).
- **Object Animation layers** — keyframe-drive screen and prop
  transforms (position / rotation / scale, nine axes) directly from
  the timeline. Hold-by-default end behavior so a parked transform
  stays put past the layer's end.
- **Generative layers** — procedural-content layers alongside video
  clips. Muncher v1 is the reference implementation (gamepad + OSC
  controls). See [Concepts → Layers](/docs/concepts/layers/).
- **Layer abstraction** — clips, object-animation, and generative all
  unified under a single `Layer` model on a timeline track; effects
  apply uniformly across kinds.
- **3D stage visualiser** — Stage3D GPU mesh pass with depth-correct
  z-order, props for pre-visualisation, scrim opacity, real-world
  Size in metres on screens and props.
- **Animation editor-stall fallback** — keyframe tracks now bake into
  the scene snapshot so animation stays alive during editor stalls
  (the show thread re-evaluates per render frame).
- **Real device-lost recovery** — D3D12 device removal recovers
  instead of crashing; display-retarget TDR fix for hot-plug.
- **Tracy profiling** — live CPU / GPU profiling, named frame
  contexts, per-system zones.
- **Editor / show thread split** — editor stalls no longer freeze the
  projector output. The dedicated show thread owns Present.
- **OSC receiver** — inbound OSC over UDP, namespace for transport,
  sections, cues, and Muncher controls. Companion-friendly. See
  [OSC docs](/docs/control/osc/).

## Now (in active development)

- **SectionScheduler full show-thread fallback** — section break
  detection and continuation-phase advancement still pause during
  long editor stalls; cues fire late after the stall ends. Partial
  mitigation (OA freeze hook) shipped; the full split is the
  remaining known editor-stall gap.

## Next (queued)

- **LTC / SMPTE timecode input** — sync to an external clock source
- **Outbound OSC** — playback state, section enter/leave, error events
- **Audio playback** — basic clip audio first, then per-output routing
- **NDI input** — receive live video into the timeline
- **Preview / program windows** — broadcast-style A/B output preview
- **Custom per-project OSC mappings** — the built-in namespace is
  fixed; per-project remaps are queued

## Later

Larger pieces of work that need their own design pass:

- **macOS port** — Metal renderer. The `IRenderer` abstraction is in
  place, but Metal is deferred until customer demand makes the case
  (per ADR-0001). No scaffolding today.
- **Linux port** — Vulkan renderer, after macOS lands.
- **Color management** — per-output ICC profiles, HDR workflows
- **Third-party plugin SDK** — the internal plugin architecture is
  load-bearing (OSC receiver and bus-logger ship as first-party
  plugins on it), but a supported public SDK with stable ABI
  guarantees isn't designed yet.

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
- **Visual scripting / node-based comp** — out of scope for content
  authoring. Author content in your tool of choice; play it back in
  entity. (The node graph for effect chains is a different beast —
  that's signal routing on a fixed parameter surface, not
  content creation.)
- **Long-GOP delivery codecs as first-class formats** — H.264 / HEVC
  are playable but always a transcode-recommended path. ProRes / HAP /
  PNG sequence stay primary.

## How priorities change

Roadmap order shifts based on what real users need. If something on
this page is critical for your show and isn't queued, open an issue
or start a discussion — that's the signal that moves priorities.
