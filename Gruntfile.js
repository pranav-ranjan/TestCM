module.exports = function(grunt) {
  grunt.initConfig({
    forever: {
        server: {
            options: {
                index: 'server.js'
            }
        }
    },
    env: {
      dev: {
        NODE_ENV: 'development'
      },
      test: {
        NODE_ENV: 'test'
      }
    },
    nodemon: {
      dev: {
        script: 'server.js',
        options: {
          ext: 'js,html',
          watch: ['server.js', 'core/**/*.js', 'user/**/*.js']
         }
       },
      debug: {
         script: 'server.js',
         options: {
           nodeArgs: ['--debug'],
           ext: 'js,html',
           watch: ['server.js', 'core/**/*.js', 'user/**/*.js']
         }
       }
    },
     mochaTest: {
       src: 'core/server/tests/**/*.js',
       options: {
         reporter: 'spec'
       }
     },
     karma: {
       unit: {
         configFile: 'karma.conf.js'
       }
     },
     protractor: {
       e2e: {
         options: {
           configFile: 'protractor.conf.js'
         }
       }
     },
     jshint: {
       all: {
         src: ['server.js', 'core/**/*.js', 'user/**/*.js']
       }
     },
     csslint: {
       all: {
         src: 'core/client/styles/**/*.css'
       }
     },
     watch: {
       js: {
         files: ['server.js', 'core/**/*.js', 'user/**/*.js'],
        tasks: ['jshint']
      },
      css: {
        files: 'core/client/styles/**/*.css',
        tasks: ['csslint']
      }
    },
    concurrent: {
      dev: {
        tasks: ['nodemon:debug', 'watch', 'node-inspector'],
        options: {
          logConcurrentOutput: true
        }
      },
      debug: {
        tasks: ['nodemon:debug', 'watch', 'node-inspector'],
        options: {
          logConcurrentOutput: true
        }
      }
    },
    'node-inspector': {
      debug: {}
    }
    


  });
  grunt.loadNpmTasks('grunt-env');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-protractor-runner');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-csslint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-node-inspector');
  grunt.loadNpmTasks('grunt-forever');
  
  grunt.registerTask('default', ['shell']);
  grunt.registerTask('default', ['env:dev', 'lint', 'concurrent:dev']);
  grunt.registerTask('debug', ['env:dev', 'lint', 'concurrent:debug']);
  grunt.registerTask('test', ['env:test', 'mochaTest', 'karma', 'protractor']);
  grunt.registerTask('lint', ['jshint', 'csslint']);



};
