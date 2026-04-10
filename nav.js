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

(function () {
    var lightbox = document.getElementById("lightbox");
    var lightboxImg = document.getElementById("lightbox-img");

    document.querySelectorAll("img.expandable").forEach(function (img) {
        img.addEventListener("click", function () {
            lightboxImg.src = img.src;
            lightboxImg.alt = img.alt;
            lightbox.setAttribute("aria-hidden", "false");
        });
    });

    lightbox.addEventListener("click", function (e) {
        if (e.target !== lightboxImg) {
            lightbox.setAttribute("aria-hidden", "true");
        }
    });

    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && lightbox.getAttribute("aria-hidden") === "false") {
            lightbox.setAttribute("aria-hidden", "true");
        }
    });
})();
