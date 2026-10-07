export default `
  :host {
    --ink: #0b2534;
    --teal: #103f42;
    --teal-soft: #dce9e5;
    --rose: #9b514c;
    --blush: #efe1dc;
    --cream: #f7f0eb;
    --paper: #fffaf7;
    --gold: #c9a85b;
    --line: rgba(11, 37, 52, 0.16);
    --shadow: 0 18px 48px rgba(11, 37, 52, 0.09);
    display: block;
    color: var(--ink);
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
  .hero { position: relative; padding: 76px 0 68px; background: radial-gradient(circle at 88% 18%, rgba(201, 168, 91, 0.2), transparent 29%), linear-gradient(140deg, var(--paper), var(--blush)); }
  .hero::after { content: ""; position: absolute; right: 7%; bottom: -54px; width: 170px; height: 170px; border: 1px solid rgba(16, 63, 66, 0.18); border-radius: 50%; }
  .hero-inner { position: relative; z-index: 1; max-width: 980px; }
  .eyebrow { margin: 0 0 18px; color: var(--rose); font-size: 0.76rem; font-weight: 700; letter-spacing: 0.18em; }
  .hero-copy, .section-heading > p:last-child { max-width: 790px; margin-bottom: 0; color: rgba(11, 37, 52, 0.76); font-size: clamp(1.02rem, 1.6vw, 1.22rem); }
  .primary-button, .chart-link, .future-button { display: inline-flex; min-height: 50px; align-items: center; justify-content: center; padding: 13px 22px; border: 0; border-radius: 999px; color: var(--paper); background: var(--teal); font-weight: 700; text-decoration: none; }
  .primary-button { margin-top: 30px; }
  .primary-button:hover, .primary-button:focus-visible, .chart-link:hover, .chart-link:focus-visible { text-decoration: underline; }
  :focus-visible { outline: 3px solid #d2918b; outline-offset: 4px; }

  .section-heading { max-width: 820px; margin-bottom: 34px; }
  .explorer { display: grid; grid-template-columns: minmax(300px, 0.78fr) minmax(0, 1.22fr); gap: 28px; align-items: stretch; }
  .choice-list { display: grid; gap: 10px; }
  .choice-button { width: 100%; padding: 17px 19px; border: 1px solid var(--line); border-radius: 16px; color: var(--ink); background: var(--paper); text-align: left; cursor: pointer; transition: transform 160ms ease, border-color 160ms ease, background 160ms ease; }
  .choice-button:hover { transform: translateY(-2px); border-color: var(--rose); }
  .choice-button[aria-selected="true"] { color: var(--paper); border-color: var(--teal); background: var(--teal); }
  .detail-panel { display: flex; min-height: 100%; flex-direction: column; justify-content: center; padding: clamp(28px, 4vw, 52px); border-radius: 28px; background: var(--blush); box-shadow: var(--shadow); }
  .detail-panel h3 { font-size: clamp(1.9rem, 3vw, 2.9rem); }
  .detail-panel p { max-width: 680px; color: rgba(11, 37, 52, 0.78); }
  .detail-prompt { padding-top: 16px; border-top: 1px solid var(--line); font-weight: 700; }
  .chart-link { align-self: flex-start; margin-top: 8px; }

  .success-section { color: var(--paper); background: var(--teal); }
  .success-section .eyebrow { color: #eebdb8; }
  .success-section .section-heading > p:last-child { color: rgba(255, 250, 247, 0.78); }
  .success-options { display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 24px; }
  .success-button { padding: 11px 18px; border: 1px solid rgba(255, 250, 247, 0.38); border-radius: 999px; color: var(--paper); background: transparent; cursor: pointer; }
  .success-button[aria-selected="true"] { color: var(--teal); background: var(--paper); }
  .success-detail { max-width: 820px; padding: 30px; border: 1px solid rgba(255, 250, 247, 0.2); border-radius: 24px; background: rgba(255, 250, 247, 0.07); }
  .success-detail p { margin-bottom: 0; color: rgba(255, 250, 247, 0.8); font-size: 1.08rem; }

  .money-section { background: var(--paper); }
  .money-layout { display: grid; grid-template-columns: minmax(0, 0.88fr) minmax(340px, 1.12fr); gap: 56px; align-items: start; }
  .money-choices { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
  .money-button { min-height: 100px; padding: 18px; border: 1px solid var(--line); border-radius: 18px; color: var(--ink); background: var(--cream); text-align: left; cursor: pointer; }
  .money-button[aria-selected="true"] { border-color: var(--rose); background: var(--blush); box-shadow: var(--shadow); }
  .money-detail { position: sticky; top: 22px; padding: 34px; border-radius: 28px; background: var(--teal-soft); }
  .money-detail p { margin-bottom: 0; color: rgba(11, 37, 52, 0.76); }
  .disclaimer { margin-top: 18px !important; padding-top: 18px; border-top: 1px solid var(--line); font-size: 0.86rem; }

  .obstacles-section { background: var(--cream); }
  .card-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 15px; }
  .pattern-card, .article-card { padding: 24px; border: 1px solid var(--line); border-radius: 20px; background: var(--paper); }
  .pattern-number { color: var(--rose); font-weight: 700; }
  .pattern-card p, .article-card p { margin-bottom: 0; color: rgba(11, 37, 52, 0.72); }

  .crossroads-section { background: var(--blush); }
  .crossroads-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 15px; }
  .crossroads-card { display: flex; min-height: 190px; flex-direction: column; justify-content: space-between; padding: 24px; border: 1px solid rgba(155, 81, 76, 0.22); border-radius: 22px; color: var(--ink); background: var(--paper); text-decoration: none; transition: transform 160ms ease, box-shadow 160ms ease; }
  .crossroads-card:hover { transform: translateY(-3px); box-shadow: var(--shadow); }
  .crossroads-card p { margin-bottom: 18px; color: rgba(11, 37, 52, 0.72); }
  .crossroads-card span { color: var(--rose); font-weight: 700; }

  .editorial-section { background: var(--paper); }
  .article-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 15px; }
  .article-card { min-height: 180px; }
  .article-card::before { content: "EDITORIAL GUIDE"; display: block; margin-bottom: 16px; color: var(--rose); font-size: 0.7rem; font-weight: 700; letter-spacing: 0.14em; }

  .profile-section { color: var(--paper); background: var(--teal); }
  .profile-panel { display: grid; grid-template-columns: minmax(0, 1.35fr) minmax(260px, 0.65fr); gap: 42px; align-items: center; }
  .profile-section .eyebrow { color: #eebdb8; }
  .profile-panel h2 { color: var(--paper); }
  .profile-panel p { max-width: 740px; color: rgba(255, 250, 247, 0.8); }
  .profile-action { text-align: center; }
  .future-button { color: var(--teal); background: var(--paper); }
  .profile-action p { margin: 14px auto 0; font-size: 0.82rem; }

  @media (max-width: 900px) {
    .explorer, .money-layout, .profile-panel { grid-template-columns: 1fr; }
    .card-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    .crossroads-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    .money-detail { position: static; }
    .profile-action { text-align: left; }
  }

  @media (max-width: 620px) {
    .wrap { width: min(100% - 30px, 1180px); }
    .hero { padding: 58px 0 50px; }
    h1 { font-size: clamp(2.55rem, 13vw, 3.65rem); }
    h2 { font-size: clamp(2rem, 10vw, 2.8rem); }
    .section { padding: 52px 0; }
    .explorer { grid-template-columns: 1fr; }
    .money-choices, .card-grid, .crossroads-grid, .article-grid { grid-template-columns: 1fr; }
    .choice-button, .money-button { min-height: 0; }
    .detail-panel, .money-detail, .success-detail { padding: 25px; border-radius: 22px; }
    .crossroads-card, .article-card { min-height: 0; }
  }
`;
