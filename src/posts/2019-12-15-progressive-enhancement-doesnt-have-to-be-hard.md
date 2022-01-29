---
title: Progressive enhancement doesn't have to be hard
description: Implementing a strategy for progressive enhancement might be easier than you think
date: 2019-12-15
permalink: "blog/progressive-enhancement-doesnt-have-to-be-hard/"
tags:
  - code
  - "progressive enhancement"
---
I maintain a lightweight JavaScript theme switcher library called [*Themur*](https://github.com/levimcg/themur). The other day I was adding a new feature that automatically detects a user’s OS theme settings by looking at the `prefers-color-scheme` media query and got to thinking about what would happen to Themur if for some reason JS wasn't available or the script failed to load. I'll be the first to admit that a lot of the JavaScript I've written in the past has been pretty poor in terms of considering progressive enhancement, but it's and area where I want to do better. As I made this somewhat un-related update to my code, I also took the opportunity to consider how I might progressively layer on the functionality that Themur provides.

## How does it fail?
If you don't know what *progressive enhancement* is, it means considering what the baseline experience of your webpage is without JavaScript and then layering functionality on once you know JS is available. It's wild because in engineering terms this question, *how does it fail?,* should be the first one we ask, but oftentimes it is never even considered in front-end development. A good example is most client-side JS frameworks that render the entire UI in the browser, how would your app or site fail in that situation? How would Themur fail if javascript wasn’t available or there was an error loading the script?

## Enhancing Themur
Themur works by taking in a `toggleElement` option (generally a button) and then listening for clicks on that button element. The button element then toggles a CSS class on the `document.body` element or any other element the user supplies via the `containerElement` option. So, if something went wrong loading the Themur script, you'd end up with a toggle button on the page that did nothing, which is not a great user experience. But, how would I progressively enhance a library like Themur? The answer turned out to be pretty dang easy!

You can look more closely at [the source code](https://github.com/levimcg/themur) if you want, but in a nutshell, Themur does some initial setup where it adds the correct HTML attributes to the theme toggle button and the document body via a function called `setUpInitialState`. This turned out to be the perfect place to layer on some functionality as long as JavaScript was available. The solution I landed on was deceptively simple. It looks like this.

1. Hide the toggle button using the `hidden` attribute in your button markup by default
2. Remove the `hidden` attribute in the `setUpInitialState` function once you're sure JavaScript is available
3. That's it! 

```html
<!-- Toggle button markup -->
<button id="my-toggle-button" hidden>Toggle theme</button>
```

```javascript
export default class Themur {
  constructor(options) {
    // Call our set up function
    this.setUpInitialState();	
  }

  setUpInitialState() {
    // Other implementation details...
    this.toggleElement.removeAttribute('hidden');
  }
}
```

This approach works really well for Themur because it's non-essential functionality. That means it's not required for a user to interact with your page—if it's not there, no one will know the difference. It will be as if you never used Themur in the first place, which is totally fine and an acceptable baseline experience.

In this case, Themur itself is an enhancement, but when you think about it so are a lot of the common UI patterns that we don't provide fallbacks for e.g. tabs, accordions, etc. This approach to progressive enhancement won't necessarily work for every situation, but it's got me thinking more about how the interfaces I'm building fail and how to make them more resilient using progressive enhancement.