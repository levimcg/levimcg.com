---
layout: post
title: More Control Over Images In Jekyll Posts
teaser: Using Jekyll includes to give you more options when working with posts
category: article
---
I use [Jekyll](http://jekyllrb.com/) for most personal sites I build these days if I can get away with it. I love being able to write  my content in [Markdown](https://daringfireball.net/projects/markdown/) and having Jekyll spit out the HTML. The only sticky point for me is the lack of options when it comes to dealing with images in a markdown files. I know the whole point of Markdown is to be simple and readable on it's own, but sometimes I'd really like to have control over the way images are marked up. For instance, what if I wanted to add a caption to an image in my post? As it stands, Markdown doesn't really have an easy way to do that.

## Example

I'd really like to mark up some of the images in my post using the HTML5 `figure` and `figcaption` elements. I'd also like to style these images so that they break out of the main content column to give them a little more emphasis. Ideally, I'm looking for something like this:


<figure>
    <img src="http://www.fillmurray.com/600/400" alt="A portrait of Greatness">
    <figcaption>Bill Murray</figcaption>
</figure>


What you get with default [Markdown syntax](https://daringfireball.net/projects/markdown/syntax#link) is some HTML that looks like this:


<img src="http://www.fillmurray.com/600/400" alt="A portrait of Greatness">

That's actually pretty great if all you want to do is throw a couple of images in your post and aren't that concerned with the markup. Add some top and bottom margin to the `img` element in your CSS and you're good. This is perfectly acceptable, but here's a couple of things that I want to have:

- A way to add more [semantic meaning](https://developer.mozilla.org/en-US/docs/Web/HTML/Element) to my images—In this case using the `<figure>` HTML5 element
- I also want to be able to add `class` attributes to my image markup so that I can style it in different ways with CSS.

## Enter Dynamic Jekyll Includes

One of the great things about using Markdown in Jekyll is that you can also write regular HTML right inside your Markdown. So you might be asking, _Why not just write the HTML the way you want in your post_? You could totally do this and it will work out fine, but I don't want to write that markup every single time or go and find another post and copy and paste it into the one I'm working on. This is where we can harness the power of passing values to [Jekyll includes](http://jekyllrb.com/docs/templates/#includes) in our Markdown posts.

An normal Jekyll include containing my image markup above might look something like this:

{% raw %}{% include breakout-image.html %}{% endraw %}

When Jekyll builds your post it will look inside a folder called `_includes` for a file called `figure.hml` and include that bit of HTML in your post or page. Here's the really cool thing about Jekyll includes. You can use them in your Markdown posts just like in your templates, and you can dynamically assign unique values you define inside the include file each time you use it in a post. Using includes like this saves you the hassle of writing regular HTML in your Markdown files, keeps your markup consistent, and allows you to be flexible with your content. Let's use my `figure.html` include as an example.

The first thing you need to do is define the dynamic values you want inside your include. Based on the example above mine would look like this:

<figure>
    <img src="{% raw %}{{ include.image }}{% endraw %}" alt="{% raw %}{{ include.alt-text }}{% endraw %}">
    <figcaption>{% raw %}{{ include.caption }}{% endraw %}</figcaption>
</figure>

In this file I've defined three values, or parameters that I want to be able to use as custom values each time I include this file. The `include` keyword refers to the include itself and tells Jekyll to look inside the file for these values. My dynamic values are:

1. `image`—This is the URL of the image that I want to use
2. `alt-text`—The unique alternative text for my image
3. `caption`—The caption that gets displayed with the image

Now that these values have been defined, I can specify unique values every time I use this include in my posts. So I can do this inside my normal Markdown:

{% raw %}
{% include breakout-image.html
           image="http://www.fillmurray.com/600/400"
           alt-text="A portrait of Greatness"
           caption="Bill Murray"
%}
{% endraw %}

And the resulting output will be the same as my original static markup above:


<figure>
    <img src="http://www.fillmurray.com/600/400" alt="A portrait of Greatness">
    <figcaption>Bill Murray</figcaption>
</figure>

### Conclusion & Resources

Hopefully now you can see how powerful of a pattern this is. If you want to get even more crazy you can also use variables your post's [Front Matter](http://jekyllrb.com/docs/frontmatter/) as values for your dynamic includes, or use some `if else` statements inside your includes to include fallbacks for values that aren't defined or don't exist. The possiblilities are endless!

If you want to dig a little deeper here are some resources that I've found helpful:

- [Jekyll templates documentation](http://jekyllrb.com/docs/templates/)
- [Particularly the bit about includes](http://jekyllrb.com/docs/templates/#includes)
- [An example of how I use this technique on my site](https://github.com/levimcg/levimcg.com/blob/master/src/_posts/2016-08-28-family-portraits.md)
