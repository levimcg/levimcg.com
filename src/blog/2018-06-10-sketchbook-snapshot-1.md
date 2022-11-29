---
title: "Sketchbook Snapshot #1"
date: 2018-06-10
description: "Documenting a snapshot in time with recent pages from my sketchbook"
tags:
  - sketchbook
sketchbookPages:
  - https://s3.amazonaws.com/static.levimcg.com/sketchbook/june-2018/page-1.jpg
  - https://s3.amazonaws.com/static.levimcg.com/sketchbook/june-2018/page-2.jpg
  - https://s3.amazonaws.com/static.levimcg.com/sketchbook/june-2018/page-3.jpg
  - https://s3.amazonaws.com/static.levimcg.com/sketchbook/june-2018/page-4.jpg
  - https://s3.amazonaws.com/static.levimcg.com/sketchbook/june-2018/page-5.jpg
  - https://s3.amazonaws.com/static.levimcg.com/sketchbook/june-2018/page-6.jpg
---
Whenever I'm feeling stuck creatively, spending some time in my sketchbook always helps. When I finish a book I archive it by writing the start and end dates on the spine and then putting them on a shelf in my office. After adding the new [Artwork section](../../artwork) to my site, I had the idea try and spend a little time each month cataloging recent sketches/doodles and creating a little snapshot to post here. Here's the first one with a handful of pages from the last month or so.

{% for sketch in sketchbookPages %}
  <img loading="lazy" src="{{ sketch }}">
{% endfor %}