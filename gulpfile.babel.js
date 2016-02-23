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
import wrap from 'gulp-wrap';
import declare from 'gulp-declare';
import del from 'del';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import browserify from 'browserify';
import reactify from 'reactify';
import babelify from 'babelify';
import watchify from 'watchify';
import lazypipe from 'lazypipe';
import assign from 'lodash.assign';
import gutil from 'gulp-util';

let dirs = {
  src: 'src',
  dest: 'public',
  vendor: 'vendor'
};

let files = {
  sassSrc: 'application.scss',
  jsMain: 'application.js'
};

let paths = {
  htmlSrc: `${dirs.src}/*.html`,
  htmlDest: `${dirs.dest}/`,
  sassSrc: `${dirs.src}/styles/${files.sassSrc}`,
  sassDest: `${dirs.dest}/styles/`,
  vendorSrc: `${dirs.vendor}/**/*.js`,
  jsEntryPoints: [
    `./${dirs.src}/${files.jsMain}`
  ],
  jsDest: `${dirs.dest}/scripts/`
};

/**
 * HTML
 * Can eventually be precompiled from another source
 */
gulp.task('html', () => {
  return gulp.src(paths.htmlSrc)
    .pipe(gulp.dest(paths.htmlDest))
    .pipe(notify({
      message: 'HTML task complete'
    }));
});

gulp.task('clean:html', () => {
  return del(`${paths.htmlDest}/*.html`);
});

/**
 * Styles
 */
gulp.task('styles', () => {
  return gulp.src(paths.sassSrc)
    .pipe(sourcemaps.init())
      .pipe(sass.sync().on('error', sass.logError))
      .pipe(autoprefixer('last 2 version'))
      .pipe(gulp.dest(paths.sassDest))
      .pipe(rename({
        suffix: '.min'
      }))
      .pipe(minifycss())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.sassDest))
    .pipe(notify({
      message: 'Styles task complete',
      onLast: true
    }));
});

gulp.task('clean:styles', () => {
  return del(paths.sassDest);
});

/**
 * Vendor
 */
gulp.task('vendor', () => {
  return gulp.src(paths.vendorSrc)
    .pipe(sourcemaps.init())
      .pipe(concat('vendor.js'))
      .pipe(gulp.dest(paths.jsDest))
      .pipe(rename({
        suffix: '.min'
      }))
      .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.jsDest))
    .pipe(notify({
      message: 'Vendor task complete',
      onLast: true
    }));
});

gulp.task('clean:vendor', () => {
  return del(`${paths.jsDest}/vendor.*`);
});

/**
 * Scripts
 */

let browserifyProps = assign({}, watchify.args, {
  entries: paths.jsEntryPoints,
  transform: [
    reactify,
    [ 'babelify', { presets: ['es2015', 'react'] } ]
  ],
  debug: true
});

let jsPipeline = lazypipe()
  .pipe(source, files.jsMain)
  .pipe(buffer)
  .pipe(sourcemaps.init, { loadMaps: true })
    .pipe(gulp.dest, paths.jsDest)
    .pipe(rename, { suffix: '.min' })
    .pipe(uglify)
  .pipe(sourcemaps.write, '.')
  .pipe(gulp.dest, paths.jsDest)
  .pipe(notify, { message: 'Scripts task complete', onLast: true });

gulp.task('scripts', () => {
  browserify(browserifyProps).bundle().pipe(jsPipeline());
});

let cleanScripts = () => {
  return del(`${paths.jsDest}/${files.jsMain}`);
};

gulp.task('clean:scripts', () => {
  cleanScripts();
});

/**
 * Clean
 */
gulp.task('clean', [
  'clean:html',
  'clean:styles',
  'clean:scripts',
  'clean:vendor'
]);

/**
 * Watch
 */
gulp.task('watch', () => {
  gulp.watch(paths.htmlSrc, ['clean:html', 'html']);
  gulp.watch(paths.sassSrc, ['clean:styles', 'styles']);
  gulp.watch(paths.jsSrc, ['clean:scripts', 'scripts']);
  gulp.watch(paths.vendorSrc, ['clean:vendor', 'vendor']);

  let watcher = watchify(browserify(browserifyProps), { poll: true });

  watcher.on('update', () => {
    cleanScripts();
    return watcher.bundle().pipe(jsPipeline());
  });

  watcher.on('log', function (data) {
    gutil.log(`${gutil.colors.cyan('Watchify')}:`, data);
  });

  watcher.bundle().pipe(jsPipeline());
});

/**
 * Default
 */
gulp.task('default', ['clean', 'html', 'styles', 'vendor', 'watch']);
