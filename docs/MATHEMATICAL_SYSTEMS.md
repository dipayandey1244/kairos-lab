# Mathematical Systems Specification — KAIROS Research Lab

## 1. Kuramoto Oscillator Network ($N=200$)

### Governing Equation
$$\frac{d\theta_i}{dt} = \omega_i + \sum_{j=1}^{N} K_{ij}\sin(\theta_j-\theta_i)$$

### Parameter Specifications
- **Oscillator Count ($N$)**: 200
- **Populations**: 5 synchronized clusters ($40$ oscillators per population)
- **Natural Frequencies ($\omega_i$)**: Drawn from normal distribution $\mathcal{N}(0, 0.2^2)$ per population centered at distinct mean cluster frequencies.
- **Coupling Matrix ($K_{ij}$)**:
  - Intra-population coupling: $K_{\text{intra}} = 2.0 / N$
  - Inter-population coupling: $K_{\text{inter}} = 0.05 / N$
- **Manifold Payoff**: $200$ microscopic phase variables $\rightarrow 5$ collective coordinates.

---

## 2. Stuart–Landau Oscillators ($N=200$)

### Governing Equation
$$\frac{dz_i}{dt} = (\lambda_i+i\omega_i)z_i - |z_i|^2 z_i + \sum_{j=1}^{N} K_{ij}(z_j-z_i)$$

### Parameter Specifications
- **Oscillator Count ($N$)**: 200
- **Clusters**: 7 coherent limit-cycle clusters on the complex plane $(\text{Re}(z), \text{Im}(z))$
- **Bifurcation Parameter ($\lambda_i$)**: $\lambda = 1.0$ (supercritical Hopf bifurcation)
- **Coupling Matrix ($K_{ij}$)**:
  - Intra-cluster coupling: $K_{\text{intra}} = 2.0 / N$
  - Inter-cluster coupling: $K_{\text{inter}} = 0.05 / N$
- **Nonlinear Saturation**: $-|z_i|^2 z_i$ bounds trajectory amplitudes to the unit circle.
- **Manifold Payoff**: $200$ nonlinear oscillators $\rightarrow 7$ collective limit-cycle coordinates.

---

## 3. Kuramoto–Sivashinsky System ($N=200$)

### Governing PDE
$$\frac{\partial u}{\partial t} + u \frac{\partial u}{\partial x} + \frac{\partial^2 u}{\partial x^2} + \frac{\partial^4 u}{\partial x^4} = 0$$

### Numerical Implementation (IMEX Fourier Scheme)
- **Domain Size ($L$)**: 22.0
- **Spatial Grid Points ($N$)**: 200
- **Fourier Space Update**:
  $$u(x,t) = \sum_{k} \hat{u}_k(t) e^{ikx}$$
- **IMEX Time Integration**:
  - Linear stiffness operator: $L_k = k^2 - k^4$
  - Inverse precomputation: $(1 - \Delta t L_k)^{-1}$
  - Nonlinear convection: $-u u_x$ evaluated via pseudospectral FFT transform.
- **Manifold Payoff**: $200$ spatial grid degrees of freedom $\rightarrow$ chaotic attractor with effective dimension $\approx 5\text{--}10$.

---

## 4. Foundation Model Time-Series Pipeline

$$\mathbf{x}(t) \xrightarrow{\text{Quantize (2048)}} \mathbf{q}_t \xrightarrow{\text{Context (256)}} \mathbf{E} \in \mathbb{R}^{256 \times 512} \xrightarrow{\text{Transformer (16 L)}} \mathbf{H} \xrightarrow{\text{Forecast (512)}} \mathbf{\hat{x}}(t+1:t+512)$$

- **Quantization Bins**: 2048 uniform / quantile bins
- **Context Length**: 256 tokens
- **Embedding Dimension**: 512
- **Transformer Architecture**: 16 self-attention layers
- **Forecast Horizon**: 512 future time steps
- **Training Schedule**: 30 epochs on synthetic & empirical dynamical trajectories
