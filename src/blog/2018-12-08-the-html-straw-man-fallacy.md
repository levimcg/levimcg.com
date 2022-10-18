---
title: The HTML Straw Man Fallacy
description: You don't need to worry about the size of your HTML if you're using tons of JavaScript
date: 2018-12-08
tags:
  - code
  - favorite
---
When I write CSS I generally favor clarity over brevity when choosing the way I name classes/components. I will admit that this can make for some pretty long class names and can look a little weird if you're using a naming convention like BEM.

For example:

```html
<div class="profile profile--compact">
  <div class="profile__image profile__image--large">
    <img src="path/to/image">
  </div>
  <div class="profile__bio">
    <!-- Profile content -->
  </div>
</div>
```

To me those class names are perfectly descriptive and easy to remember, especially after six months away from a project when I have to come back and work on this code. Yes, class names like this cause a few extra keystrokes for developers, but I tend to feel the extra effort is worth it. Also, we have great tools that do things like [auto-complete class names for us](https://marketplace.visualstudio.com/items?itemName=Zignd.html-css-class-completion).

Recently, a couple of developers have tried to make the argument to me that long class names make the HTML sent over the network larger in file size and therefore slower. What this argument really boils down to is prioritizing convenience and developer experience over clarity and maintainability.

The idea that CSS class names are making your app slow is, of course, a [straw man](https://en.wikipedia.org/wiki/Straw_man), as more and more developers are using massive amounts of JavaScript, [the most CPU-intensive asset](https://speedcurve.com/blog/your-javascript-hurts/) for web browsers to process, to render the entire UI of their app. If you are not _actually sending HTML_ over the network (i.e. it's being built on the client), can you really argue that the size of the HTML is making your app slow?

I dunno, I could be wrong, but maybe we should address the giant elephant in the room. Maybe the size of the giant JavaScript bundles we're sending over the network, creating one single point of failure for our entire UI, should be the first thing we talk about when making arguments for better performance?