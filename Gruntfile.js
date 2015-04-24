module.exports = function(grunt) {

  grunt.initConfig({
    buildDir: 'build',
    projectName: 'USFVoice',
    copy:{
      build: {
        files:[ 
          {expand: true, src: ['wechat-msg.js', 'package.json'], dest: 'node_modules/wechat-msg/', filter: 'isFile'},
          {expand: true, src: ['wechat-msg.js'], dest: 'build/cloud/', filter: 'isFile'},
        ]
      }
    },
    shell:{
      dev: {
	      command: ['cd <%=buildDir%>', 'parse develop <%=projectName%>'].join('  &&  ')
      },
      deployProd: {
        command: ['cd <%=buildDir%>', 'parse deploy <%=projectName%>'].join('  &&  ')
      },
      runTest: {
        command: './node_modules/jasmine-node/bin/jasmine-node --junitreport tests'
      }
    },
    watch: {
      scripts: {
        files: ['*.js'],
        tasks: ['copy:build'],
        options: {
          spawn: false,
        },
      },
      tests: {
        files: ['*.js', 'tests/*.js'],
        tasks: ['copy:build', 'shell:runTest']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.registerTask('build', ['copy:build']);
  grunt.registerTask('dev', ['watch:scripts','copy:build'])
  grunt.registerTask('parse-dev', ['shell:dev'])
  grunt.registerTask('deploy-prod', ['build', 'shell:deployProd'])

  // test
  grunt.registerTask('test', ['shell:runTest'])
  grunt.registerTask('watch-test', ['watch:tests'])
  
};
