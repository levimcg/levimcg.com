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
        // Run Jekyll
        exec: {
            build: {
                cmd: 'jekyll build --baseurl'
            },
            serve: {
                cmd: 'jekyll serve --watch'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-exec');

    grunt.registerTask('jek', ['exec:serve']);
    grunt.registerTask('default', ['browserSync']);
};
