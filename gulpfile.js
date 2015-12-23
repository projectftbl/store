var gulp = require('gulp');

require('@ftbl/gulp')(gulp, {
  'test:unit': {
  	setup: require('./test/setup')
  }
, 'test:integration': {
  	setup: require('./test/setup')
  }
});

gulp.task('default', [ 'test' ]);