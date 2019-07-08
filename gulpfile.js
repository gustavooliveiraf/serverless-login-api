const jshint = require('gulp-jshint');
const gulp   = require('gulp');

// const mocha = require('gulp-mocha');
// gulp.task('default', () => {
//   return gulp.src('test.js', {read: false})
//     .pipe(mocha({reporter: 'default'}))
// });
 
gulp.task('lint', () => {
  return gulp.src('./**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'))
});
