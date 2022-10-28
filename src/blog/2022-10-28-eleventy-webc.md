---
title: My notes on Eleventy WebC components
description: WebC is a compiler for single file Web Components that has some very exciting implications for Eleventy!
date: 2022-10-28
tags:
  - code
  - web components
  - progressive enhancement
  - eleventy
---
## A first-class component model for 11ty!

The WebC plugin brings a component model similar to frameworks like Vue and Svelte to [Eleventy](https://www.11ty.dev/). It allows you to create HTML-only components (basically includes) all the way up to interactive Web Components with shadow DOM and all the benefits it offers.

I generally get by just fine without components in 11ty. Nunjucks macros are fine, but they never really felt like true components to me. They also are super clunky to work with, IMO.

[Shortcodes](https://www.11ty.dev/docs/shortcodes/) are great, but they also feel just a small step away from first-class components. WebC components bring all of the things you would expect from a component model—the [ability to pass in "props"](https://www.11ty.dev/docs/languages/webc/#props-(properties)), [slots](https://www.11ty.dev/docs/languages/webc/#slots) for placing content, [CSS scoping](https://www.11ty.dev/docs/languages/webc/#webcscoped)—to Eleventy.

## Killer features

Here are some of my initial impressions that got me excited about the Eleventy WebC plugin. I'm sure I'll need to add to this list as I get a bit more experience under my belt.

### Slots and composition

Slots in WebC components do a bit more than the standard `<slot>` element used in Web Components. They have the ability to work just like Web Component/custom element slots, but they can also function similar to something like the built-in `props.children` in React.

I see a lot of potential here. You could do some very cool things when combined with layout chaining like create your own template/layout inheritance without having to use Nunjucks layout inheritance, or create compound components like a site header:

```html
<site-header>
	<site-header-logo slot="logo"></site-header-logo>
	<site-header-nav slot="nav"></site-header-nav>
</site-header>
```

### Render functions

[Render functions](https://www.11ty.dev/docs/languages/webc/#webctyperender-(javascript-render-functions)) are pretty cool. To me, they seem a lot like shortcodes except you don't have to register them in your `.eleventy.js` (or whatever yours is called) config file. Instead, you can keep them alongside your other components or includes as a HTML/.webc file. Here's and example of a simple list component using a render function.

```html
<h2><slot></slot></h2>
<ul>
	<script webc:type="render" webc:is="template">
	function renderItems() {
		const numbers = ['One', 'Two', 'Three']
		return numbers.map(number => `<li>${number}</li>`).join('')
	}
	</script>
</ul>
```

## Concepts I need more time with

It usually takes me a while to really wrap my head around new concepts like this. I'm sure I'll get there once I have the chance to work through some real-world use cases, but are some things that aren't quite clicking for me yet.

### Gimme some sugar

I LOVE the idea of 11ty single file components, but it would rule to have some syntactic sugar for flow control similar to Vue, Svelte, etc. Also a mustache-like syntax for expressions that render data, variables, etc would be very handy. I could just be missing something here though.

Maybe a lot of folks are going to prefer what feels, in my opinion, more like JSX with render functions and the `<script>` tag plus `webc:type="render"` approach shown above. I dunno? The good news is that it looks like flow control features [are being considered](https://github.com/11ty/webc/issues/28) for the future.

###  Data with props and attributes

Passing props a component for example from some front matter data. Everything ends up passed as a string instead of being rendered as the front matter content. See quote from the docs below.

So far something like this works using a slot for the heading.

```html
---
layout: base.webc
someData: "Eleventy front matter data"
---
<!-- This works -->
<list-component>
	<template @html="someData" webc:nokeep></template>
</list-component>

<!-- This does not -->
<list-component heading="someData"></list-component>
```

```html
<!-- list-component.webc -->

<!-- This does not work -->
<h2 @html="this.heading">
	<!-- This DOES works -->
	<slot></slot>
	<!-- This also does not -->
	<template @html="this.heading" webc:nokeep></template>
</h2>
<ul>
	<script webc:type="render" webc:is="template">
	function renderItems() {
		const numbers = ['One', 'Two', 'Three']
		return numbers.map(number => `<li>${number}</li>`).join('')
	</script>
</ul>
```

I *think* I found the [answer to this](https://www.11ty.dev/docs/languages/webc/#front-matter) on the 11ty WebC plugin docs:

> Notable note: front matter (per standard Eleventy conventions) is supported in page-level templates only (.webc files in your input directory) and not in components...

### Render function all the things?

Maybe everything in the WebC component just needs to be a render function if you want to pass dynamic props in from external data sources? This may be super obvious to some folks, but I feel like I might be missing something here.

I guess you could go this route, but I'm going go ahead and say I'd rather wait and see on the potential enhancements to templating/flow control syntax mentioned above for now.

### Picking the "right" kind of component

I need more experience to figure out the boundary between HTML only and a full-on Web Component (CustomElement + shadowDOM). As soon as you put a script or style tag in a .webc file it will render the custom element but you can use the `webc:nokeep` attribute you get rid of the custom element wrapper/parent.

On the other hand you can register full-on interactive and encapsulated Web Components (ex. `CustomElements.define(...)`) from single file WebC components, which is very cool. I think mixing interactive Web Components/CustomElements with render functions, slots, and HTML-only components has tons of potential to create a great workflow for building stuff.

## Wrapping up for now

People much smarter than me are already writing posts and tutorials on WebC components. Here are some resources I found super helpful in getting started with WebC components in Eleventy.

### Resources

- [Introduction to WebC](https://11ty.rocks/posts/introduction-webc/)— High-level intro on 11ty Rocks!
- [Understanding WebC Features and Concepts](https://11ty.rocks/posts/understanding-webc-features-and-concepts/) — A great primer on 11ty Rocks!
- [11ty docs on WebC Templates](https://www.11ty.dev/docs/languages/webc/)
- [11ty & WebC](https://11ty.webc.fun/) — a great set of quick tips and tutorials

There is so much potential here and I look forward to seeing how webC progresses over the next few months. I'm planning to try and keep this post updated as have more time to dig in and new WebC features roll out.
