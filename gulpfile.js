// gulp
var gulp = require('gulp');
var plugins=require('gulp-load-plugins')();
// plugins
var runSequence = require('run-sequence');
var browserify = require('gulp-browserify');
var del = require('del');
var browserSync = require('browser-sync').create();


// tasks js
gulp.task('clean', function () {
    return del(['./app/js/bundled.js', './dist/*']);
});
gulp.task("browserify", function () {
    return gulp.src(['app/js/app.js'])
        .pipe(browserify({
            insertGlobals: true,
            debug: true
        }))
        .pipe(plugins.concat('bundled.js'))
        .pipe(gulp.dest('app/js'));
});
gulp.task("browserifyDist", function () {
    return gulp.src(['app/js/app.js'])
        .pipe(browserify({
            insertGlobals: true,
            debug: false,
            transform: [
                ['browserify-css']
            ]
        }))
        .pipe(plugins.ngAnnotate())
        .pipe(plugins.ngmin({dynamic: false}))
        .pipe(plugins.stripDebug())
        .pipe(plugins.concat('bundled.js'))
        .pipe(gulp.dest('dist/js'));
});
gulp.task('lint', function () {
    return gulp.src(['./app/**/*.js', '!./app/lib/**'])
        .pipe(plugins.jshint())
        .pipe(plugins.jshint.reporter('default'))
        .pipe(plugins.jshint.reporter('fail'));
});
gulp.task('minify-js', function () {
    gulp.src(['./app/**/*.js', '!./app/lib/**'])
        .pipe(plugins.uglify({
            // inSourceMap:
            // outSourceMap: "app.js.map"
        }))
        .pipe(gulp.dest('./dist/'))
});

//task css
gulp.task('sass', function () {
    return gulp.src('./app/sass/main.scss')
        .pipe(plugins.sass({sourcemap: true}))
        .pipe(gulp.dest('./app/css/'));
})
gulp.task('minify-css', function () {
    var opts = {comments: true, spare: true};
    gulp.src(['./app/**/*.css', '!./app/lib/**'])
        .pipe(plugins.minifyCSS(opts))
        .pipe(gulp.dest('./dist/'))
});

//copy static sources to dist
gulp.task('copy-html', function () {
    gulp.src(['./app/templates/**/*.html'])
        .pipe(gulp.dest('./dist/templates'));
    gulp.src('./app/index.html')
        .pipe(gulp.dest('./dist/'));
});
gulp.task('copy-img', function () {
    gulp.src('./app/images/*')
        .pipe(gulp.dest('./dist/images'));
});
gulp.task('copy-fonts', function () {
    gulp.src('./app/fonts/*')
        .pipe(gulp.dest('./dist/fonts'));
});
gulp.task('copy-lib', function () {
    gulp.src('./app/lib/**/*')
        .pipe(gulp.dest('./dist/lib'));
});
gulp.task('copy-resources', function () {
    runSequence(['copy-html', 'copy-img', 'copy-fonts', 'copy-lib']);
});

// watch reload
gulp.task('js-watch', ['clean', 'lint', 'browserify'], function (done) {
    browserSync.reload();
    done();
});
gulp.task('reload', function (done) {
    browserSync.reload();
    done();
})
gulp.task('watch', function () {
    gulp.watch(["app/js/**/*.js", "!app/js/bundled.js"], ['js-watch']);
    gulp.watch(['app/sass/**/*.scss'], ['sass', 'reload']);
    gulp.watch(["app/templates/**/*.html", "app/templates/*.html"]).on("change", browserSync.reload);
});

//browser-sync
gulp.task('serve', function () {
    browserSync.init({
        server: {
            baseDir: "./app"
        }
    });
});
gulp.task('serveDist', function () {
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });
});

// default task
gulp.task('default', function () {
    runSequence(
        ['clean'],
        [ 'sass', 'browserify', 'serve', 'watch']
    );
});
//build task
gulp.task('build', function () {
    runSequence(
        ['clean'],
        [ 'sass', 'browserify'],
        ['copy-resources', 'minify-css', 'browserifyDist', 'serveDist']
    );
})
