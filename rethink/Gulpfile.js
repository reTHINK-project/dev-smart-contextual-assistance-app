var gulp = require('gulp');
var sass = require('gulp-sass');
var runSequence = require('run-sequence');

gulp.task('sass:watch', function (done) {
  gulp.watch('./sass/**/*.scss', ['sass']);
});

gulp.task('sass', function () {
  return gulp.src('./comp/**/*.scss')
  .pipe(sass.sync()
  .on('error', sass.logError))
  .pipe(sass({
    outputStyle: 'expanded',
    sourceMap: true
  })
  .on('error', sass.logError))
  .on('end', function() {
    console.log('__dirname: ', __dirname);
  })
  .pipe(gulp.dest('./comp/'));
});

gulp.task('start', function(done) {

  runSequence('sass', 'sass:watch', done);

});
