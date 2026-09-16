---
title: "Kuramoto Oscillator Environment"
slug: "kuramoto"
system_type: "Phase Coupling Network"
dimensions: "N = 200 state variables → 5 collective clusters"
equation: "\\frac{d\\theta_i}{dt} = \\omega_i + \\sum_{j} K_{ij}\\sin(\\theta_j-\\theta_i)"
---

# Kuramoto Oscillator Environment

$$\frac{d\theta_i}{dt} = \omega_i + \sum_{j=1}^{200} K_{ij}\sin(\theta_j-\theta_i)$$

- **$\omega_i$**: Natural intrinsic frequency of oscillator $i$.
- **$K_{ij}$**: Block-structured coupling matrix ($K_{\text{intra}}=2.0/N$, $K_{\text{inter}}=0.05/N$).
- **$\sin(\theta_j-\theta_i)$**: Phase-alignment synchronization force.

**Scientific Payoff**: 200 microscopic phase variables condense into 5 collective macro-coordinates.
