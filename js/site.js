/* Cut the Red Wire · FTC 6078 · site behavior
   1. Mobile nav toggle
   2. Header condenses after scrolling
   3. Current-section highlight in the nav
   4. Balloon <-> parts-list highlighting
   5. The red wire: routed down the left gutter, drawn as you scroll */

(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var header = document.querySelector("[data-header]");

  /* ---------- 1. mobile nav ---------- */
  var toggle = document.querySelector("[data-nav-toggle]");
  var nav = document.querySelector("[data-nav]");
  function setNav(open) {
    header.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
  }
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      setNav(toggle.getAttribute("aria-expanded") !== "true");
    });
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) setNav(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && header.classList.contains("is-open")) {
        setNav(false);
        toggle.focus();
      }
    });
  }

  /* ---------- 2. header condense ---------- */
  function onScrollHeader() {
    header.classList.toggle("is-condensed", window.scrollY > 24);
  }

  /* ---------- 3. current section in nav ---------- */
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.site-nav ul a[href^="#"]'));
  var sections = navLinks
    .map(function (a) { return document.querySelector(a.getAttribute("href")); })
    .filter(Boolean);
  if ("IntersectionObserver" in window && sections.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var id = "#" + entry.target.id;
        navLinks.forEach(function (a) {
          if (a.getAttribute("href") === id) a.setAttribute("aria-current", "true");
          else a.removeAttribute("aria-current");
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach(function (s) { io.observe(s); });
  }

  /* ---------- 4. balloons <-> parts list ---------- */
  var balloons = document.querySelectorAll(".balloon[data-item]");
  var rows = document.querySelectorAll(".bom tr[data-item]");
  var pick = document.querySelector("[data-robot-pick]");
  function hot(item, on) {
    balloons.forEach(function (b) { if (b.dataset.item === item) b.classList.toggle("is-hot", on); });
    rows.forEach(function (r) {
      if (r.dataset.item !== item) return;
      r.classList.toggle("is-hot", on);
      if (on && pick) {
        var cells = r.querySelectorAll("td");
        pick.innerHTML = "<b>" + item + "</b>" + cells[1].textContent.replace(/^[^:]*:\s*/, "").trim() +
          " · " + cells[2].textContent.trim();
      }
    });
  }
  [balloons, rows].forEach(function (list) {
    list.forEach(function (el) {
      var item = el.dataset.item;
      el.addEventListener("mouseenter", function () { hot(item, true); });
      el.addEventListener("mouseleave", function () { hot(item, false); });
      el.addEventListener("focus", function () { hot(item, true); });
      el.addEventListener("blur", function () { hot(item, false); });
    });
  });
  // Taps: Safari doesn't focus buttons on click, so handle it directly.
  balloons.forEach(function (b) {
    b.addEventListener("click", function () {
      balloons.forEach(function (o) { hot(o.dataset.item, false); });
      hot(b.dataset.item, true);
    });
  });

  /* ---------- 5. the red wire ---------- */
  var host = document.querySelector("[data-wire-host]");
  var svg = document.querySelector("[data-wire]");
  var NS = "http://www.w3.org/2000/svg";
  var wire = null; // { len, samples[], nodes[], cutY }

  function el(name, attrs) {
    var n = document.createElementNS(NS, name);
    for (var k in attrs) n.setAttribute(k, attrs[k]);
    return n;
  }

  function buildWire() {
    if (!host || !svg) return;
    var hostRect = host.getBoundingClientRect();
    var wrap = host.querySelector(".wrap");
    if (!wrap) return;
    var wrapRect = wrap.getBoundingClientRect();
    var inset = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--wire-inset")) || 16;
    var gutter = parseFloat(getComputedStyle(wrap).paddingLeft) || 32;

    var x0 = Math.round(wrapRect.left - hostRect.left + inset) + 0.5;
    var jog = Math.max(8, Math.min(14, inset * 0.55));
    var x1 = x0 + jog;
    var contentX = wrapRect.left - hostRect.left + gutter;

    var nodeEls = Array.prototype.slice.call(host.querySelectorAll("[data-wire-node]"));
    var pts = nodeEls.map(function (n) {
      var r = n.getBoundingClientRect();
      var fs = parseFloat(getComputedStyle(n).fontSize) || 32;
      var firstLine = Math.min(r.height, fs * 0.95);
      return { y: Math.round(r.top - hostRect.top + firstLine / 2), el: n };
    });
    if (!pts.length) return;

    var end = host.querySelector("[data-wire-end]");
    var endY = end
      ? Math.round(end.getBoundingClientRect().top - hostRect.top + 56)
      : host.offsetHeight - 40;

    // Route: vertical in the gutter, one 45-degree jog between each pair of sections.
    var d = "M " + x0 + " " + pts[0].y;
    var cx = x0;
    var nodeXs = [x0];
    for (var i = 1; i < pts.length; i++) {
      var a = pts[i - 1].y, b = pts[i].y;
      var mid = Math.round(a + (b - a) * 0.5);
      var nx = cx === x0 ? x1 : x0;
      d += " L " + cx + " " + (mid - jog / 2) + " L " + nx + " " + (mid + jog / 2) + " L " + nx + " " + b;
      cx = nx;
      nodeXs.push(cx);
    }
    var cutAt = endY - 18;
    d += " L " + cx + " " + cutAt;

    svg.classList.add("is-building"); // no fill transitions while terminals are recreated
    svg.setAttribute("viewBox", "0 0 " + host.offsetWidth + " " + host.offsetHeight);
    var ghost = svg.querySelector("[data-wire-ghost]");
    var trace = svg.querySelector("[data-wire-trace]");
    var nodesG = svg.querySelector("[data-wire-nodes]");
    var cutG = svg.querySelector("[data-wire-cut]");
    ghost.setAttribute("d", d);
    trace.setAttribute("d", d);

    // Terminals and stubs to each heading.
    while (nodesG.firstChild) nodesG.removeChild(nodesG.firstChild);
    var nodes = pts.map(function (p, idx) {
      var nx = nodeXs[idx];
      var stub = el("path", { "class": "wire-stub", d: "M " + nx + " " + p.y + " L " + (contentX - 6) + " " + p.y });
      var dot = el("circle", { "class": "wire-node", cx: nx, cy: p.y, r: 5 });
      nodesG.appendChild(stub);
      nodesG.appendChild(dot);
      return { y: p.y, stub: stub, dot: dot };
    });

    // The cut: the wire stops, a gap, then a short snipped end.
    while (cutG.firstChild) cutG.removeChild(cutG.firstChild);
    cutG.appendChild(el("path", { d: "M " + cx + " " + (cutAt + 12) + " L " + cx + " " + (cutAt + 40) }));
    cutG.appendChild(el("path", { d: "M " + (cx - 5) + " " + (cutAt + 3) + " L " + (cx + 5) + " " + (cutAt - 3), "stroke-width": "1.5" }));
    cutG.appendChild(el("path", { d: "M " + (cx - 5) + " " + (cutAt + 15) + " L " + (cx + 5) + " " + (cutAt + 9), "stroke-width": "1.5" }));

    // Length samples so scroll position maps to a drawn length.
    var len = trace.getTotalLength();
    var samples = [];
    var step = 6;
    for (var s = 0; s <= len; s += step) samples.push({ l: s, y: trace.getPointAtLength(s).y });
    samples.push({ l: len, y: trace.getPointAtLength(len).y });

    trace.style.strokeDasharray = len + " " + len;
    wire = { len: len, samples: samples, nodes: nodes, cutY: cutAt, cut: cutG, trace: trace, top: hostRect.top + window.scrollY };
    drawWire();
    window.requestAnimationFrame(function () {
      window.requestAnimationFrame(function () { svg.classList.remove("is-building"); });
    });
  }

  function lengthAtY(y) {
    var s = wire.samples;
    if (y <= s[0].y) return 0;
    for (var i = 1; i < s.length; i++) {
      if (s[i].y >= y) {
        var a = s[i - 1], b = s[i];
        var t = b.y === a.y ? 1 : (y - a.y) / (b.y - a.y);
        return a.l + (b.l - a.l) * t;
      }
    }
    return wire.len;
  }

  function drawWire() {
    if (!wire) return;
    var target = reduceMotion
      ? Infinity
      : window.scrollY + window.innerHeight * 0.68 - wire.top;
    var atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
    if (atBottom) target = Infinity;
    var drawn = target === Infinity ? wire.len : lengthAtY(target);
    wire.trace.style.strokeDashoffset = String(wire.len - drawn);
    var tipY = target === Infinity ? Infinity : target;
    wire.nodes.forEach(function (n) {
      var live = n.y <= tipY;
      n.dot.classList.toggle("is-live", live);
      n.stub.classList.toggle("is-live", live);
    });
    wire.cut.classList.toggle("is-live", tipY >= wire.cutY);
  }

  /* ---------- wiring it up ---------- */
  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(function () {
      onScrollHeader();
      drawWire();
      ticking = false;
    });
  }
  var resizeTimer = null;
  function onResize() {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(buildWire, 120);
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onResize);
  window.addEventListener("load", buildWire);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(buildWire);
  if ("ResizeObserver" in window && host) new ResizeObserver(onResize).observe(host);
  onScrollHeader();
  buildWire();
})();
