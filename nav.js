(function () {
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
})();
