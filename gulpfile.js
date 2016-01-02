var gulp = require('gulp');
var tsc = require('gulp-typescript');

gulp.task('compile-typescript',function () {
   gulp.src('Content/**/*')
    .pipe(gulp.dest('/var/www/content/'));
   
   return gulp.src('**/*.ts')
    .pipe(tsc({
        "target": "es5",
		"sourceMap": true,
		"module": "amd"
    })).pipe(gulp.dest('/var/www/js/'));
});