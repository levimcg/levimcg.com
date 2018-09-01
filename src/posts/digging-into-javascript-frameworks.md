---
tags: post
title: Digging into JavaScript Frameworks
date: 2018-03-24
teaser: "I'm betting on plain old JavaScript for the long game, but what's up with these frameworks?"
layout: "layouts/post.njk"
---
I generally try to spend my time getting better at plain old vanilla JavaScript. Long-term, I think it's the best bet and new JavaScript is pretty great. I haven't spent that much time learning frameworks like React and Vue. I've never really had much of a reason to use them and for me, focusing on the learning JavaScript fundamentals more deeply just makes sense. Lately I've been working with a lot of teams using React and for the sake of being able to communicate better, I wanted to spend some time learning more about it.

## Accessible design patterns
Part of the challenge of making interactive design patters like dropdown menus, tabs, accordions, etc... accessible is that it requires listening for user interaction, keeping track of the state of the DOM, and then updating the DOM to reflect the change in state. Keyboard navigation in particular is a _huge_ part of making components accessible for those that use assistive technologies (AT) or unable to navigate with a mouse. One of the biggest strengths of frameworks like React is that it makes keeping track of state _much_ easier. Instead of attaching event listeners to elements and updating the DOM based on interactions (clicks, and keyboard events), your components can keep track of their own state. So, toggling attributes that convey meaning to AT like, `aria-expanded` and `aria-selected` becomes trivial. This concept of DOM state as data is what kinda got me excited about digging into React.

## Collapsable pattern
I find it _much_ easier to learn a topic if I have a focused task to use as a reason to learn it so I decided to try and create an accessible React version of a pretty common design pattern—a collabsible section.

<p data-height="300" data-theme-id="13463" data-slug-hash="ZvEPgm" data-default-tab="result" data-user="levimcg" data-embed-version="2" data-pen-title="React collapsible" class="codepen">See the Pen <a href="https://codepen.io/levimcg/pen/ZvEPgm/">React collapsible</a> by Levi McGranahan (<a href="https://codepen.io/levimcg">@levimcg</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

## Moving forward
This is a pretty quick and dirty example, but I learned alot about React and how it makes composing components easy. I also realy like how _everything_ is a component in React. This particular pattern could be improved more keyboard features like using up and down arrows to move through the each `<Panel>` inside a `<PanelGroup>`. I'll keep working on it. 🙂