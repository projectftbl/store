var gulp = require('gulp');

require('@ftbl/gulp')(gulp, {
  test: {
  	setup: require('./test/unit/setup')
  , timeout: 5000
  }
}); 

gulp.task('default', [ 'test' ]);