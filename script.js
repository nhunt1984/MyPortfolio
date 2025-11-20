(function () {
  var THEME_KEY = 'preferred-theme';
  var body = document.body;

  function setTheme(theme, persist) {
    if (theme !== 'light' && theme !== 'dark') {
      return;
    }

    body.dataset.theme = theme;
    if (persist) {
      try {
        localStorage.setItem(THEME_KEY, theme);
      } catch (err) {
        /* ignore storage errors */
      }
    }
    syncActiveStates(theme);
  }

  function getStoredTheme() {
    try {
      return localStorage.getItem(THEME_KEY);
    } catch (err) {
      return null;
    }
  }

  function syncActiveStates(theme) {
    document.querySelectorAll('[data-theme-choice]').forEach(function (button) {
      var isActive = button.getAttribute('data-theme-choice') === theme;
      button.classList.toggle('is-active', isActive);
      button.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });

    var toggle = document.querySelector('[data-theme-toggle]');
    if (toggle) {
      toggle.textContent = theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
    }
  }

  function initTheme() {
    var stored = getStoredTheme();
    var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    var initial = stored || (prefersDark ? 'dark' : 'light');
    setTheme(initial, false);
  }

  function handleNavHighlight() {
    var herePath = location.pathname.replace(/\/+$/, '');
    var here = (herePath.split('/').pop() || 'index.html').toLowerCase();

    document.querySelectorAll('a.nav-link').forEach(function (a) {
      try {
        var url = new URL(a.getAttribute('href'), location.href);
        var target = (url.pathname.replace(/\/+$/, '').split('/').pop() || 'index.html').toLowerCase();
        if (target === here) {
          a.setAttribute('aria-current', 'page');
          a.classList.add('active');
        }
      } catch (e) {
        /* ignore malformed hrefs */
      }
    });
  }

  function bindThemeControls() {
    document.querySelectorAll('[data-theme-choice]').forEach(function (button) {
      button.addEventListener('click', function () {
        setTheme(button.getAttribute('data-theme-choice'), true);
      });
    });

    var toggle = document.querySelector('[data-theme-toggle]');
    if (toggle) {
      toggle.addEventListener('click', function () {
        var current = body.dataset.theme === 'dark' ? 'dark' : 'light';
        setTheme(current === 'dark' ? 'light' : 'dark', true);
      });
    }
  }

  initTheme();
  handleNavHighlight();
  bindThemeControls();
})();
