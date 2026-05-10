---
title: OSC control
description: Drive entity from external show-control software over OSC.
sidebar:
  order: 1
---

entity ships with an inbound OSC receiver. Stage managers, show callers,
and Companion users can drive playback over UDP — `/entity/play`,
`/entity/section/next`, `/entity/cue/12/go`, and so on.

## Enable the receiver

**Preferences → OSC Receiver**:

- **Enabled** — on by default
- **Port** — 53000 by default

Changes to OSC settings require a restart.

## The default namespace

| Address | Args | Effect |
|---|---|---|
| `/entity/play` | none | Start playback from current playhead |
| `/entity/pause` | none | Pause |
| `/entity/stop` | none | Stop and reset to the start |
| `/entity/section/next` | none | Jump to the next section |
| `/entity/section/previous` | none | Jump to the previous section |
| `/entity/cue/{number}/go` | none | Jump to section with the given cue number |
| `/entity/seek` | `int` (frame) | Seek to a specific timeline frame |

## Pair with Bitfocus Companion

The fastest way to wire entity into a show is via
[Bitfocus Companion](https://bitfocus.io/companion). Companion has
hundreds of modules for stage-control hardware, and it speaks OSC
natively.

Set up a Companion button that sends OSC `/entity/section/next` on press
and your stagebox / Stream Deck / X-keys triggers entity directly.

See the [Companion guide](/docs/control/companion/) for a worked example.

## Custom mappings

Per-project custom OSC mappings (your own namespace, your own commands)
are on the roadmap. For now the default namespace is fixed.

## Outbound OSC

entity does not currently send outbound OSC (state changes, playback
position, section enters / leaves). This is on the roadmap.
