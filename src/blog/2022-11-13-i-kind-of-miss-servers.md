---
title: Static site generator fatigue
description: Thinking about moving my site to a new platform with an actual CMS
date: 2022-11-13
tags:
  - web development
  - eleventy
---
I've been running my site on static site generators (SSG) for a little over eight years now. First it was on [Jekyll](http://jekyllrb.com/) and later on [Eleventy](https://11ty.dev/), which I'm still using today. I really enjoy the simplicity and performance benefits of static sites and building with SSGs is a great developer experience, in my opinion. However, lately I'm starting to feel a handful pain points that have me thinking about moving my site to different platform for content management.

- **VSCode overload** — I would like writing a blog post to be a totally separate experience from writing code. I know writing Markdown isn't the same as writing code, but it's in the same environment where I do a lot of my work during the day. I'd sort of prefer it not to be.
- **Posting is a desktop/laptop only activity**. I would love to be able to fire off posts from my phone while I'm sitting on the couch or in the car on a road trip. With a more traditional CMS it's generally easier to write and publish post on a mobile device since the admin UI is accessible in a web browser and most likely somewhat optimized for smaller screens.
- **Static is great, until it isn't**. I don't generally need to do much server-side stuff on my site, but when I do think about doing anything remotely dynamic, the amount of set up and cobbling services together required sometimes puts me off (see note about Webmentions below).

## PHP is pretty good, actually.

I kind of miss having a server available by default. I was reading Matthias Ott's [great article](https://matthiasott.com/articles/into-the-personal-website-verse) on personal websites this morning and in it they talk a bit about [Webmentions](https://indieweb.org/webmention) and  ways to go about adding them to a personal site. It got me thinking that I would love to add that capability to my site, but being a static, it would involve quite a bit more complexity. I'm not sure I have the appetite for that at the moment. With a PHP running on a server, it would be much more straightforward. Matthias even points out that sever popular CMSs have plugins that make it a pretty simple process.

## Back to a CMS?

[Kirby](https://getkirby.com/) looks really great to me. It seems like there is a really healthy community built up around it and [the Kirby team](https://getkirby.com/new-company) is doing a lot of good work to make it a long-term, sustainable product. I built a site for a client years ago using Kirby and it was a really wonderful experience. In the time since then it looks to me like it has a come a long way and has a ton of really great features out of the box. It allows you to have a folder full of flat files and write in markdown if you want to keep it super simple, but also comes with a really nice and customizable UI (_The Panel_) for managing and writing content. To me that sounds like the best of both worlds.

I think I'll sit with it for a while before I make a decision. I should probably just put all of the energy that it would take to move to a new platform into writing more posts anyway. 😅
