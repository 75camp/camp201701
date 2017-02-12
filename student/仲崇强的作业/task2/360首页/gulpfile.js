var gulp = require('gulp'),
    less = require('gulp-less'),
    notify = require('gulp-notify'),
    cssmin = require('gulp-minify-css'),
    plumber = require('gulp-plumber');
gulp.task('360less', function () {
    gulp.src(['src/less/*.less', '!src/less/reset.less'])
        .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
        .pipe(less())
        .pipe(cssmin())
        .pipe(gulp.dest('src/css'));
})
gulp.task('testWatch', function () {
    gulp.watch('src/**/*.less', ['360less']);
})
