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
| Time tags | Honored only when present and in the future; otherwise messages fire immediately |

## Playback

| Address | Args | Effect |
|---|---|---|
| `/entity/play` | — | Start playback from the current playhead |
| `/entity/pause` | — | Pause |
| `/entity/stop` | — | Stop and return to the start of the timeline |
| `/entity/seek` | `int32` (timeline frame) | Seek to a specific frame |
| `/entity/seek/seconds` | `float32` (seconds) | Seek to a specific wall-clock time |

### Examples

```text
/entity/play
/entity/seek 3600
/entity/seek/seconds 60.0
```

## Sections / cues

| Address | Args | Effect |
|---|---|---|
| `/entity/section/next` | — | Jump to the next section after the playhead |
| `/entity/section/previous` | — | Jump to the previous section |
| `/entity/section/first` | — | Jump to the first section |
| `/entity/section/last` | — | Jump to the last section |
| `/entity/cue/{number}/go` | — | Jump to the section with the given cue number |

`{number}` is a zero-padded integer addressed in-path. Cue numbering
starts at 1 by convention; cue 0 is reserved for "before the show
starts."

### Examples

```text
/entity/section/next
/entity/cue/5/go
/entity/cue/12/go
```

## Selection (within the editor)

| Address | Args | Effect |
|---|---|---|
| `/entity/select/clip` | `string` (clip id) | Select a specific clip in the editor |
| `/entity/select/track` | `int32` (track index) | Select a track |

These are editor-side; they don't affect playback.

## Output state

| Address | Args | Effect |
|---|---|---|
| `/entity/output/enable` | `string` (output name) | Enable a physical output |
| `/entity/output/disable` | `string` (output name) | Disable a physical output |

Use sparingly — disabling an output mid-show interrupts everything routed
to it.

## Per-clip property animation

Reserved for a future release. Today the OSC namespace is fixed; per-
project custom mappings are on the roadmap.

## Error handling

If entity receives an unknown address or wrong argument types, it logs
a warning and silently drops the message. Check `logs/` if a cue isn't
firing — the log line tells you what went wrong.

## Address-pattern wildcards

OSC's `*` and `?` wildcards work for routing within entity's namespace.
For example:

```text
/entity/section/*    matches next, previous, first, last
/entity/cue/?/go     matches single-digit cue numbers
```

Use cautiously — wildcards that match multiple addresses fire each one.

## Sending from common tools

### Bitfocus Companion

Add a generic OSC connection, set target to the entity machine's IP and
port `53000`. Each button's action sends one address with no args (for
most of the namespace). See [Companion guide](/docs/control/companion/).

### `oscsend` (Linux / macOS)

```bash
oscsend 192.168.1.10 53000 /entity/section/next
oscsend 192.168.1.10 53000 /entity/seek i 3600
```

### `liblo` / `python-osc`

Standard library calls — entity has no special quirks beyond OSC 1.0
compliance.

### ETC Eos console

`Show File / Network → OSC`. Add an output mapping pointing at the
entity machine. Bind Eos cues to entity's `/entity/cue/{n}/go` so a
single GO fires both.

## Roadmap

- **Outbound OSC** — playback state, section enter / leave, error
  events. Not implemented yet.
- **Custom namespaces** — per-project mapping of user-defined OSC paths
  to entity commands.
- **OSC over TCP** — for environments where UDP packet loss is a
  problem.
