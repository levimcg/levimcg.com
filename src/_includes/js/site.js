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

// Lazy load images
const images = Array.prototype.slice.call(
  document.querySelectorAll('img')
);

function handleIntersection(entries, observer) {
  entries.forEach(entry => {
    if (entry.intersectionRatio > 0 && !entry.target.hasAttribute('src')) {
      const imageSrc = entry.target.dataset.src;
      entry.target.setAttribute('src', imageSrc);
      entry.target.setAttribute('class', 'lazyloaded');
    }
  });
}

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(handleIntersection, {
    threshold: 0.1
  });

  images.forEach(image => {
    observer.observe(image);
  });
} else {
  images.forEach(image => {
    image.setAttribute('src', image.dataset.src);
  })
}