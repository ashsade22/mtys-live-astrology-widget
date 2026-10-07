(() => {
  const scriptUrl = document.currentScript && document.currentScript.src
    ? document.currentScript.src
    : window.location.href;

  const chartBaseUrl = "https://ashley35031.wixsite.com/more-than-your-sun-4/know-your-chart";

  const escapeHtml = (value) => String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

  class MtysCompatibility extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      this.content = null;
      this.styles = "";
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleClick = this.handleClick.bind(this);
      this.handlePopState = this.handlePopState.bind(this);
    }

    connectedCallback() {
      this.shadowRoot.innerHTML = `
        <style>
          :host { display: block; min-height: 520px; background: #f7f0eb; }
          .loading { display: grid; min-height: 520px; place-items: center; color: #103f42; font: 16px Arial, sans-serif; }
        </style>
        <div class="loading" role="status">Loading Compatibility</div>
      `;
      this.load();
    }

    disconnectedCallback() {
      this.shadowRoot.removeEventListener("submit", this.handleSubmit);
      this.shadowRoot.removeEventListener("click", this.handleClick);
      window.removeEventListener("popstate", this.handlePopState);
    }

    async load() {
      try {
        const contentUrl = new URL("compatibility-content.js?v=20261007d", scriptUrl).href;
        const stylesUrl = new URL("compatibility-styles.js?v=20261007", scriptUrl).href;
        const [contentModule, stylesModule] = await Promise.all([
          import(contentUrl),
          import(stylesUrl)
        ]);

        this.content = contentModule;
        this.styles = stylesModule.default;
        this.shadowRoot.addEventListener("submit", this.handleSubmit);
        this.shadowRoot.addEventListener("click", this.handleClick);
        window.addEventListener("popstate", this.handlePopState);
        this.render();
      } catch (error) {
        console.error("Failed to load Compatibility.", error);
        this.shadowRoot.innerHTML = "<p>Compatibility is temporarily unavailable. Please try again shortly.</p>";
      }
    }

    validSign(key) {
      return this.content.signs.find((sign) => sign.key === key) || null;
    }

    getState() {
      const params = new URLSearchParams(window.location.search);
      return {
        yours: this.validSign(params.get("you")) || this.validSign("aries"),
        theirs: this.validSign(params.get("them")) || this.validSign("taurus")
      };
    }

    handleSubmit(event) {
      if (!event.target.matches(".selector-form")) {
        return;
      }
      event.preventDefault();
      const formData = new FormData(event.target);
      const yours = this.validSign(formData.get("you"));
      const theirs = this.validSign(formData.get("them"));
      if (!yours || !theirs) {
        return;
      }

      const url = new URL(window.location.href);
      url.searchParams.set("you", yours.key);
      url.searchParams.set("them", theirs.key);
      window.history.pushState({}, "", url);
      this.render();
      window.requestAnimationFrame(() => {
        const reading = this.shadowRoot.querySelector("#compatibility-reading");
        reading.scrollIntoView({ behavior: "smooth", block: "start" });
        reading.focus({ preventScroll: true });
      });
    }

    handleClick(event) {
      const exploreButton = event.target.closest("[data-action='explore']");
      if (!exploreButton) {
        return;
      }
      event.preventDefault();
      this.shadowRoot.querySelector("#you-them").scrollIntoView({ behavior: "smooth", block: "start" });
      window.requestAnimationFrame(() => this.shadowRoot.querySelector("#your-sign").focus());
    }

    handlePopState() {
      this.render();
    }

    renderOptions(selectedKey, placeholder) {
      const options = this.content.signs.map((sign) => `
        <option value="${escapeHtml(sign.key)}"${selectedKey === sign.key ? " selected" : ""}>${escapeHtml(sign.name)}</option>
      `).join("");
      return `<option value=""${selectedKey ? "" : " selected"} disabled>${escapeHtml(placeholder)}</option>${options}`;
    }

    renderReading(yours, theirs) {
      if (!yours || !theirs) {
        return "";
      }
      const reading = this.content.buildReading(yours, theirs);
      const sections = [
        ["WHAT COMES NATURALLY", reading.natural],
        ["WHERE YOU CAN MISS EACH OTHER", reading.miss],
        ["WHEN THINGS GET TENSE", reading.tense],
        ["WHAT HELPS", reading.helps]
      ].map(([title, body]) => `
        <section class="reading-section">
          <h3>${escapeHtml(title)}</h3>
          <p>${escapeHtml(body)}</p>
        </section>
      `).join("");

      return `
        <section class="section reading-wrap" id="compatibility-reading" tabindex="-1" aria-labelledby="pair-heading">
          <div class="wrap">
            <article class="reading-card">
              <header class="reading-intro">
                <p class="eyebrow">THE TWO OF YOU</p>
                <h2 id="pair-heading">${escapeHtml(yours.name)} + ${escapeHtml(theirs.name)}</h2>
                <p>${escapeHtml(reading.overview)}</p>
              </header>
              <div class="reading-sections">${sections}</div>
            </article>
          </div>
        </section>
      `;
    }

    updateMetadata(state) {
      const brand = "More Than Your Sun Astrology";
      document.title = state.yours && state.theirs
        ? `${state.yours.name} + ${state.theirs.name} Compatibility | ${brand}`
        : `Compatibility | ${brand}`;
    }

    render() {
      if (!this.content) {
        return;
      }
      const { pageCopy } = this.content;
      const { relationshipTypes } = pageCopy;
      const state = this.getState();
      this.updateMetadata(state);

      const placements = pageCopy.more.placements.map((placement) => {
        const url = `${chartBaseUrl}?placement=${placement.key}`;
        return `
          <li>
            <a href="${escapeHtml(url)}" target="_top">
              <strong>${escapeHtml(placement.name)}</strong>
              <span>${escapeHtml(placement.body)}</span>
            </a>
          </li>
        `;
      }).join("");
      const typeList = relationshipTypes.types.map((type) => `<span>${escapeHtml(type)}</span>`).join("");

      this.shadowRoot.innerHTML = `
        <style>${this.styles}</style>
        <main class="page">
          <section class="hero">
            <div class="wrap hero-inner">
              <p class="eyebrow">${escapeHtml(pageCopy.hero.eyebrow)}</p>
              <h1>${escapeHtml(pageCopy.hero.title)}</h1>
              <p class="hero-copy">${escapeHtml(pageCopy.hero.body)}</p>
              <a class="primary-button" href="#you-them" data-action="explore">${escapeHtml(pageCopy.hero.cta)}</a>
            </div>
          </section>

          <section class="section selector-section" id="you-them" aria-labelledby="selector-heading">
            <div class="wrap selector-layout">
              <div class="section-heading">
                <p class="eyebrow">${escapeHtml(pageCopy.selector.eyebrow)}</p>
                <h2 id="selector-heading">${escapeHtml(pageCopy.selector.title)}</h2>
                <p>${escapeHtml(pageCopy.selector.body)}</p>
              </div>
              <form class="selector-form">
                <label for="your-sign">${escapeHtml(pageCopy.selector.yourLabel)}</label>
                <select id="your-sign" name="you" required>${this.renderOptions(state.yours && state.yours.key, "Choose your sign")}</select>
                <span class="plus" aria-hidden="true">+</span>
                <label for="their-sign">${escapeHtml(pageCopy.selector.theirLabel)}</label>
                <select id="their-sign" name="them" required>${this.renderOptions(state.theirs && state.theirs.key, "Choose their sign")}</select>
                <button type="submit">${escapeHtml(pageCopy.selector.button)}</button>
              </form>
            </div>
          </section>

          ${this.renderReading(state.yours, state.theirs)}

          <section class="section more-section" aria-labelledby="more-heading">
            <div class="wrap more-layout">
              <div class="section-heading">
                <p class="eyebrow">${escapeHtml(pageCopy.more.eyebrow)}</p>
                <h2 id="more-heading">${escapeHtml(pageCopy.more.title)}</h2>
                <p>${escapeHtml(pageCopy.more.body)}</p>
              </div>
              <ul class="placement-links">${placements}</ul>
              <div class="relationship-types" aria-label="Future relationship types">
                <p>${escapeHtml(relationshipTypes.label)}</p>
                <div>${typeList}</div>
              </div>
            </div>
          </section>

          <section class="section product-section" aria-labelledby="product-heading">
            <div class="wrap product-panel">
              <div>
                <p class="eyebrow">${escapeHtml(pageCopy.product.eyebrow)}</p>
                <h2 id="product-heading">${escapeHtml(pageCopy.product.title)}</h2>
                <p>${escapeHtml(pageCopy.product.body)}</p>
              </div>
              <div class="product-action">
                <span class="future-button" aria-disabled="true">${escapeHtml(pageCopy.product.cta)}</span>
                <p>${escapeHtml(pageCopy.product.note)}</p>
              </div>
            </div>
          </section>
        </main>
      `;
    }
  }

  if (!customElements.get("mtys-compatibility")) {
    customElements.define("mtys-compatibility", MtysCompatibility);
  }
})();
