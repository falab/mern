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
import handlebars from 'gulp-handlebars';
import wrap from 'gulp-wrap';
import declare from 'gulp-declare';
import del from 'del';

const dirs = {
  src: 'app',
  dest: 'dist',
  vendor: 'vendor'
};

const paths = {
  htmlSrc: `${dirs.src}/*.html`,
  htmlDest: `${dirs.dest}/`,
  templateSrc: `${dirs.src}/templates/*.hbs`,
  sassSrc: `${dirs.src}/styles/application.scss`,
  sassDest: `${dirs.dest}/styles/`,
  vendorSrc: `${dirs.vendor}/**/*.js`,
  jsSrc: [
    `${dirs.src}/scripts/zframe.js`,
    `${dirs.src}/scripts/modules/**/*.js`
  ],
  jsDest: `${dirs.dest}/scripts/`
};

gulp.task('clean:html', () => {
  return del(`${paths.htmlDest}/*.html`);
});

gulp.task('clean:styles', () => {
  return del(paths.sassDest);
});

gulp.task('clean:scripts', () => {
  return del(`${paths.jsDest}/application.*`);
});

gulp.task('clean:templates', () => {
  return del(`${paths.jsDest}/templates.*`);
});

gulp.task('clean:vendor', () => {
  return del(`${paths.jsDest}/vendor.*`);
});

gulp.task('clean', [
  'clean:html',
  'clean:styles',
  'clean:scripts',
  'clean:templates',
  'clean:vendor'
]);

gulp.task('html', () => {
  return gulp.src(paths.htmlSrc)
    .pipe(gulp.dest(paths.htmlDest))
    .pipe(notify({
      message: 'HTML task complete'
    }));
});

gulp.task('styles', () => {
  return gulp.src(paths.sassSrc)
    .pipe(sourcemaps.init())
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(autoprefixer('last 2 version'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.sassDest))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(minifycss())
    .pipe(gulp.dest(paths.sassDest))
    .pipe(notify({
      message: 'Styles task complete'
    }));
});

gulp.task('templates', () => {
  return gulp.src(paths.templateSrc)
    .pipe(handlebars())
    .pipe(wrap('Handlebars.template(<%= contents %>)'))
    .pipe(declare({
      namespace: 'zframe.Templates',
      noRedeclare: true
    }))
    .pipe(concat('templates.js'))
    .pipe(gulp.dest(paths.jsDest))
    .pipe(notify({
      message: 'Templates task complete'
    }));
});

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
      message: 'Vendor task complete'
    }));
});

gulp.task('scripts', () => {
  return gulp.src(paths.jsSrc)
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(concat('application.js'))
    .pipe(gulp.dest(paths.jsDest))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.jsDest))
    .pipe(notify({
      message: 'Scripts task complete'
    }));
});

gulp.task('watch', () => {
  gulp.watch(paths.htmlSrc, ['clean:html', 'html']);
  gulp.watch(paths.sassSrc, ['clean:styles', 'styles']);
  gulp.watch(paths.scriptsSrc, ['clean:scripts', 'scripts']);
  gulp.watch(paths.vendorSrc, ['clean:vendor', 'vendor']);
  gulp.watch(paths.templateSrc, ['clean:templates', 'templates']);
});

gulp.task('default', ['clean', 'html', 'styles', 'templates', 'vendor', 'scripts']);
