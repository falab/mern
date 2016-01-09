'use strict';

import gulp from 'gulp';
import sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import sourcemaps from 'gulp-sourcemaps';

const dirs = {
  src: 'app',
  dest: 'dist'
};

const sassPaths = {
  src: `${dirs.src}/styles/application.scss`,
  dest: `${dirs.dest}/styles/`
};

gulp.task('styles', () => {
  return gulp.src(sassPaths.src)
    .pipe(sourcemaps.init())
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(sassPaths.dest));
});
