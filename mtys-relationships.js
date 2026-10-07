(() => {
  const scriptUrl = document.currentScript && document.currentScript.src
    ? document.currentScript.src
    : window.location.href;

  const escapeHtml = (value) => String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

  class MtysRelationships extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      this.content = null;
      this.styles = "";
    }

    connectedCallback() {
      this.load();
    }

    async load() {
      try {
        const contentUrl = new URL("relationships-content.js?v=20261007b", scriptUrl).href;
        const stylesUrl = new URL("relationships-styles.js?v=20261007b", scriptUrl).href;
        const [contentModule, stylesModule] = await Promise.all([
          import(contentUrl),
          import(stylesUrl)
        ]);
        this.content = contentModule.default;
        this.styles = stylesModule.default;
        this.render();
      } catch (error) {
        console.error("Failed to load the Relationships experience.", error);
        this.shadowRoot.innerHTML = "<p>Relationships is temporarily unavailable. Please try again shortly.</p>";
      }
    }

    placementUrl(placement) {
      return new URL(`know-your-chart-preview.html?placement=${placement}`, scriptUrl).href;
    }

    chartHomeUrl() {
      return new URL("know-your-chart-preview.html", scriptUrl).href;
    }

    render() {
      const { hero, relate, compatibility, kinds, chartBridge, product } = this.content;
      const stories = relate.stories.map((story) => `
        <article class="story-card">
          <h3>${escapeHtml(story.title)}</h3>
          <p>${escapeHtml(story.body)}</p>
          <a class="story-link" href="${escapeHtml(this.placementUrl(story.placement))}">${escapeHtml(story.cta)}</a>
        </article>
      `).join("");

      const points = compatibility.points.map((point) => `
        <article class="compatibility-point">
          <h3>${escapeHtml(point.title)}</h3>
          <p>${escapeHtml(point.body)}</p>
        </article>
      `).join("");

      const kindItems = kinds.items.map((item) => `<span class="kind">${escapeHtml(item)}</span>`).join("");

      this.shadowRoot.innerHTML = `
        <style>${this.styles}</style>
        <main class="page">
          <section class="hero">
            <div class="wrap hero-inner">
              <p class="eyebrow">${escapeHtml(hero.eyebrow)}</p>
              <h1>${escapeHtml(hero.title)}</h1>
              <p class="hero-copy">${escapeHtml(hero.body)}</p>
              <a class="hero-cta" href="#how-you-relate">${escapeHtml(hero.cta)}</a>
            </div>
          </section>

          <section class="section section-paper" id="how-you-relate" aria-labelledby="relate-heading">
            <div class="wrap">
              <div class="section-heading">
                <p class="eyebrow">${escapeHtml(relate.eyebrow)}</p>
                <h2 id="relate-heading">${escapeHtml(relate.title)}</h2>
                <p class="section-copy">${escapeHtml(relate.body)}</p>
              </div>
              <div class="story-grid">${stories}</div>
            </div>
          </section>

          <section class="section section-dark" aria-labelledby="compatibility-heading">
            <div class="wrap compatibility-layout">
              <div>
                <p class="eyebrow">${escapeHtml(compatibility.eyebrow)}</p>
                <h2 id="compatibility-heading">${escapeHtml(compatibility.title)}</h2>
                <p class="section-copy">${escapeHtml(compatibility.body)}</p>
                <p class="future-note">${escapeHtml(compatibility.note)}</p>
              </div>
              <div class="compatibility-points">${points}</div>
            </div>
          </section>

          <section class="section section-paper" aria-labelledby="kinds-heading">
            <div class="wrap">
              <div class="section-heading">
                <p class="eyebrow">${escapeHtml(kinds.eyebrow)}</p>
                <h2 id="kinds-heading">${escapeHtml(kinds.title)}</h2>
                <p class="section-copy">${escapeHtml(kinds.body)}</p>
              </div>
              <div class="kind-list" aria-label="Relationship types">${kindItems}</div>
            </div>
          </section>

          <section class="section" aria-labelledby="chart-bridge-heading">
            <div class="wrap chart-panel">
              <div>
                <p class="eyebrow">${escapeHtml(chartBridge.eyebrow)}</p>
                <h2 id="chart-bridge-heading">${escapeHtml(chartBridge.title)}</h2>
                <p>${escapeHtml(chartBridge.body)}</p>
              </div>
              <a class="chart-cta" href="${escapeHtml(this.chartHomeUrl())}">${escapeHtml(chartBridge.cta)}</a>
            </div>
          </section>

          <section class="section section-paper" aria-labelledby="product-heading">
            <div class="wrap product-panel">
              <div>
                <p class="eyebrow">${escapeHtml(product.eyebrow)}</p>
                <h2 id="product-heading">${escapeHtml(product.title)}</h2>
                <p>${escapeHtml(product.body)}</p>
              </div>
              <p class="product-note">${escapeHtml(product.note)}</p>
            </div>
          </section>
        </main>
      `;
    }
  }

  if (!customElements.get("mtys-relationships")) {
    customElements.define("mtys-relationships", MtysRelationships);
  }
})();
