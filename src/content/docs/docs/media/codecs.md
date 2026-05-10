---
title: Supported codecs
description: What entity can play and what to transcode first.
sidebar:
  order: 1
---

| Codec | Notes |
|---|---|
| **ProRes 4444** | Hero codec. Full alpha. Recommended for compositing. |
| **ProRes 422 (HQ / LT / Proxy)** | Solid for opaque clips. FFmpeg-decoded. |
| **HAP / HAP Q / HAP Alpha** | GPU-cheap decode. Great for many concurrent layers. |
| **PNG sequence** | A folder of `.png` files, alphabetically sorted. Slowest decode; use sparingly. |
| **H.264 / HEVC** | Playable but **not recommended** for live show. Long GOPs make seeks expensive. Transcode first. |

## Why ProRes and HAP

Live show playback wants **cheap random access** — when a section fires,
the decoder has to deliver the next frame in milliseconds. Long-GOP codecs
like H.264 require decoding multiple frames to reach any given frame; on
miss, you stall.

ProRes is intra-only (every frame is a keyframe), so seeks are O(1).
HAP is GPU-friendly DCT — decode is so cheap you can stack many layers
without the CPU breaking a sweat.

## ProRes alpha

`ProRes 4444` carries an alpha plane. entity premultiplies on decode so
compositing matches what you'd expect in After Effects.

## Audio

Audio playback is **not currently supported**. Audio tracks in source
files are ignored. This is on the roadmap.
