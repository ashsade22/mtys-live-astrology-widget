export default `
  :host {
    --ink: #0b2534;
    --teal: #103f42;
    --teal-soft: #dce9e5;
    --rose: #9b514c;
    --blush: #efe1dc;
    --cream: #f7f0eb;
    --paper: #fffaf7;
    --line: rgba(11, 37, 52, 0.16);
    --shadow: 0 18px 48px rgba(11, 37, 52, 0.09);
    display: block;
    color: var(--ink);
    background: var(--cream);
    font-family: Arial, Helvetica, sans-serif;
    line-height: 1.55;
  }

  * {
    box-sizing: border-box;
  }

  a {
    color: inherit;
  }

  h1,
  h2,
  h3,
  p {
    margin-top: 0;
  }

  h1,
  h2,
  h3 {
    font-family: Georgia, "Times New Roman", serif;
    font-weight: 400;
    line-height: 1.08;
  }

  h1 {
    max-width: 900px;
    margin-bottom: 24px;
    font-size: clamp(3rem, 6vw, 5.2rem);
    letter-spacing: -0.055em;
  }

  h2 {
    margin-bottom: 18px;
    font-size: clamp(2.2rem, 4vw, 4rem);
    letter-spacing: -0.04em;
  }

  h3 {
    margin-bottom: 12px;
    font-size: 1.65rem;
    letter-spacing: -0.025em;
  }

  .page {
    overflow: hidden;
  }

  .wrap {
    width: min(1180px, calc(100% - 48px));
    margin: 0 auto;
  }

  .hero {
    position: relative;
    padding: 70px 0 56px;
    background:
      radial-gradient(circle at 88% 22%, rgba(155, 81, 76, 0.16), transparent 29%),
      linear-gradient(140deg, var(--paper), var(--blush));
  }

  .hero::after {
    content: "";
    position: absolute;
    right: 8%;
    bottom: -58px;
    width: 176px;
    height: 176px;
    border: 1px solid rgba(16, 63, 66, 0.18);
    border-radius: 50%;
  }

  .hero-inner {
    position: relative;
    z-index: 1;
    max-width: 900px;
  }

  .eyebrow {
    margin: 0 0 18px;
    color: var(--rose);
    font-size: 0.76rem;
    font-weight: 700;
    letter-spacing: 0.18em;
  }

  .hero-copy,
  .section-copy {
    max-width: 760px;
    margin-bottom: 0;
    color: rgba(11, 37, 52, 0.76);
    font-size: clamp(1.02rem, 1.6vw, 1.24rem);
  }

  .hero-cta,
  .chart-cta {
    display: inline-block;
    margin-top: 30px;
    padding: 14px 22px;
    border-radius: 999px;
    color: var(--paper);
    background: var(--teal);
    font-weight: 700;
    text-decoration: none;
  }

  .section {
    padding: 40px 0;
  }

  .section-paper {
    background: var(--paper);
  }

  .section-dark {
    color: var(--paper);
    background: var(--teal);
  }

  .section-dark .eyebrow {
    color: #eebdb8;
  }

  .section-dark .section-copy {
    color: rgba(255, 250, 247, 0.78);
  }

  .section-heading {
    max-width: 830px;
    margin-bottom: 32px;
  }

  .story-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 20px;
  }

  .story-card {
    display: flex;
    min-height: 240px;
    padding: 28px;
    flex-direction: column;
    border: 1px solid var(--line);
    border-radius: 24px;
    background: rgba(255, 250, 247, 0.9);
    box-shadow: 0 10px 34px rgba(11, 37, 52, 0.04);
  }

  .story-card p {
    margin-bottom: 22px;
    color: rgba(11, 37, 52, 0.72);
  }

  .story-link {
    margin-top: auto;
    color: var(--rose);
    font-size: 0.9rem;
    font-weight: 700;
    text-decoration: none;
  }

  .story-link:hover,
  .story-link:focus-visible,
  .hero-cta:hover,
  .hero-cta:focus-visible,
  .chart-cta:hover,
  .chart-cta:focus-visible {
    text-decoration: underline;
  }

  .story-link:focus-visible,
  .hero-cta:focus-visible,
  .chart-cta:focus-visible {
    outline: 3px solid #d2918b;
    outline-offset: 4px;
  }

  .compatibility-layout {
    display: grid;
    grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
    gap: 64px;
    align-items: start;
  }

  .compatibility-points {
    display: grid;
    gap: 14px;
  }

  .compatibility-point {
    padding: 22px 24px;
    border: 1px solid rgba(255, 250, 247, 0.2);
    border-radius: 20px;
    background: rgba(255, 250, 247, 0.06);
  }

  .compatibility-point h3 {
    margin-bottom: 8px;
    color: var(--paper);
    font-size: 1.45rem;
  }

  .compatibility-point p {
    margin-bottom: 0;
    color: rgba(255, 250, 247, 0.74);
  }

  .future-note {
    margin: 20px 0 0;
    color: rgba(255, 250, 247, 0.66);
    font-size: 0.9rem;
  }

  .kind-list {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-top: 34px;
  }

  .kind {
    padding: 13px 18px;
    border: 1px solid var(--line);
    border-radius: 999px;
    background: var(--paper);
    font-weight: 700;
  }

  .chart-panel,
  .product-panel {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    gap: 40px;
    align-items: center;
    padding: 34px;
    border-radius: 28px;
  }

  .chart-panel {
    background: var(--blush);
  }

  .product-panel {
    border: 1px solid var(--line);
    background: var(--paper);
    box-shadow: var(--shadow);
  }

  .chart-panel h2,
  .product-panel h2 {
    margin-bottom: 12px;
    font-size: clamp(2rem, 3.6vw, 3.45rem);
  }

  .chart-panel p:not(.eyebrow),
  .product-panel p:not(.eyebrow) {
    max-width: 730px;
    margin-bottom: 0;
    color: rgba(11, 37, 52, 0.72);
  }

  .product-note {
    max-width: 270px;
    padding: 18px;
    border-radius: 18px;
    color: var(--teal);
    background: var(--teal-soft);
    font-size: 0.9rem;
    font-weight: 700;
  }

  @media (max-width: 900px) {
    .story-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .compatibility-layout,
    .chart-panel,
    .product-panel {
      grid-template-columns: 1fr;
      gap: 28px;
    }

    .product-note {
      max-width: none;
    }
  }

  @media (max-width: 620px) {
    .wrap {
      width: min(100% - 28px, 1180px);
    }

    .hero,
    .section {
      padding-top: 38px;
      padding-bottom: 38px;
    }

    h1 {
      font-size: clamp(2.65rem, 14vw, 4rem);
    }

    h2 {
      font-size: 2rem;
    }

    .section-heading {
      margin-bottom: 26px;
    }

    .story-grid {
      gap: 12px;
    }

    .story-card {
      min-height: 0;
      padding: 16px 12px;
      border-radius: 18px;
    }

    .story-card h3 {
      font-size: 1.26rem;
    }

    .story-card p,
    .compatibility-point p {
      font-size: 0.79rem;
      line-height: 1.36;
    }

    .story-card p {
      margin-bottom: 14px;
    }

    .story-link {
      font-size: 0.72rem;
    }

    .compatibility-layout {
      gap: 24px;
    }

    .compatibility-point {
      padding: 16px;
    }

    .compatibility-point h3 {
      font-size: 1.3rem;
    }

    .kind-list {
      margin-top: 24px;
    }

    .kind {
      padding: 10px 14px;
      font-size: 0.82rem;
    }

    .chart-panel,
    .product-panel {
      padding: 24px 18px;
      border-radius: 22px;
    }

    .hero-cta,
    .chart-cta {
      width: 100%;
      text-align: center;
    }
  }
`;
