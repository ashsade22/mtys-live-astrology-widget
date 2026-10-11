export default `
  :host {
    --navy: #0b2534;
    --blush: #eebdb8;
    --blush-deep: #d2918b;
    --blush-pale: #efe1dc;
    --cream: #fffaf7;
    --line: rgba(11, 37, 52, 0.16);
    --shadow: 0 18px 48px rgba(11, 37, 52, 0.09);
    display: block;
    color: var(--navy);
    background: var(--cream);
    font-family: Arial, Helvetica, sans-serif;
    line-height: 1.55;
  }

  * { box-sizing: border-box; }
  h1, h2, h3, p { margin-top: 0; }
  h1, h2, h3 { font-family: Georgia, "Times New Roman", serif; font-weight: 400; line-height: 1.08; }
  h1 { max-width: 960px; margin-bottom: 24px; font-size: clamp(3rem, 6vw, 5.1rem); letter-spacing: -0.055em; }
  h2 { margin-bottom: 18px; font-size: clamp(2.15rem, 4vw, 3.85rem); letter-spacing: -0.04em; }
  h3 { margin-bottom: 10px; font-size: 1.34rem; letter-spacing: -0.02em; }
  button, a { font: inherit; }
  .page { overflow: hidden; }
  .wrap { width: min(1180px, calc(100% - 48px)); margin: 0 auto; }
  .section { padding: 68px 0; scroll-margin-top: 18px; }
  .hero { position: relative; padding: 76px 0 68px; background: linear-gradient(140deg, var(--cream), var(--blush-pale)); }
  .hero::after { content: ""; position: absolute; right: 7%; bottom: -54px; width: 170px; height: 170px; border: 1px solid rgba(210, 145, 139, 0.45); border-radius: 50%; }
  .hero-inner { position: relative; z-index: 1; max-width: 980px; }
  .eyebrow, .placement-label { margin: 0 0 18px; color: var(--blush-deep); font-size: 0.76rem; font-weight: 700; letter-spacing: 0.18em; }
  .hero-copy, .section-heading > p:last-child { max-width: 790px; margin-bottom: 0; color: rgba(11, 37, 52, 0.76); font-size: clamp(1.02rem, 1.6vw, 1.22rem); }
  .primary-button, .chart-link { display: inline-flex; min-height: 50px; align-items: center; justify-content: center; padding: 13px 22px; border: 0; border-radius: 999px; color: var(--cream); background: var(--navy); font-weight: 700; text-decoration: none; }
  .primary-button { margin-top: 30px; }
  .primary-button:hover, .primary-button:focus-visible, .chart-link:hover, .chart-link:focus-visible { text-decoration: underline; }
  :focus-visible { outline: 3px solid var(--blush-deep); outline-offset: 4px; }

  .section-heading { max-width: 820px; margin-bottom: 34px; }
  .explorer { display: grid; grid-template-columns: minmax(300px, 0.78fr) minmax(0, 1.22fr); gap: 28px; align-items: stretch; }
  .choice-list { display: grid; gap: 10px; }
  .choice-button { width: 100%; padding: 17px 19px; border: 1px solid var(--line); border-radius: 16px; color: var(--navy); background: var(--cream); text-align: left; cursor: pointer; transition: transform 160ms ease, border-color 160ms ease, background 160ms ease; }
  .choice-button:hover { transform: translateY(-2px); border-color: var(--blush-deep); }
  .choice-button[aria-selected="true"] { color: var(--cream); border-color: var(--navy); background: var(--navy); }
  .detail-panel { display: flex; min-height: 100%; flex-direction: column; justify-content: center; padding: clamp(28px, 4vw, 52px); border: 1px solid rgba(210, 145, 139, 0.3); border-radius: 28px; background: var(--blush-pale); box-shadow: var(--shadow); }
  .detail-panel h3 { font-size: clamp(1.9rem, 3vw, 2.9rem); }
  .detail-panel > p:not(.placement-label) { max-width: 680px; color: rgba(11, 37, 52, 0.78); }
  .detail-prompt { padding-top: 16px; border-top: 1px solid var(--line); font-weight: 700; }
  .chart-link { align-self: flex-start; margin-top: 8px; }

  .map-section { color: var(--cream); background: var(--navy); }
  .map-section .eyebrow { color: var(--blush); }
  .map-section .section-heading > p:last-child { color: rgba(255, 250, 247, 0.8); }
  .placement-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 14px; }
  .placement-card { padding: 24px; border: 1px solid rgba(238, 189, 184, 0.38); border-radius: 20px; background: rgba(255, 250, 247, 0.06); }
  .placement-card h3 { color: var(--blush); }
  .placement-card p { margin-bottom: 0; color: rgba(255, 250, 247, 0.82); }

  .money-section { background: var(--cream); }
  .money-section .detail-panel { background: var(--blush); }
  .money-section .placement-label { color: var(--navy); }
  .disclaimer { margin: 18px 0 0; color: rgba(11, 37, 52, 0.62); font-size: 0.86rem; }

  .crossroads-section { background: var(--blush-pale); }
  .crossroads-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 15px; }
  .crossroads-card { display: flex; min-height: 215px; flex-direction: column; justify-content: space-between; padding: 24px; border: 1px solid rgba(210, 145, 139, 0.35); border-radius: 22px; color: var(--navy); background: var(--cream); text-decoration: none; transition: transform 160ms ease, box-shadow 160ms ease; }
  .crossroads-card:hover { transform: translateY(-3px); box-shadow: var(--shadow); }
  .crossroads-card p { margin-bottom: 18px; color: rgba(11, 37, 52, 0.72); }
  .crossroads-card span { color: var(--blush-deep); font-weight: 700; }

  .next-section { color: var(--cream); background: var(--navy); }
  .next-panel { max-width: 900px; }
  .next-section .eyebrow { color: var(--blush); }
  .next-section p:last-child { max-width: 740px; margin-bottom: 0; color: rgba(255, 250, 247, 0.8); }

  @media (max-width: 900px) {
    .explorer { grid-template-columns: 1fr; }
    .placement-grid, .crossroads-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  }

  @media (max-width: 620px) {
    .wrap { width: min(100% - 30px, 1180px); }
    .hero { padding: 58px 0 50px; }
    h1 { font-size: clamp(2.55rem, 13vw, 3.65rem); }
    h2 { font-size: clamp(2rem, 10vw, 2.8rem); }
    .section { padding: 52px 0; }
    .placement-grid, .crossroads-grid { grid-template-columns: 1fr; }
    .choice-button { min-height: 0; }
    .detail-panel { padding: 25px; border-radius: 22px; }
    .crossroads-card { min-height: 0; }
  }
`;
