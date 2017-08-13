/**
 * Created by Mateusz Chybiorz on 2016-11-26.
 */
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    imagemin = require('gulp-imagemin'),
    uglify = require('gulp-uglify'),
    prefix = require('gulp-autoprefixer'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    concat = require('gulp-concat');

function errorLog(error){
    console.error.bind(error);
    this.emit('end');
}

// Styles Task
// Sass
gulp.task('styles', function(){
    gulp.src("app/sass/main.scss")
        .pipe(sass({outputStyle: 'compressed'}))
        .on('error', errorLog)
        .pipe(prefix('> 1%'))
        .pipe(gulp.dest('app/css'))
        .pipe(reload({stream: true}));
});

// Scripts Task
//Uglifies
gulp.task('scripts', function(){
    gulp.src(['app/js/**/*.js'])
        .on('error', errorLog)
        .pipe(uglify())
        .pipe(concat('app.js'))
        .pipe(gulp.dest('app/minjs'))
        .pipe(reload({stream: true}));
});

// Libraries Task
//Uglifies
gulp.task('libs', function(){
    gulp.src(['app/libraries/angular.min.js', 'app/libraries/angular-route.min.js', 'app/libraries/angular-animate.min.js', 'app/libraries/angular-scroll.min.js', 'app/libraries/angular-touch.min.js'])
        .on('error', errorLog)
        .pipe(concat('libs.js'))
        .pipe(gulp.dest('app/minjs'))
        .pipe(reload({stream: true}));
});

// HTML Task
gulp.task('html', function(){
    gulp.src('app/*.html')
        .pipe(reload({stream: true}));
});

// Image Task
// Compress
gulp.task('image', function(){
    gulp.src('app/images/*/*/*')
        .pipe(imagemin())
        .pipe(gulp.dest('app/imagesCompressed'));
});

// Browser-Sync Task
gulp.task('browser-sync', function(){
    browserSync({
        server: {
            baseDir: "./app/"
        }
    })
});

// Watch Task
gulp.task('watch', function(){
    gulp.watch(['app/js/**/*.js'], ['scripts']);
    gulp.watch(['app/libraries/**/*.min.js'], ['libs']);
    gulp.watch('app/**/*.html', ['html']);
    gulp.watch('app/sass/**/*.scss', ['styles']);
});

gulp.task('default', ['scripts', 'libs', 'styles', 'html', 'browser-sync', 'watch']);