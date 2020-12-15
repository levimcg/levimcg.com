---
title: "Copyright Snippet"
description: "A small JavaScript code snippet that helps keep your footer copyright up to date. (with bonus CustomElement)"
date: 2020-12-15
tags:
 - snippet
---
It's that time of year again, so I thought I'd do a quick post on the simple bit of JavaScript I use to keep the copyright date current in the static sites I build.

```js
(function() {
  document.addEventListener('DOMContentLoaded', function() {
    // Update this to whatever selector you want.
    const element = document.querySelector('[data-copyright]');
    if (element) {
      element.removeAttribute('hidden');
      element.innerHTML = `&copy; ${new Date().getFullYear()}`;
    }
  });
})();
```

## Custom Element
As a bonus, here's a tiny custom element I made that does the same thing. This way you can just wrap your static text in a `<copyright-element>` tag and as long as the browser is capable and you scripts loaded, you get an upgraded, up-to-date footer copyright date.

```js
class CopyrightElement extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `&copy; ${new Date().getFullYear()}`;
  }
}

if ('customElements' in window) {
  window.customElements.define('copyright-element', CopyrightElement);
}
```