---
title: Focus trapping web component
description: A Web Component wrapper that makes it easier to manage focus trapping
date: 2019-06-09
tags:
  - code
  - post
---
I was looking through Microsoft's design system [Fabric](https://developer.microsoft.com/en-us/fabric#/) the other day and came across an interesting component in the _Utilities_ section called [FocusTrapZone](https://developer.microsoft.com/en-us/fabric#/controls/web/focustrapzone). FocusTrapZone is a React component that is used to trap focus inside any HTML element. 

## What does _trapping focus_ mean?
Trapping focus means that when a person uses the <kbd>Tab</kbd> key to navigate through focusable elements inside an area, focus will always be moved from the last focusable element back to the first, and from the first focusable element to the last when using <kbd>Shift + Tab</kbd> to navigate backwards. Trapping focus effectively means creating a loop where a user can only tab to any focusable element within a given container element, for example a modal dialog.

## Why would you want to create a focus trap?
Focus trapping is a technique used to help restrict navigation to a particular region for people who use a keyboard to navigate. Take the modal dialog example I just mentioned. When a user activates a dialog, focus should be moved to the dialog element and subsequent presses of <kbd>Tab</kbd> should move focus to the next focusable element inside the dialog and so on. 

But, what happens when the used reaches the last focusable element in the dialog? The answer is that the dialog remains active/open in the middle of the screen with the underlying content dimmed, while focus moves outside the dialog to the next focusable element in the document. That's not a great user experience, which is why restricting or _trapping_ focus is important.

For more info on focus requirements for dialogs and other common UI components, I highly recommend digging into the [ARIA Authoring practices](https://www.w3.org/TR/wai-aria-practices-1.1/).

## Focus Trapper Web Component
I've been spending a lot of time learning about [Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components) recently and have been itching to build one that was actually useful. So, I decided to see what it would take to bundle up focus trapping functionality into my own Web Component from scratch.

The demo below shows how to use the `focus-trapper` element. When the `trapped` attribute is added, focus will cycle through all the focusable elements inside.

```html
<!-- User the <focus-trapper> element in your HTML -->
<focus-trapper trapped>
  <button type="button">Button one</button>
  <button type="button">Button two</button>
  <button type="button">Button three</button>
</focus-trapper>

<!-- Import focus trapper and register it with the browser -->
<script type="module">
  import FocusTrapper from './path/to/FocusTrapper.js';
  customElements.define('focus-trapper', FocusTrapper);
</script>
```

The idea of being able to build functionality that makes it easier to create more accessible interfaces into a Web Component is super interesting to me. Abstracting away all keyboard event listening and focus management into a declarative component that I can use in my HTML sounds like an ideal solution. I'm really interested to explore other tricky keyboard navigation concepts crucial to making UI components accessible that could similarly be rolled up into a Web Component.

### Focus trapper on GitHub
I put the code for my `focus-trapper` Web Component up on GitHub. I'm sure there are some bugs, and it's mostly an experiment at this point, but I'd love to hear any feedback.

- [Github repository](https://github.com/levimcg/focus-trapper)
- [Demo (with a dialog/modal)](https://levimcg.github.io/focus-trapper/)





