(function () {
  // Treat "/" as "index.html" and highlight the active nav link
  var herePath = location.pathname.replace(/\/+$/, "");
  var here = (herePath.split("/").pop() || "index.html").toLowerCase();

  document.querySelectorAll("a.nav-link").forEach(function (a) {
    try {
      var url = new URL(a.getAttribute("href"), location.href);
      var target = (url.pathname.replace(/\/+$/, "").split("/").pop() || "index.html").toLowerCase();
      if (target === here) {
        a.setAttribute("aria-current", "page");
        a.classList.add("active");
      }
    } catch (e) {
      /* ignore malformed hrefs */
    }
  });

  // Smooth scroll for in-page anchors
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener("click", function (event) {
      var targetId = this.getAttribute("href").slice(1);
      var targetEl = document.getElementById(targetId);
      if (targetEl) {
        event.preventDefault();
        targetEl.scrollIntoView({ behavior: "smooth" });
        history.replaceState(null, "", "#" + targetId);
      }
    });
  });
})();
