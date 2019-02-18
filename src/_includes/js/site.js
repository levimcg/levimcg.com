const copyright = (function() {
  function createCopyright(container) {
    const containerEl = document.getElementById(container);

    const currentDate = new Date().getFullYear();

    containerEl.innerText = currentDate;
  }

  function init(container) {
    document.addEventListener(
      'DOMContentLoaded',
      createCopyright(container),
      false
    );
  }

  return {
    init: init
  };
})();

const themeSwitcher = (function() {
  const toggle = document.getElementById('theme-switcher');

  function enableDarkMode(element) {
    element.setAttribute('aria-checked', 'true');

    localStorage.setItem('darkMode', 'true');

    document.body.classList.add('mcg-dark-theme');
  }

  function disableDarkMode(element) {
    element.setAttribute('aria-checked', 'false');

    localStorage.setItem('darkMode', 'false');

    document.body.classList.remove('mcg-dark-theme');
  }

  function handleThemeSwitch() {
    const darkModeEnabled = localStorage.getItem('darkMode');

    darkModeEnabled === 'false'
      ? enableDarkMode(toggle)
      : disableDarkMode(toggle);
  }

  function init() {
    const darkMode = localStorage.getItem('darkMode');

    if (!darkMode) localStorage.setItem('darkMode', false);

    if (darkMode === 'true') {
      document.body.classList.add('mcg-dark-theme');

      enableDarkMode(toggle);
    }

    toggle.addEventListener('click', handleThemeSwitch, false);
  }

  return {
    init: init
  };
})();

copyright.init('mcg-copy-year');
themeSwitcher.init();
