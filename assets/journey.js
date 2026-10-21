/* global CAREER_CHAPTERS */
/* Renders the career journey from assets/career-data.js and animates the path. */
(function () {
  const list = document.getElementById("journey");
  if (!list || typeof CAREER_CHAPTERS === "undefined") return;

  const track = /** @type {HTMLElement} */ (list.parentElement);
  const svg = track.querySelector(".journey-path");
  const base = svg.querySelector(".track");
  const fill = svg.querySelector(".fill");
  const grad = svg.querySelector("linearGradient");
  const horizontal = matchMedia("(min-width: 1180px)");
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const n = CAREER_CHAPTERS.length;

  const ICONS = {
    flask: '<path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 1.8 3h10.4A2 2 0 0 0 19 18l-5-9V3"/><path d="M7.5 14h9"/>',
    blueprint: '<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20l1.5-4M16 20l-1.5-4M7 8.5h4M7 11.5h6"/><circle cx="16" cy="9.5" r="2"/>',
    cycle: '<path d="M19.5 12a7.5 7.5 0 0 1-13.4 4.6M4.5 12a7.5 7.5 0 0 1 13.4-4.6"/><path d="M18.5 3.5v4h-4M5.5 20.5v-4h4"/>',
    rise: '<path d="M6 18 18 6M10 6h8v8"/>',
    spark: '<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6.3 6.3l2.5 2.5M15.2 15.2l2.5 2.5M17.7 6.3l-2.5 2.5M8.8 15.2l-2.5 2.5"/><circle cx="12" cy="12" r="2.2"/>'
  };

  function esc(s) {
    return String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }

  /* Lens colour along the path: muted green → green → violet (the site accent). */
  function tone(i) {
    const t = n > 1 ? i / (n - 1) : 1;
    if (t <= 0.25) return `color-mix(in srgb, var(--green) ${Math.round(45 + (t / 0.25) * 55)}%, var(--muted))`;
    return `color-mix(in srgb, var(--violet) ${Math.round(((t - 0.25) / 0.75) * 100)}%, var(--green))`;
  }

  list.innerHTML = CAREER_CHAPTERS.map((c, i) => {
    const id = `chapter-${c.id}`;
    const milestone = c.kind === "milestone";
    const details = c.details && c.details.length
      ? `<button class="more" type="button" aria-expanded="false" aria-controls="${id}-more">More detail</button>
         <div class="details" id="${id}-more" hidden>${c.details.map(d => `
           <div><h4>${esc(d.heading)}</h4><ul>${d.items.map(x => `<li>${esc(x)}</li>`).join("")}</ul>${d.link ? `<a class="detail-link" href="${esc(d.link.href)}" target="_blank" rel="noopener">${esc(d.link.label)} ↗</a>` : ""}</div>`).join("")}
         </div>`
      : "";
    return `
      <li class="stop${milestone ? " milestone" : ""}${c.now ? " now" : ""}" id="${id}"
          style="--tone:${tone(i)};--i:${i};--lift:${(n - 1 - i) * 14}px">
        <span class="node" aria-hidden="true">${milestone ? "" : `<svg viewBox="0 0 24 24">${ICONS[c.icon] || ""}</svg>`}</span>
        <article class="chapter" aria-labelledby="${id}-title">
          <div class="chapter-meta">
            <span class="lens">${esc(c.tag)}</span>
            ${c.now ? '<span class="now-badge">Now</span>' : ""}
          </div>
          <h3 id="${id}-title">${esc(c.title)}<small>${esc(c.subtitle)}</small></h3>
          <p class="where"><b>${esc(c.period)}</b> · ${esc(c.org)}</p>
          ${c.question ? `<p class="question">“${esc(c.question)}”</p>` : ""}
          <p class="summary">${esc(c.summary)}</p>
          ${details}
          ${c.cta ? `<a class="cta" href="${esc(c.cta.href)}">${esc(c.cta.label)} →</a>` : ""}
        </article>
      </li>`;
  }).join("");

  const stops = [...list.querySelectorAll(".stop")];

  /* Expand / collapse */
  list.addEventListener("click", e => {
    const btn = /** @type {HTMLElement} */ (e.target).closest(".more");
    if (!btn) return;
    const open = btn.getAttribute("aria-expanded") !== "true";
    btn.setAttribute("aria-expanded", String(open));
    btn.textContent = open ? "Less detail" : "More detail";
    document.getElementById(btn.getAttribute("aria-controls")).hidden = !open;
  });

  /* Path through the node centres. offsetTop/Left ignore the slide-in transform. */
  let total = 0;
  let nodeAt = [];
  function layout() {
    const pts = stops.map(s => {
      const node = /** @type {HTMLElement} */ (s.querySelector(".node"));
      return [s.offsetLeft + node.offsetLeft + node.offsetWidth / 2, s.offsetTop + node.offsetTop + node.offsetHeight / 2];
    });
    let d = `M${pts[0][0]},${pts[0][1]}`;
    for (let k = 1; k < pts.length; k++) {
      const [x0, y0] = pts[k - 1], [x1, y1] = pts[k];
      if (horizontal.matches) {
        const mx = (x0 + x1) / 2;
        d += ` C${mx},${y0} ${mx},${y1} ${x1},${y1}`;
      } else {
        d += ` L${x1},${y1}`;
      }
    }
    svg.setAttribute("viewBox", `0 0 ${track.clientWidth} ${track.clientHeight}`);
    base.setAttribute("d", d);
    fill.setAttribute("d", d);
    const last = pts[pts.length - 1];
    grad.setAttribute("x1", pts[0][0]); grad.setAttribute("y1", pts[0][1]);
    grad.setAttribute("x2", last[0]); grad.setAttribute("y2", last[1]);

    total = fill.getTotalLength();
    fill.style.strokeDasharray = `${total} ${total}`;
    // Distance along the path to each node, by sampling.
    const samples = [];
    for (let s = 0; s <= 300; s++) {
      const len = (total * s) / 300;
      const p = fill.getPointAtLength(len);
      samples.push([len, p.x, p.y]);
    }
    nodeAt = pts.map(([x, y]) => {
      let best = samples[0];
      for (const sm of samples) if (Math.hypot(sm[1] - x, sm[2] - y) < Math.hypot(best[1] - x, best[2] - y)) best = sm;
      return best[0];
    });
    drawLine();
  }

  /* Illustration: drawn left to right in step with scrolling, and rewound when scrolling back. */
  const art = document.querySelector(".cj-art");
  const ground = art && art.querySelector(".ground");
  const wipe = art && art.querySelector("#cj-reveal rect");
  const scenes = art ? [...art.querySelectorAll(".stage")] : [];
  const SCENE_AT = [0.04, 0.28, 0.52, 0.76];
  const clamp = v => Math.max(0, Math.min(1, v));
  function updateArt() {
    if (!art || reduce) return;
    const r = art.getBoundingClientRect();
    const vh = innerHeight;
    // 0 when its top enters at 90% of the screen height, 1 when its bottom reaches 60%.
    const p = clamp((vh * 0.9 - r.top) / (r.height + vh * 0.3));
    ground.style.strokeDashoffset = String(1400 * (1 - p));
    wipe.setAttribute("width", String(1200 * p));
    scenes.forEach((g, k) => {
      const o = clamp((p - SCENE_AT[k]) / 0.18);
      g.style.opacity = String(o);
      g.style.transform = `translateY(${12 * (1 - o)}px)`;
    });
  }

  /* The path draws itself once, start to end, when the chapters come into view,
     independent of scrolling. Each chapter appears as the line reaches its node. */
  const DURATION = 3000;
  let progress = 0;
  let started = false;
  const ease = x => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
  function drawLine() {
    const len = total * progress;
    fill.style.strokeDashoffset = String(total - len);
    stops.forEach((s, k) => {
      const hit = started && len >= nodeAt[k] - 1;
      s.classList.toggle("reached", hit);
      if (hit) s.classList.remove("pending");
    });
  }
  function play(animate) {
    if (started) return;
    started = true;
    if (!animate) { progress = 1; drawLine(); return; }
    let t0 = 0;
    requestAnimationFrame(function frame(t) {
      if (!t0) t0 = t;
      const x = Math.min(1, (t - t0) / DURATION);
      progress = ease(x);
      drawLine();
      if (x < 1) requestAnimationFrame(frame);
    });
  }

  let ticking = false;
  addEventListener("scroll", () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => { ticking = false; updateArt(); });
  }, { passive: true });
  new ResizeObserver(layout).observe(list);
  horizontal.addEventListener("change", layout);
  layout();
  updateArt();

  if (!reduce && "IntersectionObserver" in window) {
    stops.forEach(s => s.classList.add("pending"));
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { io.disconnect(); play(true); }
    }, { rootMargin: "0px 0px -20% 0px" });
    io.observe(list);
  } else {
    play(false);
  }
})();
