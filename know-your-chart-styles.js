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

  a,
  button {
    font: inherit;
  }

  button {
    color: inherit;
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
    padding: 112px 0 96px;
    background:
      radial-gradient(circle at 85% 20%, rgba(155, 81, 76, 0.16), transparent 30%),
      linear-gradient(140deg, var(--paper), var(--blush));
  }

  .hero::after {
    content: "";
    position: absolute;
    right: 7%;
    bottom: -78px;
    width: 210px;
    height: 210px;
    border: 1px solid rgba(16, 63, 66, 0.18);
    border-radius: 50%;
    pointer-events: none;
  }

  .hero-inner {
    position: relative;
    z-index: 1;
    max-width: 780px;
  }

  .eyebrow {
    margin: 0 0 18px;
    color: var(--rose);
    font-size: 0.76rem;
    font-weight: 700;
    letter-spacing: 0.18em;
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
    max-width: 760px;
    margin-bottom: 24px;
    font-size: clamp(3.1rem, 7vw, 6.2rem);
    letter-spacing: -0.055em;
  }

  h2 {
    margin-bottom: 18px;
    font-size: clamp(2.25rem, 4vw, 4.2rem);
    letter-spacing: -0.04em;
  }

  h3 {
    margin-bottom: 12px;
    font-size: 1.75rem;
    letter-spacing: -0.025em;
  }

  .hero-copy,
  .section-copy,
  .placement-intro {
    max-width: 720px;
    margin-bottom: 0;
    color: rgba(11, 37, 52, 0.78);
    font-size: clamp(1.05rem, 1.7vw, 1.28rem);
  }

  .section {
    padding: 96px 0;
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
    color: rgba(255, 250, 247, 0.82);
  }

  .section-heading {
    max-width: 790px;
    margin-bottom: 44px;
  }

  .placement-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 22px;
  }

  .placement-card {
    position: relative;
    display: flex;
    min-height: 340px;
    padding: 30px;
    border: 1px solid var(--line);
    border-radius: 26px;
    color: var(--ink);
    background: rgba(255, 250, 247, 0.86);
    box-shadow: 0 10px 34px rgba(11, 37, 52, 0.04);
    text-decoration: none;
    transition: transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease;
  }

  .placement-card:hover,
  .placement-card:focus-visible {
    border-color: rgba(155, 81, 76, 0.55);
    box-shadow: var(--shadow);
    transform: translateY(-4px);
  }

  .placement-card:focus-visible,
  .sign-link:focus-visible,
  .back-link:focus-visible,
  .product-button:focus-visible,
  .close-note:focus-visible {
    outline: 3px solid #d2918b;
    outline-offset: 4px;
  }

  .card-inner {
    display: flex;
    width: 100%;
    flex-direction: column;
  }

  .symbol {
    display: grid;
    width: 58px;
    height: 58px;
    margin-bottom: 42px;
    place-items: center;
    border-radius: 50%;
    color: var(--paper);
    background: var(--teal);
    font-family: Georgia, "Times New Roman", serif;
    font-size: 1.8rem;
  }

  .placement-card p {
    margin-bottom: 24px;
    color: rgba(11, 37, 52, 0.74);
  }

  .card-cta {
    margin-top: auto;
    color: var(--rose);
    font-size: 0.9rem;
    font-weight: 700;
    letter-spacing: 0.02em;
  }

  .deeper-grid {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 18px;
  }

  .deeper-card {
    padding: 26px;
    border: 1px solid rgba(255, 250, 247, 0.22);
    border-radius: 22px;
    background: rgba(255, 250, 247, 0.06);
  }

  .deeper-card h3 {
    margin-bottom: 10px;
    color: var(--paper);
    font-size: 1.55rem;
  }

  .deeper-kicker {
    margin-bottom: 12px;
    color: #eebdb8;
    font-size: 0.88rem;
    font-weight: 700;
  }

  .deeper-card p:last-child {
    margin-bottom: 0;
    color: rgba(255, 250, 247, 0.76);
  }

  .together-grid {
    display: grid;
    grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.15fr);
    gap: 70px;
    align-items: start;
  }

  .together-callout {
    padding: 36px;
    border-left: 5px solid var(--rose);
    border-radius: 0 24px 24px 0;
    background: var(--blush);
  }

  .together-callout p {
    margin-bottom: 0;
    font-family: Georgia, "Times New Roman", serif;
    font-size: clamp(1.25rem, 2vw, 1.65rem);
    line-height: 1.45;
  }

  .product-panel {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    gap: 40px;
    align-items: center;
    padding: 46px;
    border: 1px solid var(--line);
    border-radius: 30px;
    background: var(--paper);
    box-shadow: var(--shadow);
  }

  .product-panel h2 {
    margin-bottom: 14px;
    font-size: clamp(2rem, 3.7vw, 3.6rem);
  }

  .product-panel p:not(.eyebrow) {
    max-width: 700px;
    margin-bottom: 0;
    color: rgba(11, 37, 52, 0.74);
  }

  .product-button,
  .back-link,
  .close-note {
    border: 0;
    border-radius: 999px;
    cursor: pointer;
    font-weight: 700;
  }

  .product-button {
    min-width: 238px;
    padding: 16px 22px;
    color: var(--paper);
    background: var(--teal);
  }

  .product-note {
    grid-column: 1 / -1;
    display: none;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    padding: 18px 20px;
    border-radius: 16px;
    color: var(--ink);
    background: var(--teal-soft);
  }

  .product-note.is-open {
    display: flex;
  }

  .product-note p {
    margin: 0;
  }

  .close-note {
    padding: 8px 14px;
    color: var(--teal);
    background: var(--paper);
  }

  .placement-view {
    min-height: 900px;
    padding: 70px 0 100px;
    background:
      radial-gradient(circle at 90% 8%, rgba(155, 81, 76, 0.13), transparent 28%),
      var(--cream);
  }

  .back-link {
    margin-bottom: 54px;
    padding: 11px 17px;
    color: var(--teal);
    background: var(--teal-soft);
  }

  .placement-heading {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr);
    gap: 30px;
    align-items: start;
    max-width: 900px;
    margin-bottom: 52px;
  }

  .placement-heading .symbol {
    width: 78px;
    height: 78px;
    margin: 0;
    font-size: 2.25rem;
  }

  .placement-heading h1 {
    margin-bottom: 18px;
    font-size: clamp(2.7rem, 5vw, 5rem);
  }

  .sign-prompt {
    margin: 0 0 22px;
    font-weight: 700;
  }

  .sign-grid {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 12px;
    margin-bottom: 54px;
  }

  .sign-link {
    padding: 14px 16px;
    border: 1px solid var(--line);
    border-radius: 14px;
    color: var(--ink);
    background: var(--paper);
    cursor: pointer;
    text-align: left;
  }

  .sign-link:hover,
  .sign-link.is-active {
    color: var(--paper);
    background: var(--teal);
  }

  .reading {
    padding: 46px;
    border: 1px solid var(--line);
    border-radius: 30px;
    background: var(--paper);
    box-shadow: var(--shadow);
  }

  .reading-title {
    margin-bottom: 30px;
  }

  .reading-title h2 {
    margin-bottom: 0;
  }

  .answer-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 20px;
  }

  .answer {
    padding: 24px;
    border-radius: 20px;
    background: var(--cream);
  }

  .answer-label {
    margin-bottom: 11px;
    color: var(--rose);
    font-size: 0.78rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .answer p:last-child {
    margin-bottom: 0;
  }

  .reading-empty {
    padding: 34px;
    border: 1px solid var(--line);
    border-radius: 22px;
    background: var(--paper);
  }

  .reading-empty p {
    margin-bottom: 0;
  }

  @media (max-width: 900px) {
    .placement-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .deeper-grid,
    .sign-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .together-grid {
      grid-template-columns: 1fr;
      gap: 36px;
    }

    .product-panel {
      grid-template-columns: 1fr;
    }

    .product-button {
      justify-self: start;
    }

    .answer-grid {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 620px) {
    .wrap {
      width: min(100% - 28px, 1180px);
    }

    .hero,
    .section,
    .placement-view {
      padding-top: 52px;
      padding-bottom: 52px;
    }

    h1 {
      font-size: clamp(2.8rem, 15vw, 4.3rem);
    }

    .placement-grid,
    .deeper-grid,
    .sign-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 12px;
    }

    .placement-card {
      min-height: 245px;
    }

    .card-inner,
    .deeper-card {
      padding: 20px 16px;
    }

    .placement-card h3,
    .deeper-card h3 {
      font-size: 1.35rem;
    }

    .placement-card p,
    .deeper-card p {
      font-size: 0.88rem;
      line-height: 1.45;
    }

    .card-cta,
    .deeper-kicker {
      font-size: 0.72rem;
    }

    .product-panel,
    .reading {
      padding: 28px 22px;
      border-radius: 22px;
    }

    .product-button {
      width: 100%;
    }

    .product-note {
      align-items: flex-start;
      flex-direction: column;
    }

    .placement-heading {
      grid-template-columns: 1fr;
      gap: 20px;
    }

    .placement-heading .symbol {
      width: 66px;
      height: 66px;
    }
  }

  @media (max-width: 340px) {
    .placement-grid,
    .deeper-grid {
      grid-template-columns: 1fr;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .placement-card {
      transition: none;
    }
  }
`;
