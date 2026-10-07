(function () {
  const scriptUrl = document.currentScript && document.currentScript.src
    ? document.currentScript.src
    : window.location.href;

  if (customElements.get("mtys-know-your-chart")) {
    return;
  }

  const escapeHtml = (value) => String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

  class MtysKnowYourChart extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      this.content = null;
      this.styles = "";
      this.handleClick = this.handleClick.bind(this);
      this.handlePopState = this.handlePopState.bind(this);
    }

    connectedCallback() {
      this.shadowRoot.innerHTML = `
        <style>
          :host { display: block; min-height: 420px; background: #f7f0eb; }
          .loading { display: grid; min-height: 420px; place-items: center; color: #103f42; font: 16px Arial, sans-serif; }
        </style>
        <div class="loading" role="status">Loading your chart guide</div>
      `;
      this.load();
    }

    disconnectedCallback() {
      this.shadowRoot.removeEventListener("click", this.handleClick);
      window.removeEventListener("popstate", this.handlePopState);
    }

    async load() {
      try {
        const contentUrl = new URL("know-your-chart-content.js?v=20261007", scriptUrl).href;
        const stylesUrl = new URL("know-your-chart-styles.js?v=20261007b", scriptUrl).href;
        const [contentModule, stylesModule] = await Promise.all([
          import(contentUrl),
          import(stylesUrl)
        ]);

        this.content = contentModule;
        this.styles = stylesModule.default;
        this.shadowRoot.addEventListener("click", this.handleClick);
        window.addEventListener("popstate", this.handlePopState);
        this.render();
      } catch (error) {
        console.error("Know Your Chart failed to load", error);
        this.shadowRoot.innerHTML = `
          <style>:host{display:block;padding:32px;color:#0b2534;background:#f7f0eb;font:16px Arial,sans-serif}</style>
          <p>We could not load this chart guide. Please refresh the page and try again.</p>
        `;
      }
    }

    getState() {
      const params = new URLSearchParams(window.location.search);
      const placement = params.get("placement");
      const sign = params.get("sign");
      const validPlacement = placement && this.content.placements[placement] ? placement : null;
      const validSign = sign && this.content.signs.some((item) => item.toLowerCase() === sign.toLowerCase())
        ? this.content.signs.find((item) => item.toLowerCase() === sign.toLowerCase())
        : null;

      return { placement: validPlacement, sign: validSign };
    }

    updateUrl(placement, sign) {
      const url = new URL(window.location.href);
      if (placement) {
        url.searchParams.set("placement", placement);
      } else {
        url.searchParams.delete("placement");
      }

      if (sign) {
        url.searchParams.set("sign", sign.toLowerCase());
      } else {
        url.searchParams.delete("sign");
      }

      window.history.pushState({}, "", url);
      this.render();
      this.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    handlePopState() {
      this.render();
    }

    handleClick(event) {
      const action = event.target.closest("[data-action]");
      if (!action) {
        return;
      }

      const actionName = action.dataset.action;
      if (actionName === "open-placement") {
        event.preventDefault();
        this.updateUrl(action.dataset.placement, null);
      }

      if (actionName === "choose-sign") {
        this.updateUrl(action.dataset.placement, action.dataset.sign);
      }

      if (actionName === "back-home") {
        this.updateUrl(null, null);
      }

      if (actionName === "show-product-note") {
        const note = this.shadowRoot.querySelector(".product-note");
        note.classList.add("is-open");
        note.querySelector(".close-note").focus();
      }

      if (actionName === "close-product-note") {
        const note = this.shadowRoot.querySelector(".product-note");
        note.classList.remove("is-open");
        this.shadowRoot.querySelector(".product-button").focus();
      }
    }

    render() {
      if (!this.content) {
        return;
      }

      const state = this.getState();
      this.updateDocumentMetadata(state);
      this.shadowRoot.innerHTML = `
        <style>${this.styles}</style>
        <main class="page">
          ${state.placement ? this.renderPlacement(state.placement, state.sign) : this.renderHome()}
        </main>
      `;
    }

    updateDocumentMetadata(state) {
      const brand = "More Than Your Sun Astrology";
      let title = `Know Your Chart | ${brand}`;
      let description = this.content.siteCopy.hero.body;

      if (state.placement) {
        const placement = this.content.placements[state.placement];
        title = state.sign
          ? `${placement.name} in ${state.sign} | ${brand}`
          : `${placement.name} Signs | ${brand}`;
        description = state.sign
          ? placement.signs[state.sign].join(" ")
          : placement.intro;
      }

      document.title = title;
      let descriptionTag = document.querySelector('meta[name="description"]');
      if (!descriptionTag) {
        descriptionTag = document.createElement("meta");
        descriptionTag.name = "description";
        document.head.appendChild(descriptionTag);
      }
      descriptionTag.content = description.slice(0, 300);
    }

    renderHome() {
      const { siteCopy, placements } = this.content;
      const placementCards = Object.entries(placements).map(([key, placement]) => `
        <a class="placement-card" href="?placement=${escapeHtml(key)}" data-action="open-placement" data-placement="${escapeHtml(key)}">
          <span class="card-inner">
            <span class="symbol" aria-hidden="true">${escapeHtml(placement.symbol)}</span>
            <h3>${escapeHtml(placement.name)}</h3>
            <p>${escapeHtml(placement.card)}</p>
            <span class="card-cta">${escapeHtml(placement.cta)}</span>
          </span>
        </a>
      `).join("");

      const deeperCards = siteCopy.deeper.items.map((item) => `
        <article class="deeper-card">
          <h3>${escapeHtml(item.title)}</h3>
          <p class="deeper-kicker">${escapeHtml(item.kicker)}</p>
          <p>${escapeHtml(item.body)}</p>
        </article>
      `).join("");

      return `
        <section class="hero">
          <div class="wrap hero-inner">
            <p class="eyebrow">${escapeHtml(siteCopy.hero.eyebrow)}</p>
            <h1>${escapeHtml(siteCopy.hero.title)}</h1>
            <p class="hero-copy">${escapeHtml(siteCopy.hero.body)}</p>
          </div>
        </section>

        <section class="section section-paper" aria-labelledby="placements-heading">
          <div class="wrap">
            <div class="section-heading">
              <p class="eyebrow">START WHERE YOU ARE CURIOUS</p>
              <h2 id="placements-heading">Six ways your chart shows up in everyday life.</h2>
              <p class="section-copy">${escapeHtml(siteCopy.placementIntro)}</p>
            </div>
            <div class="placement-grid">${placementCards}</div>
          </div>
        </section>

        <section class="section section-dark" aria-labelledby="deeper-heading">
          <div class="wrap">
            <div class="section-heading">
              <p class="eyebrow">${escapeHtml(siteCopy.deeper.eyebrow)}</p>
              <h2 id="deeper-heading">${escapeHtml(siteCopy.deeper.title)}</h2>
              <p class="section-copy">${escapeHtml(siteCopy.deeper.body)}</p>
            </div>
            <div class="deeper-grid">${deeperCards}</div>
          </div>
        </section>

        <section class="section section-paper" aria-labelledby="together-heading">
          <div class="wrap together-grid">
            <div>
              <p class="eyebrow">${escapeHtml(siteCopy.together.eyebrow)}</p>
              <h2 id="together-heading">${escapeHtml(siteCopy.together.title)}</h2>
            </div>
            <div class="together-callout">
              <p>${escapeHtml(siteCopy.together.body)}</p>
            </div>
          </div>
        </section>

        <section class="section" aria-labelledby="product-heading">
          <div class="wrap">
            <div class="product-panel">
              <div>
                <p class="eyebrow">${escapeHtml(siteCopy.product.eyebrow)}</p>
                <h2 id="product-heading">${escapeHtml(siteCopy.product.title)}</h2>
                <p>${escapeHtml(siteCopy.product.body)}</p>
              </div>
              <button class="product-button" type="button" data-action="show-product-note">${escapeHtml(siteCopy.product.cta)}</button>
              <div class="product-note" role="status" aria-live="polite">
                <p>${escapeHtml(siteCopy.product.note)}</p>
                <button class="close-note" type="button" data-action="close-product-note">Close</button>
              </div>
            </div>
          </div>
        </section>
      `;
    }

    renderPlacement(key, selectedSign) {
      const placement = this.content.placements[key];
      const signButtons = this.content.signs.map((sign) => {
        const active = selectedSign === sign;
        return `
          <button
            class="sign-link${active ? " is-active" : ""}"
            type="button"
            data-action="choose-sign"
            data-placement="${escapeHtml(key)}"
            data-sign="${escapeHtml(sign)}"
            aria-pressed="${active ? "true" : "false"}"
          >${escapeHtml(sign)}</button>
        `;
      }).join("");

      const reading = selectedSign
        ? this.renderReading(placement, selectedSign)
        : `
          <div class="reading-empty">
            <p>Choose your ${escapeHtml(placement.name)} sign to see how this part of your chart may show up in everyday life.</p>
          </div>
        `;

      return `
        <section class="placement-view">
          <div class="wrap">
            <button class="back-link" type="button" data-action="back-home">Back to Know Your Chart</button>
            <div class="placement-heading">
              <span class="symbol" aria-hidden="true">${escapeHtml(placement.symbol)}</span>
              <div>
                <p class="eyebrow">${escapeHtml(placement.name.toUpperCase())}</p>
                <h1>${escapeHtml(placement.title)}</h1>
                <p class="placement-intro">${escapeHtml(placement.intro)}</p>
              </div>
            </div>
            <p class="sign-prompt">Choose a sign</p>
            <div class="sign-grid" aria-label="${escapeHtml(placement.name)} signs">${signButtons}</div>
            ${reading}
          </div>
        </section>
      `;
    }

    renderReading(placement, sign) {
      const answers = placement.signs[sign];
      const answerCards = placement.labels.map((label, index) => `
        <article class="answer">
          <p class="answer-label">${escapeHtml(label)}</p>
          <p>${escapeHtml(answers[index])}</p>
        </article>
      `).join("");

      return `
        <article class="reading" aria-labelledby="reading-title">
          <div class="reading-title">
            <p class="eyebrow">YOUR PLACEMENT</p>
            <h2 id="reading-title">${escapeHtml(placement.name)} in ${escapeHtml(sign)}</h2>
          </div>
          <div class="answer-grid">${answerCards}</div>
        </article>
      `;
    }
  }

  customElements.define("mtys-know-your-chart", MtysKnowYourChart);
})();
