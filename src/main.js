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
        <!-- Pillar 01 -->
        <div class="pillar-item-card" onclick="window.navigateTo('/research')">
          <div class="pillar-svg-wrap">
            <span class="pillar-corner-num">01</span>
            <svg width="220" height="90" viewBox="0 0 220 90" fill="none">
              <path d="M10 45 Q 35 10, 60 45 T 110 45 T 160 45 T 210 45" stroke="#B52E32" stroke-width="1.5" opacity="0.8"/>
              <path d="M10 45 Q 35 25, 60 45 T 110 45 T 160 45 T 210 45" stroke="#B52E32" stroke-width="1" opacity="0.5"/>
              <path d="M10 45 Q 35 60, 60 45 T 110 45 T 160 45 T 210 45" stroke="#B52E32" stroke-width="1" opacity="0.3"/>
            </svg>
          </div>
          <div>
            <h3 class="pillar-item-title">Time Series Models</h3>
            <p class="pillar-item-desc">Modeling, learning and forecasting dynamic systems.</p>
          </div>
          <div style="text-align: right; color: var(--accent-red); font-weight: 700;">→</div>
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
  return `
    <section class="container" style="padding: 64px 0;">
      <div class="dash-eyebrow">PROJECTS</div>
      <h1 class="hero-h1">Active Research Projects</h1>
      <div style="background: var(--bg-surface); border: 1px solid var(--border-subtle); padding: 40px; border-radius: var(--radius-md); margin-top: 24px;">
        <h3 style="font-family: var(--font-serif); font-size: 26px; margin-bottom: 8px;">World Models for Real-World Robotic Navigation</h3>
        <p style="font-size: 14px; color: var(--text-secondary);">Exploring sample-efficient world model representations for robotic navigation in complex terrain.</p>
      </div>
    </section>
  `;
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

function renderDocsModal() {
  const activeContent = DOCS_FILES[state.activeDocTab] || DOCS_FILES.WEBSITE_DESIGN_SPEC;
  const renderedDocsMd = marked.parse(activeContent);

  return `
    <div class="modal-overlay ${state.isDocsOpen ? 'open' : ''}" onclick="if(event.target === this) window.closeDocsModal()">
      <div class="modal-container">
        <div class="modal-header">
          <div class="modal-title">
            <span style="font-family: var(--font-serif); font-size: 24px;">Kairos Research Specs Explorer</span>
          </div>
          <button class="btn-close-modal" onclick="window.closeDocsModal()">✕</button>
        </div>

        <div class="modal-tabs">
          <button class="modal-tab-btn ${state.activeDocTab === 'WEBSITE_DESIGN_SPEC' ? 'active' : ''}" onclick="window.switchDocTab('WEBSITE_DESIGN_SPEC')">WEBSITE_DESIGN_SPEC.md</button>
          <button class="modal-tab-btn ${state.activeDocTab === 'PUBLICATIONS' ? 'active' : ''}" onclick="window.switchDocTab('PUBLICATIONS')">PUBLICATIONS.md</button>
        </div>

        <div class="modal-body article-body">
          ${renderedDocsMd}
        </div>
      </div>
    </div>
  `;
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
