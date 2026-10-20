(function () {
  const WIDGET_ORIGIN = "https://ashsade22.github.io";
  const SITE_BASE = "https://ashley35031.wixsite.com/more-than-your-sun-4";
  const ROUTES = new Map([
    ["/know-your-chart", "know-your-chart-preview.html"],
    ["/relationships", "relationships-preview.html"],
    ["/compatibility", "compatibility-preview-v3.html"],
    ["/career-money", "career-money-preview.html"]
  ]);
  const signs = new Set("aries taurus gemini cancer leo virgo libra scorpio sagittarius capricorn aquarius pisces".split(" "));
  const placements = new Set("sun moon rising mercury venus mars".split(" "));
  const frames = new Set();
  function clean(path, query) {
    const allowed = path === "/compatibility" ? ["you", "them"] : path === "/know-your-chart" ? ["placement", "sign"] : [];
    const result = {};
    for (const key of allowed) {
      const value = typeof query?.[key] === "string" ? query[key].toLowerCase() : "";
      if ((key === "placement" ? placements : signs).has(value)) result[key] = value;
    }
    return result;
  }
  function pathNow() { return window.location.pathname.replace("/more-than-your-sun-4", ""); }
  function knownFrame(source) {
    return Array.from(document.querySelectorAll("iframe")).some(frame => {
      try {
        const url = new URL(frame.src);
        return frame.contentWindow === source && url.origin === WIDGET_ORIGIN && Array.from(ROUTES.values()).some(file => url.pathname === "/mtys-live-astrology-widget/" + file);
      } catch { return false; }
    });
  }
  function sendState(source) {
    source.postMessage({ source: "mtys-host", type: "route-state", query: clean(pathNow(), Object.fromEntries(new URLSearchParams(window.location.search))) }, WIDGET_ORIGIN);
  }
  window.addEventListener("message", function (event) {
    const message = event.data;
    if (event.origin !== WIDGET_ORIGIN || !message || message.source !== "mtys-widget" || !knownFrame(event.source)) return;
    if (message.type === "ready") {
      frames.add(event.source);
      event.source.postMessage({ source: "mtys-host", type: "host-ready" }, WIDGET_ORIGIN);
      sendState(event.source);
      return;
    }
    if (message.type === "set-state" && ROUTES.has(pathNow())) {
      const destination = new URL(SITE_BASE + pathNow());
      Object.entries(clean(pathNow(), message.query)).forEach(([key, value]) => destination.searchParams.set(key, value));
      if (destination.href !== window.location.href) window.history.pushState({}, "", destination.href);
      sendState(event.source);
      return;
    }
    if (message.type === "navigate" && ROUTES.has(message.path)) {
      const destination = new URL(SITE_BASE + message.path);
      Object.entries(clean(message.path, message.query)).forEach(([key, value]) => destination.searchParams.set(key, value));
      destination.hash = typeof message.hash === "string" && /^#[a-z0-9-]{1,80}$/i.test(message.hash) ? message.hash : "";
      window.location.assign(destination.href);
    }
  });
  window.addEventListener("popstate", function () {
    frames.forEach(source => { if (knownFrame(source)) sendState(source); else frames.delete(source); });
  });
})();
