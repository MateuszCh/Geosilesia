var gulp = require('gulp'),
    sass = require('gulp-sass'),
    inject = require('gulp-inject'),
    hash = require('gulp-hash'),
    imagemin = require('gulp-imagemin'),
    uglify = require('gulp-uglify'),
    prefix = require('gulp-autoprefixer'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    concat = require('gulp-concat'),
    htmlmin = require('gulp-htmlmin'),
    cleancss = require('gulp-clean-css'),
    history = require('connect-history-api-fallback'),
    del = require('del');

var paths = {
    srcHTML: 'src/**/*.html',
    srcHTMLwoIndex: 'src/html/**/*.html',
    srcSCSS: 'src/sass/main.scss',
    srcSCSSs: 'src/sass/**/*.scss',
    srcJS: 'src/js/**/*.js',
    srcJSON: 'src/**/*.json',
    srcIMAGES: 'src/images/**/*',

    tmp: 'tmp',
    tmpIndex: 'tmp/index.html',
    tmpCSS: 'tmp/css',
    tmpJS: 'tmp/js',
    tmpIMAGES: 'tmp/images',
    tmpHTML: 'tmp/html',

    dist: 'dist',
    distIndex: 'dist/index.html',
    distCSS: 'dist/css',
    distJS: 'dist/js',
    distIMAGES: 'dist/images'
};

var vendor = require('./vendor');

var opts = {
    algorithm: 'sha1',
    hashLength: 40,
    template: '<%= name %><%= ext %>?hash=<%= hash %>'
};

function errorLog(error){
    console.error.bind(error);
    this.emit('end');
}


//////////////////
// DEVELOPMENT //
////////////////


gulp.task('html', function () {
    return gulp.src(paths.srcHTML)
               .pipe(gulp.dest(paths.tmp))
               .pipe(reload({stream: true}));
});

gulp.task('htmlWatch', function () {
    return gulp.src(paths.srcHTMLwoIndex)
        .pipe(gulp.dest(paths.tmpHTML))
        .pipe(reload({stream: true}));
});

gulp.task('css', function(){
    gulp.src(paths.srcSCSS)
        .pipe(sass())
        .on('error', errorLog)
        .pipe(prefix('> 1%'))
        .pipe(gulp.dest(paths.tmpCSS))
        .pipe(reload({stream: true}));
});

gulp.task('js', function(){
    gulp.src(paths.srcJS)
        .on('error', errorLog)
        .pipe(concat('app.js'))
        .pipe(gulp.dest(paths.tmpJS))
        .pipe(reload({stream: true}));
});

gulp.task('libs', function(){
    gulp.src(vendor)
        .on('error', errorLog)
        .pipe(concat('libs.js'))
        .pipe(gulp.dest(paths.tmpJS))
        .pipe(reload({stream: true}));
});

// Browser-Sync Task
gulp.task('browser-sync', function(){
    browserSync({
        server: {
            baseDir: "./tmp/",
            middleware: [ history() ]
        }
    })
});

gulp.task('json', function () {
    return gulp.src(paths.srcJSON)
        .pipe(gulp.dest(paths.tmp))
        .pipe(reload({stream: true}));
});

gulp.task('images', function(){
    return gulp.src(paths.srcIMAGES)
        .pipe(gulp.dest(paths.tmpIMAGES))
        .pipe(reload({stream: true}));
});

gulp.task('copy', ['html', 'css', 'js', 'libs', 'json']);

gulp.task('inject', ['copy'], function () {
    var css = gulp.src('tmp/css/main.css');
    var js = gulp.src(['tmp/js/libs.js', 'tmp/js/app.js']);
    return gulp.src(paths.tmpIndex)
        .pipe(inject( css, { relative:true}))
        .pipe(inject( js, {relative:true}))
        .pipe(gulp.dest(paths.tmp))
        .pipe(reload({stream: true}));
});

gulp.task('watch', [ 'inject', 'browser-sync'], function () {
    gulp.watch([paths.srcHTMLwoIndex],['htmlWatch']);
    gulp.watch([paths.srcSCSSs],['css']);
    gulp.watch([paths.srcJS],['js']);
    gulp.watch([paths.srcJSON],['json']);
});

gulp.task('default', ['watch']);


////////////
// BUILD //
//////////


gulp.task('html:dist', function(){
    return gulp.src(paths.srcHTML)
               .pipe(htmlmin({collapseWhitespace: true}))
               .pipe(gulp.dest(paths.dist));
});

gulp.task('css:dist', function(){
    return gulp.src(paths.srcSCSS)
        .pipe(sass())
        .on('error', errorLog)
        .pipe(prefix('> 1%'))
        .pipe(cleancss())
        .pipe(gulp.dest(paths.distCSS));
});

// gulp.task('js:dist', function(){
//     gulp.src(paths.srcJS)
//         .on('error', errorLog)
//         .pipe(concat('app.min.js'))
//         .pipe(uglify())
//         .pipe(gulp.dest(paths.distJS));
// });
//
// gulp.task('libs:dist', function(){
//     gulp.src(vendor)
//         .on('error', errorLog)
//         .pipe(concat('libs.min.js'))
//         .pipe(uglify())
//         .pipe(gulp.dest(paths.distJS));
// });

gulp.task('js:dist', function(){
    gulp.src(vendor.concat([paths.srcJS]))
        .on('error', errorLog)
        .pipe(concat('app.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(paths.distJS));
});

gulp.task('images:dist', function(){
    return gulp.src(paths.srcIMAGES)
        .pipe(imagemin())
        .pipe(gulp.dest(paths.distIMAGES));
});

gulp.task('json:dist', function () {
    return gulp.src(paths.srcJSON)
        .pipe(gulp.dest(paths.dist));
});

gulp.task('copy:dist', ['html:dist', 'css:dist', 'js:dist', 'json:dist']);

gulp.task('inject:dist', ['copy:dist'], function () {
    var css = gulp.src('dist/css/main.css');
    var js = gulp.src('dist/js/app.min.js');
    return gulp.src(paths.distIndex)
        .pipe(inject( css.pipe(hash(opts)), { relative:true}))
        .pipe(inject( js.pipe(hash(opts)), {relative:true}))
        .pipe(gulp.dest(paths.dist));
});
gulp.task('build', ['inject:dist']);


// removing tmp and dist directories
gulp.task('clean', function () {
    del([paths.tmp, paths.dist]);
});