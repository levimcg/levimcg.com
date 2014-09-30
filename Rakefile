# Most of this is from Mig Reyes' "Hazelnut" Rakefile
#https://github.com/migreyes/hazelnut

url_live    = "website.com"

deploy_user = "user@website.com"
deploy_path = "public_html/directory"


desc "Fire up Jekyll and watch for changes"
	task :jekyll do
		system "jekyll serve -w --baseurl '' "
	end

desc "build _site directory"
	task :build do
		system "jekyll build"
	end

desc "Upload site to live server"
task :deploy do
  puts "Deploying at http://#{url_live}!"
  system "rsync -avze 'ssh -p 22' _site/ #{deploy_user}:#{deploy_path}"
end