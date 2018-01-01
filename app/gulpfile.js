const gulp = require('gulp'),
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

const paths = {

    srcHTML: 'src/**/*.html',
    srcTemplates: 'src/html/**/*.html',
    srcSCSS: 'src/sass/main.scss',
    srcSCSSs: 'src/sass/**/*.scss',
    srcJS: 'src/js/**/*.js',
    srcIMAGES: 'src/images/**/*',

    public: 'public',
    publicIndex: 'public/index.html',
    publicCSS: 'public/css',
    publicJS: 'public/js',
    publicHTML: 'public/html',
    publicIMAGES: 'public/images'

};

const vendor = require('./vendor');

const opts = {
    algorithm: 'sha1',
    hashLength: 40,
    template: '<%= name %><%= ext %>?hash=<%= hash %>'
};

function errorLog(error){
    console.error.bind(error);
    this.emit('end');
}

  ///////////
 // TASKS //
///////////

gulp.task('html', function () {
    return gulp.src(paths.srcHTML)
               .pipe(htmlmin({collapseWhitespace: true}))
               .pipe(gulp.dest(paths.public))
               .pipe(reload({stream: true}));
});

gulp.task('htmlWatch', function () {
    return gulp.src(paths.srcTemplates)
               .pipe(htmlmin({collapseWhitespace: true}))
               .pipe(gulp.dest(paths.publicHTML))
               .pipe(reload({stream: true}));
});

gulp.task('css', function(){
    gulp.src(paths.srcSCSS)
        .pipe(sass())
        .on('error', errorLog)
        .pipe(prefix('> 1%'))
        .pipe(cleancss())
        .pipe(gulp.dest(paths.publicCSS))
        .pipe(reload({stream: true}));
});

gulp.task('js', function(){
    gulp.src(vendor.concat([paths.srcJS]))
        .on('error', errorLog)
        .pipe(concat('app.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(paths.publicJS))
        .pipe(reload({stream: true}));
});

gulp.task('images', function(){
    return gulp.src(paths.srcIMAGES)
        .pipe(imagemin())
        .pipe(gulp.dest(paths.publicIMAGES));
});

// Browser-Sync Task
gulp.task('browser-sync', function(){
    browserSync({
        server: {
            baseDir: "./public/",
            middleware: [ history() ]
        }
    })
});

gulp.task('copy', ['html', 'css', 'js', 'images']);

gulp.task('inject', ['copy'], function(){
    const css = gulp.src('public/css/main.css');
    const js = gulp.src('public/js/app.min.js');
    return gulp.src(paths.publicIndex)
               .pipe(inject( css.pipe(hash(opts) ), { relative: true }))
               .pipe(inject( js.pipe(hash(opts)), { relative: true }))
               .pipe(gulp.dest(paths.public))
               .pipe(reload({stream: true}));
});

gulp.task('watch', [ 'inject', 'browser-sync'], function () {
    gulp.watch([paths.srcTemplates],['htmlWatch']);
    gulp.watch([paths.srcSCSSs],['css']);
    gulp.watch([paths.srcJS],['js']);
});

gulp.task('default', ['inject']);

gulp.task('clean', function () {
    del([paths.publicIndex, paths.publicHTML, paths.publicCSS, paths.publicJS, paths.publicIMAGES]);
});