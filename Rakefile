desc "Fire up Jekyll and watch for changes"
	task :jekyll do
		system "jekyll serve -w"
	end

desc "build _site directory"
	task :build do
		system "jekyll build"
	end

desc "Have Sass watch for changes and compile"
	task :sass do
		system "sass --watch _sass/style.scss:css/style.css --style expanded"
	end

desc "Compile minified css with Sass"
	task :sass_prod do
		system "sass --update _sass/style.scss:css/style-min.css --style compressed"
	end