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
      this.routeState = {};
      this.removeBridgeListener = null;
      this.savedDiscovery = this.readSavedDiscovery();
    }

    connectedCallback() {
      this.shadowRoot.innerHTML = `
        <style>
          :host { display: block; min-height: 420px; background: #f7f0eb; }
          .loading { display: grid; min-height: 420px; place-items: center; color: #0b2534; font: 16px Arial, sans-serif; }
        </style>
        <div class="loading" role="status">Loading your chart guide</div>
      `;
      this.load();
      if (window.MTYSBridge) {
        this.routeState = window.MTYSBridge.getRouteState();
        this.removeBridgeListener = window.MTYSBridge.on((type, state) => {
          if (type !== "route-state") return;
          this.routeState = state;
          if (this.content) this.render();
        });
      }
    }

    disconnectedCallback() {
      this.shadowRoot.removeEventListener("click", this.handleClick);
      window.removeEventListener("popstate", this.handlePopState);
      if (this.removeBridgeListener) this.removeBridgeListener();
    }

    async load() {
      try {
        const contentUrl = new URL("know-your-chart-content.js?v=20261027-phase2b", scriptUrl).href;
        const stylesUrl = new URL("know-your-chart-styles.js?v=20261027-phase2b", scriptUrl).href;
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

    readSavedDiscovery() {
      try {
        const value = window.localStorage.getItem("mtys_chart_discovery_v1");
        if (!value) return null;
        const parsed = JSON.parse(value);
        if (!parsed || typeof parsed.placement !== "string" || typeof parsed.sign !== "string") return null;
        return parsed;
      } catch (error) {
        return null;
      }
    }

    saveDiscovery(placement, sign) {
      try {
        window.localStorage.setItem("mtys_chart_discovery_v1", JSON.stringify({ placement, sign }));
        this.savedDiscovery = { placement, sign };
        return true;
      } catch (error) {
        return false;
      }
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

      if (window.MTYSBridge?.setRouteState) {
        window.MTYSBridge.setRouteState(Object.fromEntries(url.searchParams));
      } else {
        window.history.pushState({}, "", url);
      }
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

      if (actionName === "save-discovery") {
        const saved = this.saveDiscovery(action.dataset.placement, action.dataset.sign);
        const status = this.shadowRoot.querySelector(".save-status");
        if (status) {
          status.textContent = saved
            ? "Saved on this device. You can return to it from My Chart."
            : "This browser could not save your discovery. Your current result is still available while this page stays open.";
        }
        action.textContent = saved ? "Saved on this device" : "Try saving again";
      }

      if (actionName === "resume-discovery") {
        this.updateUrl(action.dataset.placement, action.dataset.sign);
      }

      if (actionName === "clear-saved") {
        try { window.localStorage.removeItem("mtys_chart_discovery_v1"); } catch (error) {}
        this.savedDiscovery = null;
        this.render();
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

      const saved = this.savedDiscovery && placements[this.savedDiscovery.placement]
        ? this.savedDiscovery
        : null;
      const returnPanel = saved ? `
        <section class="return-panel" aria-labelledby="return-heading">
          <div>
            <p class="eyebrow">RETURN TO MY DISCOVERY</p>
            <h2 id="return-heading">Continue with your ${escapeHtml(saved.sign)} ${escapeHtml(placements[saved.placement].name)}.</h2>
            <p>This selection is stored only in this browser on this device. No account has been created.</p>
          </div>
          <div class="return-actions">
            <button class="product-button" type="button" data-action="resume-discovery" data-placement="${escapeHtml(saved.placement)}" data-sign="${escapeHtml(saved.sign)}">Continue my discovery</button>
            <button class="quiet-button" type="button" data-action="clear-saved">Remove saved selection</button>
          </div>
        </section>
      ` : "";

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
            ${returnPanel}
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
              <div class="connection-map" role="img" aria-label="A connection map linking emotional needs, communication, affection and values, and action and boundaries">
                <span class="connection-line line-one" aria-hidden="true"></span>
                <span class="connection-line line-two" aria-hidden="true"></span>
                <span class="connection-node node-one">Emotional needs</span>
                <span class="connection-node node-two">Communication</span>
                <span class="connection-node node-three">Affection + values</span>
                <span class="connection-node node-four">Action + boundaries</span>
              </div>
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
              <button class="product-button" type="button" data-action="show-product-note">See what is in the guide</button>
              <div class="product-note" role="dialog" aria-modal="false" aria-labelledby="guide-preview-title">
                <div class="guide-preview-copy">
                  <p class="eyebrow">ONE CONNECTED GUIDE</p>
                  <h3 id="guide-preview-title">What Makes You Tick<br><span>Your Personal Pattern Guide</span></h3>
                  <p>Go beyond separate placement descriptions with a guide that connects your emotional needs, communication, affection and action into practical patterns you can recognize in everyday life.</p>
                  <p class="price-line"><strong>$29</strong> one-time purchase. No subscription.</p>\n                  <p class="delivery-line">After you confirm your placements and complete purchase, the guide is assembled automatically. Delivery includes immediate browser access plus an email link to accessible HTML and a downloadable PDF. No individual interpretation by Ashley is required.</p>
                  <div class="guide-columns">
                    <div>
                      <p class="preview-label">INCLUDED</p>
                      <ul>
                        <li>An orientation to the placements you confirm</li>
                        <li>Two integrated pattern lenses</li>
                        <li>Three practical reflection cards</li>
                        <li>A personal pattern map for what to explore next</li>
                      </ul>
                    </div>
                    <div>
                      <p class="preview-label">YOU WILL CONFIRM</p>
                      <p>Sun, Moon, Mercury, Venus and Mars. Rising is optional. Manually supplied placements are not calculated or verified.</p>
                      <p class="preview-label">NOT INCLUDED</p>
                      <p>A full birth-chart calculation, houses, aspects, transits, predictions or personal access to Ashley.</p>
                    </div>
                  </div>
                  <div class="fictional-sample" aria-label="Fictional guide format example">
                    <p class="preview-label">FICTIONAL EXAMPLE FORMAT</p>
                    <strong>Alex's guide</strong>
                    <span>Emotional needs + communication</span>
                    <span>Affection + action</span>
                    <span>Three things to notice and try</span>
                  </div>
                  <button class="purchase-button" type="button" disabled aria-describedby="checkout-status">Get my personal pattern guide — $29</button>
                  <p id="checkout-status" class="checkout-status">Checkout is not open yet. The guide preview is available while final commercial terms and delivery are approved.</p>
                </div>
                <button class="close-note" type="button" data-action="close-product-note">Close preview</button>
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
          <div class="save-panel">
            <div>
              <p class="save-title">Keep this discovery for next time</p>
              <p>Save this placement and sign on this device. This does not create an account or save a full chart.</p>
              <p class="save-status" role="status" aria-live="polite"></p>
            </div>
            <button class="quiet-button" type="button" data-action="save-discovery" data-placement="${escapeHtml(placement.name.toLowerCase())}" data-sign="${escapeHtml(sign)}">Keep on this device</button>
          </div>
        </article>
      `;
    }
  }

  customElements.define("mtys-know-your-chart", MtysKnowYourChart);
})();
