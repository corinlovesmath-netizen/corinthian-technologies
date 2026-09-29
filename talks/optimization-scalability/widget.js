/* Live scaling explorer for the deck.
 *
 * Driven entirely by window.SCALING, which analysis/make_figures.py generates
 * from data/raw/scaling.csv -- the same source as every static figure. The
 * curves are the fitted power laws; the dots are the real measured runs.
 *
 * Plain DOM + inline SVG on purpose: no build step, no framework, so both a
 * human and an agent can edit this file directly.
 */
(function () {
  const PAL = { a: "#3987e5", b: "#d95926", ink: "#e6e8ee", ink2: "#8b93a7", grid: "#2c3242" };
  const W = 620, H = 300, M = { l: 62, r: 16, t: 14, b: 38 };

  function fmt(t) {
    if (t < 1e-3) return (t * 1e6).toFixed(0) + " µs";
    if (t < 1) return (t * 1e3).toFixed(t < 0.01 ? 2 : 1) + " ms";
    if (t < 60) return t.toFixed(2) + " s";
    if (t < 3600) return (t / 60).toFixed(1) + " min";
    if (t < 86400) return (t / 3600).toFixed(1) + " h";
    return (t / 86400).toFixed(1) + " days";
  }
  const predict = (s, n) => s.C * Math.pow(n, s.alpha);

  function init(root) {
    if (!window.SCALING || root.dataset.ready) return;
    root.dataset.ready = "1";
    const S = window.SCALING, keys = Object.keys(S.series);
    const pick = (want, fb) => keys.find(k => k.startsWith(want)) || fb;

    root.innerHTML = `
      <div class="w-controls">
        <label>Series A
          <select class="w-a">${keys.map(k => `<option value="${k}">${S.series[k].label}</option>`).join("")}</select>
        </label>
        <label>Series B
          <select class="w-b">${keys.map(k => `<option value="${k}">${S.series[k].label}</option>`).join("")}</select>
        </label>
        <label class="w-nwrap">problem size &nbsp;<b>n = <span class="w-nval"></span></b>
          <input class="w-n" type="range" min="2" max="4" step="0.01" value="3.3">
        </label>
      </div>
      <div class="w-readout">
        <div><span class="w-dot" style="background:${PAL.a}"></span><span class="w-la"></span><b class="w-ta"></b></div>
        <div><span class="w-dot" style="background:${PAL.b}"></span><span class="w-lb"></span><b class="w-tb"></b></div>
        <div class="w-ratio"></div>
      </div>
      <svg class="w-svg" viewBox="0 0 ${W} ${H}" width="100%"></svg>
      <p class="w-note"></p>`;

    const $ = c => root.querySelector(c);
    const selA = $(".w-a"), selB = $(".w-b"), rng = $(".w-n");
    selA.value = pick("lp_sparse · HiGHS-simplex", keys[0]);
    selB.value = pick("lp_dense · HiGHS-simplex", keys[1]);

    function draw() {
      const A = S.series[selA.value], B = S.series[selB.value];
      const n = Math.round(Math.pow(10, +rng.value));
      const nMin = 10, nMax = 1e4;
      const allT = [];
      [A, B].forEach(s => { allT.push(predict(s, nMin), predict(s, nMax)); s.points.forEach(p => allT.push(p[1])); });
      const tMin = Math.min(...allT) * 0.5, tMax = Math.max(...allT) * 2;
      const X = v => M.l + (Math.log10(v) - Math.log10(nMin)) / (Math.log10(nMax) - Math.log10(nMin)) * (W - M.l - M.r);
      const Y = v => H - M.b - (Math.log10(v) - Math.log10(tMin)) / (Math.log10(tMax) - Math.log10(tMin)) * (H - M.t - M.b);

      let g = "";
      // extrapolation shading beyond the largest size actually measured
      g += `<rect x="${X(S.maxMeasured)}" y="${M.t}" width="${W - M.r - X(S.maxMeasured)}" height="${H - M.t - M.b}" fill="#ffffff" opacity="0.035"/>`;
      g += `<text x="${X(S.maxMeasured) + 6}" y="${M.t + 13}" fill="${PAL.ink2}" font-size="10">extrapolated</text>`;
      g += `<rect x="${M.l}" y="${M.t}" width="${X(S.fitMin) - M.l}" height="${H - M.t - M.b}" fill="#ffffff" opacity="0.035"/>`;
      g += `<text x="${M.l + 5}" y="${M.t + 13}" fill="${PAL.ink2}" font-size="10">below fit range</text>`;
      for (let e = 1; e <= 4; e++) {
        g += `<line x1="${X(10 ** e)}" y1="${M.t}" x2="${X(10 ** e)}" y2="${H - M.b}" stroke="${PAL.grid}" stroke-width="1"/>`;
        g += `<text x="${X(10 ** e)}" y="${H - M.b + 16}" fill="${PAL.ink2}" font-size="11" text-anchor="middle">10^${e}</text>`;
      }
      for (let e = Math.ceil(Math.log10(tMin)); e <= Math.floor(Math.log10(tMax)); e++) {
        g += `<line x1="${M.l}" y1="${Y(10 ** e)}" x2="${W - M.r}" y2="${Y(10 ** e)}" stroke="${PAL.grid}" stroke-width="1"/>`;
        g += `<text x="${M.l - 7}" y="${Y(10 ** e) + 4}" fill="${PAL.ink2}" font-size="11" text-anchor="end">${fmt(10 ** e)}</text>`;
      }
      [[A, PAL.a], [B, PAL.b]].forEach(([s, col]) => {
        let d = "";
        for (let i = 0; i <= 60; i++) {
          const v = Math.pow(10, Math.log10(nMin) + (i / 60) * (Math.log10(nMax) - Math.log10(nMin)));
          d += (i ? "L" : "M") + X(v).toFixed(1) + " " + Y(predict(s, v)).toFixed(1);
        }
        g += `<path d="${d}" fill="none" stroke="${col}" stroke-width="2"/>`;
        s.points.forEach(p => { g += `<circle cx="${X(p[0])}" cy="${Y(p[1])}" r="2.6" fill="${col}" opacity="0.75"/>`; });
        g += `<circle cx="${X(n)}" cy="${Y(predict(s, n))}" r="5.5" fill="${col}" stroke="#0f1117" stroke-width="2"/>`;
      });
      g += `<line x1="${X(n)}" y1="${M.t}" x2="${X(n)}" y2="${H - M.b}" stroke="${PAL.ink2}" stroke-dasharray="3 3" stroke-width="1"/>`;
      $(".w-svg").innerHTML = g;

      const ta = predict(A, n), tb = predict(B, n), r = tb / ta;
      $(".w-nval").textContent = n.toLocaleString();
      $(".w-la").textContent = A.label; $(".w-ta").textContent = fmt(ta);
      $(".w-lb").textContent = B.label; $(".w-tb").textContent = fmt(tb);
      $(".w-ratio").innerHTML = (r >= 1 ? "B is " : "A is ") +
        "<b>" + (r >= 1 ? r : 1 / r).toFixed(1) + "×</b> slower at n = " + n.toLocaleString();
      $(".w-note").textContent = "Curves are power laws fitted to runs on this machine (n ≥ " +
        S.fitMin + "); dots are the measured runs. Past n = " + S.maxMeasured.toLocaleString() +
        " the curve is extrapolation, not measurement. The slider stops at n = " + S.fitMin +
        " because the fit is not claimed below it.";
    }
    [selA, selB, rng].forEach(el => el.addEventListener("input", draw));
    draw();
  }

  const boot = () => document.querySelectorAll(".scaling-widget").forEach(init);
  if (window.Reveal) { Reveal.on("ready", boot); Reveal.on("slidechanged", boot); }
  document.addEventListener("DOMContentLoaded", boot);
  boot();
})();
