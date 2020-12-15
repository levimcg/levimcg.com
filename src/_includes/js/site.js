class CopyrightElement extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `&copy; ${new Date().getFullYear()}`;
  }
}
if ('customElements' in window) {
  window.customElements.define('copyright-element', CopyrightElement);
}

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
      entry.target.removeAttribute('data-src');
    }
  });
}

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(handleIntersection, {
    threshold: 0.5
  });

  images.forEach(image => {
    observer.observe(image);
  });
} else {
  images.forEach(image => {
    image.setAttribute('src', image.dataset.src);
    image.removeAttribute('data-src');
  })
}