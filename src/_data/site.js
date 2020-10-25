module.exports = {
  env: process.env.ELEVENTY_ENV,
  title: "Levi McGranahan",
  tagline: "I'm a designer and front-end developer trying to help make the web more usable and accessible for everyone.",
  username: "levimcg",
  baseurl: "https://levimcg.com",
  artwork: "https://s3.amazonaws.com/levimcg-artwork",
  navigation: [
    {
      label: "Posts",
      url: "/posts/"
    },
    {
      label: "About",
      url: "/about/"
    },
    {
      label: "Artwork",
      url: "https://levimcg.myshopify.com/"
    }
  ],
  links: [
    {
      title: "Bookshelf",
      url: "/bookshelf/"
    },
    {
      title: "Artwork",
      url: "https://levimcg.myshopify.com/"
    },
    {
      title: "Twitter",
      url: "https://twitter.com/levimcg/",
      me: true
    },
    {
      title: "Instagram",
      url: "https://www.instagram.com/levimcg/",
      me: true
    },
    {
      title: "GitHub",
      url: "https://github.com/levimcg/",
      me: true
    },
    {
      title: "RSS",
      url: "/feed.xml"
    }
  ]
}