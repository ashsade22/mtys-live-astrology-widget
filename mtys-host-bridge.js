(function () {
  if (window.MTYSBridge) return;

  const WIX_ORIGIN = "https://ashley35031.wixsite.com";
  const SITE_BASE = `${WIX_ORIGIN}/more-than-your-sun-4`;
  const listeners = new Set();
  let hostReady = false;
  let routeState = {};

  function emit(type, detail) {
    listeners.forEach((listener) => listener(type, detail));
  }

  function post(message) {
    if (window.parent === window) return;
    window.parent.postMessage({ source: "mtys-widget", ...message }, WIX_ORIGIN);
  }

  function handleMessage(event) {
    if (event.source !== window.parent || event.origin !== WIX_ORIGIN) return;
    const message = event.data;
    if (!message || message.source !== "mtys-host") return;

    if (message.type === "host-ready") {
      hostReady = true;
      emit("host-ready", message);
    }

    if (message.type === "route-state" && message.query && typeof message.query === "object") {
      routeState = { ...message.query };
      emit("route-state", routeState);
    }
  }

  function brandedUrl(path, query = {}) {
    const url = new URL(path, `${SITE_BASE}/`);
    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        url.searchParams.set(key, String(value));
      }
    });
    return url.href;
  }

  function navigate(event, href) {
    if (!hostReady || window.parent === window) return false;
    event.preventDefault();
    const url = new URL(href, `${SITE_BASE}/`);
    post({
      type: "navigate",
      path: url.pathname.replace("/more-than-your-sun-4", "") || "/",
      query: Object.fromEntries(url.searchParams.entries()),
      hash: url.hash
    });
    return true;
  }

  window.addEventListener("message", handleMessage);
  window.MTYSBridge = {
    SITE_BASE,
    brandedUrl,
    navigate,
    getRouteState: () => ({ ...routeState }),
    consumeRouteState() {
      const state = { ...routeState };
      routeState = {};
      return state;
    },
    on(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    }
  };

  post({ type: "ready" });
})();
