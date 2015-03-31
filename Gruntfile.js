module.exports = function(grunt) {
    grunt.initConfig({
        // Read package.json so that we can store our deploy variables.
        pkg: grunt.file.readJSON('package.json'),
        // BrowserSync automatically reloads everything This is a little wonky
        // right now. You have to run the default "grunt" command now to start Jekyll
        // and then open a new terminal tab and run "grunt bs" to use BrowserSync
        browserSync: {
            bsFiles: {
                src: ['css/*.css', 'js/**/*.js', '**/*.html']
            },
            options: {
                server: {
                    baseDir: '_site'
                }
            }
        },
        // Concatenate js files
        concat: {
            js: {
                src: ['_site/js/**/*.js', '!_site/js/scripts.js'],
                dest: '_site/js/scripts.js'
            }
        },
        // Minify js files
        uglify: {
            js: {
                src: '_site/js/scripts.js',
                dest: '_site/js/scripts.js'
            }
        },
        clean: {
            build: {
                src: ['_site']
            }
        },
        exec: {
            // Run Jekyll, watch for changes
            serve: {
                cmd: 'jekyll serve'
            },
            // Build Jekyll site for deployment
            build_message: {
                cmd: 'echo "Building a fresh copy of you site ready to deploy!"'
            },
            build: {
                cmd: 'jekyll build --config _config.yml,_build.yml'
            },
            deploy_message: {
                cmd: 'echo "Deploying your site to <%= pkg.deployPath %>"'
            },
            deploy: {
                cmd: 'rsync -avze ssh --progress _site/ <%= pkg.deployUser %>:<%= pkg.deployPath %>'
            }
        }
    });

    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-exec');

    grunt.registerTask('default', ['exec:serve']);
    grunt.registerTask('bs', ['browserSync']);
    grunt.registerTask('build', ['exec:build_message', 'clean:build', 'exec:build']);
    grunt.registerTask('live', ['exec:deploy_message', 'exec:deploy']);
};
