var gulp = require('gulp');
var concat = require('gulp-concat');
var replace = require('gulp-replace');
var traceur = require('gulp-traceur');
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync').create();
var del = require('del');
var runSequence = require('run-sequence').use(gulp);

var includeCurrencyFormat = JSON.stringify(require('./node_modules/currency-format/currency-format.json'));
var includeCurrencyNumberFormat = JSON.stringify(require('./node_modules/currency-number-format/currency-number-format.json'));
var jsPaths = ['src/currency-format.service.js', 'src/currency-format.filter.js'];

gulp.task('build-js', function () {
    gulp.src(jsPaths)
        .pipe(concat('currency-format.js'))
        .pipe(replace('@@includeCurrencyFormat', includeCurrencyFormat))
        .pipe(replace('@@includeCurrencyNumberFormat', includeCurrencyNumberFormat))
        .pipe(traceur())
        .pipe(gulp.dest('dist/'));

    gulp.src(jsPaths)
        .pipe(concat('currency-format.min.js'))
        .pipe(replace('@@includeCurrencyFormat', includeCurrencyFormat))
        .pipe(replace('@@includeCurrencyNumberFormat', includeCurrencyNumberFormat))
        .pipe(traceur())
        .pipe(uglify())
        .pipe(gulp.dest('dist/'));
});

gulp.task('vendor', function () {
    return gulp.src('bower_components/**/*.js')
        .pipe(gulp.dest('.tmp/bower_components/'));
});

gulp.task('js', function () {
    return gulp.src(jsPaths)
        .pipe(concat('currency-format.js'))
        .pipe(replace('@@includeCurrencyFormat', includeCurrencyFormat))
        .pipe(replace('@@includeCurrencyNumberFormat', includeCurrencyNumberFormat))
        .pipe(traceur())
        .pipe(gulp.dest('.tmp/bower_components/angular-currency-format/dist/'));
});

gulp.task('html', function () {
    return gulp.src('src/index.html')
        .pipe(gulp.dest('.tmp/'));
});

gulp.task('watch', function (callback) {
    runSequence('build-js', 'js', 'html', callback);
    browserSync.reload();
});

gulp.task('clean', function (cb) {
    del(['.tmp', 'dist'], cb);
});

gulp.task('serve', ['build-js', 'vendor', 'js', 'html'], function () {
    gulp.watch('src/*.js', ['watch']);
    gulp.watch('src/*.html', ['watch']);

    browserSync.init({
        startPath: '/',
        server: {
            baseDir: '.tmp'
        }
    });
});

gulp.task('build', function (callback) {
    runSequence('clean', 'build-js', callback);
});

gulp.task('default', ['build']);