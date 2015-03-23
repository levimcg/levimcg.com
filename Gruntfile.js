module.exports = function(grunt) {
    grunt.initConfig({
        // Compile Sass
        sass: {
            dev: {
                files: {
                    'css/style.css': '_sass/style.scss'
                },
                options: {
                    style: 'expanded'
                }
            },
            build: {
                files: {
                    'css/style.css': '_sass/style.scss'
                },
                options: {
                    style: 'compressed'
                }
            }
        },
        // Watch task
        watch: {
            sass: {
                files: '_sass/**/*.scss',
                tasks: ['sass:dev']
            },
            js: {
                files: ['js/**/*.js', '!js/scripts.js'],
                tasks: ['concat']
            }
        },
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

    grunt.registerTask(
        'default',
        'Watches and compiles Sass and js files',
        ['browserSync', 'exec:serve']
    );
};
