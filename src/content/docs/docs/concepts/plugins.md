---
title: Plugins
description: How plugins extend entity — two transport tiers.
sidebar:
  order: 5
---

Plugins extend entity in two ways, classified by **where the data
travels**.

## Control-plane plugins

These plugins observe and trigger commands. They sit alongside the engine,
post commands into the dispatcher, and read settings or state via a narrow
context API. Latency budget: milliseconds.

Examples:

- **OSC receiver** — listens on UDP, maps `/entity/section/next` to
  `SectionNext`
- **Timecode reader** — maps LTC frame numbers to timeline seek commands
- **Telemetry exporter** — reads playback state, posts to a metrics
  endpoint

The control-plane API is **Apache 2.0**. Build closed-source commercial
plugins without GPL contamination.

## Hot-path plugins

These plugins sit inside the per-frame render and decode loop. They
implement C++ ABIs like `OutputDriver` or `CodecProvider` and must be
statically linked to a known toolchain.

Examples:

- **NDI output** — sends a screen's pixels over the network
- **SDI output** — sends through Decklink hardware
- **Custom codec** — adds support for a non-FFmpeg format

Hot-path plugins are also **Apache 2.0** at the SDK header, but the
toolchain constraint means they're built per Entity release.

## Installing a plugin

Plugins go in `<install-dir>/plugins/`. entity discovers them at startup.
Restart after dropping in a new plugin file.

Per-plugin configuration lives in **Settings → Plugins**.

## Writing a plugin

The [Plugin authoring guide](/docs/plugins/authoring/) walks through
copying the `bus-logger` example, building it, and seeing it light up in
entity. The current first-party plugin is the OSC receiver — read its
source as a control-plane reference.
