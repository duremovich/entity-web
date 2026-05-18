---
title: Content routing
description: The Content Routing library — Direct, Tiled, and Feed Map kinds — and how it separates "what plays where" from "how pixels reach the wall."
---

A layer in the timeline carries pixels. A Screen is a logical surface
the user composes for. **Content routing** is the bridge: it answers
"which screens does this layer's pixels go to, and where on each screen
do they land?"

This is **Plane A** of the two-tier mapping model. Plane B (feed output
— warping, soft edges, EDID routing) is a separate concern handled in
the Outputs window. See [Concepts → Screens vs outputs](/docs/concepts/screens-vs-outputs/)
for the split.

## The library

Routing is configured by referencing entries from a project-wide
**Content Routing library**. Open it from the Content Routing window
(left pane: list of entries; right pane: editor for the selected
entry).

Two kinds of entries live in the library:

- **Auto-direct** — one entry per Screen, created and maintained
  automatically. Default name matches the Screen name and stays in
  sync until you rename the entry, at which point it's "user-managed."
- **User-created** — entries you add manually for layers that need
  custom routing.

Layers reference entries by ID, not by name. Renaming a library entry
doesn't break any layer using it; deleting an entry clears the layer's
reference (a usage-count confirm dialog warns first).

## The three routing kinds

### Direct

The layer plays on a single Screen, filling the whole screen by default.
Used for the "one clip, one screen" case.

The auto-direct library entry per Screen is the simplest example — it's
how a freshly-imported clip lands on the screen you drop it onto.

### Tiled

The layer's pixels are tiled across multiple Screens with a count +
axis wizard — useful for LED walls split across multiple logical
Screens that should display one continuous canvas. Pick "horizontal,
4 across" and one source canvas slices into four sequential UV regions
mapping to four screens.

### Feed Map

Feed Maps name regions on a source canvas and route each region to a
target Screen. The shape:

1. Set the source canvas resolution — typically the resolution your
   content designer is rendering to.
2. Draw named regions on the canvas. Each region has a name, a pixel
   rect, and a target Screen.
3. **Export Template** — writes an SVG file with outlined region
   rectangles and labels. Hand this to the content designer as the
   authoring template; whatever they paint inside each region lands
   on the matching Screen at show time.

The Feed Map editor renders the selected clip's most-recent video
frame as the canvas background — so you can drag region rectangles
over the actual content to align them with where the pixels need to
be. Overlapping regions are allowed by design: source content can
repeat through to multiple screens.

## Why Plane A is its own thing

In a single-projector / single-screen setup, content routing is
trivial — there's only one route. The library still helps (it lets you
share "this clip's routing" across multiple layers), but the value
isn't dramatic.

The value shows up at scale:

- LED walls split across many Screens with one source canvas
- Show machines fed pre-authored content from multiple designers,
  each rendering to a named region of one master canvas
- Routing changes during the show (different content kinds going to
  different screens per cue) without re-importing or re-cropping
  source files

By separating Plane A (content routing) from Plane B (feed output),
the same content can be re-routed without re-touching projection
calibration, and the same projection calibration can be re-targeted
without re-cutting the content.
