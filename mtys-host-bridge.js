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
