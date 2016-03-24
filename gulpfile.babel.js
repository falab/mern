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
import assign from 'lodash.assign';
import gutil from 'gulp-util';
import livereload from 'gulp-livereload';

const dirs = {
    appSrc: 'app/src',
    sassSrc: 'app/styles',
    dest: 'public',
    vendor: 'vendor',
};

const files = {
    jsMain: 'application.jsx',
};

const paths = {
    sassSrc: `${dirs.sassSrc}/**/*.scss`,
    sassDest: `${dirs.dest}/styles/`,
    vendorSrc: `${dirs.vendor}/**/*.js`,
    componentSrc: `${dirs.appSrc}/**/*.jsx`,
    jsEntryPoints: [
        `${dirs.appSrc}/${files.jsMain}`,
    ],
    jsDest: `${dirs.dest}/scripts/`,
};

function logger(pluginName) {
    return (data) => {
        gutil.log(`${pluginName}:`, data.toString());
    };
}

/**
 * Styles
 */
gulp.task('styles',
    () => gulp.src(paths.sassSrc)
    .pipe(sourcemaps.init())
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(autoprefixer('last 2 version'))
    .pipe(concat('application.css'))
    .pipe(gulp.dest(paths.sassDest))
    .pipe(livereload())
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

function handleBundle(bundle) {
    return bundle
        .on('error', logger(gutil.colors.red('Watchify')))
        .pipe(source(files.jsMain))
        .pipe(rename('application.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({
            loadMaps: true
        }))
        .pipe(gulp.dest(paths.jsDest))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.jsDest))
        .pipe(notify({
            message: 'Scripts task complete',
            onLast: true
        }))
        .pipe(livereload({
            reloadPage: ''
        }));
}

const cleanScripts = () => del(`${paths.jsDest}/${files.jsMain}`);

gulp.task('clean:scripts', cleanScripts);

/**
 * Clean
 */
gulp.task('clean', [
    'clean:styles',
    'clean:scripts',
    'clean:vendor',
]);

/**
 * Watch
 */

gulp.task('watch', () => {
    livereload.listen();

    gulp.watch(paths.sassSrc, ['clean:styles', 'styles']);
    gulp.watch(paths.vendorSrc, ['clean:vendor', 'vendor']);

    const watcher = watchify(
        browserify(assign({}, watchify.args, {
            entries: paths.jsEntryPoints,
            insertGlobals: true,
            extensions: ['.jsx'],
            debug: true,
        }))
        .transform(babelify, {
            presets: ['es2015', 'react']
        }), {
            poll: true
        }
    );

    watcher
        .on('update', () => {
            cleanScripts();
            return handleBundle(watcher.bundle());
        })
        .on('log', logger(gutil.colors.cyan('Watchify')));

    handleBundle(watcher.bundle());
});

/**
 * Default
 */
gulp.task('default', ['clean', 'styles', 'vendor', 'watch']);
