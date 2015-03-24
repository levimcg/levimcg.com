## Blanks

A decent starting point for building a [Jekyll](http://jekyllrb.com/) site. This is the is boilerplate I use for starting any Jekyll sites. Along with the template files, here are a couple of nice-to-haves when you are getting up and running with Jekyll.

### Grunt
I've recently added a [Grunt](http://gruntjs.com/) set up to help automate development and deployment of your Jekyll site. The default task ```grunt``` will fires up Jekyll and tells it to watch for changes. I'm also using Jekyll to compile Sass.

You can add your specific site variables ```deployUser``` & ```deployPath``` to the ```package.json``` file if you want to use it. These variables are used in the ```grunt live``` task that will deploy your site using [rsync](https://rsync.samba.org/).

