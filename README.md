<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>CreatorKit — README</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Cabinet+Grotesk:wght@400;500;700;800;900&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet">
<style>
  :root {
    --ink: #0C0C0E;
    --ink2: #3A3A45;
    --ink3: #7A7A88;
    --surface: #FAFAF8;
    --card: #F3F2EE;
    --accent: #4B5BFF;
    --accent2: #8B5CF6;
    --gold: #E8A838;
    --teal: #0EA87A;
    --red: #E84545;
    --border: rgba(12,12,14,0.1);
    --border2: rgba(12,12,14,0.06);
    --mono: 'JetBrains Mono', monospace;
    --display: 'Bebas Neue', sans-serif;
    --body: 'Cabinet Grotesk', sans-serif;
    --serif: 'Instrument Serif', serif;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  html { font-size: 16px; scroll-behavior: smooth; }

  body {
    font-family: var(--body);
    background: var(--surface);
    color: var(--ink);
    line-height: 1.7;
    max-width: 860px;
    margin: 0 auto;
    padding: 0 24px 80px;
  }

  /* ── HERO ── */
  .hero {
    padding: 72px 0 56px;
    border-bottom: 1px solid var(--border);
    margin-bottom: 64px;
  }

  .badge-row {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    margin-bottom: 24px;
  }

  .badge {
    font-family: var(--mono);
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    padding: 4px 10px;
    border-radius: 4px;
    border: 1px solid var(--border);
    color: var(--ink2);
  }

  .badge.blue { background: #EEF0FF; color: #3140CC; border-color: #C5CAFF; }
  .badge.purple { background: #F3EEFF; color: #6B3ED6; border-color: #D4BEFF; }
  .badge.green { background: #EAFAF4; color: #0A7A58; border-color: #9AE6C8; }
  .badge.gold { background: #FEF8EC; color: #9A6A0A; border-color: #F5D68A; }

  .hero-wordmark {
    font-family: var(--display);
    font-size: clamp(80px, 14vw, 136px);
    line-height: 0.88;
    letter-spacing: 0.02em;
    color: var(--ink);
    margin-bottom: 8px;
  }

  .hero-wordmark span {
    color: var(--accent);
  }

  .hero-tagline {
    font-family: var(--serif);
    font-style: italic;
    font-size: 22px;
    color: var(--ink2);
    margin-bottom: 28px;
    line-height: 1.4;
  }

  .hero-desc {
    font-size: 16px;
    color: var(--ink2);
    max-width: 540px;
    line-height: 1.7;
  }

  /* ── SECTION HEADERS ── */
  .section {
    margin-bottom: 64px;
  }

  .section-eyebrow {
    font-family: var(--mono);
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--accent);
    margin-bottom: 10px;
  }

  .section-title {
    font-family: var(--display);
    font-size: clamp(36px, 6vw, 52px);
    line-height: 0.95;
    letter-spacing: 0.02em;
    color: var(--ink);
    margin-bottom: 24px;
  }

  .section-lead {
    font-size: 17px;
    color: var(--ink2);
    max-width: 600px;
    line-height: 1.65;
    margin-bottom: 28px;
  }

  /* ── DIVIDER ── */
  .divider {
    display: flex;
    align-items: center;
    gap: 16px;
    margin: 56px 0;
  }

  .divider-line { flex: 1; height: 1px; background: var(--border); }
  .divider-mark {
    font-family: var(--mono);
    font-size: 10px;
    color: var(--ink3);
    letter-spacing: 0.1em;
  }

  /* ── FEATURE BLOCKS ── */
  .feature-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    margin-bottom: 32px;
  }

  @media (max-width: 600px) { .feature-grid { grid-template-columns: 1fr; } }

  .feature-card {
    background: var(--card);
    border-radius: 16px;
    padding: 28px 24px;
    border: 1px solid var(--border2);
    position: relative;
    overflow: hidden;
  }

  .feature-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 3px;
  }

  .feature-card.blue::before { background: var(--accent); }
  .feature-card.purple::before { background: var(--accent2); }

  .fc-num {
    font-family: var(--display);
    font-size: 64px;
    line-height: 1;
    color: var(--border);
    position: absolute;
    top: 16px; right: 20px;
    letter-spacing: 0.02em;
    user-select: none;
  }

  .fc-icon {
    width: 44px; height: 44px;
    border-radius: 12px;
    display: flex; align-items: center; justify-content: center;
    font-size: 22px;
    margin-bottom: 16px;
  }

  .fc-icon.blue { background: #EEF0FF; }
  .fc-icon.purple { background: #F3EEFF; }

  .fc-name {
    font-family: var(--body);
    font-weight: 800;
    font-size: 18px;
    margin-bottom: 8px;
    color: var(--ink);
  }

  .fc-desc {
    font-size: 14px;
    color: var(--ink2);
    line-height: 1.6;
    margin-bottom: 16px;
  }

  .fc-tags {
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
  }

  .fc-tag {
    font-family: var(--mono);
    font-size: 10px;
    padding: 3px 8px;
    border-radius: 4px;
    background: white;
    border: 1px solid var(--border);
    color: var(--ink2);
  }

  /* ── CODE BLOCKS ── */
  pre {
    font-family: var(--mono);
    font-size: 13px;
    background: var(--ink);
    color: #E8E6E0;
    border-radius: 12px;
    padding: 20px 24px;
    overflow-x: auto;
    line-height: 1.7;
    margin: 20px 0;
  }

  code {
    font-family: var(--mono);
    font-size: 13px;
    background: var(--card);
    border: 1px solid var(--border);
    padding: 2px 6px;
    border-radius: 4px;
    color: var(--accent);
  }

  pre code {
    background: transparent;
    border: none;
    padding: 0;
    color: inherit;
    font-size: inherit;
  }

  .code-comment { color: #888; }
  .code-key { color: #7DD3FC; }
  .code-val { color: #86EFAC; }
  .code-str { color: #FCA5A5; }
  .code-fn { color: #C4B5FD; }

  /* ── TABLES ── */
  .table-wrap {
    overflow-x: auto;
    margin: 20px 0;
    border-radius: 12px;
    border: 1px solid var(--border);
  }

  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 14px;
  }

  thead {
    background: var(--ink);
    color: white;
  }

  th {
    font-family: var(--mono);
    font-size: 10px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    font-weight: 600;
    padding: 14px 18px;
    text-align: left;
  }

  td {
    padding: 13px 18px;
    border-bottom: 1px solid var(--border2);
    color: var(--ink2);
    vertical-align: top;
  }

  tr:last-child td { border-bottom: none; }
  tr:nth-child(even) { background: var(--card); }

  td:first-child { font-weight: 700; color: var(--ink); }

  .check { color: var(--teal); font-weight: 700; }
  .cross { color: var(--ink3); }

  /* ── CALLOUTS ── */
  .callout {
    border-radius: 12px;
    padding: 18px 22px;
    margin: 20px 0;
    display: flex;
    gap: 14px;
    align-items: flex-start;
  }

  .callout.info { background: #EEF0FF; border: 1px solid #C5CAFF; }
  .callout.warn { background: #FEF8EC; border: 1px solid #F5D68A; }
  .callout.tip  { background: #EAFAF4; border: 1px solid #9AE6C8; }
  .callout.danger { background: #FEF0F0; border: 1px solid #FFBDBD; }

  .callout-icon { font-size: 18px; flex-shrink: 0; margin-top: 1px; }

  .callout-body { font-size: 14px; line-height: 1.6; }
  .callout.info .callout-body { color: #2536A8; }
  .callout.warn .callout-body { color: #7A4E0C; }
  .callout.tip  .callout-body { color: #0A6645; }
  .callout.danger .callout-body { color: #B02020; }

  .callout-body strong { font-weight: 700; }

  /* ── USER FLOWS ── */
  .flow {
    display: flex;
    align-items: flex-start;
    gap: 0;
    margin: 24px 0;
    flex-wrap: wrap;
  }

  .flow-step {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    min-width: 80px;
  }

  .flow-bubble {
    width: 44px; height: 44px;
    border-radius: 50%;
    background: var(--accent);
    color: white;
    font-family: var(--mono);
    font-size: 13px;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .flow-step:nth-child(4n+2) .flow-bubble { background: var(--accent2); }
  .flow-step:nth-child(4n+3) .flow-bubble { background: var(--teal); }
  .flow-step:nth-child(4n+4) .flow-bubble { background: var(--gold); }

  .flow-label {
    font-size: 11px;
    font-weight: 700;
    color: var(--ink2);
    text-align: center;
    line-height: 1.3;
    max-width: 70px;
  }

  .flow-arrow {
    font-size: 18px;
    color: var(--ink3);
    margin-top: 13px;
    padding: 0 2px;
    flex-shrink: 0;
  }

  /* ── PERSONA CARDS ── */
  .persona-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 14px;
    margin: 24px 0;
  }

  @media (max-width: 640px) { .persona-grid { grid-template-columns: 1fr; } }

  .persona-card {
    background: white;
    border-radius: 14px;
    padding: 22px 20px;
    border: 1px solid var(--border);
  }

  .persona-avatar {
    width: 40px; height: 40px;
    border-radius: 50%;
    font-size: 18px;
    display: flex; align-items: center; justify-content: center;
    margin-bottom: 12px;
  }

  .persona-name {
    font-weight: 800;
    font-size: 15px;
    margin-bottom: 2px;
    color: var(--ink);
  }

  .persona-role {
    font-size: 11px;
    color: var(--ink3);
    font-family: var(--mono);
    margin-bottom: 12px;
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }

  .persona-need {
    font-size: 13px;
    color: var(--ink2);
    line-height: 1.55;
    font-style: italic;
    font-family: var(--serif);
  }

  /* ── METRIC CARDS ── */
  .metrics-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 12px;
    margin: 24px 0;
  }

  @media (max-width: 640px) { .metrics-grid { grid-template-columns: 1fr 1fr; } }

  .metric-card {
    background: var(--card);
    border-radius: 12px;
    padding: 18px 16px;
    text-align: center;
  }

  .metric-value {
    font-family: var(--display);
    font-size: 34px;
    letter-spacing: 0.02em;
    line-height: 1;
    margin-bottom: 4px;
  }

  .metric-label {
    font-size: 11px;
    color: var(--ink3);
    font-family: var(--mono);
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }

  .mv-blue { color: var(--accent); }
  .mv-purple { color: var(--accent2); }
  .mv-green { color: var(--teal); }
  .mv-gold { color: var(--gold); }

  /* ── TIMELINE ── */
  .timeline { margin: 24px 0; }

  .tl-item {
    display: flex;
    gap: 20px;
    padding-bottom: 28px;
    position: relative;
  }

  .tl-item::before {
    content: '';
    position: absolute;
    left: 18px;
    top: 40px;
    bottom: 0;
    width: 1px;
    background: var(--border);
  }

  .tl-item:last-child::before { display: none; }

  .tl-dot {
    width: 36px; height: 36px;
    border-radius: 50%;
    background: var(--ink);
    color: white;
    font-family: var(--mono);
    font-size: 11px;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    z-index: 1;
  }

  .tl-content { flex: 1; padding-top: 6px; }
  .tl-week { font-family: var(--mono); font-size: 10px; color: var(--accent); font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 4px; }
  .tl-title { font-weight: 800; font-size: 15px; margin-bottom: 4px; }
  .tl-desc { font-size: 13px; color: var(--ink2); line-height: 1.5; }

  /* ── INLINE PROSE ── */
  p { font-size: 15px; color: var(--ink2); line-height: 1.75; margin-bottom: 16px; }
  p:last-child { margin-bottom: 0; }

  h3 {
    font-family: var(--body);
    font-weight: 800;
    font-size: 18px;
    margin: 32px 0 10px;
    color: var(--ink);
  }

  h4 {
    font-family: var(--mono);
    font-size: 11px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--ink3);
    font-weight: 600;
    margin: 24px 0 8px;
  }

  ul, ol {
    padding-left: 20px;
    margin-bottom: 16px;
  }

  li {
    font-size: 14px;
    color: var(--ink2);
    line-height: 1.7;
    margin-bottom: 5px;
    padding-left: 4px;
  }

  li::marker { color: var(--accent); }

  a { color: var(--accent); text-decoration: none; }
  a:hover { text-decoration: underline; }

  /* ── TOC ── */
  .toc {
    background: var(--card);
    border-radius: 14px;
    padding: 24px 28px;
    margin-bottom: 56px;
    border: 1px solid var(--border2);
  }

  .toc-title {
    font-family: var(--display);
    font-size: 22px;
    margin-bottom: 16px;
    letter-spacing: 0.03em;
  }

  .toc-list {
    columns: 2;
    column-gap: 32px;
    list-style: none;
    padding: 0;
  }

  @media (max-width: 500px) { .toc-list { columns: 1; } }

  .toc-list li { margin-bottom: 8px; padding: 0; }

  .toc-list a {
    font-size: 13px;
    color: var(--ink2);
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .toc-list a::before {
    content: '';
    width: 4px; height: 4px;
    border-radius: 50%;
    background: var(--accent);
    flex-shrink: 0;
  }

  .toc-list a:hover { color: var(--accent); text-decoration: none; }

  /* ── FOOTER ── */
  .footer {
    margin-top: 80px;
    padding-top: 32px;
    border-top: 1px solid var(--border);
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: gap;
    gap: 12px;
  }

  .footer-brand {
    font-family: var(--display);
    font-size: 28px;
    letter-spacing: 0.04em;
    color: var(--ink);
  }

  .footer-brand span { color: var(--accent); }

  .footer-copy {
    font-size: 12px;
    color: var(--ink3);
    font-family: var(--mono);
  }

  /* ── ENV TABLE ── */
  .env-row {
    display: flex;
    align-items: baseline;
    gap: 12px;
    padding: 10px 0;
    border-bottom: 1px solid var(--border2);
    flex-wrap: wrap;
  }

  .env-key {
    font-family: var(--mono);
    font-size: 12px;
    font-weight: 600;
    color: var(--accent2);
    min-width: 240px;
  }

  .env-desc {
    font-size: 13px;
    color: var(--ink2);
  }

  .env-req {
    font-family: var(--mono);
    font-size: 10px;
    padding: 2px 6px;
    border-radius: 4px;
    font-weight: 600;
  }

  .env-req.req { background: #FEF0F0; color: #B02020; }
  .env-req.opt { background: #EAFAF4; color: #0A6645; }

  /* ── PLATFORM GRID ── */
  .platform-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    margin: 20px 0;
  }

  @media (max-width: 540px) { .platform-grid { grid-template-columns: 1fr 1fr; } }

  .platform-card {
    background: white;
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 14px;
  }

  .plat-name {
    font-weight: 800;
    font-size: 13px;
    margin-bottom: 3px;
    color: var(--ink);
  }

  .plat-limit {
    font-family: var(--mono);
    font-size: 10px;
    color: var(--ink3);
  }

  /* ── ARCH DIAGRAM ── */
  .arch-layer {
    background: var(--card);
    border-radius: 12px;
    padding: 16px 20px;
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    gap: 16px;
    border: 1px solid var(--border2);
  }

  .arch-label {
    font-family: var(--mono);
    font-size: 9px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    font-weight: 600;
    color: white;
    padding: 4px 10px;
    border-radius: 4px;
    min-width: 70px;
    text-align: center;
  }

  .arch-items {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
  }

  .arch-item {
    font-size: 12px;
    font-weight: 700;
    color: var(--ink2);
    background: white;
    border: 1px solid var(--border);
    border-radius: 6px;
    padding: 4px 10px;
  }

</style>
</head>
<body>

<!-- HERO -->
<div class="hero">
  <div class="badge-row">
    <span class="badge blue">v1.0.0</span>
    <span class="badge green">React Native</span>
    <span class="badge purple">Claude AI</span>
    <span class="badge gold">MIT License</span>
  </div>
  <div class="hero-wordmark">CREATOR<span>KIT</span></div>
  <div class="hero-tagline">Download videos. Generate bios. Publish faster.</div>
  <p class="hero-desc">
    A dual-feature mobile utility for content creators and social media managers.
    Two superpowers, zero friction — built to get you back to creating.
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<div class="toc">
  <div class="toc-title">Contents</div>
  <ul class="toc-list">
    <li><a href="#overview">Overview</a></li>
    <li><a href="#features">Features</a></li>
    <li><a href="#personas">User personas</a></li>
    <li><a href="#tech-stack">Tech stack</a></li>
    <li><a href="#getting-started">Getting started</a></li>
    <li><a href="#structure">Project structure</a></li>
    <li><a href="#api">API integrations</a></li>
    <li><a href="#platforms">Supported platforms</a></li>
    <li><a href="#user-flows">User flows</a></li>
    <li><a href="#architecture">Architecture</a></li>
    <li><a href="#env">Environment variables</a></li>
    <li><a href="#metrics">Success metrics</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#monetization">Monetization</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
  </ul>
</div>

<!-- OVERVIEW -->
<div class="section" id="overview">
  <div class="section-eyebrow">01 — Overview</div>
  <div class="section-title">What is CreatorKit?</div>
  <p class="section-lead">
    CreatorKit is a focused mobile application with exactly two features — nothing more, nothing less.
    It solves two daily pain points for content creators in a single, cohesive tool.
  </p>

  <div class="callout info">
    <div class="callout-icon">💡</div>
    <div class="callout-body">
      <strong>Design philosophy:</strong> One app, two superpowers. Every screen, every interaction, and every decision
      was made to reduce friction and get creators back to creating. No bloat. No distractions.
    </div>
  </div>

  <div class="metrics-grid">
    <div class="metric-card"><div class="metric-value mv-blue">2</div><div class="metric-label">Core features</div></div>
    <div class="metric-card"><div class="metric-value mv-purple">6</div><div class="metric-label">Bio platforms</div></div>
    <div class="metric-card"><div class="metric-value mv-green">3</div><div class="metric-label">Video sources</div></div>
    <div class="metric-card"><div class="metric-value mv-gold">8s</div><div class="metric-label">Avg download time</div></div>
  </div>

  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>Capability</th>
          <th>Free tier</th>
          <th>Pro — $4.99/mo</th>
        </tr>
      </thead>
      <tbody>
        <tr><td>Video downloads / day</td><td>5</td><td class="check">Unlimited</td></tr>
        <tr><td>Bio generations / day</td><td>3</td><td class="check">Unlimited</td></tr>
        <tr><td>Platforms per bio</td><td>3</td><td class="check">All 6</td></tr>
        <tr><td>Batch download queue</td><td class="cross">—</td><td class="check">Up to 5 at once</td></tr>
        <tr><td>Audio-only (MP3) extraction</td><td class="cross">—</td><td class="check">✓</td></tr>
        <tr><td>Download history log</td><td class="cross">—</td><td class="check">✓</td></tr>
        <tr><td>Priority processing</td><td class="cross">—</td><td class="check">✓</td></tr>
      </tbody>
    </table>
  </div>
</div>

<div class="divider"><div class="divider-line"></div><div class="divider-mark">// features</div><div class="divider-line"></div></div>

<!-- FEATURES -->
<div class="section" id="features">
  <div class="section-eyebrow">02 — Features</div>
  <div class="section-title">Two features, built right</div>

  <div class="feature-grid">
    <div class="feature-card blue">
      <div class="fc-num">01</div>
      <div class="fc-icon blue">📥</div>
      <div class="fc-name">Video Downloader</div>
      <div class="fc-desc">
        Paste any link from Instagram, YouTube, or Facebook. Choose quality. Save to device. Done in under 10 seconds — no account required.
      </div>
      <div class="fc-tags">
        <span class="fc-tag">Instagram Reels</span>
        <span class="fc-tag">YouTube Shorts</span>
        <span class="fc-tag">Facebook Video</span>
        <span class="fc-tag">720p / 1080p</span>
        <span class="fc-tag">Audio-only MP3</span>
      </div>
    </div>

    <div class="feature-card purple">
      <div class="fc-num">02</div>
      <div class="fc-icon purple">✨</div>
      <div class="fc-name">AI Bio Generator</div>
      <div class="fc-desc">
        Type your niche or upload a photo. The AI writes platform-optimized bios for all 6 channels — each with the right tone and character limit.
      </div>
      <div class="fc-tags">
        <span class="fc-tag">Text input</span>
        <span class="fc-tag">Image analysis</span>
        <span class="fc-tag">Tone selector</span>
        <span class="fc-tag">One-tap copy</span>
        <span class="fc-tag">Regenerate</span>
      </div>
    </div>
  </div>

  <h3>Video Downloader — detailed spec</h3>
  <ul>
    <li>Input: paste URL from clipboard or type directly into the link field</li>
    <li>Supported: Instagram Posts, Reels, Stories; YouTube Standard + Shorts; Facebook Videos</li>
    <li>Quality options: Auto (best available), 720p, 1080p, Audio-only MP3</li>
    <li>Output: MP4/MP3 saved to Camera Roll / Files app (iOS &amp; Android)</li>
    <li>Batch queue: up to 5 simultaneous downloads (Pro tier)</li>
    <li>Private videos: graceful error message with clear explanation</li>
    <li>Unsupported URLs: detected immediately before processing begins</li>
  </ul>

  <h3>AI Bio Generator — detailed spec</h3>
  <ul>
    <li>Input A: Free-text description — type your niche, role, or brand</li>
    <li>Input B: Photo upload — Claude Vision analyzes the image to infer persona, style, and niche</li>
    <li>Tone selector: Professional, Casual, Bold, Witty, Minimal</li>
    <li>Outputs: up to 6 platform bios generated simultaneously</li>
    <li>Per-platform character limits enforced (LinkedIn 2,600 / Twitter 160 / Instagram 150 / TikTok 80)</li>
    <li>Regenerate individual bios without regenerating all</li>
    <li>One-tap copy per platform bio</li>
    <li>Inline editing with live character count</li>
  </ul>
</div>

<div class="divider"><div class="divider-line"></div><div class="divider-mark">// personas</div><div class="divider-line"></div></div>

<!-- PERSONAS -->
<div class="section" id="personas">
  <div class="section-eyebrow">03 — User Personas</div>
  <div class="section-title">Who uses CreatorKit?</div>

  <div class="persona-grid">
    <div class="persona-card">
      <div class="persona-avatar" style="background:#EEF0FF;">👩‍💼</div>
      <div class="persona-name">Priya, 27</div>
      <div class="persona-role">Social Media Manager</div>
      <div class="persona-need">"I manage 8 client accounts. I need to repurpose videos and rewrite bios constantly. Speed is everything."</div>
    </div>
    <div class="persona-card">
      <div class="persona-avatar" style="background:#F3EEFF;">🎬</div>
      <div class="persona-name">Marcus, 22</div>
      <div class="persona-role">Aspiring Influencer</div>
      <div class="persona-need">"I'm building on TikTok and Instagram. I need bios that sound pro without hiring a copywriter."</div>
    </div>
    <div class="persona-card">
      <div class="persona-avatar" style="background:#EAFAF4;">🛍️</div>
      <div class="persona-name">Anita, 38</div>
      <div class="persona-role">Small Business Owner</div>
      <div class="persona-need">"I occasionally save product demo videos and need a polished LinkedIn bio that sells my boutique."</div>
    </div>
  </div>
</div>

<div class="divider"><div class="divider-line"></div><div class="divider-mark">// tech stack</div><div class="divider-line"></div></div>

<!-- TECH STACK -->
<div class="section" id="tech-stack">
  <div class="section-eyebrow">04 — Tech Stack</div>
  <div class="section-title">Built with modern tooling</div>

  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Layer</th><th>Technology</th><th>Purpose</th></tr>
      </thead>
      <tbody>
        <tr><td>Mobile app</td><td><code>React Native</code></td><td>iOS + Android from one codebase</td></tr>
        <tr><td>Navigation</td><td><code>React Navigation v6</code></td><td>Bottom tab + stack navigation</td></tr>
        <tr><td>State</td><td><code>Zustand</code></td><td>Lightweight global state management</td></tr>
        <tr><td>AI / Bio generation</td><td><code>Anthropic Claude API</code></td><td>claude-sonnet model with platform-specific system prompts</td></tr>
        <tr><td>Image analysis</td><td><code>Claude Vision API</code></td><td>Analyze uploaded photos to infer user persona</td></tr>
        <tr><td>Video processing</td><td><code>yt-dlp (server-side)</code></td><td>Extract video URLs; no on-device scraping</td></tr>
        <tr><td>Backend</td><td><code>Node.js + Express</code></td><td>REST API deployed on AWS Lambda</td></tr>
        <tr><td>File storage</td><td><code>React Native FS</code></td><td>Save videos locally; no cloud storage of user media</td></tr>
        <tr><td>Auth</td><td><code>Google Sign-In / Email</code></td><td>Optional — only required for Pro sync features</td></tr>
        <tr><td>Payments</td><td><code>RevenueCat</code></td><td>In-app subscription management across iOS and Android</td></tr>
        <tr><td>Analytics</td><td><code>PostHog</code></td><td>Event tracking, funnel analysis, retention metrics</td></tr>
      </tbody>
    </table>
  </div>
</div>

<div class="divider"><div class="divider-line"></div><div class="divider-mark">// getting started</div><div class="divider-line"></div></div>

<!-- GETTING STARTED -->
<div class="section" id="getting-started">
  <div class="section-eyebrow">05 — Getting Started</div>
  <div class="section-title">Run it locally</div>

  <h4>Prerequisites</h4>
  <ul>
    <li>Node.js 18+ and npm / yarn</li>
    <li>React Native CLI or Expo CLI</li>
    <li>Xcode 15+ (iOS) or Android Studio (Android)</li>
    <li>Anthropic API key (get one at <a href="https://console.anthropic.com" target="_blank">console.anthropic.com</a>)</li>
  </ul>

  <h4>1. Clone and install</h4>
<pre><code><span class="code-comment"># Clone the repository</span>
git clone https://github.com/yourusername/creatorkit.git
cd creatorkit

<span class="code-comment"># Install dependencies</span>
npm install

<span class="code-comment"># Install iOS pods</span>
cd ios && pod install && cd ..</code></pre>

  <h4>2. Set up environment variables</h4>
<pre><code><span class="code-comment"># Copy the example env file</span>
cp .env.example .env

<span class="code-comment"># Fill in your keys (see Environment Variables section)</span>
nano .env</code></pre>

  <h4>3. Start the development server</h4>
<pre><code><span class="code-comment"># Start Metro bundler</span>
npm start

<span class="code-comment"># Run on iOS simulator</span>
npm run ios

<span class="code-comment"># Run on Android emulator</span>
npm run android</code></pre>

  <h4>4. Start the backend</h4>
<pre><code>cd backend
npm install
npm run dev
<span class="code-comment"># Backend runs on http://localhost:3001</span></code></pre>

  <div class="callout warn">
    <div class="callout-icon">⚠️</div>
    <div class="callout-body">
      <strong>Important:</strong> Video downloading uses a server-side yt-dlp process. You must have the backend running locally or pointed at a deployed endpoint via <code>BACKEND_URL</code> in your <code>.env</code> file.
    </div>
  </div>
</div>

<div class="divider"><div class="divider-line"></div><div class="divider-mark">// project structure</div><div class="divider-line"></div></div>

<!-- PROJECT STRUCTURE -->
<div class="section" id="structure">
  <div class="section-eyebrow">06 — Project Structure</div>
  <div class="section-title">Codebase layout</div>

<pre><code>creatorkit/
├── <span class="code-key">src/</span>
│   ├── <span class="code-key">screens/</span>
│   │   ├── <span class="code-val">HomeScreen.tsx</span>           <span class="code-comment"># Dashboard with quick actions</span>
│   │   ├── <span class="code-val">DownloadScreen.tsx</span>       <span class="code-comment"># Video downloader main screen</span>
│   │   ├── <span class="code-val">DownloadProgressScreen.tsx</span>
│   │   ├── <span class="code-val">DownloadHistoryScreen.tsx</span>
│   │   ├── <span class="code-val">BioInputScreen.tsx</span>       <span class="code-comment"># Text + image input for bio</span>
│   │   ├── <span class="code-val">BioResultsScreen.tsx</span>     <span class="code-comment"># All platform bios grid</span>
│   │   ├── <span class="code-val">BioDetailScreen.tsx</span>      <span class="code-comment"># Single platform bio + edit</span>
│   │   ├── <span class="code-val">SettingsScreen.tsx</span>
│   │   └── <span class="code-val">ProUpgradeScreen.tsx</span>
│   ├── <span class="code-key">components/</span>
│   │   ├── <span class="code-val">PasteInput.tsx</span>           <span class="code-comment"># Smart clipboard paste box</span>
│   │   ├── <span class="code-val">QualitySelector.tsx</span>
│   │   ├── <span class="code-val">ToneSelector.tsx</span>
│   │   ├── <span class="code-val">PlatformBioCard.tsx</span>
│   │   ├── <span class="code-val">ProgressBar.tsx</span>
│   │   └── <span class="code-val">ProBanner.tsx</span>
│   ├── <span class="code-key">services/</span>
│   │   ├── <span class="code-val">downloadService.ts</span>       <span class="code-comment"># API calls to backend yt-dlp</span>
│   │   ├── <span class="code-val">bioService.ts</span>            <span class="code-comment"># Claude API calls for bio gen</span>
│   │   └── <span class="code-val">storageService.ts</span>        <span class="code-comment"># Local file save logic</span>
│   ├── <span class="code-key">store/</span>
│   │   ├── <span class="code-val">downloadStore.ts</span>         <span class="code-comment"># Zustand — download state</span>
│   │   └── <span class="code-val">bioStore.ts</span>              <span class="code-comment"># Zustand — bio gen state</span>
│   ├── <span class="code-key">navigation/</span>
│   │   └── <span class="code-val">RootNavigator.tsx</span>
│   └── <span class="code-key">utils/</span>
│       ├── <span class="code-val">platformDetect.ts</span>        <span class="code-comment"># Detect IG / YT / FB from URL</span>
│       └── <span class="code-val">charLimits.ts</span>           <span class="code-comment"># Platform bio character limits</span>
├── <span class="code-key">backend/</span>
│   ├── <span class="code-val">server.js</span>                    <span class="code-comment"># Express API entry point</span>
│   ├── <span class="code-key">routes/</span>
│   │   ├── <span class="code-val">download.js</span>              <span class="code-comment"># POST /api/download</span>
│   │   └── <span class="code-val">bio.js</span>                   <span class="code-comment"># POST /api/bio (proxy to Claude)</span>
│   └── <span class="code-key">lib/</span>
│       └── <span class="code-val">ytdlp.js</span>                 <span class="code-comment"># yt-dlp shell wrapper</span>
├── <span class="code-val">.env.example</span>
├── <span class="code-val">app.json</span>
└── <span class="code-val">package.json</span></code></pre>
</div>

<div class="divider"><div class="divider-line"></div><div class="divider-mark">// api integrations</div><div class="divider-line"></div></div>

<!-- API INTEGRATIONS -->
<div class="section" id="api">
  <div class="section-eyebrow">07 — API Integrations</div>
  <div class="section-title">How the AI bio works</div>

  <p>Each bio is generated using the Anthropic Claude API with a carefully crafted system prompt per platform. The prompt encodes tone guidelines, character limits, emoji conventions, and audience expectations for each channel.</p>

<pre><code><span class="code-comment">// bioService.ts — simplified example</span>
<span class="code-fn">const</span> <span class="code-val">generateBios</span> = async (input: BioInput) => {
  const platforms = [<span class="code-str">'linkedin'</span>, <span class="code-str">'instagram'</span>, <span class="code-str">'tiktok'</span>, <span class="code-str">'twitter'</span>];

  const responses = await Promise.all(
    platforms.map(platform =>
      fetch(<span class="code-str">'https://api.anthropic.com/v1/messages'</span>, {
        method: <span class="code-str">'POST'</span>,
        headers: { <span class="code-str">'Content-Type'</span>: <span class="code-str">'application/json'</span> },
        body: JSON.stringify({
          model: <span class="code-str">'claude-sonnet-4-20250514'</span>,
          max_tokens: 500,
          system: PLATFORM_PROMPTS[platform](input.tone),
          messages: [{ role: <span class="code-str">'user'</span>, content: input.text }]
        })
      })
    )
  );

  return responses; <span class="code-comment">// one bio object per platform</span>
};</code></pre>

  <h3>Video download flow</h3>
  <p>Video downloading is fully server-side. The mobile app sends the URL to your backend, which runs <code>yt-dlp</code> to extract the direct video stream URL, then streams the file back to the device. This avoids any native binary dependencies in the app itself.</p>

<pre><code><span class="code-comment">// Backend: routes/download.js</span>
app.post(<span class="code-str">'/api/download'</span>, async (req, res) => {
  const { url, quality } = req.body;

  <span class="code-comment">// 1. Validate platform (IG / YT / FB only)</span>
  const platform = detectPlatform(url);
  if (!platform) return res.status(400).json({ error: <span class="code-str">'Unsupported platform'</span> });

  <span class="code-comment">// 2. Run yt-dlp to get the direct stream URL</span>
  const streamUrl = await ytdlp.getStreamUrl(url, quality);

  <span class="code-comment">// 3. Pipe the stream back to the client</span>
  res.json({ streamUrl, filename: ytdlp.getFilename(url) });
});</code></pre>
</div>

<div class="divider"><div class="divider-line"></div><div class="divider-mark">// platforms</div><div class="divider-line"></div></div>

<!-- SUPPORTED PLATFORMS -->
<div class="section" id="platforms">
  <div class="section-eyebrow">08 — Supported Platforms</div>
  <div class="section-title">Video sources + bio outputs</div>

  <h4>Video download sources</h4>
  <div class="table-wrap">
    <table>
      <thead><tr><th>Platform</th><th>Supported content types</th><th>Max quality</th></tr></thead>
      <tbody>
        <tr><td>Instagram</td><td>Reels, Posts, Stories (public only)</td><td>1080p</td></tr>
        <tr><td>YouTube</td><td>Standard videos, Shorts, unlisted</td><td>1080p</td></tr>
        <tr><td>Facebook</td><td>Public videos, Watch content</td><td>720p</td></tr>
      </tbody>
    </table>
  </div>

  <h4>Bio generation outputs</h4>
  <div class="platform-grid">
    <div class="platform-card"><div class="plat-name">LinkedIn</div><div class="plat-limit">2,600 char max</div></div>
    <div class="platform-card"><div class="plat-name">Instagram</div><div class="plat-limit">150 char max</div></div>
    <div class="platform-card"><div class="plat-name">TikTok</div><div class="plat-limit">80 char max</div></div>
    <div class="platform-card"><div class="plat-name">Twitter / X</div><div class="plat-limit">160 char max</div></div>
    <div class="platform-card"><div class="plat-name">YouTube</div><div class="plat-limit">1,000 char max</div></div>
    <div class="platform-card"><div class="plat-name">Facebook</div><div class="plat-limit">255 char max</div></div>
  </div>
</div>

<div class="divider"><div class="divider-line"></div><div class="divider-mark">// user flows</div><div class="divider-line"></div></div>

<!-- USER FLOWS -->
<div class="section" id="user-flows">
  <div class="section-eyebrow">09 — User Flows</div>
  <div class="section-title">From tap to done</div>

  <h4>Video download flow</h4>
  <div class="flow">
    <div class="flow-step"><div class="flow-bubble">1</div><div class="flow-label">Open app</div></div>
    <div class="flow-arrow">›</div>
    <div class="flow-step"><div class="flow-bubble">2</div><div class="flow-label">Paste link</div></div>
    <div class="flow-arrow">›</div>
    <div class="flow-step"><div class="flow-bubble">3</div><div class="flow-label">Pick quality</div></div>
    <div class="flow-arrow">›</div>
    <div class="flow-step"><div class="flow-bubble">4</div><div class="flow-label">Download</div></div>
    <div class="flow-arrow">›</div>
    <div class="flow-step"><div class="flow-bubble">5</div><div class="flow-label">Saved to gallery</div></div>
  </div>

  <h4>AI bio generation flow</h4>
  <div class="flow">
    <div class="flow-step"><div class="flow-bubble">1</div><div class="flow-label">Bio tab</div></div>
    <div class="flow-arrow">›</div>
    <div class="flow-step"><div class="flow-bubble">2</div><div class="flow-label">Text or image</div></div>
    <div class="flow-arrow">›</div>
    <div class="flow-step"><div class="flow-bubble">3</div><div class="flow-label">Set tone</div></div>
    <div class="flow-arrow">›</div>
    <div class="flow-step"><div class="flow-bubble">4</div><div class="flow-label">Generate</div></div>
    <div class="flow-arrow">›</div>
    <div class="flow-step"><div class="flow-bubble">5</div><div class="flow-label">Copy bio</div></div>
  </div>

  <div class="callout tip">
    <div class="callout-icon">✅</div>
    <div class="callout-body">
      Both flows are designed to be completable in under 30 seconds. No account is required to use either feature in the free tier.
    </div>
  </div>
</div>

<div class="divider"><div class="divider-line"></div><div class="divider-mark">// architecture</div><div class="divider-line"></div></div>

<!-- ARCHITECTURE -->
<div class="section" id="architecture">
  <div class="section-eyebrow">10 — Architecture</div>
  <div class="section-title">System design</div>

  <div class="arch-layer">
    <span class="arch-label" style="background:#4B5BFF;">Mobile</span>
    <div class="arch-items">
      <span class="arch-item">React Native</span>
      <span class="arch-item">Zustand store</span>
      <span class="arch-item">React Navigation</span>
      <span class="arch-item">React Native FS</span>
    </div>
  </div>
  <div style="text-align:center;color:var(--ink3);font-size:18px;margin:4px 0;">↕</div>
  <div class="arch-layer">
    <span class="arch-label" style="background:#8B5CF6;">API</span>
    <div class="arch-items">
      <span class="arch-item">Node.js + Express</span>
      <span class="arch-item">AWS Lambda</span>
      <span class="arch-item">REST endpoints</span>
    </div>
  </div>
  <div style="text-align:center;color:var(--ink3);font-size:18px;margin:4px 0;">↕</div>
  <div class="arch-layer">
    <span class="arch-label" style="background:#0EA87A;">Services</span>
    <div class="arch-items">
      <span class="arch-item">Anthropic Claude API</span>
      <span class="arch-item">yt-dlp process</span>
      <span class="arch-item">RevenueCat</span>
      <span class="arch-item">PostHog analytics</span>
    </div>
  </div>

  <div class="callout info" style="margin-top:20px;">
    <div class="callout-icon">🔒</div>
    <div class="callout-body">
      <strong>Privacy by design:</strong> Videos are saved directly to the user's device and never uploaded to cloud storage.
      Bio generation sends only your text/image to the Anthropic API — no data is retained on our backend.
    </div>
  </div>
</div>

<div class="divider"><div class="divider-line"></div><div class="divider-mark">// environment</div><div class="divider-line"></div></div>

<!-- ENV VARS -->
<div class="section" id="env">
  <div class="section-eyebrow">11 — Environment Variables</div>
  <div class="section-title">Config reference</div>

  <p>Copy <code>.env.example</code> to <code>.env</code> and fill in your values. Never commit your <code>.env</code> file.</p>

  <div class="env-row">
    <span class="env-key">ANTHROPIC_API_KEY</span>
    <span class="env-req req">required</span>
    <span class="env-desc">Your Anthropic API key for Claude bio generation</span>
  </div>
  <div class="env-row">
    <span class="env-key">BACKEND_URL</span>
    <span class="env-req req">required</span>
    <span class="env-desc">Base URL for your Express backend (e.g. https://api.yourapp.com)</span>
  </div>
  <div class="env-row">
    <span class="env-key">REVENUECAT_API_KEY_IOS</span>
    <span class="env-req opt">optional</span>
    <span class="env-desc">RevenueCat public SDK key for iOS in-app purchases</span>
  </div>
  <div class="env-row">
    <span class="env-key">REVENUECAT_API_KEY_ANDROID</span>
    <span class="env-req opt">optional</span>
    <span class="env-desc">RevenueCat public SDK key for Android in-app purchases</span>
  </div>
  <div class="env-row">
    <span class="env-key">POSTHOG_API_KEY</span>
    <span class="env-req opt">optional</span>
    <span class="env-desc">PostHog project API key for analytics events</span>
  </div>
  <div class="env-row">
    <span class="env-key">GOOGLE_CLIENT_ID</span>
    <span class="env-req opt">optional</span>
    <span class="env-desc">Google OAuth client ID for Google Sign-In (Pro feature sync)</span>
  </div>
</div>

<div class="divider"><div class="divider-line"></div><div class="divider-mark">// metrics</div><div class="divider-line"></div></div>

<!-- SUCCESS METRICS -->
<div class="section" id="metrics">
  <div class="section-eyebrow">12 — Success Metrics</div>
  <div class="section-title">How we measure success</div>

  <div class="table-wrap">
    <table>
      <thead><tr><th>Metric</th><th>Target</th><th>Tracking method</th></tr></thead>
      <tbody>
        <tr><td>Downloads completed / session</td><td>2+</td><td>PostHog event: download_complete</td></tr>
        <tr><td>Bio generation completion rate</td><td>80%+</td><td>PostHog funnel: bio_start → bio_copy</td></tr>
        <tr><td>Copy action rate on generated bios</td><td>60%+</td><td>PostHog event: bio_copied</td></tr>
        <tr><td>App Store rating</td><td>4.5+</td><td>App Store Connect / Play Console</td></tr>
        <tr><td>Day-7 retention</td><td>40%</td><td>PostHog cohort retention</td></tr>
        <tr><td>Pro upgrade conversion</td><td>8% of MAU</td><td>RevenueCat dashboard</td></tr>
        <tr><td>Monthly Active Users (month 6)</td><td>50,000</td><td>PostHog MAU report</td></tr>
      </tbody>
    </table>
  </div>
</div>

<div class="divider"><div class="divider-line"></div><div class="divider-mark">// roadmap</div><div class="divider-line"></div></div>

<!-- ROADMAP -->
<div class="section" id="roadmap">
  <div class="section-eyebrow">13 — Roadmap</div>
  <div class="section-title">MVP timeline (8 weeks)</div>

  <div class="timeline">
    <div class="tl-item">
      <div class="tl-dot" style="background:#4B5BFF;">W1</div>
      <div class="tl-content">
        <div class="tl-week">Week 1–2</div>
        <div class="tl-title">Backend & API setup</div>
        <div class="tl-desc">Express server, yt-dlp integration, Claude API connection, basic authentication layer, AWS Lambda deployment.</div>
      </div>
    </div>
    <div class="tl-item">
      <div class="tl-dot" style="background:#8B5CF6;">W3</div>
      <div class="tl-content">
        <div class="tl-week">Week 3–4</div>
        <div class="tl-title">Core screens built</div>
        <div class="tl-desc">All React Native screens scaffolded. Download flow fully functional end-to-end. Bottom navigation complete.</div>
      </div>
    </div>
    <div class="tl-item">
      <div class="tl-dot" style="background:#0EA87A;">W5</div>
      <div class="tl-content">
        <div class="tl-week">Week 5–6</div>
        <div class="tl-title">Bio generator complete</div>
        <div class="tl-desc">Text input, image upload, tone selector, all 6 platform outputs, copy functionality, and regenerate per platform.</div>
      </div>
    </div>
    <div class="tl-item">
      <div class="tl-dot" style="background:#E8A838;">W7</div>
      <div class="tl-content">
        <div class="tl-week">Week 7</div>
        <div class="tl-title">QA & edge cases</div>
        <div class="tl-desc">Private video errors, unsupported URLs, API rate limits, daily limit gates, accessibility review, performance testing.</div>
      </div>
    </div>
    <div class="tl-item">
      <div class="tl-dot" style="background:#E84545;">W8</div>
      <div class="tl-content">
        <div class="tl-week">Week 8</div>
        <div class="tl-title">App Store submission</div>
        <div class="tl-desc">iOS App Store + Google Play Store submission. App Store screenshots, description copy, privacy policy published.</div>
      </div>
    </div>
  </div>

  <h3>Post-launch — V1.1 backlog</h3>
  <ul>
    <li>Batch download queue (Pro) — download up to 5 videos simultaneously</li>
    <li>Download history with search and filter</li>
    <li>Bio templates library — starting templates for 20+ common niches</li>
    <li>Share bio directly to platform (deep link to Instagram, LinkedIn etc.)</li>
    <li>Widget support (iOS home screen widget for quick paste-and-download)</li>
    <li>Pinterest and Threads support for bio generation</li>
  </ul>
</div>

<div class="divider"><div class="divider-line"></div><div class="divider-mark">// monetization</div><div class="divider-line"></div></div>

<!-- MONETIZATION -->
<div class="section" id="monetization">
  <div class="section-eyebrow">14 — Monetization</div>
  <div class="section-title">Simple, fair pricing</div>

  <div class="feature-grid">
    <div class="feature-card" style="border-top: 3px solid var(--ink3);">
      <div class="fc-name" style="font-size:22px;">Free</div>
      <div style="font-family:var(--display);font-size:42px;letter-spacing:0.02em;color:var(--ink);margin-bottom:8px;">$0</div>
      <div class="fc-desc">Forever free. No credit card. No time limit. Full access to core features within daily limits.</div>
      <ul style="font-size:13px;color:var(--ink2);padding-left:16px;">
        <li>5 video downloads per day</li>
        <li>3 bio generations per day</li>
        <li>3 platforms per bio</li>
        <li>No ads ever</li>
      </ul>
    </div>
    <div class="feature-card blue">
      <div class="fc-name" style="font-size:22px;">Pro</div>
      <div style="font-family:var(--display);font-size:42px;letter-spacing:0.02em;color:var(--accent);margin-bottom:8px;">$4.99<span style="font-size:18px;color:var(--ink2)">/mo</span></div>
      <div class="fc-desc">Or $39.99/year (save 33%). 7-day free trial. Cancel anytime.</div>
      <ul style="font-size:13px;color:var(--ink2);padding-left:16px;">
        <li>Unlimited downloads</li>
        <li>Unlimited bio generations</li>
        <li>All 6 platforms</li>
        <li>Batch queue (5 simultaneous)</li>
        <li>Audio-only MP3 extraction</li>
        <li>Full download history</li>
      </ul>
    </div>
  </div>

  <div class="callout tip">
    <div class="callout-icon">🚫</div>
    <div class="callout-body">
      <strong>No ads, ever.</strong> CreatorKit products are entirely ad-free. We don't sell user data and we don't let advertisers influence the product. Revenue comes only from Pro subscriptions.
    </div>
  </div>
</div>

<div class="divider"><div class="divider-line"></div><div class="divider-mark">// contributing</div><div class="divider-line"></div></div>

<!-- CONTRIBUTING -->
<div class="section" id="contributing">
  <div class="section-eyebrow">15 — Contributing</div>
  <div class="section-title">Join the project</div>

  <p>Contributions are welcome. Please read the guidelines below before opening a PR.</p>

  <h4>Development workflow</h4>
  <ol style="font-size:14px;color:var(--ink2);padding-left:20px;line-height:2;">
    <li>Fork the repository and create a feature branch: <code>git checkout -b feature/your-feature</code></li>
    <li>Make your changes with clear, descriptive commits</li>
    <li>Write or update tests where applicable</li>
    <li>Run the test suite: <code>npm test</code></li>
    <li>Open a pull request against <code>main</code> with a clear description</li>
  </ol>

  <h4>Code style</h4>
  <ul>
    <li>TypeScript strict mode is enforced</li>
    <li>ESLint + Prettier — run <code>npm run lint</code> before committing</li>
    <li>Component names in PascalCase, utilities in camelCase</li>
    <li>All new screens must include a loading state, error state, and empty state</li>
  </ul>

<div class="divider"><div class="divider-line"></div><div class="divider-mark">// license</div><div class="divider-line"></div></div>

<!-- LICENSE -->
<div class="section" id="license">
  <div class="section-eyebrow">16 — License</div>
  <div class="section-title">Open source</div>
  <p>
    CreatorKit is released under the <strong>MIT License</strong>.
    You are free to use, modify, and distribute this software.
    See the <a href="LICENSE">LICENSE</a> file for full terms.
  </p>
  <pre><code>MIT License — Copyright (c) 2025 CreatorKit

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software to use, copy, modify, merge, publish, distribute,
sublicense, and/or sell copies of the Software, subject to the conditions
in the full LICENSE file.</code></pre>
</div>

<!-- FOOTER -->
<div class="footer">
  <div class="footer-brand">CREATOR<span>KIT</span></div>
  <div class="footer-copy">Built with React Native + Claude AI &nbsp;·&nbsp; MIT License &nbsp;·&nbsp; 2025</div>
</div>

</body>
</html>
