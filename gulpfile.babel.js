'use strict';

import gulp from 'gulp';
import sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import minifycss from 'gulp-minify-css';
import uglify from 'gulp-uglify';
import imagemin from 'gulp-imagemin';
import rename from 'gulp-rename';
import concat from 'gulp-concat';
import notify from 'gulp-notify';
import cache from 'gulp-cache';
import sourcemaps from 'gulp-sourcemaps';
import babel from 'gulp-babel';
import del from 'del';

const dirs = {
  src: 'app',
  dest: 'dist'
};

const paths = {
  sassSrc: `${dirs.src}/styles/application.scss`,
  sassDest: `${dirs.dest}/styles/`,
  jsSrc: `${dirs.src}/scripts/**/*.js`,
  jsDest: `${dirs.dest}/scripts/`
};

gulp.task('styles', () => {
  return gulp.src(paths.sassSrc)
    .pipe(sourcemaps.init())
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(autoprefixer('last 2 version'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.sassDest))
    .pipe(rename({ suffix: '.min' }))
    .pipe(minifycss())
    .pipe(gulp.dest(paths.sassDest))
    .pipe(notify({ message: 'Styles task complete' }));
});

gulp.task('scripts', () => {
  return gulp.src(paths.jsSrc)
    .pipe(sourcemaps.init())
    .pipe(babel({ presets: ['es2015'] }))
    .pipe(concat('application.js'))
    .pipe(gulp.dest(paths.jsDest))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.jsDest))
    .pipe(notify({ message: 'Scripts task complete' }));
});

gulp.task('clean', () => {
  return del([paths.sassDest, paths.jsDest]);
});
