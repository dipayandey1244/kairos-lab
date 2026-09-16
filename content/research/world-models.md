---
title: "World Models & Low-Dimensional Structure"
slug: "world-models"
category: "Research Pillar 02"
description: "What does it mean for a neural model to learn the invariant mathematical structure governing a system?"
---

# World Models & Low-Dimensional Structure

## Learning Invariant Physics in Latent Space

A true world model does not merely memorize individual trajectories; it learns the underlying geometric manifold $\mathcal{M}$ and vector field $f(z)$ governing system evolution.

$$\mathbf{x}(t) \xrightarrow{\text{Encoder } E} \mathbf{z}(t) \xrightarrow{\text{Latent Dynamics } f_\theta} \mathbf{z}(t+\Delta t) \xrightarrow{\text{Decoder } D} \mathbf{\hat{x}}(t+\Delta t)$$

By enforcing bottleneck constraints matching the intrinsic manifold dimension (e.g., $d=5\text{--}10$), neural architectures learn robust invariants resistant to noise and regime shifts.
