(function () {
  "use strict";

  var cfg = window.MICRO_APPS_CONFIG || { links: {}, email: "" };
  var toastEl = document.getElementById("toast");
  var toastTimer;

  function showToast(message) {
    if (!toastEl) return;
    toastEl.textContent = message;
    toastEl.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toastEl.classList.remove("is-visible");
    }, 3200);
  }

  function isPending(url) {
    return !url || url.indexOf("PENDIENTE") === 0;
  }

  /* 1. Enlaces configurables: data-link="CLAVE" */
  document.querySelectorAll("[data-link]").forEach(function (el) {
    var key = el.getAttribute("data-link");
    var url = cfg.links[key];
    if (isPending(url) && el.hasAttribute("data-hide-if-pending")) {
      var holder = el.closest("[data-hide-if-pending-parent]") || el;
      holder.hidden = true;
      return;
    }
    if (isPending(url)) {
      el.setAttribute("href", "#");
      el.setAttribute("data-pending", "true");
      el.addEventListener("click", function (e) {
        e.preventDefault();
        showToast("Este enlace todavía no está configurado.");
      });
    } else {
      el.setAttribute("href", url);
      if (/^https?:\/\//i.test(url)) {
        el.setAttribute("target", "_blank");
        el.setAttribute("rel", "noopener noreferrer");
      }
    }
  });

  /* 2. Correo: texto y mailto salen de la misma constante */
  document.querySelectorAll("[data-email]").forEach(function (el) {
    el.setAttribute("href", "mailto:" + cfg.email);
  });
  document.querySelectorAll("[data-email-text]").forEach(function (el) {
    el.textContent = cfg.email;
  });

  /* 3. Año del copyright */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* 4. Menú móvil */
  var header = document.querySelector(".site-header");
  var toggle = document.querySelector(".nav-toggle");
  var menu = document.getElementById("menu");

  function setMenu(open) {
    if (!toggle || !menu) return;
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
    header.classList.toggle("menu-open", open);
    document.body.classList.toggle("no-scroll", open);
  }

  if (toggle) {
    toggle.addEventListener("click", function () {
      setMenu(toggle.getAttribute("aria-expanded") !== "true");
    });
    menu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { setMenu(false); });
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") setMenu(false);
    });
    window.addEventListener("resize", function () {
      if (window.innerWidth > 800) setMenu(false);
    });
  }

  /* 5. Sombra de la barra al hacer scroll */
  function onScroll() {
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* 6. Aparición suave de secciones */
  var reveals = document.querySelectorAll(".reveal");
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if ("IntersectionObserver" in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("is-in"); });
  }

  /* 7. Enlace activo en el menú según la sección visible */
  var navLinks = document.querySelectorAll(".nav-link");
  var sections = Array.prototype.map.call(navLinks, function (a) {
    return document.querySelector(a.getAttribute("href"));
  });
  if ("IntersectionObserver" in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          navLinks.forEach(function (a) {
            a.classList.toggle("is-active", a.getAttribute("href") === "#" + entry.target.id);
          });
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach(function (s) { if (s) spy.observe(s); });
  }
})();
