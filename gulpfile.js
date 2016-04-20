'use-strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();

// Gulp config
const config = {
  hostname: 'staygold.dev',
  sassFiles: './sass/**/*.scss'
}

// Compile sass files
gulp.task('sass', function () {
 return gulp.src(config.sassFiles)
  .pipe(sourcemaps.init())
  .pipe(sass().on('error', sass.logError))
  .pipe(sourcemaps.write('./maps'))
  .pipe(gulp.dest('.'));
});

// Start server and watch sass files
gulp.task('serve', ['sass'], function() {

  browserSync.init({
      proxy: config.hostname
  });

  gulp.watch(config.sassFiles, ['sass']).on('change', browserSync.reload);
});

// Default task
gulp.task('default', ['serve']);
