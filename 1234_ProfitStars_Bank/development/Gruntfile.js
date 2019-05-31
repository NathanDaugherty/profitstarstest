module.exports = function(grunt) {

  /*
  This file will:
    1. Compile CoffeeScript into JavaScript
    2. Concatenate JavaScript files into one
    3. Minify concatenated JS file
    4. Apply a banner to the minified file keep track of versions
    5. Compile LESS into CSS
    6. Minify CSS using YUI Compress
    7. Compress PNG and JPG images using smushit
    8. Copy all pertient files from /src/ to /deploy/ in proper structure
    9. Compress all folders/files in /deploy/ and name that file with the site name from package
    10. Could also copy the zip into banno-cms if we wanted
    8. Anything else you want it to do. Except make coffee.
  */

  grunt.initConfig({
    email: grunt.option('email'),
    password: grunt.option('password'),
    code: grunt.option('code'),
    pkg: grunt.file.readJSON('package.json'),
    meta: {
      banner: '/*! <%= pkg.site || pkg.name %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '<%= pkg.domain ? " * " + pkg.domain + "\n" : "" %>' +
        ' * <%= pkg.author %>\n */'
    }, 
    
    cms_site_scaffold: {
      local: {
        options: {
          url: 'http://demo.dev.banno.com'
        },
        src: ['<%= pkg.scaffold %>']
      },
      staging: {
        options: {
          url: 'https://staging.cms.banno.com'
        },
        src: ['<%= pkg.scaffold %>']
      },
      uat: {
        options: {
          url: 'https://uat.cms.banno.com'
        },
        src: ['<%= pkg.scaffold %>']
      }
    },

    cms_upload: {
      local: {
        options: {
          url: '<%= pkg.url.local %>'
        },
        src: ['deploy/<%= pkg.zip %>.zip']
      },
      staging: {
        options: {
          url: '<%= pkg.url.staging %>'
        },
        src: ['deploy/<%= pkg.zip %>.zip']
      },
      uat: {
        options: {
          url: '<%= pkg.url.uat %>'
        },
        src: ['deploy/<%= pkg.zip %>.zip']
      }
    }
  })

  // required for site scaffold
  grunt.loadNpmTasks('grunt-cms-site-scaffold');

  // required for cms upload
  grunt.loadNpmTasks('grunt-cms-upload');

  // Default task
  grunt.registerTask('default');

};

