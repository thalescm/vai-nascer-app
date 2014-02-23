'use strict';

// configurable paths
var yeomanConfig = {
  cwd: process.cwd(),
  tmp: '.tmp',
  src: 'app',
  dist: 'www',
  environment: 'TO BE SET BY TASKS',
  platform: 'TO BE SET BY TASKS',
  cordova: 'TO BE SET BY TASKS'
};


var LIVERELOAD_PORT = 35729;
var lrSnippet = require('connect-livereload')({ port: LIVERELOAD_PORT });
var mountFolder = function (connect, dir) {
  return connect.static(require('path').resolve(dir));
};

module.exports = function (grunt) {

  // ----
  // General grunt config
  // ----

  // load all grunt tasks
  require('matchdep').filterDev('{grunt-*,assemble}').forEach(grunt.loadNpmTasks);

  try {
    yeomanConfig.src = require('./bower.json').appPath || yeomanConfig.src;
  } catch (e) {}

  grunt.initConfig({
    yeoman: yeomanConfig,

    // ---
    // Server only tasks
    // ---
    watch: {
      coffee: {
        files: ['<%= yeoman.src %>/scripts/{,**/}*.coffee'],
        tasks: ['coffee:build', 'string-replace:coffee']
      },
      jade: {
        files: ['<%= yeoman.src %>/*.jade'],
        tasks: ['jade:build', 'html2js']
      },
      html2js: {
        files: ['<%= yeoman.src %>/views/components/{,**/}*.jade'],
        tasks: ['jade', 'html2js', 'copy:prebuild']
      },
      stylus: {
        files: ['<%= yeoman.src %>/{,**/}*.styl'],
        tasks: ['stylus:build']
      },
      coffeeTest: {
        files: ['test/spec/{,**/}*.coffee'],
        tasks: ['coffee:test']
      },
      layouts: {
        files: ['<%= yeoman.src %>/templates/{,**/}*.{json,jade}'],
        tasks: ['assemble']
      },
      livereload: {
        options: {
          livereload: LIVERELOAD_PORT
        },
        files: [
          '<%= yeoman.tmp %>/{,**/}*.html',
          '<%= yeoman.tmp %>/styles/{,**/}*.js',
          '<%= yeoman.tmp %>/scripts/{,**/}*.css',
          '<%= yeoman.app %>/assets/{,**/}*.{png,jpg,jpeg,gif,webp,svg,ttf}'
        ]
      }
    },
    connect: {
      options: {
        port: 9000,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: '0.0.0.0'
      },
      livereload: {
        options: {
          middleware: function (connect) {
            return [
              lrSnippet,
              mountFolder(connect, yeomanConfig.tmp),
              mountFolder(connect, yeomanConfig.src)
            ];
          }
        }
      },
      test: {
        options: {
          middleware: function (connect) {
            return [
              mountFolder(connect, yeomanConfig.tmp),
              mountFolder(connect, 'test')
            ];
          }
        }
      },
      dist: {
        options: {
          middleware: function (connect) {
            return [
              mountFolder(connect, yeomanConfig.tmp)
            ];
          }
        }
      }
    },
    open: {
      server: {
        url: 'http://<%= connect.options.hostname %>:<%= connect.options.port %>'
      }
    },

    // ---
    // Build only tasks
    // ---
    stylus: {
      build: {
        files: [{
            expand: true,
            cwd: '<%= yeoman.src %>',
            dest: '<%= yeoman.tmp %>',
            src: [
              'styles/{,**/}*.styl'
            ],
            ext: '.css'
        }]
      }
    },
    coffee: {
      deploy: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.src %>/scripts',
          src: ['{,**/}*.coffee'],
          dest: '<%= yeoman.tmp %>/scripts',
          ext: '.js'
        }]
      },
      build: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.src %>/scripts',
          src: ['{,**/}*.coffee'],
          dest: '<%= yeoman.tmp %>/scripts',
          ext: '.js'
        }]
      },
      test: {
        files: [{
          expand: true,
          cwd: 'test/spec',
          src: '{,**/}*.coffee',
          dest: '<%= yeoman.tmp %>/spec',
          ext: '.js'
        }]
      }
    },
    jade: {
      build: {
        options: {
            pretty: true,
            data: {
              settings: {
                platform: '<%= yeoman.platform %>',
                environment: '<%= yeoman.environment %>',
                cordova: '<%= yeoman.cordova %>'
              }
            }

        },
        files: [{
            expand: true,
            cwd: '<%= yeoman.src %>',
            dest: '<%= yeoman.tmp %>',
            src: [
              '{,**/}*.jade'
            ],
            ext: '.html'
        }]
      }
    },
    imagemin: {
      build: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.src %>/assets',
          src: '{,*/}*.{png,jpg,jpeg}',
          dest: '<%= yeoman.tmp %>/assets/images'
        }]
      }
    },
    svgmin: {
      build: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.src %>/assets',
          src: '{,*/}*.svg',
          dest: '<%= yeoman.tmp %>/assets/images'
        }]
      }
    },
    html2js: {
      build: {
        options: {
          base: "<%= yeoman.tmp %>",
          module: "app.templates"
        },
        files: [{
            expand: false,
            // cwd: '<%= yeoman.tmp %>',
            dest: '<%= yeoman.tmp %>/scripts/templates.js',
            src: [
              '<%= yeoman.tmp %>/views/{,**/}_*.html'
            ]
        }]
      }
    },
    useminPrepare: {
      html: '<%= yeoman.tmp %>/*.html',
      options: {
        dest: '<%= yeoman.tmp %>'
      }
    },
    assemble: {
      options: {
        flatten: true,
        layout: 'index.html',
        layoutdir: '<%= yeoman.tmp %>/templates/<%= yeoman.platform %>/layouts',
        partials: ['<%= yeoman.tmp %>/templates/{common,<%= yeoman.platform %>}/partials/*.html'],
        settings: {
          platform: '<%= yeoman.platform %>',
          environment: '<%= yeoman.environment %>',
          cordova: '<%= yeoman.cordova %>'
        }
      },
      index: {
        options: {
          data: ['<%= yeoman.src %>/templates/{common,<%= yeoman.platform %>}/data/*.json']
        },
        src: ['<%= yeoman.tmp %>/templates/<%= yeoman.platform %>/pages/*.html'],
        dest: '<%= yeoman.tmp %>/'
      }
    },

    // ---
    // Deploy only tasks
    // ---
    ngmin: {
      deploy: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.dist %>/scripts',
          src: '*.js',
          dest: '<%= yeoman.dist %>/scripts'
        }]
      }
    },
    rev: {
      deploy: {
        files: {
          src: [
            '<%= yeoman.dist %>/scripts/{,*/}*.js',
            '<%= yeoman.dist %>/styles/{,*/}*.css',
          ]
        }
      }
    },
    usemin: {
      html: ['<%= yeoman.dist %>/{,*/}*.html'],
      css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
      // js: ['<%= yeoman.dist %>/scripts/{,*/}*.js'],
      options: {
        dirs: ['<%= yeoman.dist %>']
      }
    },
    htmlmin: {
      predeploy: {
        options: {
          removeComments: true,
          // removeCommentsFromCDATA: true,
          // removeCDATASectionsFromCDATA: true,
          // https://github.com/yeoman/grunt-usemin/issues/44
          // collapseWhitespace: true,
          collapseBooleanAttributes: true,
          removeAttributeQuotes: true,
          removeRedundantAttributes: true,
          // useShortDoctype: true,
          removeEmptyAttributes: true,
          // removeOptionalTags: true,
          // removeEmptyElements: true,
        },
        files: [{
          expand: true,
          cwd: '<%= yeoman.dist %>',
          src: '{,*/}*.html',
          dest: '<%= yeoman.dist %>'
        }]
      },
      afterdeploy: {
        options: {
          collapseWhitespace: true
        },
        files: [{
          expand: true,
          cwd: '<%= yeoman.dist %>',
          src: [
            '{,*/}*.html',
            'views/{,**/}*.html',
          ],
          dest: '<%= yeoman.dist %>'
        }]
      }
    },
    'string-replace': {
      // replaces "../../styles" path from css files after deploy
      css: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.dist %>/styles',
          src: [
            '{,**/}*.css'
          ],
          dest: '<%= yeoman.dist %>/styles'
        }],
        options: {
          replacements: [{
            pattern: /url\(\"(\.\.\/)+/ig,
            replacement: 'url("../'
          }]
        }
      },
      // replaces "../../app/scripts" path from coffee source maps
      coffee : {
        files: [{
          expand: true,
          cwd: '<%= yeoman.tmp %>',
          src: [
            '{,**/}*.js.map'
          ],
          dest: '<%= yeoman.tmp %>'
        }],
        options: {
          replacements: [{
            pattern: /\"(\.\.\/)+app\/scripts\//ig,
            replacement: '"/scripts/'
          }]
        }
      }
    },

    // ---
    // Mixed Tasks
    // ---
    clean: {
      build: {
        files: [{
          dot: true,
          src: [
            '<%= yeoman.tmp %>',
            '<%= yeoman.dist %>/*',
            '!<%= yeoman.dist %>/.git*'
          ]
        }]
      },
      server: '<%= yeoman.tmp %>',
      afterdeploy: {
        files: [{
          src: [
            // '<%= yeoman.tmp %>',
            '<%= yeoman.dist %>/bower_components',
            // '<%= yeoman.dist %>/www',
            '<%= yeoman.dist %>/styles/pages',
            '<%= yeoman.dist %>/templates',
          ]
        }]
      },
      predeploy: {
        files: [{
          src: [
            ['<%= yeoman.dist %>/scripts/*/**/*.js', '!<%= yeoman.dist %>/scripts/vendor/**/*.js'], //does not clean root .js files and vendor js files
            '<%= yeoman.dist %>/scripts/{,**/}*.coffee', // cleans coffeescript generated files
          ]
        }]
      }
    },
    copy: {
      prebuild: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.src %>',
          dest: '<%= yeoman.tmp %>',
          src: [
            '.htaccess',
            'scripts/**/*.js',
            '!scripts/vendor/{company,ios,android,web}/{,**/}*.js',
            'bower_components/**/*.js',
          ]
        },
        {
          expand: true,
          dot: true,
          cwd: '<%= yeoman.src %>',
          dest: '<%= yeoman.tmp %>',
          src: [
            'scripts/vendor/<%= yeoman.platform %>/{,**/}*.js',
          ]
        },
        {
          expand: true,
          dot: true,
          flatten: true,
          cwd: '<%= yeoman.src %>',
          dest: '<%= yeoman.tmp %>/scripts/vendor/',
          src: [
            'scripts/vendor/{,**/}*.js',
          ]
        },
        // {
        //   expand: true,
        //   cwd: '<%= yeoman.src %>/assets/fonts',
        //   dest: '<%= yeoman.tmp %>/assets/fonts',
        //   src: [
        //     '*.{css,eot,svg,ttf,woff}'
        //   ]
        // },
        {
          expand: true,
          cwd: '<%= yeoman.tmp %>',
          dest: '<%= yeoman.tmp %>',
          src: [
            '{,**/}*.html',
            '{,**/}*.js', //will be erased before deploy
            '{,**/}*.css', //will be erased before deploy
          ]
        }]
      },
      afterbuild: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.tmp %>',
          dest: '<%= yeoman.dist %>',
          src: [
            '**/*',
          ]
        }]
      },
      predeploy: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.tmp %>',
          dest: '<%= yeoman.dist %>',
          src: [
            '{,**/}*.css',
          ]
        }]
      }
    },


    // ---
    // Unused Tasks
    // ---

    // Put files not handled in other tasks here
    karma: {
      unit: {
        configFile: 'karma.conf.js',
        singleRun: true
      }
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        '<%= yeoman.src %>/scripts/{,*/}*.js'
      ]
    },
    concat:    {},
    requirejs: {}
  });

  grunt.registerTask('server', function (platform, environment) {

    yeomanConfig.platform = platform || 'web';
    yeomanConfig.environment = environment || 'debug';
    yeomanConfig.cordova = yeomanConfig.platform != 'web';

    return grunt.task.run([
      'build:' + yeomanConfig.platform + ':' + yeomanConfig.environment,
      'connect:livereload',
      'open',
      'watch'
    ]);
  });

  grunt.registerTask('test', [
    'clean:server',
    'coffee',
    'connect:test',
    'karma'
  ]);

  grunt.registerTask('deploy', function (platform, environment)  {

    yeomanConfig.platform = platform || 'web';
    yeomanConfig.environment = environment || 'debug';
    yeomanConfig.cordova = yeomanConfig.platform != 'web';

    grunt.task.run([
      'build:' + yeomanConfig.platform + ':' + yeomanConfig.environment,
      'clean:predeploy', //remove current non-minified js files from dist folder
      'copy:predeploy',
      'string-replace:css',
      'ngmin',
      'rev',
      'usemin', //Update the HTML to reference our concat/min/revved script files
      'htmlmin:predeploy',
      'htmlmin:afterdeploy',
      'clean:afterdeploy'
    ]);
  });

  grunt.registerTask('build', function (platform, environment) {

    yeomanConfig.platform = platform || 'web';
    yeomanConfig.environment = environment || 'debug';
    yeomanConfig.cordova = yeomanConfig.platform != 'web';

    var tasks = [
      'clean', // Erases .tmp and www folder
      'stylus:build' // Compiles Stylus to CSS
    ];

    // enables check for coffee compilation in debug mode (eg. source maps)
    if(yeomanConfig.environment == 'debug') {
      tasks = tasks.concat([
        'coffee:build', // compiles coffee in debug mode
        // 'string-replace:coffee' //replaces source maps content with the correct relative folder path
        ]);
    }
    else{
      tasks.push('coffee:deploy'); //compiles coffee in deploy mode (no source maps)
    }

    tasks = tasks.concat([
      'jade', // compiles all Jade to HTML
      'assemble', //generates main HTML files (eg. index.html)
      'imagemin', // compress images and copy to the correct folder
      'svgmin', // compress SVG files
      'html2js', // compiles all partials and components HTML files to a JS cache file
      'useminPrepare', // prepares usemin to update HTML files
      'copy:prebuild', //copies everything to tmp folder
      'copy:afterbuild', // mirrors tmp folder to www
    ]);

    grunt.task.run(tasks);
  });

};
