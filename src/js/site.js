var copyright = (function() {
  function createCopyright(container) {
    var containerEl = document.getElementById(container);

    var currentDate = new Date().getFullYear();

    containerEl.innerText = currentDate;
  }

  function init(container) {
    document.addEventListener('DOMContentLoaded', createCopyright(container), false);
  }

  return {
    init: init
  }
})();

copyright.init('mcg-copy-year');