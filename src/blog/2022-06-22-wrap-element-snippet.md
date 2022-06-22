---
title: "Wrap element snippet"
description: "A small JavaScript snippet that wraps an existing HTML element with a new element"
date: 2022-06-22
tags:
 - snippet
 - code
---
I've found myself needing to do this on a couple of projects lately so it seemed like a good idea to write it down here as a snippet to reference later.

This sort of a vanilla replacement for [jQuery's `.wrap()` method](https://api.jquery.com/wrap/)

```js
/**
 * Helper function to wrap one element with a new element
 *
 * @param {String} wrapWith - the name the element to create as the wrapper
 * @param {Element} toWrap - The existing element to wrap
 * @param {Object} attributes - An object of key value pairs used to create HTML attributes
 */
function wrap(wrapWith, toWrap, attributes) {
  const wrapperElement = document.createElement(wrapWith);
  if (attributes) {
    for (let attr in attributes) {
      wrapperElement.setAttribute(attr, attributes[attr])
    }
  }
  toWrap.parentNode.insertBefore(wrapperElement, toWrap)
  wrapperElement.appendChild(toWrap)
}
```