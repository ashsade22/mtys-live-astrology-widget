import * as contentModule from "./career-money-content.js";
import stylesModule from "./career-money-styles.js";

(() => {
  const escapeHtml = (value) => String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

  class MtysCareerMoney extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      this.content = null;
      this.styles = "";
      this.state = { work: "motivation", money: "worth" };
      this.handleClick = this.handleClick.bind(this);
    }

    connectedCallback() {
      this.shadowRoot.innerHTML = `<style>:host{display:block;min-height:520px;background:#fffaf7}.loading{display:grid;min-height:520px;place-items:center;color:#0b2534;font:16px Arial,sans-serif}</style><div class="loading" role="status">Loading Career and Money</div>`;
      this.load();
    }

    disconnectedCallback() {
      this.shadowRoot.removeEventListener("click", this.handleClick);
    }

    load() {
      try {
        this.content = contentModule;
        this.styles = stylesModule;
        this.shadowRoot.addEventListener("click", this.handleClick);
        document.title = "Career + Money | More Than Your Sun Astrology";
        this.render();
      } catch (error) {
        console.error("Failed to load Career and Money.", error);
        this.shadowRoot.innerHTML = "<p>Career and Money is temporarily unavailable. Please try again shortly.</p>";
      }
    }

    handleClick(event) {
      const choice = event.target.closest("[data-group][data-value]");
      if (choice) {
        this.state[choice.dataset.group] = choice.dataset.value;
        this.render();
        const panel = this.shadowRoot.querySelector(`[data-panel='${choice.dataset.group}']`);
        if (panel) panel.focus({ preventScroll: true });
        return;
      }
      const explore = event.target.closest("[data-action='explore']");
      if (explore) {
        event.preventDefault();
        this.shadowRoot.querySelector("#work-questions").scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }

    chartUrl(placement) {
      return `${this.content.chartBaseUrl}?placement=${placement}`;
    }

    renderQuestionExplorer(group, items, ariaLabel) {
      const active = items.find((item) => item.id === this.state[group]) || items[0];
      const buttons = items.map((item) => `<button class="choice-button" type="button" role="tab" aria-selected="${item.id === active.id}" data-group="${escapeHtml(group)}" data-value="${escapeHtml(item.id)}">${escapeHtml(item.label)}</button>`).join("");
      return `<div class="explorer"><div class="choice-list" role="tablist" aria-label="${escapeHtml(ariaLabel)}">${buttons}</div><article class="detail-panel" data-panel="${escapeHtml(group)}" tabindex="-1"><p class="placement-label">LOOK TO ${escapeHtml(active.placementName.toUpperCase())}</p><h3>${escapeHtml(active.title)}</h3><p>${escapeHtml(active.body)}</p>${active.prompt ? `<p class="detail-prompt">${escapeHtml(active.prompt)}</p>` : ""}<a class="chart-link" href="${escapeHtml(this.chartUrl(active.placement))}" target="_top">${escapeHtml(active.linkLabel)}</a></article></div>`;
    }

    render() {
      const c = this.content;
      if (!c) return;
      const p = c.pageCopy;
      const placementCards = c.placementMap.map((item) => `<article class="placement-card"><h3>${escapeHtml(item[0])}</h3><p>${escapeHtml(item[1])}</p></article>`).join("");
      const crossroadsCards = c.crossroads.map((item) => `<a class="crossroads-card" href="${escapeHtml(this.chartUrl(item.placement))}" target="_top"><div><h3>${escapeHtml(item.label)}</h3><p>${escapeHtml(item.body)}</p></div><span>${escapeHtml(item.linkLabel)}</span></a>`).join("");

      this.shadowRoot.innerHTML = `<style>${this.styles}</style><main class="page">
        <section class="hero"><div class="wrap hero-inner"><p class="eyebrow">${escapeHtml(p.hero.eyebrow)}</p><h1>${escapeHtml(p.hero.title)}</h1><p class="hero-copy">${escapeHtml(p.hero.body)}</p><a class="primary-button" href="#work-questions" data-action="explore">${escapeHtml(p.hero.cta)}</a></div></section>
        <section class="section" id="work-questions"><div class="wrap"><header class="section-heading"><p class="eyebrow">${escapeHtml(p.work.eyebrow)}</p><h2>${escapeHtml(p.work.title)}</h2><p>${escapeHtml(p.work.body)}</p></header>${this.renderQuestionExplorer("work", c.workQuestions, "Career astrology questions")}</div></section>
        <section class="section map-section"><div class="wrap"><header class="section-heading"><p class="eyebrow">${escapeHtml(p.map.eyebrow)}</p><h2>${escapeHtml(p.map.title)}</h2><p>${escapeHtml(p.map.body)}</p></header><div class="placement-grid">${placementCards}</div></div></section>
        <section class="section money-section"><div class="wrap"><header class="section-heading"><p class="eyebrow">${escapeHtml(p.money.eyebrow)}</p><h2>${escapeHtml(p.money.title)}</h2><p>${escapeHtml(p.money.body)}</p></header>${this.renderQuestionExplorer("money", c.moneyQuestions, "Money astrology questions")}<p class="disclaimer">For personal reflection only. This is not financial advice.</p></div></section>
        <section class="section crossroads-section"><div class="wrap"><header class="section-heading"><p class="eyebrow">${escapeHtml(p.crossroads.eyebrow)}</p><h2>${escapeHtml(p.crossroads.title)}</h2><p>${escapeHtml(p.crossroads.body)}</p></header><div class="crossroads-grid">${crossroadsCards}</div></div></section>
        <section class="section next-section"><div class="wrap next-panel"><p class="eyebrow">${escapeHtml(p.next.eyebrow)}</p><h2>${escapeHtml(p.next.title)}</h2><p>${escapeHtml(p.next.body)}</p></div></section>
      </main>`;
    }
  }

  if (!customElements.get("mtys-career-money")) customElements.define("mtys-career-money", MtysCareerMoney);
})();
