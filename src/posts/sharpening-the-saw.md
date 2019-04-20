---
title: "Sharpening the saw"
date: 2019-04-19
---
I saw [James Victore](https://www.jamesvictore.com/) (I'm pretty sure it was him) speak at a conference back in 2013 where he talked about *sharpening the saw*. The idea being that you need to take the time to rest, to read books, and practice your craft. 

I think about this a lot when it comes to design and development. As you move through your career there will be times where your responsibilities start to change. This means that sometimes it will be your job to do other things besides design screens or write code.

I'm experiencing that right now in my career. My day-to-day mostly involves meetings, delegating work, and writing proposals and meeting agendas. This means that I don't get a lot of time to actually write code, try out new technologies, or learn about new techniques. If I'm totally honest, this bums me out a little bit. 

The good news is I always have my own personal site to tinker with. I tend to use it as a playground where I can try out new tools and techniques I want to learn about. Awhile back I decided to add a theme switcher to my site. This was mainly and excuse to learn a little bit more about [CSS custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/--*) and using the [localStorage API](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage).

I probably could have just found some code to swipe and use on my own site. It's kind of a trivial problem really, but I chose to instead figure it out. First, I wrote some sloppy code that toggled a CSS class on the `body` element of my site. Once that was working, I added some functionality that stored the toggled state when navigating from page to page. After that, I added the ability customize the name of the class used to apply the theme, and so on. 

What I ended up with was a pretty useful piece of code for adding a theme switcher to your site. Since most of the work was already done, I decided to turn it into a little [JavaScript library](https://github.com/levimcg/themur). Less than a day's worth of work and it gave me the opportunity to practice all of these:

- Refactoring my code
- Writing useful documentation (this is a really important skill to practice)
- Learning the ins and outs of using Rollup to create different types of bundles

Now, I realize that toggling a CSS class is not rocket science, but for me this was a clear opportunity to *sharpen the saw* a little bit.