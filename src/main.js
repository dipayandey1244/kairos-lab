import { marked } from 'marked';

marked.setOptions({ gfm: true, breaks: true });

// State
let state = {
  currentPath: window.location.pathname || '/',
  activeNav: 'Home',
  isDocsOpen: false,
  activeDocTab: 'WEBSITE_DESIGN_SPEC'
};

const DOCS_FILES = {
  WEBSITE_DESIGN_SPEC: `# KAIROS RESEARCH LAB Specification

## Purpose
Build a premium academic research-lab website rather than a conventional article/blog website.

## Positioning
Models. Embodiment. Real-World Impact.

## Primary Research Themes
1. **Time Series Models**: Modeling, learning and forecasting dynamic systems.
2. **World Models**: Learning structured representations of the world.
3. **Vision-Language-Action (VLA)**: Bridging perception, language and action for embodied AI.
4. **Embodied AI**: Robotics, simulation, control, real-world deployment.`,

  PUBLICATIONS: `# Selected Publications
1. **WorldPriors: Learning Predictive Representations for Robotic Control** (CoRL 2026)
2. **Scaling Time Series Models for Real-World Forecasting** (NeurIPS 2025)
3. **Vision-Language-Action Models for Generalizable Robotics** (ICRA 2025)`
};

const app = document.getElementById('app');

function init() {
  window.addEventListener('popstate', handlePopState);
  renderApp();
}

function handlePopState() {
  state.currentPath = window.location.pathname || '/';
  renderApp();
}

function navigateTo(path) {
  window.history.pushState({}, '', path);
  state.currentPath = path;
  window.scrollTo({ top: 0, behavior: 'smooth' });
  renderApp();
}

function renderApp() {
  app.innerHTML = `
    ${renderHeader()}
    <main>
      ${renderRouter()}
    </main>
    ${renderFooter()}
    ${renderDocsModal()}
  `;

  if (state.currentPath === '/research/time-series') {
    setTimeout(initTimeSeriesCanvasSimulator, 50);
  }
}

function renderHeader() {
  return `
    <header class="site-header">
      <div class="container header-inner">
        <div class="brand-block">
          <div class="logo-main" onclick="window.navigateTo('/')">
            <span class="logo-title">Kairos</span>
            <span class="logo-sub">RESEARCH LAB</span>
          </div>
          <div class="brand-separator"></div>
          <div class="brand-tagline">Models. Embodiment. Real-World Impact.</div>
        </div>

        <ul class="nav-menu">
          <li class="nav-link ${state.currentPath === '/' ? 'active' : ''}" onclick="window.navigateTo('/')">Home</li>
          <li class="nav-link ${state.currentPath.startsWith('/research') ? 'active' : ''}" onclick="window.navigateTo('/research')">Research</li>
          <li class="nav-link ${state.currentPath === '/people' ? 'active' : ''}" onclick="window.navigateTo('/people')">People</li>
          <li class="nav-link ${state.currentPath === '/publications' ? 'active' : ''}" onclick="window.navigateTo('/publications')">Publications</li>
          <li class="nav-link ${state.currentPath === '/projects' ? 'active' : ''}" onclick="window.navigateTo('/projects')">Projects</li>
          <li class="nav-link ${state.currentPath === '/news' ? 'active' : ''}" onclick="window.navigateTo('/news')">News</li>
          <li class="nav-link ${state.currentPath === '/contact' ? 'active' : ''}" onclick="window.navigateTo('/contact')">Contact</li>
        </ul>

        <div class="header-right">
          <button class="btn-icon-search" title="Search" onclick="window.openDocsModal()">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          </button>
          <button class="btn-join-red" onclick="alert('Join Kairos Research Lab: Applications open for PhD, Interns &amp; Engineers.')">Join Us</button>
        </div>
      </div>
    </header>
  `;
}

function renderRouter() {
  const p = state.currentPath;

  if (p === '/' || p === '/home') return renderHomeView();
  if (p === '/research/time-series') return renderTimeSeriesView();
  if (p.startsWith('/research')) return renderResearchView();
  if (p.startsWith('/projects')) return renderProjectsView();
  if (p === '/publications') return renderPublicationsView();
  if (p === '/people') return renderPeopleView();
  if (p === '/news') return renderNewsView();
  if (p === '/contact') return renderContactView();

  return renderHomeView();
}

function renderHomeView() {
  return `
    ${renderHero()}
    ${renderResearchPillars()}
    ${renderWorkAndNews()}
    ${renderPubsAndPositions()}
    ${renderCollaborators()}
    ${renderNewsletter()}
  `;
}

function renderHero() {
  return `
    <section class="hero-wrapper">
      <div class="container hero-grid">
        <div>
          <div class="dash-eyebrow">RESEARCH AT THE FRONTIER</div>
          <h1 class="hero-h1">Towards Intelligent Agents for the <span class="text-red-highlight">Real World.</span></h1>
          <p class="hero-p">
            We build models, systems and understanding for embodied intelligence — connecting perception, reasoning and action.
          </p>

          <div class="hero-actions">
            <button class="btn-action-red" onclick="window.scrollToSection('pillars')">Our Research →</button>
            <button class="btn-action-outline" onclick="window.scrollToSection('positions')">Join the Lab</button>
          </div>

          <div class="hero-metrics-row">
            <div>
              <div class="metric-num">3</div>
              <div class="metric-lbl">Research Themes</div>
            </div>
            <div>
              <div class="metric-num">12+</div>
              <div class="metric-lbl">Research Projects</div>
            </div>
            <div>
              <div class="metric-num">25+</div>
              <div class="metric-lbl">Publications</div>
            </div>
            <div>
              <div class="metric-num">10+</div>
              <div class="metric-lbl">Collaborators</div>
            </div>
          </div>
        </div>

        <div class="hero-right-container">
          <img class="hero-right-img" src="/images/robotic-arm-hero.jpg" alt="Robotic Arm Embodied Intelligence" />
          <div class="hero-overlay-topright">
            PERCEPTION<br/>
            REASONING<br/>
            ACTION<br/>
            FOR A MORE<br/>
            CAPABLE WORLD
          </div>
          <div class="hero-overlay-caption">
            Foundation models for embodied intelligence.
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderResearchPillars() {
  return `
    <section class="container" id="pillars" style="padding: 64px 0;">
      <div class="section-header-flex">
        <div style="display: flex; align-items: center; gap: 10px;">
          <div style="width: 20px; height: 2px; background: var(--accent-red);"></div>
          <h2 class="section-title-text">Our Research Pillars</h2>
        </div>
        <span class="link-red-arrow" onclick="window.navigateTo('/research')">Explore all research →</span>
      </div>

      <div class="pillars-section-grid">
        <!-- Pillar 01: Time Series Models (Deep Dive) -->
        <div class="pillar-item-card pillar-featured-ts" onclick="window.navigateTo('/research/time-series')">
          <div class="pillar-svg-wrap">
            <span class="pillar-corner-num">01</span>
            <svg width="220" height="90" viewBox="0 0 220 90" fill="none">
              <path d="M10 45 Q 35 10, 60 45 T 110 45 T 160 45 T 210 45" stroke="#B52E32" stroke-width="1.5" opacity="0.8"/>
              <path d="M10 45 Q 35 25, 60 45 T 110 45 T 160 45 T 210 45" stroke="#B52E32" stroke-width="1" opacity="0.5"/>
              <path d="M10 45 Q 35 60, 60 45 T 110 45 T 160 45 T 210 45" stroke="#B52E32" stroke-width="1" opacity="0.3"/>
            </svg>
          </div>
          <div>
            <div style="font-size: 10px; font-weight: 800; letter-spacing: 0.14em; text-transform: uppercase; color: var(--accent-red); margin-bottom: 4px;">FEATURED DEEP DIVE</div>
            <h3 class="pillar-item-title">Time Series Models</h3>
            <p class="pillar-item-desc">Modeling, learning and forecasting dynamic systems across scales.</p>
          </div>
          <div style="text-align: right; color: var(--accent-red); font-weight: 700;">Explore Deep Dive →</div>
        </div>

        <!-- Pillar 02 -->
        <div class="pillar-item-card" onclick="window.navigateTo('/research')">
          <div class="pillar-svg-wrap">
            <span class="pillar-corner-num">02</span>
            <svg width="120" height="90" viewBox="0 0 120 90" fill="none">
              <circle cx="60" cy="45" r="35" stroke="#17191C" stroke-width="1" stroke-dasharray="2 3"/>
              <circle cx="60" cy="45" r="24" stroke="#B52E32" stroke-width="1.5"/>
              <circle cx="60" cy="45" r="4" fill="#B52E32"/>
            </svg>
          </div>
          <div>
            <h3 class="pillar-item-title">World Models</h3>
            <p class="pillar-item-desc">Learning structured representations of the world.</p>
          </div>
          <div style="text-align: right; color: var(--accent-red); font-weight: 700;">→</div>
        </div>

        <!-- Pillar 03 -->
        <div class="pillar-item-card" onclick="window.navigateTo('/research')">
          <div class="pillar-svg-wrap">
            <span class="pillar-corner-num">03</span>
            <svg width="100" height="90" viewBox="0 0 100 90" fill="none">
              <path d="M50 15 L85 32 L50 49 L15 32 Z" fill="#F3D9D7" stroke="#B52E32" stroke-width="1.2"/>
              <path d="M15 32 L50 49 L50 82 L15 65 Z" fill="#B52E32" opacity="0.8"/>
              <path d="M85 32 L50 49 L50 82 L85 65 Z" fill="#982226" opacity="0.9"/>
            </svg>
          </div>
          <div>
            <h3 class="pillar-item-title">Vision-Language-Action</h3>
            <p class="pillar-item-desc">Bridging perception, language and action for embodied AI.</p>
          </div>
          <div style="text-align: right; color: var(--accent-red); font-weight: 700;">→</div>
        </div>

        <!-- Our Mission Container -->
        <div class="mission-card">
          <div>
            <h3 class="mission-title">Our Mission</h3>
            <p class="mission-body">
              We advance the science and engineering of intelligent agents that can perceive, understand, and act in the real world, with the goal of creating useful, safe and human-aligned AI.
            </p>
          </div>
          <div class="link-red-arrow" onclick="window.navigateTo('/people')">Learn more about our lab →</div>
        </div>
      </div>
    </section>
  `;
}

function renderWorkAndNews() {
  return `
    <section class="container">
      <div class="split-work-news-grid">
        <!-- Featured Work -->
        <div>
          <div class="section-header-flex">
            <div style="display: flex; align-items: center; gap: 10px;">
              <div style="width: 20px; height: 2px; background: var(--accent-red);"></div>
              <h2 class="section-title-text">Featured Work</h2>
            </div>
          </div>

          <div class="spotlight-card" onclick="window.navigateTo('/projects')">
            <div class="spotlight-img-col">
              <img src="/images/quadruped-spot-robot.jpg" alt="Robotic Navigation" />
              <div class="spotlight-overlay-tags">
                ADAPT<br/>LEARN<br/>NAVIGATE
              </div>
            </div>
            <div class="spotlight-content-col">
              <div style="font-size: 10px; font-weight: 800; letter-spacing: 0.14em; text-transform: uppercase; color: var(--accent-red); margin-bottom: 8px;">RESEARCH SPOTLIGHT</div>
              <h3 style="font-family: var(--font-serif); font-size: 24px; margin-bottom: 12px;">World Models for Real-World Robotic Navigation</h3>
              <p style="font-size: 13px; color: var(--text-secondary); line-height: 1.5; margin-bottom: 20px;">
                We explore how world models can enable more generalizable, sample-efficient and robust robotic policy learning in complex environments.
              </p>
              <div class="link-red-arrow">View project →</div>
            </div>
          </div>
        </div>

        <!-- Latest News -->
        <div>
          <div class="section-header-flex">
            <div style="display: flex; align-items: center; gap: 10px;">
              <div style="width: 20px; height: 2px; background: var(--accent-red);"></div>
              <h2 class="section-title-text">Latest News</h2>
            </div>
            <span class="link-red-arrow" onclick="window.navigateTo('/news')">View all news →</span>
          </div>

          <div class="news-list">
            <div class="news-item-row">
              <div class="news-date">SEP 12, 2026</div>
              <div class="news-title" onclick="window.navigateTo('/news')">Our paper on VLA models accepted at CoRL 2026</div>
            </div>
            <div class="news-item-row">
              <div class="news-date">AUG 28, 2026</div>
              <div class="news-title" onclick="window.navigateTo('/news')">New project on world modeling for autonomous systems</div>
            </div>
            <div class="news-item-row">
              <div class="news-date">AUG 10, 2026</div>
              <div class="news-title" onclick="window.navigateTo('/news')">We're hiring! Open positions for PhD, interns and research engineers</div>
            </div>
            <div class="news-item-row">
              <div class="news-date">JUL 25, 2026</div>
              <div class="news-title" onclick="window.navigateTo('/news')">Lab visit from industry partners</div>
            </div>
            <div class="news-item-row">
              <div class="news-date">JUL 10, 2026</div>
              <div class="news-title" onclick="window.navigateTo('/news')">New preprint on time series foundation models</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderPubsAndPositions() {
  return `
    <section class="container" id="positions">
      <div class="split-pubs-positions-grid">
        <!-- Selected Publications -->
        <div>
          <div class="section-header-flex">
            <div style="display: flex; align-items: center; gap: 10px;">
              <div style="width: 20px; height: 2px; background: var(--accent-red);"></div>
              <h2 class="section-title-text">Selected Publications</h2>
            </div>
            <span class="link-red-arrow" onclick="window.navigateTo('/publications')">View all publications →</span>
          </div>

          <div class="pubs-cards-row">
            <div class="pub-card" onclick="window.navigateTo('/publications')">
              <div>
                <svg class="pub-icon-red" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
                <div class="pub-title">WorldPriors: Learning Predictive Representations for Robotic Control</div>
              </div>
              <div class="pub-venue">CoRL 2026</div>
            </div>

            <div class="pub-card" onclick="window.navigateTo('/publications')">
              <div>
                <svg class="pub-icon-red" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
                <div class="pub-title">Scaling Time Series Models for Real-World Forecasting</div>
              </div>
              <div class="pub-venue">NeurIPS 2025</div>
            </div>

            <div class="pub-card" onclick="window.navigateTo('/publications')">
              <div>
                <svg class="pub-icon-red" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
                <div class="pub-title">Vision-Language-Action Models for Generalizable Robotics</div>
              </div>
              <div class="pub-venue">ICRA 2025</div>
            </div>
          </div>
        </div>

        <!-- Open Positions -->
        <div>
          <div class="section-header-flex">
            <div style="display: flex; align-items: center; gap: 10px;">
              <div style="width: 20px; height: 2px; background: var(--accent-red);"></div>
              <h2 class="section-title-text">Open Positions</h2>
            </div>
            <span class="link-red-arrow" onclick="alert('Applications open!')">View all positions →</span>
          </div>

          <div class="positions-list">
            <div class="position-item-row" onclick="alert('PhD Position details...')">
              <div>
                <div class="position-title">PhD Students</div>
                <div class="position-subtitle">Work on world models, VLA and embodied intelligence</div>
              </div>
              <div style="color: var(--accent-red); font-weight: 700;">→</div>
            </div>

            <div class="position-item-row" onclick="alert('Internship details...')">
              <div>
                <div class="position-title">Research Interns</div>
                <div class="position-subtitle">Undergraduate and Masters students</div>
              </div>
              <div style="color: var(--accent-red); font-weight: 700;">→</div>
            </div>

            <div class="position-item-row" onclick="alert('Engineer details...')">
              <div>
                <div class="position-title">Research Engineers</div>
                <div class="position-subtitle">Build datasets, models and real-world systems</div>
              </div>
              <div style="color: var(--accent-red); font-weight: 700;">→</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderCollaborators() {
  return `
    <section class="container">
      <div class="collaborators-wrapper">
        <div style="font-size: 18px; font-weight: 700; color: var(--text-primary);">Our Collaborators</div>
        <div class="collaborator-logos-flex">
          <div class="collab-logo-text" style="font-size: 32px; font-weight: 800;">MIT</div>
          <div class="collab-logo-text" style="font-size: 26px;">Stanford</div>
          <div class="collab-logo-text" style="font-size: 22px; line-height: 1.1;">Carnegie<br/>Mellon<br/>University</div>
          <div style="display: flex; align-items: center; gap: 8px; font-weight: 700; font-size: 22px; color: var(--text-muted);">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
            Google DeepMind
          </div>
          <div style="font-weight: 800; font-size: 24px; color: var(--text-muted); letter-spacing: 0.05em;">NVIDIA</div>
          <div style="font-weight: 800; font-size: 26px; color: var(--text-muted);">∞ Meta</div>
          <div style="font-size: 13px; color: var(--text-muted); font-weight: 500;">And more...</div>
        </div>
      </div>
    </section>
  `;
}

function renderNewsletter() {
  return `
    <section class="container">
      <div class="newsletter-card-box">
        <h3 class="newsletter-title">Stay connected with the research.</h3>
        <p class="newsletter-desc">Get occasional updates on new papers, projects, research notes and opportunities.</p>
        <div class="newsletter-form-row">
          <input class="newsletter-input" type="email" placeholder="Your email..." />
          <button class="btn-action-red" onclick="alert('Thank you for subscribing to Kairos Research Lab updates.')">Subscribe →</button>
        </div>
      </div>
    </section>
  `;
}

function renderFooter() {
  return `
    <footer class="site-footer">
      <div class="container">
        <div class="footer-top-flex">
          <div>
            <div class="logo-main" onclick="window.navigateTo('/')">
              <span class="logo-title">Kairos</span>
              <span class="logo-sub">RESEARCH LAB</span>
            </div>
            <div style="font-size: 13px; color: var(--text-muted); margin-top: 8px;">Models for a more capable and human-centric future.</div>
          </div>

          <ul class="nav-menu" style="gap: 20px;">
            <li class="nav-link" onclick="window.navigateTo('/')">Home</li>
            <li class="nav-link" onclick="window.navigateTo('/research')">Research</li>
            <li class="nav-link" onclick="window.navigateTo('/people')">People</li>
            <li class="nav-link" onclick="window.navigateTo('/publications')">Publications</li>
            <li class="nav-link" onclick="window.navigateTo('/projects')">Projects</li>
            <li class="nav-link" onclick="window.navigateTo('/news')">News</li>
            <li class="nav-link" onclick="window.navigateTo('/contact')">Contact</li>
          </ul>
        </div>

        <div class="footer-bottom-flex">
          <div>© 2026 Kairos Research Lab. All rights reserved.</div>
          <div style="display: flex; gap: 16px; align-items: center;">
            <!-- LinkedIn -->
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" class="footer-social-link" title="LinkedIn" aria-label="LinkedIn">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
            <!-- GitHub -->
            <a href="https://github.com/gupta706" target="_blank" rel="noopener noreferrer" class="footer-social-link" title="GitHub" aria-label="GitHub">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
            </a>
            <!-- YouTube -->
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" class="footer-social-link" title="YouTube" aria-label="YouTube">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  `;
}

function renderResearchView() {
  return `
    <section class="container" style="padding: 64px 0;">
      <div class="dash-eyebrow">RESEARCH DIRECTORY</div>
      <h1 class="hero-h1">Research Pillars</h1>
      <p class="hero-p">We study models that learn to understand dynamics, construct internal representations of the world, and translate perception into action.</p>
      ${renderResearchPillars()}
    </section>
  `;
}

function renderProjectsView() {
  const activeTab = state.projectFilter || 'ALL';

  const projects = [
    {
      id: 'timesfm',
      category: 'Time Series Foundation Models',
      title: 'TimesFM: Universal Zero-Shot Time Series Forecasting',
      tagline: 'Pre-trained decoder-only transformer for zero-shot spatio-temporal prediction across energy, weather, and transport.',
      image: '/images/ai-financial-services.jpg',
      badge: 'NeurIPS 2025 Spotlight',
      type: 'ts-canvas',
      desc: 'TimesFM leverages sub-series patch tokenization and LOTSA 27B observation pre-training to predict arbitrary future horizons without dataset-specific fine-tuning.',
      metrics: [
        { label: 'Pre-training Corpus', val: '100 Billion Points' },
        { label: 'Zero-Shot MSE Drop', val: '-24.6%' },
        { label: 'Max Context Window', val: '2048 Steps' }
      ]
    },
    {
      id: 'worldpriors',
      category: 'World Models',
      title: 'WorldPriors: Sample-Efficient Latent World Models for Robotic Navigation',
      tagline: 'Learning predictive neural representations of real-world physics to enable zero-shot quadruped navigation in unstructured terrain.',
      image: '/images/quadruped-spot-robot.jpg',
      badge: 'CoRL 2026 Paper',
      type: 'wm-canvas',
      desc: 'By hallucinating future camera observations and terrain rollouts inside a compact latent space, robots plan trajectories 100x faster than model-free RL.',
      metrics: [
        { label: 'Sample Efficiency', val: '100x Faster' },
        { label: 'Real-World Success', val: '94.2%' },
        { label: 'Planning Latency', val: '< 15ms' }
      ]
    },
    {
      id: 'vla',
      category: 'Vision-Language-Action',
      title: 'OpenVLA: Generalizable Embodied Policy Execution',
      tagline: 'Bridging multi-modal vision-language understanding directly with 7-DOF robotic arm manipulation.',
      image: '/images/robotic-arm-hero.jpg',
      badge: 'ICRA 2025 Spotlight',
      type: 'vla-interactive',
      desc: 'OpenVLA tokenizes natural language commands alongside 60fps camera streams into continuous joint velocity vectors, enabling generalizable tabletop manipulation.',
      metrics: [
        { label: 'Unseen Object Transfer', val: '88.5%' },
        { label: 'Language Tasks', val: '120+ Mandates' },
        { label: 'Control Frequency', val: '50 Hz' }
      ]
    },
    {
      id: 'graphnet',
      category: 'Spatio-Temporal Graphs',
      title: 'GraphTS: Dynamic Attention over Urban Infrastructure Networks',
      tagline: 'Spatial graph neural networks combined with temporal transformers for city-scale power and transport grids.',
      image: '/images/autonomous-agents-architecture.jpg',
      badge: 'IEEE TPAMI 2026',
      type: 'graph-canvas',
      desc: 'Models cross-sensor correlations across thousands of physical grid nodes, automatically detecting structural anomalies and predicting energy flow bottlenecks.',
      metrics: [
        { label: 'Grid Nodes', val: '10,000+ Sensors' },
        { label: 'Anomaly Recall', val: '98.4%' },
        { label: 'Horizon', val: '72 Hours' }
      ]
    }
  ];

  const filteredProjects = activeTab === 'ALL' 
    ? projects 
    : projects.filter(p => p.category.toUpperCase().includes(activeTab));

  return `
    <section class="container" style="padding: 48px 0 80px 0;">
      <!-- Projects Header -->
      <div class="ts-breadcrumbs">
        <span class="ts-crumb-link" onclick="window.navigateTo('/')">Home</span>
        <span class="ts-crumb-sep">/</span>
        <span class="ts-crumb-active">Interactive Projects</span>
      </div>

      <div style="margin-top: 20px;">
        <div class="dash-eyebrow">LAB RESEARCH SHOWCASE</div>
        <h1 class="hero-h1">Interactive Research Projects</h1>
        <p class="hero-p" style="max-width: 800px;">
          Explore our open-source research systems, interactive visual simulators, and real-world deployment models.
        </p>
      </div>

      <!-- Filter Bar -->
      <div class="projects-filter-bar">
        <button class="filter-tab-btn ${activeTab === 'ALL' ? 'active' : ''}" onclick="window.filterProjects('ALL')">All Projects (4)</button>
        <button class="filter-tab-btn ${activeTab === 'TIME' ? 'active' : ''}" onclick="window.filterProjects('TIME')">Time Series Foundation Models</button>
        <button class="filter-tab-btn ${activeTab === 'WORLD' ? 'active' : ''}" onclick="window.filterProjects('WORLD')">World Models & Robotics</button>
        <button class="filter-tab-btn ${activeTab === 'VISION' ? 'active' : ''}" onclick="window.filterProjects('VISION')">Vision-Language-Action</button>
      </div>

      <!-- Projects Grid -->
      <div class="projects-vertical-list">
        ${filteredProjects.map(project => renderProjectCard(project)).join('')}
      </div>
    </section>
  `;
}

function renderProjectCard(p) {
  const activeVlaStep = state.vlaActiveStep || 1;

  return `
    <div class="project-card-container">
      <div class="project-info-col">
        <div style="display: flex; gap: 8px; margin-bottom: 12px; align-items: center;">
          <span class="venue-badge">${p.badge}</span>
          <span class="ts-tag-pill">${p.category}</span>
        </div>

        <h2 class="project-card-title">${p.title}</h2>
        <div class="project-card-tagline">${p.tagline}</div>
        <p class="project-card-desc">${p.desc}</p>

        <div class="project-metrics-row">
          ${p.metrics.map(m => `
            <div class="metric-box">
              <div class="metric-val">${m.val}</div>
              <div class="metric-lbl">${m.label}</div>
            </div>
          `).join('')}
        </div>

        <div class="project-actions-row">
          ${p.id === 'timesfm' ? `
            <button class="btn-paper-red" onclick="window.navigateTo('/research/time-series')">Explore Deep Dive & Simulator →</button>
          ` : `
            <button class="btn-paper-red" onclick="alert('Opening interactive demo for ${p.title}...')">⚡ Launch Live Playground</button>
          `}
          <a href="https://github.com" target="_blank" class="btn-paper-outline">💻 View Code (GitHub)</a>
        </div>
      </div>

      <div class="project-interactive-col">
        ${p.type === 'ts-canvas' ? `
          <div class="project-canvas-box">
            <div class="canvas-header-tag">
              <span class="dot-live"></span> LIVE PATCH TOKENIZATION STREAM
            </div>
            <canvas id="project-canvas-timesfm" width="540" height="280"></canvas>
            <div class="canvas-caption">
              Visualizing zero-shot continuous time series patch tokenization & multi-head temporal attention.
            </div>
          </div>
        ` : ''}

        ${p.type === 'wm-canvas' ? `
          <div class="project-canvas-box">
            <div class="canvas-header-tag">
              <span class="dot-live"></span> LATENT WORLD MODEL HALLUCINATION
            </div>
            <canvas id="project-canvas-worldpriors" width="540" height="280"></canvas>
            <div class="canvas-caption">
              Hallucinating future 2D terrain observations & trajectory rollouts in compact latent space.
            </div>
          </div>
        ` : ''}

        ${p.type === 'vla-interactive' ? `
          <div class="project-vla-box">
            <div class="canvas-header-tag">
              <span class="dot-live"></span> VLA EMBODIED EXECUTION PIPELINE
            </div>

            <div class="vla-stepper-nav">
              <button class="vla-step-pill ${activeVlaStep === 1 ? 'active' : ''}" onclick="window.setVlaStep(1)">1. Prompt</button>
              <button class="vla-step-pill ${activeVlaStep === 2 ? 'active' : ''}" onclick="window.setVlaStep(2)">2. Vision</button>
              <button class="vla-step-pill ${activeVlaStep === 3 ? 'active' : ''}" onclick="window.setVlaStep(3)">3. Attention</button>
              <button class="vla-step-pill ${activeVlaStep === 4 ? 'active' : ''}" onclick="window.setVlaStep(4)">4. Joint Action</button>
            </div>

            <div class="vla-step-content">
              ${activeVlaStep === 1 ? `
                <div class="vla-demo-box">
                  <div class="vla-label">User Natural Language Prompt:</div>
                  <div class="vla-prompt-text">"Pick up the red power module and place it onto the upper test bench."</div>
                  <div class="vla-tokens-row">
                    <span class="vla-tok">[BOS]</span><span class="vla-tok">Pick</span><span class="vla-tok">up</span><span class="vla-tok">red</span><span class="vla-tok">module</span><span class="vla-tok">[EOS]</span>
                  </div>
                </div>
              ` : ''}

              ${activeVlaStep === 2 ? `
                <div class="vla-demo-box">
                  <div class="vla-label">Multi-View Wrist & Overhead Camera Stream (224x224):</div>
                  <div class="vla-vision-grid">
                    <img src="${p.image}" class="vla-cam-img" alt="Arm View" />
                    <div class="vla-vision-patches">Patch Tokens: 256 @ 14x14</div>
                  </div>
                </div>
              ` : ''}

              ${activeVlaStep === 3 ? `
                <div class="vla-demo-box">
                  <div class="vla-label">Cross-Modal Transformer Attention Heatmap:</div>
                  <div style="font-family: var(--font-mono); font-size: 11px; color: var(--accent-red); background: #17191C; padding: 12px; border-radius: 4px;">
                    Attn(Q_text, K_image) = Softmax( Q K^T / √d ) <br/>
                    Peak Attention Weight: 0.941 -> Object "red module" @ (x: 142, y: 88)
                  </div>
                </div>
              ` : ''}

              ${activeVlaStep === 4 ? `
                <div class="vla-demo-box">
                  <div class="vla-label">Target 7-DOF Joint Action Velocity Vector a_t ∈ ℝ^7:</div>
                  <div class="vla-vector-grid">
                    <span>Δx: +0.04m</span><span>Δy: -0.12m</span><span>Δz: -0.02m</span>
                    <span>Roll: +1.2°</span><span>Pitch: -0.4°</span><span>Yaw: +3.1°</span>
                    <span style="color: var(--accent-red); font-weight: 700;">Gripper: 0.85 (CLOSE)</span>
                  </div>
                </div>
              ` : ''}
            </div>
          </div>
        ` : ''}

        ${p.type === 'graph-canvas' ? `
          <div class="project-canvas-box">
            <div class="canvas-header-tag">
              <span class="dot-live"></span> SPATIO-TEMPORAL GRAPH ATTENTION
            </div>
            <canvas id="project-canvas-graphnet" width="540" height="280"></canvas>
            <div class="canvas-caption">
              Dynamic cross-node attention weights updating over 16 urban grid sensor nodes.
            </div>
          </div>
        ` : ''}
      </div>
    </div>
  `;
}

window.filterProjects = (cat) => {
  state.projectFilter = cat;
  renderApp();
};

window.setVlaStep = (step) => {
  state.vlaActiveStep = step;
  renderApp();
};

function initProjectsCanvasSimulators() {
  // 1. TimesFM Project Canvas
  const tsCanvas = document.getElementById('project-canvas-timesfm');
  if (tsCanvas) {
    const ctx = tsCanvas.getContext('2d');
    let tOffset = 0;

    function drawTs() {
      ctx.clearRect(0, 0, tsCanvas.width, tsCanvas.height);
      ctx.fillStyle = '#0B0E10';
      ctx.fillRect(0, 0, tsCanvas.width, tsCanvas.height);

      // Draw grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      for (let x = 0; x < tsCanvas.width; x += 30) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, tsCanvas.height); ctx.stroke();
      }

      ctx.beginPath();
      ctx.strokeStyle = '#4A90E2';
      ctx.lineWidth = 2;
      for (let i = 0; i < 140; i++) {
        const x = i * 4;
        const y = tsCanvas.height / 2 + Math.sin((i + tOffset) * 0.1) * 35 + Math.cos((i + tOffset) * 0.04) * 20;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Forecast curve
      ctx.beginPath();
      ctx.strokeStyle = '#B52E32';
      ctx.lineWidth = 2.5;
      for (let i = 100; i < 140; i++) {
        const x = i * 4;
        const y = tsCanvas.height / 2 + Math.sin((i + tOffset) * 0.1) * 35 + Math.cos((i + tOffset) * 0.04) * 20;
        if (i === 100) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      tOffset += 0.3;
      requestAnimationFrame(drawTs);
    }
    drawTs();
  }

  // 2. WorldPriors Quadruped Canvas
  const wmCanvas = document.getElementById('project-canvas-worldpriors');
  if (wmCanvas) {
    const ctx = wmCanvas.getContext('2d');
    let rX = 50;
    let rY = 140;
    let rAngle = 0;

    function drawWm() {
      ctx.clearRect(0, 0, wmCanvas.width, wmCanvas.height);
      ctx.fillStyle = '#0F1317';
      ctx.fillRect(0, 0, wmCanvas.width, wmCanvas.height);

      // Draw obstacles
      ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.beginPath(); ctx.arc(200, 100, 24, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(350, 180, 30, 0, Math.PI * 2); ctx.fill();

      // Predicted Trajectory Path
      ctx.setLineDash([4, 4]);
      ctx.strokeStyle = '#00E676';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(rX, rY);
      ctx.quadraticCurveTo(250, 40, 480, 140);
      ctx.stroke();
      ctx.setLineDash([]);

      // Robot Body
      ctx.fillStyle = '#B52E32';
      ctx.beginPath();
      ctx.arc(rX, rY, 10, 0, Math.PI * 2);
      ctx.fill();

      // Imagined Ghost Poses
      for (let g = 1; g <= 4; g++) {
        const gx = rX + g * 80;
        const gy = rY + Math.sin(g * 0.8) * 30;
        ctx.strokeStyle = 'rgba(0, 230, 118, 0.4)';
        ctx.beginPath();
        ctx.arc(gx, gy, 8, 0, Math.PI * 2);
        ctx.stroke();
      }

      rX += 0.8;
      if (rX > wmCanvas.width - 50) rX = 50;
      requestAnimationFrame(drawWm);
    }
    drawWm();
  }

  // 3. Spatio-Temporal Graph Canvas
  const graphCanvas = document.getElementById('project-canvas-graphnet');
  if (graphCanvas) {
    const ctx = graphCanvas.getContext('2d');
    let frame = 0;

    const nodes = [];
    for (let i = 0; i < 14; i++) {
      const angle = (i / 14) * Math.PI * 2;
      nodes.push({
        x: graphCanvas.width / 2 + Math.cos(angle) * 100,
        y: graphCanvas.height / 2 + Math.sin(angle) * 80,
        id: i
      });
    }

    function drawGraph() {
      ctx.clearRect(0, 0, graphCanvas.width, graphCanvas.height);
      ctx.fillStyle = '#0B0E10';
      ctx.fillRect(0, 0, graphCanvas.width, graphCanvas.height);

      // Draw Attention Edges
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dist = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
          if (dist < 130) {
            const alpha = 0.1 + Math.sin((frame + i * j) * 0.05) * 0.15;
            ctx.strokeStyle = `rgba(181, 46, 50, ${alpha + 0.15})`;
            ctx.lineWidth = 1 + alpha * 3;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw Nodes
      nodes.forEach((n, idx) => {
        ctx.fillStyle = idx % 3 === 0 ? '#B52E32' : '#4A90E2';
        ctx.beginPath();
        ctx.arc(n.x, n.y, 6, 0, Math.PI * 2);
        ctx.fill();
      });

      frame++;
      requestAnimationFrame(drawGraph);
    }
    drawGraph();
  }
}


function renderPublicationsView() {
  return `
    <section class="container" style="padding: 64px 0;">
      <div class="dash-eyebrow">PUBLICATIONS</div>
      <h1 class="hero-h1">Selected Publications</h1>
      <div class="pubs-cards-row" style="margin-top: 32px;">
        <div class="pub-card">
          <div>
            <svg class="pub-icon-red" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
            <div class="pub-title">WorldPriors: Learning Predictive Representations for Robotic Control</div>
          </div>
          <div class="pub-venue">CoRL 2026</div>
        </div>
      </div>
    </section>
  `;
}

function renderPeopleView() {
  return `
    <section class="container" style="padding: 64px 0;">
      <div class="dash-eyebrow">PEOPLE</div>
      <h1 class="hero-h1">Kairos Research Team</h1>
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-top: 32px;">
        <div style="background: var(--bg-surface); border: 1px solid var(--border-subtle); padding: 24px; border-radius: var(--radius-md);">
          <div style="font-size: 18px; font-weight: 700;">Dipayan Dey</div>
          <div style="font-size: 13px; color: var(--accent-red);">Principal Investigator</div>
        </div>
      </div>
    </section>
  `;
}

function renderNewsView() {
  return `
    <section class="container" style="padding: 64px 0;">
      <div class="dash-eyebrow">NEWS</div>
      <h1 class="hero-h1">Lab News</h1>
    </section>
  `;
}

function renderContactView() {
  return `
    <section class="container" style="padding: 64px 0;">
      <div class="dash-eyebrow">CONTACT</div>
      <h1 class="hero-h1">Connect with Kairos</h1>
    </section>
  `;
}


function renderTimeSeriesView() {
  const activePhase = state.tsActivePhase || 1;

  const phaseDetails = {
    1: {
      tag: "PHASE 01 • 1970s – 2010s",
      title: "Initial / Statistical & State Space Foundations",
      subtitle: "Independent Local Fitting, Stationarity Assumptions, and Auto-Correlation",
      math: "y_t = c + \\sum_{i=1}^p \\phi_i y_{t-i} + \\sum_{j=1}^q \\theta_j \\epsilon_{t-j} + \\epsilon_t",
      desc: "In the foundational era of time series analysis, forecasting relied on univariate statistical processes such as ARIMA, SARIMA, Exponential Smoothing (Holt-Winters), and State Space Models (Kalman Filters). These models fit explicit mathematical equations independently to every single individual time series.",
      models: ["ARIMA (Box-Jenkins 1970)", "SARIMA", "Holt-Winters ESM", "Kalman Filter SSM", "Vector Autoregression (VAR)"],
      strengths: ["Highly interpretable parameters", "Low computational requirement", "Proven theoretical guarantees for stationary sequence"],
      bottlenecks: ["Zero cross-series parameter sharing (must retrain for every new series)", "Unable to handle high-dimensional non-linear signals", "Fails over long forecasting horizons (>30 steps)"]
    },
    2: {
      tag: "PHASE 02 • 2015 – 2020",
      title: "Deep Sequential & Global Neural Forecasting",
      subtitle: "The Shift from Local Fitting to Cross-Series Parameter Sharing",
      math: "P(Y_{1:T} | X_{1:T}) = \\prod_{t=1}^T P(y_t | y_{<t}, x_{1:T}; \\Theta)",
      desc: "Deep Learning introduced the 'Global Forecasting' paradigm. Rather than optimizing 100,000 independent models for 100,000 sensors or retail items, models like DeepAR, N-BEATS, and Temporal Convolutional Networks (TCN) trained a single shared deep neural network across thousands of series simultaneously.",
      models: ["DeepAR (Amazon Research 2017)", "N-BEATS (ICLR 2020)", "TCN (Bai et al. 2018)", "LSTNet", "WaveNet"],
      strengths: ["Learns shared temporal features across millions of time series", "Captures non-linear seasonality and complex interactions", "Probabilistic output distributions"],
      bottlenecks: ["Sequential RNN gradient decay over long lookback windows (>500 steps)", "Rigid input-output sequence lengths require retraining for new horizons", "Lacks cross-domain zero-shot generalization"]
    },
    3: {
      tag: "PHASE 03 • 2020 – 2023",
      title: "The Transformer Revolution & Temporal Patch Tokenization",
      subtitle: "Point-wise Attention Pitfalls & The Sub-series Patching Breakthrough",
      math: "Patch_{embedding} = Linear(Concat(y_{t-P+1}, \\dots, y_t)) \\in \\mathbb{R}^{D}",
      desc: "Initial adaptations of NLP Transformers to time series failed because individual scalar time points lack semantic context. Breakthroughs like PatchTST and iTransformer introduced sub-series patching (grouping P adjacent time steps into semantic tokens) and Channel Independence (CI), reducing attention complexity from O(L²) to O((L/P)²) and setting new benchmark records.",
      models: ["Informer (AAAI 2021 Best Paper)", "Autoformer (NeurIPS 2021)", "PatchTST (ICLR 2023)", "iTransformer (ICLR 2024)", "FEDformer"],
      strengths: ["Patching reduces quadratic attention cost while boosting receptive field", "Supports ultra-long context windows (L = 1024 to 2048+ steps)", "Channel Independence outperforms complex multi-channel models"],
      bottlenecks: ["Requires supervised fine-tuning for each target domain", "Sensitivity to hyperparameter tuning per dataset", "Limited zero-shot transfer capabilities"]
    },
    4: {
      tag: "PHASE 04 • 2023 – 2025",
      title: "Time Series Foundation Models (TSFMs) Era",
      subtitle: "Large-Scale Pre-training, LOTSA Corpus, & Zero-Shot Universal Forecasting",
      math: "\\min_\\theta \\mathbb{E}_{S \\sim \\mathcal{D}_{LOTSA}} [ \\mathcal{L}_{MSE/Quantile}( \\mathcal{M}_\\theta(S_{context}), S_{target} ) ]",
      desc: "Inspired by LLMs, Time Series Foundation Models (TSFMs) leverage massive pre-training across billions of spatio-temporal observations (such as LOTSA 27B points across energy, transport, finance, weather, and IoT). Models perform instant zero-shot forecasting on unseen datasets without any fine-tuning or gradient updates.",
      models: ["TimesFM (Google Research 2024)", "MOIRAI (Salesforce AI ICML 2024)", "TimeGPT (Nixtla 2023)", "MOMENT (CMU 2024)", "UniTS (Harvard 2024)", "Lag-Llama"],
      strengths: ["Zero-shot out-of-the-box forecasting on unseen datasets", "Reduces compute cost by 90%+ vs training custom models", "Dynamic patch sizes and flexible context/horizon lengths"],
      bottlenecks: ["High memory footprint during large multi-variate inference", "Handling domain-specific extreme outliers or structural breaks", "Prompt alignment for exogenous covariates"]
    },
    5: {
      tag: "PHASE 05 • 2025 – 2026 (LATEST FRONTIER)",
      title: "SOTA Showcase: Sparse MoE & Universal Spatio-Temporal Intelligence",
      subtitle: "TimesFM 2.0 & MOIRAI-MoE: State-of-the-Art Benchmark Breakthroughs",
      math: "Output_t = \\sum_{i=1}^K G(x)_i \\cdot Expert_i(x_t), \\quad \\text{where } G(x) = TopK(Softmax(W_g x))",
      desc: "The latest frontier integrates Sparse Mixture-of-Experts (MoE) routing tokenized temporal patches into specialized subnetworks for seasonality, trend, and anomalies. Featuring continuous quantile heads and cross-domain zero-shot adaptation, this represents the current peak of temporal AI research.",
      models: ["TimesFM 2.0 (Google & Kairos 2025)", "MOIRAI-MoE (Salesforce 2025)", "TTM (IBM Research 2025)", "Chronos (Amazon 2025)"],
      strengths: ["Sets new zero-shot SOTA across Monash, GIFT-Eval & ETT benchmarks", "Dynamic sparse routing reduces active FLOPs per inference step", "Calibrated quantile probabilistic uncertainty bounds"],
      bottlenecks: ["Active research area in multi-variate cross-attention synchronization", "Handling ultra-high frequency sub-millisecond high-frequency financial feeds"]
    }
  };

  const currentPhaseData = phaseDetails[activePhase];

  return `
    <div class="ts-deepdive-wrapper">
      <!-- Top Breadcrumbs -->
      <section class="container" style="padding-top: 32px;">
        <div class="ts-breadcrumbs">
          <span class="ts-crumb-link" onclick="window.navigateTo('/')">Home</span>
          <span class="ts-crumb-sep">/</span>
          <span class="ts-crumb-link" onclick="window.navigateTo('/research')">Research</span>
          <span class="ts-crumb-sep">/</span>
          <span class="ts-crumb-active">Time Series Foundation Models</span>
        </div>
      </section>

      <!-- Hero Header -->
      <section class="container ts-hero-header">
        <div class="ts-badge-red">SPECIAL RESEARCH DEEP DIVE • PILLAR 01</div>
        <h1 class="ts-hero-title">The Evolution of Time Series Foundation Models</h1>
        <p class="ts-hero-subtitle">
          From single-series ARIMA statistical fitting to large-scale pre-trained zero-shot temporal intelligence — an exhaustive technical synthesis.
        </p>

        <div class="ts-meta-bar">
          <div class="ts-meta-item">
            <strong>Author:</strong> Kairos Research Team
          </div>
          <div class="ts-meta-item">
            <strong>Updated:</strong> September 2026
          </div>
          <div class="ts-meta-item">
            <strong>Scope:</strong> Statistical → Deep Learning → Transformers → Foundation Models (TSFMs)
          </div>
          <div class="ts-meta-item">
            <span class="ts-tag-pill">Interactive Simulator Included</span>
            <span class="ts-tag-pill">HD Video Walkthrough</span>
          </div>
        </div>
      </section>

      <!-- Stepper / Phase Explorer Navigation -->
      <section class="container" style="margin-top: 40px;">
        <div class="ts-stepper-label-row">
          <div class="section-title-text" style="font-size: 20px;">Historical Development Phases</div>
          <div style="font-size: 13px; color: var(--text-muted);">Click any phase below to explore its paradigm shift:</div>
        </div>

        <div class="ts-stepper-bar">
          <button class="ts-step-btn ${activePhase === 1 ? 'active' : ''}" onclick="window.setTsPhase(1)">
            <span class="step-num">01</span>
            <span class="step-text">Statistical Roots<br/><small>1970–2015</small></span>
          </button>
          <button class="ts-step-btn ${activePhase === 2 ? 'active' : ''}" onclick="window.setTsPhase(2)">
            <span class="step-num">02</span>
            <span class="step-text">Deep Sequential<br/><small>2015–2020</small></span>
          </button>
          <button class="ts-step-btn ${activePhase === 3 ? 'active' : ''}" onclick="window.setTsPhase(3)">
            <span class="step-num">03</span>
            <span class="step-text">Transformers & Patching<br/><small>2020–2023</small></span>
          </button>
          <button class="ts-step-btn ${activePhase === 4 ? 'active' : ''}" onclick="window.setTsPhase(4)">
            <span class="step-num">04</span>
            <span class="step-text">Foundation Models<br/><small>2023–2025</small></span>
          </button>
          <button class="ts-step-btn ${activePhase === 5 ? 'active' : ''}" onclick="window.setTsPhase(5)">
            <span class="step-num">05</span>
            <span class="step-text">SOTA Frontier<br/><small>2025–2026</small></span>
          </button>
        </div>

        <!-- Phase Detail Card -->
        <div class="ts-phase-detail-card">
          <div class="ts-phase-header-flex">
            <div>
              <span class="ts-phase-tag">${currentPhaseData.tag}</span>
              <h2 class="ts-phase-title">${currentPhaseData.title}</h2>
              <div class="ts-phase-subtitle">${currentPhaseData.subtitle}</div>
            </div>
            <div class="ts-phase-num-badge">0${activePhase}</div>
          </div>

          <div class="ts-phase-grid">
            <div class="ts-phase-col-main">
              <p class="ts-phase-desc">${currentPhaseData.desc}</p>
              
              <div class="ts-formula-box">
                <div class="ts-formula-label">Core Mathematical Formulation</div>
                <code>${currentPhaseData.math}</code>
              </div>

              <div style="margin-top: 24px;">
                <div style="font-weight: 700; font-size: 14px; margin-bottom: 10px; color: var(--text-primary);">Representative Key Architectures & Milestones:</div>
                <div class="ts-models-flex">
                  ${currentPhaseData.models.map(m => `<span class="ts-model-badge">${m}</span>`).join('')}
                </div>
              </div>
            </div>

            <div class="ts-phase-col-side">
              <div class="ts-eval-box ts-eval-strengths">
                <div class="ts-eval-title">Key Advantages & Innovations</div>
                <ul>
                  ${currentPhaseData.strengths.map(s => `<li>✓ ${s}</li>`).join('')}
                </ul>
              </div>

              <div class="ts-eval-box ts-eval-bottlenecks">
                <div class="ts-eval-title">Fundamental Limitations</div>
                <ul>
                  ${currentPhaseData.bottlenecks.map(b => `<li>✗ ${b}</li>`).join('')}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- High Quality Interactive Simulator Canvas Section -->
      <section class="container" style="margin-top: 64px;">
        <div class="section-header-flex">
          <div>
            <div class="dash-eyebrow">HIGH QUALITY INTERACTIVE ANIMATION</div>
            <h2 class="section-title-text" style="font-size: 28px;">Live Architecture Simulator: Patch Tokenization & Zero-Shot Forecasting</h2>
          </div>
          <div style="font-size: 13px; color: var(--text-muted);">Simulate continuous signal patch tokenization & temporal attention in real time.</div>
        </div>

        <div class="ts-sim-card">
          <!-- Canvas Container -->
          <div class="ts-canvas-wrapper">
            <canvas id="ts-sim-canvas" width="1150" height="380"></canvas>
            
            <div class="ts-canvas-overlay-info">
              <div class="info-badge">
                <span class="dot-live"></span> LIVE TEMPORAL PATCH ATTENTION ENGINE
              </div>
              <div id="ts-canvas-metrics" class="info-metrics">
                Context Length: 512 steps | Patch Size P = 16 | Horizon: 96 steps | Attention Heads: 8
              </div>
            </div>
          </div>

          <!-- Simulator Control Panel -->
          <div class="ts-sim-controls-bar">
            <div class="control-group">
              <label>Model Architecture:</label>
              <select id="ts-model-select" class="ts-select" onchange="window.updateSimModel(this.value)">
                <option value="TimesFM" ${state.tsSimModel === 'TimesFM' ? 'selected' : ''}>TimesFM 2.0 (Foundation Model Zero-Shot)</option>
                <option value="PatchTST" ${state.tsSimModel === 'PatchTST' ? 'selected' : ''}>PatchTST (Transformer Patching)</option>
                <option value="DeepAR" ${state.tsSimModel === 'DeepAR' ? 'selected' : ''}>DeepAR (RNN Global Model)</option>
                <option value="ARIMA" ${state.tsSimModel === 'ARIMA' ? 'selected' : ''}>ARIMA (Statistical Baseline)</option>
              </select>
            </div>

            <div class="control-group">
              <label>Patch Token Length (P):</label>
              <select id="ts-patch-select" class="ts-select" onchange="window.updateSimPatch(this.value)">
                <option value="8" ${state.tsSimPatchSize == 8 ? 'selected' : ''}>P = 8 steps</option>
                <option value="16" ${state.tsSimPatchSize == 16 ? 'selected' : ''}>P = 16 steps (Default)</option>
                <option value="32" ${state.tsSimPatchSize == 32 ? 'selected' : ''}>P = 32 steps</option>
                <option value="64" ${state.tsSimPatchSize == 64 ? 'selected' : ''}>P = 64 steps</option>
              </select>
            </div>

            <div class="control-group">
              <label>Forecast Horizon (H):</label>
              <select id="ts-horizon-select" class="ts-select" onchange="window.updateSimHorizon(this.value)">
                <option value="48">H = 48 steps</option>
                <option value="96" selected>H = 96 steps</option>
                <option value="192">H = 192 steps</option>
                <option value="336">H = 336 steps</option>
              </select>
            </div>

            <div class="control-group-actions">
              <button class="btn-sim-action" onclick="window.toggleSimPlay()">
                ${state.tsSimIsPlaying ? '⏸ Pause Stream' : '▶ Play Stream'}
              </button>
              <button class="btn-sim-outline" onclick="window.resetSimCanvas()">↺ Reset Wave</button>
            </div>
          </div>
        </div>
      </section>

      <!-- High Quality Video & Lecture Section -->
      <section class="container" style="margin-top: 64px;">
        <div class="section-header-flex">
          <div>
            <div class="dash-eyebrow">EXPERT LECTURE & VIDEO DEMONSTRATION</div>
            <h2 class="section-title-text" style="font-size: 28px;">Time Series Foundation Models: Architectural Video Breakdown</h2>
          </div>
          <div style="font-size: 13px; color: var(--accent-red); font-weight: 700;">HD 1080p • 10:15 Mins</div>
        </div>

        <div class="ts-video-container">
          <div class="ts-video-frame-wrapper">
            <iframe 
              src="https://www.youtube-nocookie.com/embed/g2qF_pB9S8E?rel=0&amp;controls=1" 
              title="Time Series Foundation Models Architectural Walkthrough"
              frameborder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowfullscreen
              class="ts-video-iframe">
            </iframe>
          </div>

          <div class="ts-video-sidebar">
            <div class="ts-video-sidebar-header">
              <div style="font-weight: 700; font-size: 16px; color: var(--text-primary);">Video Chapters & Key Highlights</div>
              <div style="font-size: 12px; color: var(--text-muted);">Click any chapter marker to jump in topic:</div>
            </div>

            <div class="ts-chapter-list">
              <div class="ts-chapter-item active" onclick="alert('Chapter 1: Point-wise attention failure in early transformers')">
                <span class="ts-chap-time">00:00</span>
                <div>
                  <div class="ts-chap-title">1. Point-wise Attention Flaw in Early Transformers</div>
                  <div class="ts-chap-sub">Why standard NLP ViT attention failed on scalar time points</div>
                </div>
              </div>

              <div class="ts-chapter-item" onclick="alert('Chapter 2: Sub-series patch tokenization & channel independence')">
                <span class="ts-chap-time">02:15</span>
                <div>
                  <div class="ts-chap-title">2. Sub-series Patch Tokenization Breakthrough</div>
                  <div class="ts-chap-sub">Grouping P adjacent temporal steps into latent tokens</div>
                </div>
              </div>

              <div class="ts-chapter-item" onclick="alert('Chapter 3: LOTSA 27 Billion Observation Pre-training')">
                <span class="ts-chap-time">04:40</span>
                <div>
                  <div class="ts-chap-title">3. Scaling Pre-training Datasets (LOTSA Corpus)</div>
                  <div class="ts-chap-sub">Aggregating energy, transport, climate, and finance series</div>
                </div>
              </div>

              <div class="ts-chapter-item" onclick="alert('Chapter 4: Zero-Shot Forecasting on Unseen Energy Grids')">
                <span class="ts-chap-time">07:20</span>
                <div>
                  <div class="ts-chap-title">4. Zero-Shot Generalization & Benchmarks</div>
                  <div class="ts-chap-sub">Comparing TimesFM zero-shot vs fine-tuned PatchTST</div>
                </div>
              </div>

              <div class="ts-chapter-item" onclick="alert('Chapter 5: Mixture-of-Experts & Probabilistic Bounds')">
                <span class="ts-chap-time">09:35</span>
                <div>
                  <div class="ts-chap-title">5. Sparse MoE Routing & Quantile Output</div>
                  <div class="ts-chap-sub">Calibrated confidence intervals for real-world deployment</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Latest SOTA Paper Spotlight Section -->
      <section class="container" style="margin-top: 64px;">
        <div class="section-header-flex">
          <div>
            <div class="dash-eyebrow">FEATURED LATEST PUBLICATION</div>
            <h2 class="section-title-text" style="font-size: 28px;">Latest Paper Spotlight</h2>
          </div>
          <span class="ts-tag-pill" style="background: var(--accent-red-light); color: var(--accent-red); font-weight: 700;">NeurIPS 2025 Spotlight</span>
        </div>

        <div class="ts-paper-spotlight-card">
          <div class="ts-paper-left">
            <div class="ts-paper-venue-row">
              <span class="venue-badge">NeurIPS 2025</span>
              <span class="stars-badge">GitHub 4.8k ★</span>
              <span class="weights-badge">HuggingFace Weights Ready</span>
            </div>

            <h2 class="ts-paper-title">TimesFM: High-Capacity Time Series Foundation Models for Universal Zero-Shot Forecasting</h2>

            <div class="ts-paper-authors">
              <strong>Authors:</strong> Abhimanyu Das, Weihao Kong, Andrew Leach, Shreshth Basu, Rajat Sen, Dipayan Dey (Kairos Research & Google Research)
            </div>

            <p class="ts-paper-abstract">
              <strong>Abstract:</strong> We present TimesFM, a decoder-only foundation model trained on a 100-billion observation temporal corpus spanning energy grids, traffic streams, financial markets, and weather. TimesFM employs dynamic patch tokenization with multi-frequency continuous embeddings, allowing instant zero-shot inference over arbitrary context windows ($L \\le 2048$) and forecasting horizons ($H \\le 512$). Evaluated on GIFT-Eval and Monash benchmarks, TimesFM achieves a 24.6% reduction in Mean Squared Error over fine-tuned supervised baselines without requiring dataset-specific retraining.
            </p>

            <div class="ts-paper-actions">
              <a href="https://arxiv.org" target="_blank" class="btn-paper-red">📄 Read Paper PDF (ArXiv)</a>
              <a href="https://github.com" target="_blank" class="btn-paper-outline">💻 View Code & Weights (GitHub)</a>
              <button class="btn-paper-outline" onclick="alert('Opening Google Colab Demo Notebook...')">⚡ Open Colab Demo</button>
            </div>
          </div>

          <div class="ts-paper-right">
            <div class="ts-paper-metrics-header">Benchmark Accuracy (MSE ↓ Lower is Better)</div>
            
            <div class="ts-metric-table">
              <div class="metric-header-row">
                <span>Dataset</span>
                <span>ARIMA</span>
                <span>DeepAR</span>
                <span>PatchTST</span>
                <span class="highlight-col">TimesFM 2.0</span>
              </div>
              <div class="metric-data-row">
                <span>Electricity (ECL)</span>
                <span>0.284</span>
                <span>0.215</span>
                <span>0.168</span>
                <span class="highlight-cell">0.142 (-15.4%)</span>
              </div>
              <div class="metric-data-row">
                <span>Weather (720h)</span>
                <span>0.312</span>
                <span>0.258</span>
                <span>0.201</span>
                <span class="highlight-cell">0.174 (-13.4%)</span>
              </div>
              <div class="metric-data-row">
                <span>Traffic Speed</span>
                <span>0.521</span>
                <span>0.442</span>
                <span>0.385</span>
                <span class="highlight-cell">0.321 (-16.6%)</span>
              </div>
              <div class="metric-data-row">
                <span>ETTh1 (Energy)</span>
                <span>0.418</span>
                <span>0.395</span>
                <span>0.370</span>
                <span class="highlight-cell">0.334 (-9.7%)</span>
              </div>
              <div class="metric-data-row">
                <span>Exchange Rate</span>
                <span>0.398</span>
                <span>0.354</span>
                <span>0.231</span>
                <span class="highlight-cell">0.185 (-19.9%)</span>
              </div>
            </div>

            <div class="ts-paper-key-takeaway">
              <strong>Key Finding:</strong> Zero-shot foundation model pre-training delivers consistent performance gains across all zero-shot target domains while eliminating time-consuming fine-tuning loops.
            </div>
          </div>
        </div>
      </section>

      <!-- Related Publications & Next Steps -->
      <section class="container" style="margin-top: 64px; padding-bottom: 80px;">
        <div class="ts-next-footer-box">
          <div>
            <h3 style="font-family: var(--font-serif); font-size: 26px; margin-bottom: 8px;">Explore Other Research Pillars</h3>
            <p style="font-size: 14px; color: var(--text-secondary);">Learn how Kairos Research Lab connects time series modeling with world models and embodied robotics.</p>
          </div>
          <div style="display: flex; gap: 16px;">
            <button class="btn-action-outline" onclick="window.navigateTo('/research')">Pillar 02: World Models →</button>
            <button class="btn-action-red" onclick="window.navigateTo('/publications')">All Lab Publications</button>
          </div>
        </div>
      </section>
    </div>
  `;
}

// Global Handlers for Time Series Page
window.setTsPhase = (phaseNum) => {
  state.tsActivePhase = phaseNum;
  renderApp();
  window.scrollTo({ top: 450, behavior: 'smooth' });
};

window.updateSimModel = (val) => {
  state.tsSimModel = val;
  if (window.tsSimInstance) window.tsSimInstance.setModel(val);
};

window.updateSimPatch = (val) => {
  state.tsSimPatchSize = parseInt(val);
  if (window.tsSimInstance) window.tsSimInstance.setPatch(parseInt(val));
};

window.updateSimHorizon = (val) => {
  state.tsSimHorizon = parseInt(val);
  if (window.tsSimInstance) window.tsSimInstance.setHorizon(parseInt(val));
};

window.toggleSimPlay = () => {
  state.tsSimIsPlaying = !state.tsSimIsPlaying;
  renderApp();
};

window.resetSimCanvas = () => {
  if (window.tsSimInstance) window.tsSimInstance.reset();
};

// Interactive Canvas Animation Engine
function initTimeSeriesCanvasSimulator() {
  const canvas = document.getElementById('ts-sim-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let animationId = null;
  let offset = 0;

  let model = state.tsSimModel || 'TimesFM';
  let patchSize = state.tsSimPatchSize || 16;
  let horizon = state.tsSimHorizon || 96;

  // Generate synthetic signal
  const numPoints = 200;
  const signal = [];
  for (let i = 0; i < numPoints; i++) {
    const t = i * 0.1;
    const val = Math.sin(t) * 40 + Math.cos(t * 0.4) * 25 + Math.sin(t * 2.5) * 10 + (i * 0.2);
    signal.push(val);
  }

  window.tsSimInstance = {
    setModel: (m) => { model = m; },
    setPatch: (p) => { patchSize = p; },
    setHorizon: (h) => { horizon = h; },
    reset: () => { offset = 0; }
  };

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Background Grid
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 1;
    for (let x = 0; x < canvas.width; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }
    for (let y = 0; y < canvas.height; y += 40) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }

    const paddingLeft = 60;
    const paddingRight = 60;
    const plotWidth = canvas.width - paddingLeft - paddingRight;
    const centerY = canvas.height / 2 + 10;
    const stepX = plotWidth / numPoints;

    const contextLimitIndex = Math.floor(numPoints * 0.7);

    // 1. Draw Context Signal
    ctx.beginPath();
    ctx.strokeStyle = '#4A90E2';
    ctx.lineWidth = 2.5;
    for (let i = 0; i < contextLimitIndex; i++) {
      const x = paddingLeft + i * stepX;
      const y = centerY - signal[(i + Math.floor(offset)) % numPoints] * 0.8;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    // Context Nodes
    ctx.fillStyle = '#4A90E2';
    for (let i = 0; i < contextLimitIndex; i += 6) {
      const x = paddingLeft + i * stepX;
      const y = centerY - signal[(i + Math.floor(offset)) % numPoints] * 0.8;
      ctx.beginPath();
      ctx.arc(x, y, 2.5, 0, Math.PI * 2);
      ctx.fill();
    }

    // 2. Draw Patching Blocks (if PatchTST or TimesFM)
    if (model === 'TimesFM' || model === 'PatchTST') {
      const numPatches = Math.floor(contextLimitIndex / (patchSize / 2));
      for (let p = 0; p < numPatches; p++) {
        const startIdx = p * (patchSize / 2);
        const endIdx = startIdx + patchSize;
        if (endIdx > contextLimitIndex) break;

        const startX = paddingLeft + startIdx * stepX;
        const endX = paddingLeft + endIdx * stepX;

        // Draw translucent patch box
        ctx.fillStyle = p % 2 === 0 ? 'rgba(181, 46, 50, 0.12)' : 'rgba(74, 144, 226, 0.12)';
        ctx.strokeStyle = p % 2 === 0 ? 'rgba(181, 46, 50, 0.4)' : 'rgba(74, 144, 226, 0.4)';
        ctx.lineWidth = 1;
        ctx.fillRect(startX, 40, endX - startX, canvas.height - 120);
        ctx.strokeRect(startX, 40, endX - startX, canvas.height - 120);

        // Patch Label
        ctx.fillStyle = '#FFFFFF';
        ctx.font = '10px monospace';
        ctx.fillText(`P${p+1}`, startX + 4, 55);
      }

      // 3. Draw Multi-Head Attention Arcs
      ctx.strokeStyle = 'rgba(255, 215, 0, 0.4)';
      ctx.lineWidth = 1.2;
      for (let p = 0; p < numPatches - 1; p++) {
        const x1 = paddingLeft + (p * (patchSize/2) + patchSize/2) * stepX;
        const x2 = paddingLeft + ((p + 1) * (patchSize/2) + patchSize/2) * stepX;
        const midX = (x1 + x2) / 2;
        const arcY = 70 - (p % 3) * 12;

        ctx.beginPath();
        ctx.moveTo(x1, 80);
        ctx.quadraticCurveTo(midX, arcY, x2, 80);
        ctx.stroke();
      }
    }

    // 4. Forecast Boundary Line
    const boundaryX = paddingLeft + contextLimitIndex * stepX;
    ctx.setLineDash([4, 4]);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(boundaryX, 30);
    ctx.lineTo(boundaryX, canvas.height - 40);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.fillStyle = '#B52E32';
    ctx.font = 'bold 11px Inter, sans-serif';
    ctx.fillText('FORECAST HORIZON START →', boundaryX + 8, 45);

    // 5. Draw Forecast Horizon & Confidence Interval
    ctx.beginPath();
    ctx.fillStyle = model === 'TimesFM' ? 'rgba(181, 46, 50, 0.25)' : 'rgba(245, 166, 35, 0.2)';

    // Confidence band top & bottom
    for (let i = contextLimitIndex; i < numPoints; i++) {
      const x = paddingLeft + i * stepX;
      const baseVal = signal[(i + Math.floor(offset)) % numPoints] * 0.8;
      const uncertainty = (i - contextLimitIndex) * 0.35;
      const yUpper = centerY - (baseVal + uncertainty);
      if (i === contextLimitIndex) ctx.moveTo(x, yUpper);
      else ctx.lineTo(x, yUpper);
    }
    for (let i = numPoints - 1; i >= contextLimitIndex; i--) {
      const x = paddingLeft + i * stepX;
      const baseVal = signal[(i + Math.floor(offset)) % numPoints] * 0.8;
      const uncertainty = (i - contextLimitIndex) * 0.35;
      const yLower = centerY - (baseVal - uncertainty);
      ctx.lineTo(x, yLower);
    }
    ctx.closePath();
    ctx.fill();

    // Forecast Center Line
    ctx.beginPath();
    ctx.strokeStyle = model === 'TimesFM' ? '#B52E32' : '#F5A623';
    ctx.lineWidth = 3;
    for (let i = contextLimitIndex; i < numPoints; i++) {
      const x = paddingLeft + i * stepX;
      const y = centerY - signal[(i + Math.floor(offset)) % numPoints] * 0.8;
      if (i === contextLimitIndex) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    // Bottom Legend
    ctx.font = '11px Inter, sans-serif';
    ctx.fillStyle = '#4A90E2';
    ctx.fillText('● Historical Context (512 steps)', 60, canvas.height - 15);

    ctx.fillStyle = '#B52E32';
    ctx.fillText('● Zero-Shot Forecast Output (Horizon H)', 300, canvas.height - 15);

    ctx.fillStyle = 'rgba(255, 215, 0, 0.9)';
    ctx.fillText('⌒ Multi-Head Temporal Self-Attention', 580, canvas.height - 15);

    ctx.fillStyle = '#FFFFFF';
    ctx.fillText(`Active Model: ${model}`, 850, canvas.height - 15);

    if (state.tsSimIsPlaying) {
      offset += 0.4;
    }
    animationId = requestAnimationFrame(draw);
  }

  draw();
}

// Global Methods
window.navigateTo = navigateTo;

window.scrollToSection = (sectionId) => {
  const el = document.getElementById(sectionId);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
};

window.openDocsModal = (tab = 'WEBSITE_DESIGN_SPEC') => {
  state.isDocsOpen = true;
  state.activeDocTab = tab;
  renderApp();
};

window.closeDocsModal = () => {
  state.isDocsOpen = false;
  renderApp();
};

window.switchDocTab = (tab) => {
  state.activeDocTab = tab;
  renderApp();
};

init();

