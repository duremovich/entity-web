---
title: FAQ
description: Frequently asked questions about entity, its license, and what it's for.
---

## What is entity?

A C++ media server for live shows and installations. Multi-layer video
playback, projection mapping, OSC control. Open-source under GPLv3.

## Who is it for?

People putting pixels on physical surfaces in live contexts —
projection-mapping artists, theatre / festival video techs, museum and
gallery installations, themed entertainment. If you'd otherwise reach
for a commercial media server, entity is meant to be that for free.

## Is it stable enough for a real show?

It's in active development and pre-1.0. Core playback, projection
mapping, OSC control, per-layer effects, layered timelines (clips +
object-animation + generative), and content routing are functional and
used day-to-day; 510/510 ctests green at current HEAD. One known
editor-stall gap remains — SectionScheduler's full show-thread
fallback — see
[Troubleshooting → Output frozen during editor drag](/docs/troubleshooting/output-freeze/).

For a real show today: do a full tech rehearsal on the actual hardware,
and don't bet on features marked "in progress" on the
[Roadmap](/docs/roadmap/).

## License

The engine is **GPLv3**. Modifications to the engine itself stay
open-source. Running shows with entity (without redistributing the
engine) is unrestricted commercial use.

## Can I use it commercially?

Yes. GPLv3 doesn't prevent commercial use — it requires you to
distribute source if you redistribute the engine itself. Running shows
with entity is not a redistribution event.

If you're shipping a product that bundles entity, open a
[Discussion](https://github.com/duremovich/Entity/discussions) — there
may be paths that suit your use case better than the GPL.

## Is there a paid version?

A **Pro** edition is planned with NDI / SDI output, Notch block
playback, multi-node sync, and priority support. Not for sale yet. See
the [Download page](/download/) and [Roadmap](/docs/roadmap/).

## How does Pro licensing work?

To be designed. The likely shape: per-machine activation with a license
key bound to a machine fingerprint, similar to how commercial media
servers and post-production tools handle it. Offline activation for
air-gapped show machines. Details when the first Pro feature lands.

## Does entity play audio?

Not yet. Audio tracks in source files are ignored. Audio playback is
on the [roadmap](/docs/roadmap/) — basic clip audio first, then
per-output routing.

For now: drive audio from a sibling application (Reaper / QLab / a
sound system desk) and trigger them from the same OSC or timecode
source that triggers entity.

## What platforms are supported?

Windows 10 / 11 (64-bit) with a DirectX 12 GPU. macOS (Metal) and
Linux (Vulkan) ports are on the roadmap; no ETA yet.

## What hardware do I need?

See the [Install page](/docs/getting-started/install/). Minimum: a
modern Windows machine with a DX12 GPU. For multi-layer realtime
playback at 4K, a recent RTX GPU and NVMe storage matter a lot.

## What codecs are supported?

First-class: ProRes (all variants including 4444 with alpha), HAP /
HAP Q / HAP Alpha, PNG sequences. Playable but not recommended for
live show: H.264, HEVC. See [Supported codecs](/docs/media/codecs/).

## Does entity support per-layer effects?

Yes. Every layer has an ordered shader chain — nine engine effects ship
today (Gaussian blur, sharpen, vignette, pixelate, chromatic aberration,
edge detect, brightness/contrast, hue/saturation, invert) and you can
author your own as **HLSL effect packs**. Two editors: a stack view in
the property panel for quick tweaks, and a node-graph editor for
branching chains. See
[Concepts → Effects](/docs/concepts/effects/).

## Can I author content against an LED wall layout?

Yes — that's what **Feed Maps** are for. Define a source canvas size,
draw named regions on it that map to physical screens, export an SVG
template, hand it to the content designer. Whatever they paint inside
each named region lands on the matching screen at show time. See
[Projection → Content routing](/docs/projection/content-routing/).

## What's a generative layer? Is Muncher a serious feature?

Generative layers are first-class timeline layers that render procedural
content instead of decoded video. Muncher — a Pac-Man-style playfield
with gamepad and OSC controls — is the v1 reference implementation.
The architecture supports adding more kinds; Muncher proves the pipeline
end to end (input bus, compositor integration, OSC routing, snapshot
bake for show-thread rendering). See
[Concepts → Layers](/docs/concepts/layers/).

## How do I report a bug?

Capture a [script](/docs/control/scripts/) that reproduces it if you
can, grab logs from the project's `logs/` folder, and file at
[github.com/duremovich/Entity/issues](https://github.com/duremovich/Entity/issues).

## How do I contribute?

Pull requests welcome. The engine is C++20 with EnTT (ECS), D3D12, and
FFmpeg. Architecture notes live in `docs/adr/` in the engine repo —
start at `docs/adr/README.md`. Standard C++ project flow: fork, branch,
build locally, PR.

## Can I write a plugin / extend entity?

The plugin API is real and load-bearing — OSC receiver and bus-logger
ship as first-party plugins, and the C++ API headers (`plugin-api/`)
are Apache 2.0 licensed so plugins don't inherit GPLv3. What's still
queued is a *supported third-party SDK* with stable ABI guarantees,
docs, and a getting-started flow. If you have a specific extension in
mind today, copy from `plugins/bus-logger/` and start a
[Discussion](https://github.com/duremovich/Entity/discussions) so it
shapes what we ship.

For HLSL shaders specifically, no plugin needed — drop an effect pack
into the project's effects folder and it hot-reloads. See
[Concepts → Effects](/docs/concepts/effects/).

## Will entity ever be cloud-based / SaaS?

No. entity is local-first by design — the show runs on metal you
control. Cloud rendering, remote playback, and SaaS dashboards are
explicitly not on the roadmap.

## How does entity compare to commercial media servers?

Different trade-offs. Commercial servers have years of polish,
vendor-specific hardware integrations, and dedicated support. entity is
free, open-source, and built around modern C++ / GPU compositing with
a deliberate "show output is sacred" architecture. If your need is
one-off festival work, indie installations, or running your own show
on hardware you control, entity should suit.

We don't name competitors on this site by policy — describing the
category mechanism is enough; you know who's already in your toolchain.
