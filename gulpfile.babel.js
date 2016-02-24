import gulp from 'gulp';
import sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import minifycss from 'gulp-minify-css';
import uglify from 'gulp-uglify';
import rename from 'gulp-rename';
import concat from 'gulp-concat';
import notify from 'gulp-notify';
import sourcemaps from 'gulp-sourcemaps';
import del from 'del';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import browserify from 'browserify';
import babelify from 'babelify';
import watchify from 'watchify';
import lazypipe from 'lazypipe';
import assign from 'lodash.assign';
import gutil from 'gulp-util';

const dirs = {
  src: 'src',
  dest: 'public',
  vendor: 'vendor',
};

const files = {
  sassSrc: 'application.scss',
  jsMain: 'application.jsx',
};

const paths = {
  htmlSrc: `${dirs.src}/*.html`,
  htmlDest: `${dirs.dest}/`,
  sassSrc: `${dirs.src}/styles/${files.sassSrc}`,
  sassDest: `${dirs.dest}/styles/`,
  vendorSrc: `${dirs.vendor}/**/*.js`,
  jsEntryPoints: [
    `./${dirs.src}/${files.jsMain}`,
  ],
  jsDest: `${dirs.dest}/scripts/`,
};

/**
 * HTML
 * Can eventually be precompiled from another source
 */
gulp.task('html',
  () => gulp.src(paths.htmlSrc)
    .pipe(gulp.dest(paths.htmlDest))
    .pipe(
      notify({
        message: 'HTML task complete',
      })
    )
);

gulp.task('clean:html', () => del(`${paths.htmlDest}/*.html`));

/**
 * Styles
 */
gulp.task('styles',
  () => gulp.src(paths.sassSrc)
    .pipe(sourcemaps.init())
      .pipe(sass.sync().on('error', sass.logError))
      .pipe(autoprefixer('last 2 version'))
      .pipe(gulp.dest(paths.sassDest))
      .pipe(rename({
        suffix: '.min',
      }))
      .pipe(minifycss())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.sassDest))
    .pipe(
      notify({
        message: 'Styles task complete',
        onLast: true,
      })
    )
);

gulp.task('clean:styles', () => del(paths.sassDest));

/**
 * Vendor
 */
gulp.task('vendor',
  () => gulp.src(paths.vendorSrc)
    .pipe(sourcemaps.init())
      .pipe(concat('vendor.js'))
      .pipe(gulp.dest(paths.jsDest))
      .pipe(
        rename({
          suffix: '.min',
        })
      )
      .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.jsDest))
    .pipe(
      notify({
        message: 'Vendor task complete',
        onLast: true,
      })
    )
  );

gulp.task('clean:vendor', () => del(`${paths.jsDest}/vendor.*`));

/**
 * Scripts
 */

const browserifyProps = assign({}, watchify.args, {
  entries: paths.jsEntryPoints,
  insertGlobals: true,
  extensions: ['.jsx'],
  debug: true,
});

const jsPipeline = lazypipe()
  .pipe(source, files.jsMain)
  .pipe(rename, 'application.js')
  .pipe(buffer)
  .pipe(sourcemaps.init, { loadMaps: true })
    .pipe(gulp.dest, paths.jsDest)
    .pipe(rename, { suffix: '.min' })
    .pipe(uglify)
  .pipe(sourcemaps.write, '.')
  .pipe(gulp.dest, paths.jsDest)
  .pipe(notify, { message: 'Scripts task complete', onLast: true });

gulp.task('scripts', () => {
  browserify(browserifyProps)
    .transform(babelify, { presets: ['es2015', 'react'] })
    .bundle()
    .pipe(jsPipeline());
});

const cleanScripts = () => del(`${paths.jsDest}/${files.jsMain}`);

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
  'clean:vendor',
]);

/**
 * Watch
 */
gulp.task('watch', () => {
  gulp.watch(paths.htmlSrc, ['clean:html', 'html']);
  gulp.watch(paths.sassSrc, ['clean:styles', 'styles']);
  gulp.watch(paths.jsSrc, ['clean:scripts', 'scripts']);
  gulp.watch(paths.vendorSrc, ['clean:vendor', 'vendor']);

  const watcher = watchify(
    browserify(browserifyProps)
      .transform(babelify,
        { presets: ['es2015', 'react'] }
      ),
    { poll: true }
  );

  watcher.on('update', () => {
    cleanScripts();
    return watcher.bundle().pipe(jsPipeline());
  });

  watcher.on('log', (data) => {
    gutil.log(`${gutil.colors.cyan('Watchify')}:`, data);
  });

  watcher.bundle().pipe(jsPipeline());
});

/**
 * Default
 */
gulp.task('default', ['clean', 'html', 'styles', 'vendor', 'watch']);
