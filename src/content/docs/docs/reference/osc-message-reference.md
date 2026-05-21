---
title: OSC message reference
description: Full table of every inbound OSC address entity responds to.
sidebar:
  order: 4
---

This page is the complete inbound OSC reference. For an overview of
how OSC works in entity and how to enable the receiver, see
[OSC control](/docs/control/osc/).

All addresses below are inbound. entity does not currently send
outbound OSC.

## Transport

| Property | Value |
|---|---|
| Protocol | OSC 1.0 |
| Transport | UDP |
| Default port | `53000` (configurable in Preferences) |
| Bundle support | Yes — bundles are unpacked, each message handled individually |
| Parser | Hand-rolled in the OSC receiver plugin; no external dependency |

## Playback

| Address | Args | Effect |
|---|---|---|
| `/entity/play` | — | Start playback from the current playhead |
| `/entity/pause` | — | Pause |
| `/entity/stop` | — | Pause and return to frame 0 |
| `/entity/seek` | numeric `i / h / f / d` | Seek to the given timeline frame (truncated to int) |

### Examples

```text
/entity/play
/entity/seek 3600
```

## Sections / cues

| Address | Args | Effect |
|---|---|---|
| `/entity/section/next` | — | Jump to the next section after the playhead |
| `/entity/cue/{number}/go` | — | Jump to the section with the given cue number |

`{number}` in `/entity/cue/{n}/go` is parsed as a double, so
fractional cue numbers like `1.5` or `2.10` work as
addressable cue identifiers.

### Examples

```text
/entity/section/next
/entity/cue/5/go
/entity/cue/12/go
```

## Generative layer controls — Muncher

Muncher is the v1 generative layer. Its input bus accepts both discrete
Companion-friendly buttons and continuous analog axes.

### Discrete (button) controls

| Address | Args | Effect |
|---|---|---|
| `/entity/muncher/up` | — | Move up (sets axes to x=0, y=-1) |
| `/entity/muncher/down` | — | Move down (x=0, y=+1) |
| `/entity/muncher/left` | — | Move left (x=-1, y=0) |
| `/entity/muncher/right` | — | Move right (x=+1, y=0) |
| `/entity/muncher/stop` | — | Halt (both axes 0) |

These are ideal for Bitfocus Companion buttons, Stream Deck keys, or
show-control cues.

### Analog axes

| Address | Args | Effect |
|---|---|---|
| `/entity/muncher/input/x` | numeric `i / h / f / d` | Set the X-axis, clamped to [-1, 1] |
| `/entity/muncher/input/y` | numeric `i / h / f / d` | Set the Y-axis, clamped to [-1, 1] |

These work with TouchOSC faders, MIDI-to-OSC bridges, audio-reactive
sends, or anything that produces a continuous control value.

Gamepads connected to the editor machine route into the same input bus
without needing OSC.

## Error handling

If entity receives an unknown address or wrong argument types, it logs
a warning and silently drops the message. Check `logs/` if a cue isn't
firing — the log line tells you what went wrong.

## Sending from common tools

### Bitfocus Companion

Add a generic OSC connection, set target to the entity machine's IP and
port `53000`. Each button's action sends one address with no args (for
most of the namespace). See [Companion guide](/docs/control/companion/).

### `oscsend` (Linux / macOS)

```bash
oscsend 192.168.1.10 53000 /entity/section/next
oscsend 192.168.1.10 53000 /entity/seek i 3600
oscsend 192.168.1.10 53000 /entity/muncher/input/x f 0.75
```

### `liblo` / `python-osc`

Standard library calls — entity has no special quirks beyond OSC 1.0
compliance.

### ETC Eos console

`Show File / Network → OSC`. Add an output mapping pointing at the
entity machine. Bind Eos cues to entity's `/entity/cue/{n}/go` so a
single GO fires both.

## Planned (not yet implemented)

- **Outbound OSC** — playback state, section enter / leave, error
  events
- **`/entity/section/previous` / `first` / `last`** — only `/next`
  exists today; use specific `/entity/cue/{n}/go` addresses for now
- **Custom per-project mappings** — your own namespace mapped to
  entity commands
- **OSC over TCP** — for environments where UDP packet loss is a
  problem
