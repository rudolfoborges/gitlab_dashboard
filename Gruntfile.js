module.exports = function(grunt) {

  var gruntConfig = {
    appDIR: 'app',
    distDIR: 'dist'
  };

  grunt.initConfig({
    less: {
      development: {
        options: {
        },
        files: {
          'app/public/assets/css/style.css': ['app/less/*.less']
        }
      }
    },

    watch: {
      less: {
        files: ['app/less/*.less'],
        tasks: ['less'],
        options: {
          nospawn: true
        }
      },

      express: {
        files:  [ gruntConfig.appDIR + '/server/**/*.js' ],
        tasks:  [ 'express:dev' ],
        options: {
          spawn: false
        }
      }
    },

    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            gruntConfig.distDIR + '/**/*'
          ]
        }]
      },
      server: '.tmp'
    },

    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: gruntConfig.appDIR,
          dest: gruntConfig.distDIR,
          src: [
            '*.{ico,png,txt}',
            '.htaccess',
            'public/lib/**/*',
            'public/assets/images/**/*',
            'public/**/*.html',
            'public/**/*.ejs',
            'server/**/*'
          ]
        },
        {
          expand: true,
          dot: true,
          cwd: '.tmp/concat/js',
          dest: gruntConfig.distDIR + '/public/assets/js/',
          src: [
            '*.min.js'
          ]
        },
        {
          expand: true,
          dot: true,
          cwd: '.tmp/concat/css',
          dest: gruntConfig.distDIR + '/public/assets/css/',
          src: [
            '*.min.css'
          ]
        }]
      }
    },

    concat: {
      js: {
        files: [
          {
            dest: '.tmp/concat/js/app.js',
            src: [
              gruntConfig.appDIR + '/public/angular.app.js',
              gruntConfig.appDIR + '/public/controllers/*.js',
              gruntConfig.appDIR + '/public/services/*.js'
            ]
          }
        ]
      },

      css: {
        files: [
          {
            dest: '.tmp/concat/css/main.css',
            src: [
              gruntConfig.appDIR + '/public/assets/**/*.css',
            ]
          }
        ]
      }

    },

    uglify: {
      generated: {
        files: [{
            dest: '.tmp/concat/js/app.min.js',
            src: [ '.tmp/concat/js/app.js' ]
        }]
      }
    },

    cssmin: {
      generated: {
        files: [{
          expand: true,
          cwd: '.tmp/concat/css/',
          src: ['*.css', '!*.min.css'],
          dest: '.tmp/concat/css/',
          ext: '.min.css'
        }]
      }
    },

    usemin: {
      html: [gruntConfig.distDIR + '/public/index.ejs']
    },

    express: {
      options: {
        background: false
      },
      dev: {
        options: {
          script: 'app.js',
          node_env: 'development'
        }
      },
      prod: {
        options: {
          script: 'app.js',
          node_env: 'production'
        }
      },
      test: {
        options: {
          script: 'app.js',
          node_env: 'test'
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-usemin');
  grunt.loadNpmTasks('grunt-express-server');


  grunt.registerTask('lessToCss', ['less', 'watch:less']);
  grunt.registerTask('js-min', ['concat:js', 'uglify:generated']);
  grunt.registerTask('css-min', ['concat:css', 'cssmin:generated']);
  grunt.registerTask('all-min', ['js-min', 'css-min']);
  grunt.registerTask('build', ['clean:dist', 'less', 'all-min',  'copy:dist', 'usemin']);

  grunt.registerTask('dev', ['express:dev']);
  grunt.registerTask('test', ['express:test']);
  grunt.registerTask('run', ['build', 'express:prod']);

  

};