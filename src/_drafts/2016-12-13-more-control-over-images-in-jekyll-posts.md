---
layout: post
title: More Control Over Images In Jekyll Posts
teaser: Using Jekyll includes to give you more options when working with Jekyll posts
category: Article
---
I use [Jekyll](http://jekyllrb.com/) for most personal sites I build these days if I can get away with it. I love being able to write  my content in [Markdown](https://daringfireball.net/projects/markdown/) and having Jekyll spit out the HTML. The only sticky point for me is the lack of options when it comes to dealing with images in a markdown files. I know the whole point of Markdown is to be simple and readable on it's own, but sometimes I'd really like to have control over the way images are marked up. For instance, what if I wanted to add a caption to an image in my post? As it stands, Markdown doesn't really have an easy way to do that.

Heres' an example. I'd really like to have the images in my post be marked up using the HTML5 `figure` and `figcaption` elements. So, something like this:

{% highlight html %}
<figure>
    <img src="http://www.fillmurray.com/600/400" alt="A pretty picture">
    <figcaption>Bill Murray</figcaption>
</figure>
{% endhighlight %}

What you get with default [Markdown syntax](https://daringfireball.net/projects/markdown/syntax#link) is converted to HTML is this:

{% highlight html %}
<img src="http://www.fillmurray.com/600/400" alt="A pretty picture">
{% endhighlight %}

That's actually pretty great if all you want to do is throw a couple of images in your post and aren't that concerned with the markup. Add some top and bottom margin to the `img` element in your CSS and you're good. This is perfectly acceptable, but here's a couple of things that I want to have:

- A way to add more [semantic meaning](https://developer.mozilla.org/en-US/docs/Web/HTML/Element) to my images. In this case using the `<figure>` HTML5 element
- Have a way to add CSS classes to my image markup so that I can style it in different ways with CSS.  




<!-- But want if you want to do something a little more unique like break the image out the main content column of your post? -->
