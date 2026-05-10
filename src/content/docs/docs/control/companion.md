---
title: Bitfocus Companion
description: Wire entity into a Stream Deck or X-keys via Companion.
sidebar:
  order: 2
---

[Bitfocus Companion](https://bitfocus.io/companion) is a free
show-control bridge that turns physical controllers (Stream Deck,
X-keys, MIDI surfaces) into trigger sources for whatever speaks OSC,
HTTP, MIDI, or a vendor protocol.

entity speaks OSC; Companion speaks OSC. They get along.

## Why use Companion

- **Hundreds of modules** for show hardware you might already have
- **No code** — wire entity to a Stream Deck button in five clicks
- **Free** — Companion itself is open source

## Worked example: Stream Deck "Next Section"

1. Install Companion and connect your Stream Deck.
2. In Companion, add a new connection: **Generic → OSC**.
3. Set the target IP / port to wherever entity is running (default
   `127.0.0.1:53000`).
4. On the Stream Deck button you want to use, add an action:
   **Generic OSC: Send message**, address `/entity/section/next`, no
   arguments.
5. Save. Press the button. The next section fires.

## Worked example: GO button with feedback

Companion can show button state from incoming OSC. Outbound OSC from
entity is on the roadmap; once it lands, the GO button can light up
green during a cue and amber while in a continuation-phase fade.

## Other surfaces

The same pattern works for:

- **X-keys** via Companion
- **MIDI controllers** (Companion MIDI module → entity OSC)
- **Tablet / phone soft buttons** via Companion web UI
- **Vendor consoles** (ETC, GrandMA, etc.) — most have OSC-out and can
  hit entity directly, no Companion needed
