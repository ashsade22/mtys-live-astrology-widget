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
    font-size: 1.4rem;
    letter-spacing: -0.02em;
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
    max-width: 930px;
  }

  .eyebrow {
    margin: 0 0 18px;
    color: var(--rose);
    font-size: 0.76rem;
    font-weight: 700;
    letter-spacing: 0.18em;
  }

  .hero-copy,
  .section-heading p {
    max-width: 780px;
    margin-bottom: 0;
    color: rgba(11, 37, 52, 0.76);
    font-size: clamp(1.02rem, 1.6vw, 1.24rem);
  }

  .primary-button,
  .selector-form button,
  .future-button {
    display: inline-flex;
    min-height: 50px;
    align-items: center;
    justify-content: center;
    padding: 13px 22px;
    border: 0;
    border-radius: 999px;
    color: var(--paper);
    background: var(--teal);
    font: inherit;
    font-weight: 700;
    text-decoration: none;
  }

  .primary-button {
    margin-top: 30px;
  }

  .primary-button:hover,
  .primary-button:focus-visible,
  .selector-form button:hover,
  .selector-form button:focus-visible,
  .placement-links a:hover strong,
  .placement-links a:focus-visible strong {
    text-decoration: underline;
  }

  .primary-button:focus-visible,
  .selector-form button:focus-visible,
  select:focus-visible,
  .placement-links a:focus-visible {
    outline: 3px solid #d2918b;
    outline-offset: 4px;
  }

  .section {
    padding: 44px 0;
  }

  .selector-section,
  .more-section {
    background: var(--paper);
  }

  .selector-layout {
    display: grid;
    grid-template-columns: minmax(0, 0.8fr) minmax(520px, 1.2fr);
    gap: 64px;
    align-items: end;
  }

  .section-heading {
    max-width: 780px;
  }

  .selector-form {
    display: grid;
    grid-template-areas:
      "labelone plus labeltwo button"
      "selectone plus selecttwo button";
    grid-template-columns: minmax(0, 1fr) 28px minmax(0, 1fr) auto;
    gap: 8px 12px;
    align-items: center;
    padding: 28px;
    border: 1px solid var(--line);
    border-radius: 26px;
    background: var(--cream);
    box-shadow: var(--shadow);
  }

  .selector-form label {
    font-size: 0.78rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .selector-form label:first-of-type {
    grid-area: labelone;
  }

  .selector-form label:last-of-type {
    grid-area: labeltwo;
  }

  #your-sign {
    grid-area: selectone;
  }

  #their-sign {
    grid-area: selecttwo;
  }

  .plus {
    grid-area: plus;
    color: var(--rose);
    font: 2rem Georgia, "Times New Roman", serif;
    text-align: center;
  }

  .selector-form button {
    grid-area: button;
    margin-left: 6px;
    cursor: pointer;
  }

  select {
    width: 100%;
    min-height: 52px;
    padding: 0 42px 0 15px;
    border: 1px solid var(--line);
    border-radius: 14px;
    color: var(--ink);
    background: var(--paper);
    font: inherit;
    font-weight: 700;
  }

  .reading-wrap {
    color: var(--paper);
    background: var(--teal);
  }

  .reading-wrap:focus {
    outline: none;
  }

  .reading-card {
    display: grid;
    grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
    gap: 58px;
    align-items: start;
  }

  .reading-intro {
    position: sticky;
    top: 24px;
  }

  .reading-intro .eyebrow {
    color: #eebdb8;
  }

  .reading-intro h2 {
    color: var(--paper);
  }

  .reading-intro p:last-child {
    max-width: 520px;
    margin-bottom: 0;
    color: rgba(255, 250, 247, 0.8);
    font-size: 1.12rem;
  }

  .reading-sections {
    display: grid;
    gap: 14px;
  }

  .reading-section {
    padding: 22px 24px;
    border: 1px solid rgba(255, 250, 247, 0.2);
    border-radius: 20px;
    background: rgba(255, 250, 247, 0.06);
  }

  .reading-section h3 {
    color: #eebdb8;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 0.78rem;
    font-weight: 700;
    letter-spacing: 0.14em;
  }

  .reading-section p {
    margin-bottom: 0;
    color: rgba(255, 250, 247, 0.8);
  }

  .share-row {
    display: flex;
    align-items: center;
    gap: 14px;
    padding-top: 8px;
  }

  .share-button {
    min-height: 46px;
    padding: 12px 18px;
    border: 1px solid rgba(255, 250, 247, 0.42);
    border-radius: 999px;
    color: var(--teal);
    background: var(--paper);
    font: inherit;
    font-weight: 700;
    cursor: pointer;
  }

  .share-button:hover,
  .share-button:focus-visible {
    text-decoration: underline;
  }

  .share-button:focus-visible {
    outline: 3px solid #d2918b;
    outline-offset: 4px;
  }

  .share-status {
    color: rgba(255, 250, 247, 0.78);
    font-size: 0.86rem;
  }

  .more-layout {
    display: grid;
    grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.15fr);
    gap: 56px;
    align-items: start;
  }

  .placement-links {
    display: grid;
    gap: 0;
    margin: 0;
    padding: 0;
    list-style: none;
    border-top: 1px solid var(--line);
  }

  .placement-links li {
    border-bottom: 1px solid var(--line);
  }

  .placement-links a {
    display: grid;
    grid-template-columns: 110px 1fr;
    gap: 18px;
    padding: 18px 4px;
    color: inherit;
    text-decoration: none;
  }

  .placement-links strong {
    color: var(--rose);
  }

  .placement-links span {
    color: rgba(11, 37, 52, 0.72);
  }

  .relationship-types {
    grid-column: 1 / -1;
    display: flex;
    gap: 20px;
    align-items: center;
    justify-content: space-between;
    padding-top: 4px;
  }

  .relationship-types p {
    margin-bottom: 0;
    color: rgba(11, 37, 52, 0.65);
    font-size: 0.9rem;
  }

  .relationship-types div {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }

  .relationship-types span {
    padding: 8px 13px;
    border: 1px solid var(--line);
    border-radius: 999px;
    font-size: 0.82rem;
    font-weight: 700;
  }

  .product-section {
    background: var(--cream);
  }

  .product-panel {
    display: grid;
    grid-template-columns: minmax(0, 1fr) 300px;
    gap: 48px;
    align-items: center;
    padding: 34px;
    border: 1px solid var(--line);
    border-radius: 28px;
    background: var(--paper);
    box-shadow: var(--shadow);
  }

  .product-panel h2 {
    max-width: 760px;
    margin-bottom: 14px;
    font-size: clamp(2rem, 3.6vw, 3.45rem);
  }

  .product-panel p:not(.eyebrow) {
    max-width: 720px;
    margin-bottom: 0;
    color: rgba(11, 37, 52, 0.72);
  }

  .product-action {
    display: grid;
    gap: 14px;
  }

  .future-button {
    opacity: 0.74;
  }

  .product-action p {
    font-size: 0.82rem;
  }

  @media (max-width: 980px) {
    .selector-layout,
    .reading-card,
    .more-layout,
    .product-panel {
      grid-template-columns: 1fr;
      gap: 30px;
    }

    .selector-form {
      grid-template-columns: minmax(0, 1fr) 28px minmax(0, 1fr);
      grid-template-areas:
        "labelone plus labeltwo"
        "selectone plus selecttwo"
        "button button button";
    }

    .selector-form button {
      margin: 10px 0 0;
    }

    .reading-intro {
      position: static;
    }

    .relationship-types {
      grid-column: 1;
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

    .selector-form {
      grid-template-columns: 1fr;
      grid-template-areas:
        "labelone"
        "selectone"
        "plus"
        "labeltwo"
        "selecttwo"
        "button";
      padding: 20px 16px;
      border-radius: 20px;
    }

    .selector-form button,
    .primary-button,
    .future-button {
      width: 100%;
    }

    .plus {
      height: 28px;
      line-height: 28px;
    }

    .reading-section {
      padding: 18px 16px;
    }

    .reading-intro p:last-child,
    .reading-section p {
      font-size: 0.9rem;
    }

    .share-row {
      align-items: flex-start;
      flex-direction: column;
    }

    .placement-links a {
      grid-template-columns: 1fr;
      gap: 4px;
    }

    .relationship-types {
      align-items: flex-start;
      flex-direction: column;
    }

    .product-panel {
      padding: 24px 18px;
      border-radius: 22px;
    }
  }
`;
