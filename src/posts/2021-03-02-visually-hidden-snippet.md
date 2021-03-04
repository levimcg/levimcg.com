---
title: "Visually hidden snippet"
description: "I constantly find myself copying and pasting this snippet into projects"
date: 2021-03-02
tags:
- code
- snippet
---
There are several ways to hide content using CSS. For example using `display: none`, or `visibility: hidden`. Each way of hiding elements is useful in different situations, but this snippet is specifically for visually hiding elements while keeping the accessible to assistive technologies like screen readers.

```css
.visually-hidden:not(:focus):not(:active) {
  clip: rect(0 0 0 0); 
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap; 
  width: 1px;
}
```

[Scott O'Hara](https://www.scottohara.me/) [wrote about this in 2017](https://www.scottohara.me/blog/2017/04/14/inclusively-hidden.html) including a deep dive into all the different ways you can hide stuff and when to use which method. I'd definitely recommend checking out that article too.