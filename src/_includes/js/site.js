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

// Kick off copyright
copyright.init('mcg-copy-year');

// Theme switcher
const theme = new Themur({
  toggleElement: document.getElementById('theme-switcher'),
  themeClass: 'mcg-dark-theme',
  useLocalStorage: true
});