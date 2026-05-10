---
title: FAQ
description: Frequently asked questions about entity, its license, and what it's for.
---

## What is entity?

A C++ media server for live shows and installations. Multi-layer video
playback, projection mapping, OSC control. Open-source under GPLv3 with
an Apache 2.0 plugin SDK so commercial plugins are fine.

## Who is it for?

People putting pixels on physical surfaces in live contexts —
projection-mapping artists, theatre / festival video techs, museum and
gallery installations, themed entertainment. If you'd otherwise reach
for a commercial media server, entity is meant to be that for free.

## Is it stable enough for a real show?

It's in active development and pre-1.0. The core playback pipeline,
projection mapping, and OSC control are functional. A few systems
(AnimationSystem, SectionScheduler) have known gaps around editor-stall
fallback — see
[Troubleshooting → Output frozen during editor drag](/docs/troubleshooting/output-freeze/).

For a real show today: do a full tech rehearsal on the actual hardware,
and don't bet on features marked "in progress" on the
[Roadmap](/docs/roadmap/).

## License

| Component | License |
|---|---|
| Engine core | GPLv3 |
| Plugin SDK header | Apache 2.0 |
| First-party plugins | Apache 2.0 |
| Brand assets | See `LICENSING.md` in the engine repo |

The GPLv3 on the engine means modifications to the engine itself are
open-source. The Apache 2.0 SDK means **your plugin can be any license
you want**, including closed-source commercial. This is the open-core
split most projects of this kind use.

## Can I use it commercially?

Yes. GPLv3 doesn't prevent commercial use — it requires you to
distribute source if you redistribute the engine itself. If you're
running shows with entity, that's not a redistribution event.

If you're shipping a product that bundles entity, talk to us via
[Discussions](https://github.com/duremovich/Entity/discussions) — there
are clean paths via the Apache 2.0 SDK that may suit better than the
GPL'd core.

## Is there a paid version?

A **Pro** edition is planned with hot-path plugins (NDI / SDI output,
Notch block playback, multi-node sync) and priority support. Not for
sale yet. See the [Download page](/download/) and
[Roadmap](/docs/roadmap/).

## How does Pro licensing work?

To be designed. The likely shape: per-machine activation with a license
key bound to a machine fingerprint, similar to how commercial media
servers and post-production tools handle it. Offline activation
supported for air-gapped show machines. Details when the first Pro
plugin lands.

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

## How do I report a bug?

Capture a [script](/docs/control/scripts/) that reproduces it if you
can, grab logs from the project's `logs/` folder, and file at
[github.com/duremovich/Entity/issues](https://github.com/duremovich/Entity/issues).

## How do I contribute?

Pull requests welcome. The engine is C++20 with EnTT (ECS), D3D12, and
FFmpeg. Architecture notes live in `docs/adr/` in the engine repo —
start at `docs/adr/README.md`. Comparable to most C++ project flows:
fork, branch, build locally, PR.

For docs (this site), the source is at
[github.com/duremovich/entity-web](https://github.com/duremovich/entity-web)
(private during early development; will open up).

## Will entity ever be cloud-based / SaaS?

No. entity is local-first by design — the show runs on metal you
control. Cloud rendering, remote playback, and SaaS dashboards are
explicitly not on the roadmap.

## How does entity compare to commercial media servers?

Different trade-offs. Commercial servers have years of polish,
vendor-specific hardware integrations, and dedicated support. entity is
free, open-source, and built around modern C++ / GPU compositing with
a deliberate "show output is sacred" architecture. If your need is
one-off festival work, indie installations, or you want to extend the
server with custom plugins, entity should suit.

We don't name competitors on this site by policy — describing the
category mechanism is enough; you know who's already in your toolchain.
