---
title: "Kuramoto–Sivashinsky System"
slug: "kuramoto-sivashinsky"
system_type: "Spatially Extended Chaotic PDE"
dimensions: "N = 200 spatial points (L=22.0) → 5–10D chaotic attractor"
equation: "u_t + uu_x + u_{xx} + u_{xxxx} = 0"
---

# Kuramoto–Sivashinsky System

$$u_t + u u_x + u_{xx} + u_{xxxx} = 0$$

- **Nonlinear Transport ($u u_x$)**: Energy transfer across spatial scales.
- **Instability ($u_{xx}$)**: Small-scale energy injection.
- **Hyper-Diffusion ($u_{xxxx}$)**: High-wavenumber dissipation & stiffness.

**Numerical Scheme**: IMEX Fourier operator update $(1-\Delta t L_k)^{-1}$ where $L_k = k^2 - k^4$.

**Scientific Payoff**: 200 spatial degrees of freedom $\rightarrow$ chaotic dynamics with effective dimension $\approx 5\text{--}10$.
