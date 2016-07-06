var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

gulp.task('images', function () {
    gulp.src('src/assets/images/*.{png,jpg,gif,ico}')
        .pipe($.imagemin())
        .pipe(gulp.dest('dist/assets/images'));
});