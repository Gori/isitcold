/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    concat: {
      dist: {
        src: ['js/vendor/*.js', 'js/vendor/plugins/*.js', 'js/isitcold.js'],
        dest: 'js/isitcold.min.js'
      }
    },
    min: {
      dist: {
        src: ['js/isitcold.min.js'],
        dest: 'js/isitcold.min.js'
      }
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        browser: true
      },
      globals: {
        jQuery: true
      }
    },
    uglify: {}
  });

  // Default task.
  grunt.registerTask('default', 'concat min');

};
