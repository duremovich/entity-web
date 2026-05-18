---
title: Glossary
description: Quick definitions for every entity-specific term.
sidebar:
  order: 0
---

The terms below show up across the docs and inside the editor. When in
doubt, return here.

## A

**Anchor point** — A draggable handle in projector calibration. Each
anchor point represents a known position on the projected image; you
drag it to match a known position on the physical surface. entity solves
the projector's pose from the set of anchor points. See
[Calibration](/docs/projection/calibration/).

**`.archive/` folder** — Sibling folder inside each `content/<subfolder>`
that holds the *original* file when you transcode a clip. The
transcoded version takes the canonical filename; the original moves to
`.archive/`. Safe to delete if you're sure.

## B

**Break-point** — Synonym for **Section**. A named point in time on the
timeline where you can jump to (from a menu, a script, or OSC).

**Blend mode** — A per-clip property that controls how the clip
composites against the layers below it (normal, add, multiply, etc.).

## C

**Clip** — A single instance of media on a timeline track. Has its own
position, duration, in-point, opacity, transform, blend mode, content
routing, effect chain, and keyframe animations. A clip references a
media file but isn't the media file. In the data model, a clip is a
**Layer** of `Kind = Clip`.

**Content routing** — Plane A of the two-tier mapping model: which
logical sources (layers) feed which screens. Authored as **library
entries** in the Content Routing window — Direct, Tiled, or Feed Map.
See [Projection → Content routing](/docs/projection/content-routing/).

**Compose target** — Internal name for the GPU render target that a
screen composites into before fanout to physical outputs.

**Companion** — [Bitfocus Companion](https://bitfocus.io/companion).
Free show-control bridge. entity pairs natively with Companion for
Stream Deck / X-keys / vendor-console show control. See
[Companion guide](/docs/control/companion/).

**Content folder** — The `content/` subdirectory inside every project.
Where all media lives. Watched in the background — external writes are
auto-discovered.

**Continuation phase** — The fade-out window after a section break
fires with a non-zero fade duration. The playhead has moved to the new
section, but the outgoing clips are still on screen, fading. Anchored
to wall-clock time so duration is exact.

**Cue** — Informal synonym for **Section**. Show callers tend to say
"cue 5"; the engine stores them as sections indexed by number.

## D

**Decode worker** — A per-clip thread that reads from disk and decodes
frames into a ring buffer. One per active clip.

**Director** — Internal subsystem that owns command dispatch, project
state, and the editor-side update loop. Distinct from the **renderer**
which lives on the show thread.

## E

**EDID** — *Extended Display Identification Data.* A small descriptor
block every display broadcasts. entity identifies physical outputs by
EDID so the assignment is stable across reboots and re-cabling. See
[Screens vs physical outputs](/docs/concepts/screens-vs-outputs/).

**Editor thread** — The main thread of the editor process. Owns the
registry (writes), ImGui rendering, command dispatch, project I/O, and
the per-frame tick of the timeline + decode + animation systems.

## F

**Fade seconds** — Per-section property controlling how long the
outgoing clips take to fade out when the section is entered.

**Feed Map** — A `ContentRoutingAsset` kind that names regions on a
source canvas and routes each region to a target Screen. The Content
Routing window exports an SVG template of the layout so content
designers can author content that lines up with the regions. See
[Projection → Content routing](/docs/projection/content-routing/).

**Filename versioning** — entity treats `clip.mov` and `clip_v2.mov` as
the same logical media. The newest version wins. The pattern is
`<base>_v<tag>`. Drop a revised clip in next to the old one — the
timeline plays the new version.

**Frame blending** — A per-clip property for cases where you don't
want the visible "stutter" of showing a 24fps source frame across
multiple 60fps output frames. Renderer support is on the roadmap.

**Generative layer** — A timeline layer of `Kind = Generative` that
renders procedural content instead of decoded video. **Muncher** (a
Pac-Man-style playfield with gamepad / OSC controls) is the v1
reference implementation. See [Concepts → Layers](/docs/concepts/layers/).

## H

**HAP / HAP Q / HAP Alpha** — A family of GPU-friendly codecs designed
for media-server playback. Cheap to decode, supports many concurrent
layers. First-class in entity.

**HLSL effect pack** — A user-authored set of HLSL shaders the editor
hot-reloads from a project's effects folder. The pack format is stable
enough to ship sample packs alongside projects; a supported
third-party SDK with ABI guarantees is on the roadmap. See
[Concepts → Effects](/docs/concepts/effects/).

## I

**Input region** — A per-physical-output rectangle that crops the
screen's pixels before they're sent to that output. Used for fan-out
across multi-projector arrays.

## L

**Layer** — Anything that lives on a timeline track. Every layer has a
`Kind` — **Clip**, **Object Animation**, or **Generative** — that
determines what it produces. See [Concepts → Layers](/docs/concepts/layers/).

**Lens model** — Internal math describing focal length, principal
point, and pose for a calibrated projector. More accurate than a 2D
homography because it accounts for off-axis distortion. See
[Calibration](/docs/projection/calibration/).

**Locked (section behavior)** — Per-layer policy. When set to Locked, a
layer ignores section jumps — clips keep playing from their current
frame, object-animation layers freeze the target transform at the
break-time value. Useful for ambient backgrounds and parked stage
moves. The other option is Normal.

## M

**Media bin** — UI panel listing every media file under `content/`.
Folder structure mirrors disk.

**Muncher** — The v1 generative layer kind — a Pac-Man-style playfield
with gamepad and OSC controls. Proves the generative-layer pipeline
end to end (input bus, snapshot bake, compositor integration). See
[Concepts → Layers](/docs/concepts/layers/).

## O

**Object Animation layer** — A timeline layer of `Kind =
ObjectAnimation` that keyframe-drives a target Screen or Prop's
transform (nine animatable axes: position X/Y/Z, rotation X/Y/Z, scale
X/Y/Z). Two policy fields: `endBehavior` (Hold / Reset) and
`sectionBehavior` (Normal / Locked). See
[Concepts → Layers](/docs/concepts/layers/).

**OSC** — *Open Sound Control.* The de facto show-control protocol over
UDP. entity has an inbound OSC receiver enabled by default on port
53000. See [OSC](/docs/control/osc/).

**Output** — Short for **Physical output**.

**OutputSurface** — A calibrated projection warp quad. The combination
of a physical output + its calibration + its soft-edge settings. (Was
called "MappingSurface" before the two-tier mapping rename in
ADR-0021.)

## P

**Pagefind** — The in-site search index used on these docs. Static, no
external service.

**Plane A** — The content-routing plane: which logical sources feed
which screens. See **Content routing**.

**Plane B** — The feed-output plane: how a screen's pixels reach
physical outputs. Warping, soft edges, per-output input regions. See
[Screens vs outputs](/docs/concepts/screens-vs-outputs/).

**Physical output** — An actual display connected to the machine
(HDMI / DP / DVI). Identified by EDID. Receives pixels from an assigned
screen.

**ProRes** — Apple's intra-only post-production codec family. Each
frame is a keyframe → cheap random access. Variants: 422 Proxy / LT /
HQ / 4444 (with alpha) / 4444 XQ. entity supports all of them.

**Project file** — The `.entity` JSON file inside a project folder.
Contains the timeline, screens, calibration, settings.

## S

**Schema version** — Integer at the top of every project file. Older
projects auto-migrate on load.

**Screen** — A *logical* output surface in a show ("Stage Left Cyc",
"Centre Wall"). Distinct from a physical output. Clips render to
screens; screens fan out to outputs. See
[Screens vs physical outputs](/docs/concepts/screens-vs-outputs/).

**Section** — A named break-point on the timeline. Has a break frame,
name, optional colour, optional fade. Addressable from menus, scripts,
OSC. The macro structure of a show.

**Section behavior** — Per-clip policy controlling what happens to the
clip on a section jump. **Normal** or **Locked**.

**Show thread** — A dedicated thread that owns GPU compositing and the
output Present call. Keeps running even when the editor thread stalls,
so the projector pipeline doesn't freeze during modal dialogs / resizes
/ project loads.

**Soft edge** — Per-output ramps that blend the seam between
overlapping projectors. Configured as left / right / top / bottom blend
widths and a gamma curve. See [Soft edges](/docs/projection/soft-edges/).

## T

**Tiled routing** — A `ContentRoutingAsset` kind that slices a source
canvas into a count of equal-width or equal-height tiles, each routed
to one screen. Used for LED walls split across multiple logical
screens.

**Timeline frame rate** — The rate the timeline runs at, set at project
creation. Clips with different native rates play at their own rate
mapped onto the timeline.

**Track** — A row on the timeline that hosts layers. Higher track
numbers render on top in the composite.

**Tracy** — The CPU/GPU profiler integrated into entity. Connects
on-demand; overhead is near zero when no profiler is attached. See
[Performance](/docs/troubleshooting/performance/).

**Transcoding** — Converting a clip from one codec to another. The
transcoded file replaces the source at its canonical path; the original
moves to `.archive/`.

## V

**Version tag** — The `_v<tag>` suffix in filename versioning.
String-compared; later tags win.
