module.exports = function(grunt) {
    grunt.initConfig({
        // BrowserSync automatically reloads everything
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
            }
        }
    });

    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-exec');

    grunt.registerTask('default', ['exec:serve']);
    grunt.registerTask('build', ['exec:build_message', 'exec:build'])
    grunt.registerTask('live', ['browserSync']);
};
