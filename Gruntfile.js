module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        bower: {
            install: {
                options: {
                    install: true,
                    copy: false,
                    // targetDir: '/libs',
                    cleanTargetDir: true
                }
            }
        },
        jshint: {
            all: ['Gruntfile.js', 'src/*.js', 'src/**/*.js']
        },
        karma: {
            options: {
                configFile: 'config/karma.conf.js'
            },
            unit: {
                singleRun: true
            },

            continuous: {
                singleRun: false,
                autoWatch: true
            }
        },
        html2js: {
            dist: {
                src: ['src/**/*.html'],
                dest: 'tmp/templates.js'
            }
        },
        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: ['src/**/*.module.js', 'src/**/*.controller.js', 'src/**/*.service.js', 'src/**/*.js', 'tmp/*.js'],
                dest: 'dist/app.js'
            },
            sass:{
                src:['src/app/sass/*.scss', 'src/app/sass/**/*.scss'],
                dest: 'dist/styles.scss'
            }
        },
        uglify: {
            dist: {
                files: {
                    'dist/app.js': ['dist/app.js']
                },
                options: {
                    mangle: false
                }
            }
        },
        sass: {
            options: {
                sourceMap: true,
                outputStyle: 'compressed'
            },
            dist: {
                files: {
                    'dist/styles.css': 'dist/styles.scss'
                }
            }
        },
        clean: {
            temp: {
                src: ['tmp']
            }
        },
        watch: {
            dev: {
                files: ['Gruntfile.js', 'src/**/*.js', 'src/**/**/*.js', 'src/**/*.html', '*.js','src/sass/components/*.scss'],
                tasks: ['html2js:dist', 'concat:dist', 'clean:temp', 'bsass'], //'karma:unit','jshint',
                options: {
                    spawn: false,
                    // livereload: true
                }
            },
            sass: {
                files: ['src/app/sass/**/*.{scss,sass}', 'sass/_partials/**/*.{scss,sass}'],
                tasks: ['sass:dist']
            },
            livereload: {
                files: ['Gruntfile.js', 'app/**/*.js', 'app/**/**/*.js', 'app/**/*.html', '*.js'],
                options: {
                    livereload: true
                }
            },
            min: {
                files: ['Gruntfile.js', 'src/*.js', '*.html'],
                tasks: ['jshint', 'karma:unit', 'html2js:dist', 'concat:dist', 'clean:temp', 'uglify:dist'],
                options: {
                    atBegin: true
                }
            }
        },
        connect: {
            server: {
                options: {
                    hostname: 'localhost',
                    port: 1234
                }
            }
        },
        compress: {
            dist: {
                options: {
                    archive: 'dist/<%= pkg.name %>-<%= pkg.version %>.zip'
                },
                files: [{
                    src: ['index.html'],
                    dest: '/'
                }, {
                    src: ['dist/**'],
                    dest: 'dist/'
                }, {
                    src: ['assets/**'],
                    dest: 'assets/'
                }, {
                    src: ['libs/**'],
                    dest: 'libs/'
                }]
            }
        },
        jsdoc: {
            dist: {
                src: ['app/**/*.js'],
                options: {
                    destination: 'doc',
                    template: "node_modules/docdash",
                }
            }
        },
        degeni: {

        }

    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    // grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-html2js');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-newer');
    grunt.loadNpmTasks('grunt-sass');

    // grunt.registerTask('dev', ['bower', 'sass','connect:server', 'newer:watch:dev','watch:livereload']);
    grunt.loadNpmTasks('grunt-jsdoc');

    grunt.registerTask('dgeni', 'Generate docs via dgeni.', function() {
        // console.log('inside dgeni');
        var done = this.async();
        var dgeni = new Dgeni([require('dgeni-config')]);

        dgeni.generate().then(done);
    });
    // grunt.registerTask('dev', ['bower','sass', 'connect:server', 'newer:watch:dev','newer:watch:sass']);
    grunt.registerTask('bsass',['concat:sass','sass']);
    grunt.registerTask('dev', ['connect:server', 'newer:watch:dev']);
    grunt.registerTask('test', ['bower', 'jshint', 'karma:continuous']);
    grunt.registerTask('minified', ['bower', 'connect:server', 'watch:min']);
    grunt.registerTask('package', ['bower', 'jshint', 'karma:unit', 'html2js:dist', 'concat:dist', 'uglify:dist',
        'clean:temp', 'compress:dist'
    ]);

};
