---
title: Accordion Container Web Component
description: I built a tiny Custom Element wrapper that turns a set of headings and divs into an accessible accordion widget
date: 2020-01-18T18:37:56.677Z
tags:
  - post
  - code
  - web components
---
One of the things that interests me about Web Components is that they make it possible to build components that can be progressively enhanced. [I recently wrote about](../progressive-enhancement-doesnt-have-to-be-hard/) how I've been making progressive enhancement more of a priority in my work, and the idea putting that into practice with Web Components has me feeling pretty excited.

After read [this post about by Dave Rupert](https://daverupert.com/2019/12/why-details-is-not-an-accordion/) about his experiment building an accordion Web Component out of the native `<details>` element, it got me thinking about how one might go about building an accessible accordion as a Web Component.

A while back [I wrote a post](../focus-trapping-web-component/) about the idea of using Web Components as high-level wrappers that handle things like interactivity and accessibility requirements, but that aren't concerned with rendering the component's markup/DOM. Web component features like the `<slot>` element make this possible and are built to make progressive enhancement easier.

When I think about what an ideal `accordion` HTML element might look like, I would expect to see something like this.

```html
<accordion>
  <accordion-panel title="First summary title for toggle">
    Panel content...
  </accordion-panel>
  <accordion-panel title="Second summary title for toggle">
    Panel content...
  </accordion-panel>
  <accordion-panel title="Third summary title for toggle">
    Panel content...
  </accordion-panel>
</accordion>
```

In fact, this was the first approach I took when I started to build an accordion component. But, as Dave pointed out in his post, it's important to get heading semantics right in an accordion. The ARIA authoring practices guide has pretty clear requirements about how all toggles should be wrapped in elements that have a _heading_ role. Following the approach above could be difficult since I would need to make sure all the appropriate roles (button, heading, etc.) were added manually since custom elements don't have any inherent roles as far as the browser is concerned. I decided to go a different route, especially after reading [Léone Watson's](https://tink.uk/) [great article](https://www.24a11y.com/2019/web-components-and-the-aom/) about some of the limitations around Web Component accessibility. 

## "Container" components
While doing more research [I came across this](https://github.com/github/tab-container-element/) `<tab-container>` element by the folks at GitHub. As I talked about with my `<focus-trapper>` example earlier. This kind of _wrapper_ approach makes a lot of sense to me. I kind of like to think of this approach as regular old vanilla JavaScript widgets or plugins, except they can be used declaratively in your HTML. So instead of initializing like a normal JS plugin:

```js
const myAccordion = new Accordion({
  // Some optins or whatever 
});
```

You could maybe just put it in a `<script>` tag and then use it in your HTML.

```html
<script type="module" src="path/to/component.js">

<accordion-container>
  <!-- Put your HTML here and the component wrapper will take care of the rest-->
</accordion-container>
```

## My accordion-container element
This is the approach I took for the `<accordion-container>` Custom Element I build over my holiday break. It fully follows the ARIA Authoring Practices [recommendations for accordions](https://w3c.github.io/aria-practices/#accordion) and is progressively enchanced so if JS isn't available or fails for some reason, you still will see all of the accordion content. [The source is available on GitHub](https://github.com/levimcg/accordion-container-element) where you can find documentation about how to use it, and here's a quick CodePen demo.

<p class="codepen" data-height="431" data-theme-id="13463" data-default-tab="result" data-user="levimcg" data-slug-hash="ZEYapRY" style="height: 431px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Accordion container element demo">
  <span>See the Pen <a href="https://codepen.io/levimcg/pen/ZEYapRY">
  Accordion container element demo</a> by Levi McGranahan (<a href="https://codepen.io/levimcg">@levimcg</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

