(function () {
  if (window.MTYSBridge) return;
  const WIX_ORIGIN = "https://ashley35031.wixsite.com";
  const SITE_BASE = `${WIX_ORIGIN}/more-than-your-sun-4`;
  const signs = new Set("aries taurus gemini cancer leo virgo libra scorpio sagittarius capricorn aquarius pisces".split(" "));
  const placements = new Set("sun moon rising mercury venus mars".split(" "));
  const routes = new Set(["/know-your-chart", "/relationships", "/compatibility", "/career-money"]);
  const listeners = new Set();
  let hostReady = false;
  let routeState = {};
  let pendingSelection = null;
  function clean(query) {
    const result = {};
    for (const key of ["placement", "sign", "you", "them"]) {
      const value = typeof query?.[key] === "string" ? query[key].toLowerCase() : "";
      if ((key === "placement" ? placements : signs).has(value)) result[key] = value;
    }
    return result;
  }
  function emit() {
    listeners.forEach(listener => listener("route-state", { ...routeState }));
    window.dispatchEvent(new CustomEvent("mtys:route-state"));
  }
  function post(message) {
    if (window.parent !== window) window.parent.postMessage({ source: "mtys-widget", ...message }, WIX_ORIGIN);
  }
  function apply(query, push) {
    routeState = clean(query);
    const url = new URL(window.location.href);
    for (const key of ["placement", "sign", "you", "them"]) url.searchParams.delete(key);
    Object.entries(routeState).forEach(([key, value]) => url.searchParams.set(key, value));
    window.history[push ? "pushState" : "replaceState"]({}, "", url);
    emit();
  }
  window.addEventListener("message", event => {
    if (event.source !== window.parent || event.origin !== WIX_ORIGIN) return;
    const message = event.data;
    if (!message || message.source !== "mtys-host") return;
    if (message.type === "host-ready") hostReady = true;
    if (message.type === "route-state" && message.query && typeof message.query === "object") {
      if (pendingSelection) {
        const pending = pendingSelection;
        pendingSelection = null;
        post({ type: "set-state", query: pending });
        return;
      }
      apply(message.query, false);
    }
  });
  function brandedUrl(path, query = {}) {
    if (!routes.has(path)) throw new Error("Unsupported MTYS route");
    const url = new URL(SITE_BASE + path);
    Object.entries(clean(query)).forEach(([key, value]) => url.searchParams.set(key, value));
    return url.href;
  }
  window.MTYSBridge = {
    SITE_BASE,
    brandedUrl,
    navigate(event, href) {
      if (!hostReady || window.parent === window) return false;
      const url = new URL(href, `${SITE_BASE}/`);
      const path = url.pathname.replace("/more-than-your-sun-4", "");
      if (url.origin !== WIX_ORIGIN || !routes.has(path)) return false;
      event.preventDefault();
      post({ type: "navigate", path, query: clean(Object.fromEntries(url.searchParams)), hash: /^#[a-z0-9-]{1,80}$/i.test(url.hash) ? url.hash : "" });
      return true;
    },
    setRouteState(query) {
      const next = clean(query);
      if (hostReady && window.parent !== window) {
        apply(next, false);
        post({ type: "set-state", query: next });
      } else {
        apply(next, true);
        if (window.parent !== window) pendingSelection = next;
      }
    },
    getRouteState: () => ({ ...routeState }),
    consumeRouteState: () => ({ ...routeState }),
    on(listener) { listeners.add(listener); return () => listeners.delete(listener); }
  };
  let attempts = 0;
  function ready() {
    if (hostReady || attempts++ >= 20) return;
    post({ type: "ready" });
    window.setTimeout(ready, 250);
  }
  ready();
})();

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
      this.shareStatus = "";
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleClick = this.handleClick.bind(this);
      this.handlePopState = this.handlePopState.bind(this);
      this.handleRouteState = this.handleRouteState.bind(this);
    }

    connectedCallback() {
      this.shadowRoot.innerHTML = `
        <style>
          :host { display: block; min-height: 520px; background: #f7f0eb; }
          .loading { display: grid; min-height: 520px; place-items: center; color: #0b2534; font: 16px Arial, sans-serif; }
        </style>
        <div class="loading" role="status">Loading Compatibility</div>
      `;
      window.addEventListener("mtys:route-state", this.handleRouteState);
      this.load();
    }

    disconnectedCallback() {
      this.shadowRoot.removeEventListener("submit", this.handleSubmit);
      this.shadowRoot.removeEventListener("click", this.handleClick);
      window.removeEventListener("popstate", this.handlePopState);
      window.removeEventListener("mtys:route-state", this.handleRouteState);
    }

    async load() {
      try {
        const contentUrl = new URL("compatibility-content.js?v=20261011a", scriptUrl).href;
        const stylesUrl = new URL("compatibility-styles.js?v=20261011a", scriptUrl).href;
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
        yours: this.validSign(params.get("you")),
        theirs: this.validSign(params.get("them"))
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
      if (window.MTYSBridge?.setRouteState) {
        window.MTYSBridge.setRouteState(Object.fromEntries(url.searchParams));
      } else {
        window.history.pushState({}, "", url);
      }
      this.render();
      window.requestAnimationFrame(() => {
        const reading = this.shadowRoot.querySelector("#compatibility-reading");
        reading.scrollIntoView({ behavior: "smooth", block: "start" });
        reading.focus({ preventScroll: true });
      });
    }

    async handleClick(event) {
      const route = event.target.closest("[data-mtys-route]");
      if (route && window.MTYSBridge && window.MTYSBridge.navigate(event, route.href)) return;

      const shareButton = event.target.closest("[data-action='copy-link']");
      if (shareButton) {
        const state = this.getState();
        if (!state.yours || !state.theirs) return;
        const link = window.MTYSBridge
          ? window.MTYSBridge.brandedUrl("/compatibility", { you: state.yours.key, them: state.theirs.key })
          : `https://ashley35031.wixsite.com/more-than-your-sun-4/compatibility?you=${state.yours.key}&them=${state.theirs.key}`;
        try {
          await navigator.clipboard.writeText(link);
          this.shareStatus = "Link copied.";
        } catch (error) {
          const textArea = document.createElement("textarea");
          textArea.value = link;
          textArea.setAttribute("readonly", "");
          textArea.style.position = "fixed";
          textArea.style.opacity = "0";
          document.body.appendChild(textArea);
          textArea.select();
          const copied = document.execCommand("copy");
          textArea.remove();
          this.shareStatus = copied ? "Link copied." : "Copy the page address to share this pairing.";
        }
        const status = this.shadowRoot.querySelector(".share-status");
        if (status) status.textContent = this.shareStatus;
        return;
      }

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

    handleRouteState() {
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
              <div class="reading-sections">
                ${sections}
                <div class="share-row">
                  <button class="share-button" type="button" data-action="copy-link">Copy this pairing link</button>
                  <span class="share-status" role="status" aria-live="polite">${escapeHtml(this.shareStatus)}</span>
                </div>
              </div>
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
            <a href="${escapeHtml(url)}" target="_blank" rel="noopener" data-mtys-route>
              <strong>${escapeHtml(placement.name)}</strong>
              <span>${escapeHtml(placement.body)}</span>
            </a>
          </li>
        `;
      }).join("");

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
              <p class="relationship-types">${escapeHtml(relationshipTypes.label)}</p>
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
