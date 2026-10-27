export default `
  :host {
    --ink: #203336;
    --teal: #003c42;
    --teal-soft: #e9f0ef;
    --rose: #9c5c66;
    --blush: #f0d7da;
    --cream: #faf7f2;
    --paper: #ffffff;
    --line: rgba(0, 60, 66, 0.18);
    --shadow: 0 18px 48px rgba(0, 60, 66, 0.11);
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
      radial-gradient(circle at 88% 22%, rgba(240, 215, 218, 0.94), transparent 29%),
      linear-gradient(140deg, var(--paper), var(--blush));
  }

  .hero::after {
    content: "";
    position: absolute;
    right: 8%;
    bottom: -58px;
    width: 176px;
    height: 176px;
    border: 1px solid rgba(156, 92, 102, 0.34);
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
    color: rgba(32, 51, 54, 0.8);
    font-size: clamp(1.02rem, 1.6vw, 1.24rem);
  }

  .hero-cta,
  .chart-cta,
  .compatibility-cta {
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
    color: rgba(255, 255, 255, 0.8);
  }

  .section-heading {
    max-width: 830px;
    margin-bottom: 32px;
  }

  .story-explorer {
    display: grid;
    grid-template-columns: minmax(290px, 0.82fr) minmax(0, 1.18fr);
    gap: 28px;
    align-items: stretch;
  }

  .story-choices {
    display: grid;
    gap: 10px;
  }

  .story-choice {
    width: 100%;
    padding: 17px 19px;
    border: 1px solid var(--line);
    border-radius: 16px;
    color: var(--ink);
    background: var(--cream);
    font: inherit;
    line-height: 1.35;
    text-align: left;
    cursor: pointer;
    transition: transform 160ms ease, border-color 160ms ease, background 160ms ease;
  }

  .story-choice:hover {
    border-color: var(--rose);
    transform: translateY(-2px);
  }

  .story-choice[aria-pressed="true"] {
    border-color: var(--teal);
    color: var(--paper);
    background: var(--teal);
  }

  .story-result {
    padding: clamp(28px, 4vw, 48px);
    border-radius: 28px;
    background: var(--blush);
    box-shadow: var(--shadow);
  }

  .story-result:focus {
    outline: none;
  }

  .story-result h3 {
    font-size: clamp(1.9rem, 3vw, 2.85rem);
  }

  .story-result > p:not(.result-label) {
    color: rgba(32, 51, 54, 0.8);
  }

  .result-label {
    margin-bottom: 9px;
    color: var(--rose);
    font-size: 0.74rem;
    font-weight: 700;
    letter-spacing: 0.12em;
  }

  .try-this {
    margin: 24px 0;
    padding-top: 20px;
    border-top: 1px solid var(--line);
  }

  .try-this p:last-child {
    margin-bottom: 0;
    color: rgba(32, 51, 54, 0.8);
    font-weight: 700;
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
  .story-choice:focus-visible,
  .hero-cta:hover,
  .hero-cta:focus-visible,
  .chart-cta:hover,
  .chart-cta:focus-visible {
    text-decoration: underline;
  }

  .story-link:focus-visible,
  .hero-cta:focus-visible,
  .chart-cta:focus-visible,
  .compatibility-cta:focus-visible {
    outline: 3px solid #9c5c66;
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

  .relationship-map {
    position: relative;
    display: grid;
    min-height: 250px;
    margin-bottom: 24px;
    grid-template-columns: 1fr 1.1fr 1fr;
    align-items: center;
  }

  .person-node,
  .connection-core {
    position: relative;
    z-index: 2;
    display: grid;
    width: 92px;
    height: 92px;
    place-items: center;
    border-radius: 50%;
    font-weight: 800;
    text-align: center;
  }

  .person-node {
    border: 1px solid rgba(255, 255, 255, 0.46);
    color: var(--paper);
    background: rgba(255, 255, 255, 0.08);
  }

  .person-a { justify-self: start; }
  .person-b { justify-self: end; }

  .connection-core {
    width: 118px;
    height: 118px;
    justify-self: center;
    color: var(--teal);
    background: var(--blush);
    box-shadow: 0 14px 34px rgba(0, 0, 0, 0.14);
  }

  .connection-core::after,
  .person-node::after {
    content: "";
    position: absolute;
    right: 7px;
    top: 12px;
    width: 10px;
    height: 10px;
    border: 3px solid var(--teal);
    border-radius: 50%;
    background: var(--paper);
  }

  .person-node::after {
    border-color: var(--blush);
    background: var(--teal);
  }

  .living-line {
    position: absolute;
    z-index: 1;
    top: calc(50% - 1px);
    height: 2px;
    background: linear-gradient(90deg, rgba(255,255,255,0.3), var(--blush), rgba(255,255,255,0.3));
  }

  .living-line-one { left: 16%; width: 32%; transform: rotate(9deg); }
  .living-line-two { right: 16%; width: 32%; transform: rotate(-9deg); }

  .map-label {
    position: absolute;
    z-index: 3;
    padding: 6px 10px;
    border: 1px solid rgba(255,255,255,0.24);
    border-radius: 999px;
    color: var(--paper);
    background: rgba(0,60,66,0.82);
    font-size: 0.7rem;
    font-weight: 700;
  }

  .harmony { left: 23%; top: 19%; }
  .tension { right: 23%; top: 24%; }
  .growth { left: calc(50% - 29px); bottom: 8%; }

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

  .compatibility-cta { margin-top: 24px; }

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
    color: rgba(32, 51, 54, 0.76);
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
    .story-explorer {
      grid-template-columns: 1fr;
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

    .story-choice,
    .compatibility-point p {
      font-size: 0.79rem;
      line-height: 1.36;
    }

    .story-result {
      padding: 24px 18px;
      border-radius: 22px;
    }

    .story-link {
      font-size: 0.72rem;
    }

    .compatibility-layout {
      gap: 24px;
    }

    .relationship-map {
      min-height: 210px;
    }

    .person-node {
      width: 70px;
      height: 70px;
      font-size: 0.78rem;
    }

    .connection-core {
      width: 92px;
      height: 92px;
      font-size: 0.78rem;
    }

    .living-line-one { left: 13%; width: 36%; }
    .living-line-two { right: 13%; width: 36%; }
    .harmony { left: 17%; }
    .tension { right: 17%; }

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

  @media (prefers-reduced-motion: reduce) {
    .story-choice {
      transition: none;
    }
  }
`;
