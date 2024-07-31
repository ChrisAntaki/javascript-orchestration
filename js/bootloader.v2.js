// Log speed.
document.querySelector("#messages").insertAdjacentHTML(
  "beforeend",
  `
  <div>
  bootloader.v2 ${Date.now() - window.performance.timing.domLoading}
  </div>
  `
);

// Simulate API request.
(async () => {
  // Create global promise.
  const { promise: globalPromise, resolve: globalResolve } =
    Promise.withResolvers();
  window.API_PROMISE = globalPromise;

  // Request API.
  (async () => {
    const url = "./js/api.json?ts=" + Date.now();
    const response = await fetch(url).then((res) => res.json());
    // Simulate delay from server.
    const { promise: delayPromise, resolve: delayResolve } =
      Promise.withResolvers();
    setTimeout(delayResolve, 30);
    await delayPromise;
    console.log(response);
    globalResolve(response);

    // Render latency.
    document.querySelector("#messages").insertAdjacentHTML(
      "beforeend",
      `
<div>
API response ${Date.now() - window.performance.timing.domLoading}
</div>
`
    );
  })();

  // Load main.
  const el = document.createElement("script");
  el.src = `./js/90kb.main.js`;
  el.async = true;
  document.head.insertAdjacentElement("beforeend", el);
})();
