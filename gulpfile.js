var gulp = require('gulp');

require('@ftbl/gulp')(gulp, {
  'test:unit': {
  	setup: require('./test/unit/setup')
  }
, 'test:integration': {
  	setup: require('./test/integration/setup')
  }
});

gulp.task('default', [ 'test' ]);