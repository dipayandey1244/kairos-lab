---
title: "Stuart–Landau Oscillator Environment"
slug: "stuart-landau"
system_type: "Complex Limit-Cycle Network"
dimensions: "N = 200 state variables → 7 complex plane clusters"
equation: "\\frac{dz_i}{dt} = (\\lambda_i+i\\omega_i)z_i - |z_i|^2z_i + \\sum_{j}K_{ij}(z_j-z_i)"
---

# Stuart–Landau Oscillator Environment

$$\frac{dz_i}{dt} = (\lambda_i+i\omega_i)z_i - |z_i|^2z_i + \sum_{j=1}^{200} K_{ij}(z_j-z_i)$$

- **Linear Growth & Rotation**: $(\lambda_i+i\omega_i)z_i$ drives limit cycle initialization.
- **Nonlinear Saturation**: $-|z_i|^2 z_i$ bounds trajectory amplitudes to a stable attractor.
- **Complex Plane Coupling**: $\sum_j K_{ij}(z_j-z_i)$ synchronizes 200 oscillators into 7 distinct clusters.

**Scientific Payoff**: 200 nonlinear complex oscillators $\rightarrow$ 7 collective limit-cycle coordinates.
