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
      this.state = { work: "ownership", success: "security", money: "buffer" };
      this.handleClick = this.handleClick.bind(this);
    }

    connectedCallback() {
      this.shadowRoot.innerHTML = `<style>:host{display:block;min-height:520px;background:#f7f0eb}.loading{display:grid;min-height:520px;place-items:center;color:#103f42;font:16px Arial,sans-serif}</style><div class="loading" role="status">Loading Career and Money</div>`;
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
        this.shadowRoot.querySelector("#how-you-work").scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }

    chartUrl(placement) {
      return `${this.content.chartBaseUrl}?placement=${placement}`;
    }

    renderWork() {
      const active = this.content.workStyles.find((item) => item.id === this.state.work) || this.content.workStyles[0];
      const buttons = this.content.workStyles.map((item) => `<button class="choice-button" type="button" role="tab" aria-selected="${item.id === active.id}" data-group="work" data-value="${escapeHtml(item.id)}">${escapeHtml(item.label)}</button>`).join("");
      return `<div class="explorer"><div class="choice-list" role="tablist" aria-label="Work style situations">${buttons}</div><article class="detail-panel" data-panel="work" tabindex="-1"><h3>${escapeHtml(active.title)}</h3><p>${escapeHtml(active.body)}</p><p class="detail-prompt">${escapeHtml(active.prompt)}</p><a class="chart-link" href="${escapeHtml(this.chartUrl(active.placement))}" target="_top">${escapeHtml(active.linkLabel)}</a></article></div>`;
    }

    renderSuccess() {
      const active = this.content.successStyles.find((item) => item.id === this.state.success) || this.content.successStyles[0];
      const buttons = this.content.successStyles.map((item) => `<button class="success-button" type="button" role="tab" aria-selected="${item.id === active.id}" data-group="success" data-value="${escapeHtml(item.id)}">${escapeHtml(item.label)}</button>`).join("");
      return `<div class="success-options" role="tablist" aria-label="Definitions of success">${buttons}</div><article class="success-detail" data-panel="success" tabindex="-1"><h3>${escapeHtml(active.title)}</h3><p>${escapeHtml(active.body)}</p></article>`;
    }

    renderMoney() {
      const active = this.content.moneyStyles.find((item) => item.id === this.state.money) || this.content.moneyStyles[0];
      const buttons = this.content.moneyStyles.map((item) => `<button class="money-button" type="button" role="tab" aria-selected="${item.id === active.id}" data-group="money" data-value="${escapeHtml(item.id)}">${escapeHtml(item.label)}</button>`).join("");
      return `<div class="money-layout"><div class="money-choices" role="tablist" aria-label="Money style statements">${buttons}</div><article class="money-detail" data-panel="money" tabindex="-1"><h3>${escapeHtml(active.title)}</h3><p>${escapeHtml(active.body)}</p><p class="disclaimer">This is for personal reflection and is not financial advice.</p></article></div>`;
    }

    renderCards(items, className, mapper) {
      return items.map((item, index) => mapper(item, index, className)).join("");
    }

    render() {
      const c = this.content;
      if (!c) return;
      const p = c.pageCopy;
      const obstacleCards = this.renderCards(c.obstacles, "pattern-card", (item, index) => `<article class="pattern-card"><span class="pattern-number">${String(index + 1).padStart(2, "0")}</span><h3>${escapeHtml(item[0])}</h3><p>${escapeHtml(item[1])}</p></article>`);
      const crossroadsCards = this.renderCards(c.crossroads, "crossroads-card", (item) => `<a class="crossroads-card" href="${escapeHtml(item.href)}"><div><h3>${escapeHtml(item.label)}</h3><p>${escapeHtml(item.body)}</p></div><span>Start here</span></a>`);

      this.shadowRoot.innerHTML = `<style>${this.styles}</style><main class="page">
        <section class="hero"><div class="wrap hero-inner"><p class="eyebrow">${escapeHtml(p.hero.eyebrow)}</p><h1>${escapeHtml(p.hero.title)}</h1><p class="hero-copy">${escapeHtml(p.hero.body)}</p><a class="primary-button" href="#how-you-work" data-action="explore">${escapeHtml(p.hero.cta)}</a></div></section>
        <section class="section" id="how-you-work"><div class="wrap"><header class="section-heading"><p class="eyebrow">${escapeHtml(p.work.eyebrow)}</p><h2>${escapeHtml(p.work.title)}</h2><p>${escapeHtml(p.work.body)}</p></header>${this.renderWork()}</div></section>
        <section class="section success-section" id="success"><div class="wrap"><header class="section-heading"><p class="eyebrow">${escapeHtml(p.success.eyebrow)}</p><h2>${escapeHtml(p.success.title)}</h2><p>${escapeHtml(p.success.body)}</p></header>${this.renderSuccess()}</div></section>
        <section class="section money-section" id="money-style"><div class="wrap"><header class="section-heading"><p class="eyebrow">${escapeHtml(p.money.eyebrow)}</p><h2>${escapeHtml(p.money.title)}</h2><p>${escapeHtml(p.money.body)}</p></header>${this.renderMoney()}</div></section>
        <section class="section obstacles-section" id="gets-in-your-way"><div class="wrap"><header class="section-heading"><p class="eyebrow">${escapeHtml(p.obstacles.eyebrow)}</p><h2>${escapeHtml(p.obstacles.title)}</h2><p>${escapeHtml(p.obstacles.body)}</p></header><div class="card-grid">${obstacleCards}</div></div></section>
        <section class="section crossroads-section"><div class="wrap"><header class="section-heading"><p class="eyebrow">${escapeHtml(p.crossroads.eyebrow)}</p><h2>${escapeHtml(p.crossroads.title)}</h2><p>${escapeHtml(p.crossroads.body)}</p></header><div class="crossroads-grid">${crossroadsCards}</div></div></section>
        <section class="section profile-section"><div class="wrap profile-panel"><div><p class="eyebrow">${escapeHtml(p.profile.eyebrow)}</p><h2>${escapeHtml(p.profile.title)}</h2><p>${escapeHtml(p.profile.body)}</p></div><div class="profile-action"><span class="future-button" aria-disabled="true">${escapeHtml(p.profile.cta)}</span><p>${escapeHtml(p.profile.note)}</p></div></div></section>
      </main>`;
    }
  }

  if (!customElements.get("mtys-career-money")) customElements.define("mtys-career-money", MtysCareerMoney);
})();
